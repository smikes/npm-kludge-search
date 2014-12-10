"use strict";

var sqlite3 = require('sqlite3').verbose();

function makeDb(name, cb) {
    // return an sqlite db
    var db = new sqlite3.Database(name);

    db.serialize(function () {
        db.run('CREATE TABLE IF NOT EXISTS package ('
               + ' name VARCHAR,'
               + ' description TEXT, '
               + ' author VARCHAR, '
               + ' date DATETIME, '
               + ' version VARCHAR, '
               + ' keywords VARCHAR, '
               + ' url VARCHAR '
               + ');');

        db.run('CREATE INDEX IF NOT EXISTS package_name '
               + ' ON package (name);');
        db.run('CREATE INDEX IF NOT EXISTS package_author '
               + ' ON package (author);');

        db.run('CREATE VIRTUAL TABLE IF NOT EXISTS package_fts USING fts4('
               + ' package, content);');

        cb(null, db);

    });
}

module.exports = makeDb;
