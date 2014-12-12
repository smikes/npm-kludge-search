"use strict";

var assert = require('assert'),
    populateDb = require('../lib/populateDb'),
    getDb = require('../lib/getDb'),
    testDB = "./test.sqlite",
    samplePackage = {
        name: 'package',
        description: 'blah blah foobar',
        maintainers: [ {name: 'blither' } ],
        versions: { '1.0.0': 'latest' },
        time: { modified: '2014-04-01T14:21:13' },
        keywords: 'test, sample',
        url: 'https://github.org/nobody/package/'
    };

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

function cleanup(done) {
    getDb(testDB, function (err, db) {
        expect(err).to.equal(null);
        db.run("DELETE FROM package;");
        done();
    });
}

describe('cleanup objects', function () {
    it('gracefully handles missing members', function (done) {
        var db = populateDb({prepare: function () {}});

        var p = db.cleanPackage({});
        
        done();
    });
});

describe('populate db', function () {
    lab.beforeEach(function (done) {
        cleanup(done);
    });
    lab.afterEach(function (done) {
        cleanup(done);
    });

    it('can add a record', function (done) {
        getDb(testDB, function (err, db) {
            expect(err).to.equal(null);
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
