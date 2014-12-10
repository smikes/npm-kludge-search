"use strict";

var fts = require('./fts');

module.exports = function (db) {

    var insert = db.prepare('INSERT INTO package (name, description, author, date, version, keywords, url)'
                            + ' VALUES (?, ?, ?, ?, ?, ?, ?);'),
        ftsInsert = db.prepare('INSERT INTO package_fts (name, content) VALUES (?, ?);'),
        selectByName = db.prepare('SELECT * FROM package WHERE name LIKE ?'),
        selectByAuthor = db.prepare('SELECT * FROM package WHERE author LIKE ?'),
        selectFTS = db.prepare('SELECT package.* FROM package, package_fts '
                               + 'WHERE package.name = package_fts.name '
                               + 'AND package_fts.content MATCH ?');
      


    db.addPackage = function (obj) {
        var authors = (obj.maintainers || []).map(function (m) {
            return "=" + m.name
        }).join(", "),
            version = Object.keys(obj.versions || {})[0],
            keywords = [].concat(obj.keywords).join(", "),
            time = (obj.time
                 && obj.time.modified
                 && (new Date(obj.time.modified).toISOString()
                     .split("T").join(" ")
                     .replace(/:[0-9]{2}\.[0-9]{3}Z$/, ""))
                     .slice(0, -5) // remove time
                    || "prehistoric"),
            url = obj.url;

        insert.run(obj.name, obj.description, authors,
                   time, version, keywords, url);

        // TODO: fts insert
        ftsInsert.run(obj.name, fts(obj));
    };

    db.findByName = function (name, cb, done) {
        selectByName.each(name, cb, done);
    };

    db.findByAuthor = function (name, cb, done) {
        selectByAuthor.each(name, cb, done);
    };

    db.findFTS = function (name, cb, done) {
        selectFTS.each(name, cb, done);
    };

    return db;
};
