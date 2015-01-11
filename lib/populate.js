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
        count = 0,
        s = fs.createReadStream(from);

    getDb(name, function (err, db) {
        if (err) {
            console.error(err);
            return;
        }
        db = populateDb(db);

        eachPackage(s, function (obj) {
            if (obj.name) {
                count += 1;
                db.addPackage(obj);
            } // else it's the timestamp
            // should do something w that
        }, function (err) {

            db.freeze(name, function(err) {
                console.log('Added %d packages to %s', count, name);
            });
        });
    });
}

module.exports = populate;
