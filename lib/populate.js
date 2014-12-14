'use strict';

function populate(name) {
    name = name || 'npmdb.sqlite';

    var eachPackage = require('./eachPackage'),
        fs = require('fs'),
        getDb = require('./getDB'),
        path = require('path'),
        populateDb = require('./populateDb'),
        s = fs.createReadStream(path.resolve(__dirname, '..', 'npm-all-cache.json'));

    getDb(name, function (err, db) {
        if (err) {
            console.error(err);
            return;
        }
        db = populateDb(db);

        db.run("BEGIN TRANSACTION;");
        eachPackage(s, function (obj) {
            if (obj.name) {
                db.addPackage(obj);
            } // else it's the timestamp
            // should do something w that
        });
        db.run("COMMIT;");
    });
}

module.exports = populate;
