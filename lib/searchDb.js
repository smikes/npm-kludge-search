'use strict';
// get https://registry.npmjs.org/-/all

var populateDb = require('./populateDb'),
    columnify = require('columnify'),
    getDb = require('./getDb');

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

function search_db(arg1, arg2) {

    getDb(arg2, function (err, db) {
        if (err) {
            console.error("ERR: " + err.message);
            // exit process with stacktrace
            throw err;
        }
        var all = [];
        db = populateDb(db);

        // full text search
        db.findFTS(arg1, function (err, obj) {
            if (err) {
                console.error("ERR: " + err.message);
                // exit process with stacktrace
                throw err;
            }

            all.push(db.values[obj]);
        }, function () {
            nice_output(all);
            console.log('Found: %j packages', all.length);
        });
    });
}

module.exports = search_db;
