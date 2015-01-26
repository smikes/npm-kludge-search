'use strict';

var populateDb = require('../lib/populateDb'),
    getDb = require('../lib/getDb'),
    makeDb = require('../lib/makeDb'),
    testDB = './test.pft';

var samplePackage = {
        name: 'package',
        description: 'blah blah foobar',
        maintainers: [ {name: 'blither' } ],
        versions: { '1.0.0': 'latest' },
        time: { modified: '2014-04-01T14:21:13' },
        keywords: 'test, sample',
        url: 'https://github.org/nobody/package/'
    };

var rimraf = require('rimraf');
var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('cleanup objects', function () {
    it('gracefully handles missing members', function (done) {
        var db = populateDb({prepare: function () {return; }});

        db.cleanPackage({});

        done();
    });
});

describe('populate db', function () {

    lab.after(function (done) {
        rimraf(testDB, done);
    });

    it('can add a record', function (done) {
        getDb(testDB, function (err, db) {
            expect(err).to.equal(null);
            // wrap db
            db = populateDb(db);

            db.addPackage(samplePackage);

            db.findByName('package', function (err, row) {
                expect(err).to.equal(null);
                expect(row.name).to.equal('package');
            }, done);
        });

    });

    it('can freeze db', function (done) {
        getDb(testDB, function (err, db) {
            expect(err).to.equal(null);

            db.freeze(testDB, function (err) {
                expect(err).to.equal(null);
                done();
            });
        });
    });

    it('misses missing records', function (done) {
        makeDb(testDB, function (err, db) {
            expect(err).to.equal(null);
            // wrap db
            db = populateDb(db);

            db.findByName('missing', done, done);
        });
    });

    it('can find by fts', function (done) {
        makeDb(testDB, function (err, db) {
            var rows = 0;
            expect(err).to.equal(null);
            db = populateDb(db);

            db.findFTS('foobar', function (err, val) {
                expect(err).to.equal(null);
                expect(val.name).to.equal('package');
                rows += 1;
            }, function (err) {
                expect(err).to.equal();
                expect(rows).to.equal(1);

                done();
            });
        });
    });
});
