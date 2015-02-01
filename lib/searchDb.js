'use strict';

var populateDb = require('./populateDb'),
    getDb = require('./getDb'),
    path = require('path'),
    nopt = require('nopt'),
    complete = require('./complete'),
    known = {
        "db": path,
        "name": String,
        "author": String,
        "version": Boolean,
        "reporter": ["slow", "fast", "json"],
        "complete": String
    };

function getOptions(argv) {
    /*jslint nomen:true */
    var opts = nopt(known, {}, argv, 2);

    // defaults
    opts.db = opts.db || path.resolve(__dirname, "..", "npmdb.pft");

    return opts;
}

function getVersion() {
    var p = require('../package.json');

    return p.version;
}

function search_db() {
    var opts = getOptions(process.argv),
        dbName = opts.db,
        rep = opts.reporter || "slow",
        makeReporter = require('./reporters/' + rep),
        reporter = makeReporter(process.stdout);

    if (opts.version) {
        console.log('npm-kludge-search@' + getVersion());
        process.exit(0);
    }

    if (opts.complete) {
        complete(opts, function () {
            process.exit(0);
        });
        return;
    }

    // deal with EPIPE
    process.stdout.on('error', function () {
        process.exit(0);
    });

    function each_result(err, obj) {
        if (err) {
            console.error("ERR: " + err.message);
            // exit process with stacktrace
            throw err;
        }

        reporter.write(obj);
    }

    function results_done() {
        reporter.end();
    }

    getDb(dbName, function (err, db) {
        if (err) {
            console.error("ERR: " + err.message);
            // exit process with stacktrace
            throw err;
        }

        db = populateDb(db);

        if (opts.name) {
            db.findByName(opts.name, each_result, results_done);
        } else {
            // full text search
            db.findFTS(opts.argv.remain[0], each_result, results_done);
        }
    });
}

module.exports = search_db;

search_db.getOptions = getOptions;
