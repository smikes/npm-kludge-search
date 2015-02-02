'use strict';

var nopt = require('nopt'),
    fs = require('fs'),
    path = require('path'),
    getDb = require('./getDB'),
    eachPackage = require('./eachPackage'),
    populateDb = require('./populateDb'),
    known = {
        "db": path,
        "from": path
    };

function getOptions(argv) {
    return nopt(known, {}, argv, 2);
}

function populate() {

    /*jslint nomen:true*/
    var opts = getOptions(process.argv),
        name = opts.db || 'npmdb.pft',
        from = opts.from || path.resolve(__dirname, '..', 'npm-all-cache.json'),
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
            // should do something w that?

            if (count % 2048 === 1) {
                process.stderr.write('.');
            }
        }, function () {
            process.stderr.write('\nWriting full-text index...\n');
            db.freeze(name, function (err) {
                if (err) {
                    console.error("Error: " + err);
                    throw err;
                }
                process.stderr.write('\n');
                console.log('Added %d packages to %s', count, name);
            });
        });
    });
}

module.exports = populate;

populate.getOptions = getOptions;
