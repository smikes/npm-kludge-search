"use strict";

module.exports = function (db) {

    var insert = db.prepare('INSERT INTO package (name, description, author, date, version, keywords, url)'
                            + ' VALUES (?, ?, ?, ?, ?, ?, ?);'),
        selectByName = db.prepare('SELECT * FROM package WHERE name LIKE ?');


    db.addPackage = function (obj) {
        insert.run(obj.name, obj.description, obj.author,
                   obj.date, obj.version, obj.keywords,
                   obj.url);

        // TODO: fts insert
    };

    db.findByName = function (name, cb, done) {
        selectByName.each(name, cb, done);
    };

   return db;
};
