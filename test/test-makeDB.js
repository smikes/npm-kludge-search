'use strict';

var makeDb = require('../lib/makeDb'),
    testDB = './test.sqlite';

var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('makedb', function () {
    it('makes a database', function (done) {
        makeDb(testDB, function (err, db) {
            expect(err).to.equal(null);

            db.all('SELECT COUNT(*) AS count FROM package;', function (err, result) {
                expect(err).to.equal(null);

                expect(result[0].count).to.equal(0);
                done();
            });
        });
    });

    it('has no error if package already exists', function (done) {
        makeDb(testDB, function (err, db) {
            expect(err).to.equal(null);

            db.all('SELECT COUNT(*) AS count FROM package;', function (err, result) {
                expect(err).to.equal(null);

                expect(result[0].count).to.equal(0);
                done();
            });
        });
    });
});
