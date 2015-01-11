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
        obj.author = authors(obj.maintainers);
        obj.description = obj.description || "";
        obj.date = fixTime(obj.time);
        obj.version = Object.keys(obj.versions || {})[0];
        this.add(obj);
    };

    db.findByName = function (name, cb, done) {
        var result = this.find({name: name});

        setImmediate(function () {
            
            if (result)
                cb(null, result);

            setImmediate(done)
        });
    };

    db.findFTS = function (name, cb, done) {
        var result = db.search(name);

        result.forEach(function (n) {
            setImmediate(function () {
                cb(null, n);
            });
        });
        
        setImmediate(function () {
            done();
        });
    };

    return db;
};

module.exports.fixTime = fixTime;
