'use strict';

var fts = require('./fts');
var authors = require('./authors');


function formatTime(t) {
    return new Date(t).toISOString()
        .split('T').join(' ')
        .replace(/:[0-9]{2}\.[0-9]{3}Z$/, '')
        .slice(0, -5);
}

function fixTime(time) {
    if (time && time.modified) {
        return formatTime(time.modified);
    }

    return 'prehistoric';
}

module.exports = function (db) {

    var ftsInsert = db.prepare('INSERT INTO package_fts (name, content) VALUES (?, ?);'),
        insert = db.prepare('INSERT INTO package (name, description, author, date, version, keywords, url) VALUES (?, ?, ?, ?, ?, ?, ?);'),
        selectByAuthor = db.prepare('SELECT * FROM package WHERE author LIKE ?'),
        selectByName = db.prepare('SELECT * FROM package WHERE name LIKE ?'),
        selectFTS = db.prepare('SELECT package.* FROM package, package_fts WHERE package.name = package_fts.name AND package_fts.content MATCH ?');

    db.cleanPackage = function (obj) {
        return {
            authors: authors(obj.maintainers),
            version: Object.keys(obj.versions || {})[0],
            keywords: [].concat(obj.keywords).join(', '),
            time: fixTime(obj.time),
            url: obj.url,
            name: obj.name,
            description: obj.description
        };
    };

    db.addPackage = function (obj) {
        var o = this.cleanPackage(obj);

        insert.run(o.name, o.description, o.authors,
                   o.time, o.version, o.keywords, o.url);

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

module.exports.fixTime = fixTime;
