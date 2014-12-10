"use strict";
/*global describe, it, afterEach*/

var assert = require('assert'),
    populateDb = require('../lib/populateDb'),
    getDb = require('../lib/getDb'),
    testDB = "./test.sqlite";

describe('populate db', function () {
    beforeEach(function (done) {
        getDb(testDB, function (err, db) {
            db.run("DELETE FROM package;");
            done();
        });
    });

    it('can add a record', function (done) {
        getDb(testDB, function (err, db) {
            // wrap db
            db = populateDb(db);

            db.addPackage({
                    name: 'package',
                    description: 'blah blah foobar',
                    author: 'Near Perfect Memory',
                    date: '2014-04-01T14:21:13',
                    keywords: 'test, sample',
                    url: 'https://github.org/nobody/package/'
                });

                db.findByName('package', function (err, row) {
                    assert.equal(null, err);

                    assert.equal(row.name, 'package');
                }, done);
        });

    });

    it('misses missing records', function (done) {
        getDb(testDB, function (err, db) {
            // wrap db
            db = populateDb(db);

            db.findByName('missing', done, done);
        });
    });
});
