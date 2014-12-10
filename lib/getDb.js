"use strict";

var dbs = {},
    makeDb = require('./makedb');

module.exports = function getDb(name, cb) {
    if (!dbs[name]) {
        makeDb(name, function (err, db) {
            if (err) {
                return cb(err);
            }

            dbs[name] = db;
            cb(null, db);
        });
    } else {
        process.nextTick(function () {
            cb(null, dbs[name]);
        });
    }
};
