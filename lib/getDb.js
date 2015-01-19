'use strict';

var dbs = {},
    makeDb = require('./makeDb');

function cacheDb(name, cb) {
    return function (err, db) {
        if (err) {
            return cb(err);
        }

        dbs[name] = db;
        cb(null, db);
    };
}


function getDb(name, cb) {
    if (!dbs[name]) {
        makeDb(name, cacheDb(name, cb));
    } else {
        setImmediate(function () {
            cb(null, dbs[name]);
        });
    }
}

module.exports = getDb;

getDb.cacheDb = cacheDb;
