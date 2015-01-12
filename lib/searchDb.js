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

    getDb(dbName, function (err, db) {
        if (err) {
            console.error("ERR: " + err.message);
            // exit process with stacktrace
            throw err;
        }
        var all = [];
        db = populateDb(db);

        // full text search
        db.findFTS(opts.argv.remain[0], function (err, obj) {
            if (err) {
                console.error("ERR: " + err.message);
                // exit process with stacktrace
                throw err;
            }

            all.push(db.find(obj));
        }, function () {
            nice_output(all);
            console.log('Found: %j packages', all.length);
        });
    });
}

module.exports = search_db;

search_db.getOptions = getOptions;
