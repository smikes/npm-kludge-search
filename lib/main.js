'use strict';

var populateDb = require('./populateDb'),
    getDb = require('./getDb'),
    path = require('path'),
    nopt = require('nopt'),
    search_db = require('./searchDb'),
    complete = require('./complete'),
    version = require('./version'),
    known = {
        "db": path,
        "name": String,
        "author": String,
        "version": Boolean,
        "reporter": ["slow", "fast", "json", "write"],
        "complete": String
    };

function getOptions(argv) {
    /*jslint nomen:true */
    var opts = nopt(known, {}, argv, 2),
        defaultReporter = (opts.version || opts.complete) ? "write" :
            "slow",
        rep = opts.reporter || defaultReporter,
        makeReporter = require('./reporters/' + rep);

    // defaults
    opts.db = opts.db || path.resolve(__dirname, "..", "npmdb.pft");

    opts.reporter = makeReporter(process.stdout);

    return opts;
}

function main(args, done) {
    var opts = getOptions(args);

    // deal with EPIPE
    process.stdout.on('error', done);

    if (opts.version) {
        return version(opts, done);
    }

    getDb(opts.db, function (err, db) {
        if (err) {
            console.error("ERR: " + err.message);
            // exit process with stacktrace
            throw err;
        }

        if (opts.complete) {
            complete(db, opts, done);
            return;
        }

        search_db(db, opts, done);
        return;
    });
}

module.exports = main;

