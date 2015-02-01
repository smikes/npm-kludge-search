'use strict';

function complete(opts, done) {
    var getDb = require('./getDb'),
        dbName = opts.db;

    getDb(dbName, function (err, db) {
        if (err) {
            console.error("ERR: " + err.message);
            // exit process with stacktrace
            throw err;
        }

        var start, end;
        start = opts.complete;
        end = start + String.fromCharCode(0x10FFFF);

        db.findRange(start, end, function (err, val) {
            console.log(val);
        }, done);
    });
}

module.exports = complete;
