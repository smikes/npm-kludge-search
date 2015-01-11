'use strict';

var Purefts = require('pure-fts');

function makeDb(name, cb) {
    // return an sqlite db

    Purefts.thaw(name, function (err, db) {
        if (err) {
            db = new Purefts();
            db.name = name;
        }

        cb(null, db);
    });
}

module.exports = makeDb;
