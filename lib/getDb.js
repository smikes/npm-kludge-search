'use strict';

var dbs = {},
    makeDb = require('./makeDb');


function getDb(name, cb) {
    makeDb(name, cb);
}

module.exports = getDb;
