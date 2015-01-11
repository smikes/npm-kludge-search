'use strict';

function populate(name, f) {
    name = name || 'npmdb.sqlite';

    /*jslint nomen:true*/
    var eachPackage = require('./eachPackage'),
        fs = require('fs'),
        path = require('path'),
        getDb = require('./getDB'),
        populateDb = require('./populateDb'),
        from = f || path.resolve(__dirname, '..', 'npm-all-cache.json'),
        s = fs.createReadStream(from);


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
