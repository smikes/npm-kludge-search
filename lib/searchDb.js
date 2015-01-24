'use strict';
// get https://registry.npmjs.org/-/all

var populateDb = require('./populateDb'),
    columnify = require('columnify'),
    getDb = require('./getDb'),
    path = require('path'),
    nopt = require('nopt'),
    known = {
        "db": path,
        "name": String,
        "author": String
    };

function nice_output(obj) {
    console.log(columnify(obj, {
        include: ['name', 'description', 'author', 'date', 'version', 'keywords'],
        truncate: true,
        config: {
            name: { maxWidth: 40, truncateMarker: '>' },
            description: { maxWidth: 40 },
            author: { maxWidth: 20 },
            date: { maxWidth: 11 },
            version: { maxWidth: 11 },
            keywords: { maxWidth: 20 }
        }
    }));
}

function getOptions(argv) {
    return nopt(known, {}, argv, 2);
}


function search_db() {

    var opts = getOptions(process.argv),
        dbName = opts.db || "./npmdb.pft";

    process.stdout.on('error', function () {
        process.exit(0);
    });

    getDb(dbName, function (err, db) {
        if (err) {
            console.error("ERR: " + err.message);
            // exit process with stacktrace
            throw err;
        }


        var all = [];

        function each_name_result(err, obj) {
            if (err) {
                console.error("ERR: " + err.message);
                // exit process with stacktrace
                throw err;
            }

            all.push(obj);
        }

        function each_fts_result(err, obj) {
            if (err) {
                console.error("ERR: " + err.message);
                // exit process with stacktrace
                throw err;
            }

            all.push(obj);
        }

        function results_done() {
            nice_output(all);
            console.log('Found: %j packages', all.length);
        }

        db = populateDb(db);

        if (opts.name) {
            db.findByName(opts.name, each_name_result, results_done);
        } else {
            // full text search
            db.findFTS(opts.argv.remain[0], each_fts_result, results_done);
        }
    });
}

module.exports = search_db;

search_db.getOptions = getOptions;
