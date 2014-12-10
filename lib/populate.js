"use strict";
// get https://registry.npmjs.org/-/all

//   data.words = [ data.name ]
//               .concat(data.description)
//               .concat(data.maintainers)
//               .concat(data.url && ("<" + data.url + ">"))
//               .concat(data.keywords)
//               .map(function (f) { return f && f.trim && f.trim() })
//               .filter(function (f) { return f })
//               .join(" ")
//               .toLowerCase()

function populate(name) {
    name = name || 'npmdb.sqlite';

    var path = require('path'),
        fs = require('fs'),
        populateDb = require('./populateDb'),
        getDb = require('./getDB'),
        eachPackage = require('./eachPackage'),
        s = fs.createReadStream(path.resolve(__dirname, "..", "npm-all-cache.json"));

    getDb(name, function (err, db) {
        db = populateDb(db);

        eachPackage(s, function (obj) {
            if (obj.name) {
                db.addPackage(obj);
            } // else it's the timestamp
            // should do something w that
        });
    });
}

module.exports = populate;
