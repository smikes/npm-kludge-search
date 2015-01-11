'use strict';

var populateDb = require('../lib/populateDb'),
    getDb = require('../lib/getDb'),
    testDB = './test.sqlite';

var samplePackage = {
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
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

describe('cleanup objects', function () {
    it('gracefully handles missing members', function (done) {
        var db = populateDb({prepare: function () {return; }});

        db.cleanPackage({});

        done();
    });
});

describe('populate db', function () {

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

    it('misses missing records', function (done) {
        getDb(testDB, function (err, db) {
            expect(err).to.equal(null);
            // wrap db
            db = populateDb(db);

            db.findByName('missing', done, done);
        });
    });

    it('can freeze db', function (done) {
        getDb(testDB, function (err, db) {
            expect(err).to.equal(null);

            db.freeze('test.pft', function (err) {
                expect(err).to.equal(null);
                done();
            });
        });
    });

    it('can find by fts', function (done) {
        getDb(testDB, function (err, db) {
            var rows = 0;
            expect(err).to.equal(null);
            db = populateDb(db);

            db.findFTS('foobar', function (err) {
                expect(err).to.equal(null);
                rows += 1;
            }, function (err) {
                expect(err).to.equal();
                expect(rows).to.equal(1);

                done();
            });
        });
    });
});
