"use strict";
/*global describe, it, afterEach*/

var assert = require('assert'),
    populateDb = require('../lib/populateDb'),
    getDb = require('../lib/getDb'),
    testDB = "./test.sqlite",
    samplePackage = {
        name: 'package',
        description: 'blah blah foobar',
        author: 'Near Perfect Memory',
        date: '2014-04-01T14:21:13',
        keywords: 'test, sample',
        url: 'https://github.org/nobody/package/'
    };

function cleanup(done) {
    getDb(testDB, function (err, db) {
        assert.equal(null, err);
        db.run("DELETE FROM package;");
        done();
    });
}

describe('populate db', function () {
    beforeEach(function (done) {
        cleanup(done);
    });
    afterEach(function (done) {
        cleanup(done);
    });

    it('can add a record', function (done) {
        getDb(testDB, function (err, db) {
            assert.equal(null, err);
            // wrap db
            db = populateDb(db);

            db.addPackage(samplePackage);

            db.findByName('package', function (err, row) {
                assert.equal(null, err);

                assert.equal(row.name, 'package');
            }, done);
        });

    });

    it('misses missing records', function (done) {
        getDb(testDB, function (err, db) {
            assert.equal(null, err);
            // wrap db
            db = populateDb(db);

            db.findByName('missing', done, done);
        });
    });

    it('can find by author', function (done) {
        getDb(testDB, function (err, db) {
            db = populateDb(db);
            db.addPackage(samplePackage);

            db.findByAuthor('Perfect', function (err, row) {
                assert.equal(err, null);
                assert.equal(row.name, 'package');
            }, done);
        });
    });

    it('can find by fts', function (done) {
        getDb(testDB, function (err, db) {
            db = populateDb(db);
            db.addPackage(samplePackage);

            db.findFTS('foobar', function (err, row) {
                assert.equal(err, null);
                assert.equal(row.name, 'package');
            }, done);
        });
    });
});
