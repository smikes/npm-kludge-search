'use strict';

var authors = require('./authors');
var fts = require('./fts');


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

    db.cleanPackage = function (obj) {
        return {
            author: authors(obj.maintainers),
            version: Object.keys(obj.versions || {})[0],
            keywords: [].concat(obj.keywords).join(', '),
            description: obj.description || "",
            date: fixTime(obj.time),
            name: obj.name,
            fts: fts(obj)
        };
    };

    db.addPackage = function (obj) {
        var o = this.cleanPackage(obj);
        this.add(o);
    };

    return db;
};

module.exports.fixTime = fixTime;
