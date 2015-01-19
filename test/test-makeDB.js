'use strict';

var makeDb = require('../lib/makeDb'),
    testDB = './fixtures/test.pft';

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

            var callCount = 0;
            db.search('', function () {
                callCount += 1;
            }, function () {
                expect(callCount).to.equal(0);
                done();
            });
        });
    });
});

describe('makedb', function () {
    it('makes a database', function (done) {
        makeDb('invalid-name', function (err, db) {
            expect(err).to.equal(null);

            var callCount = 0;
            db.search('', function () {
                callCount += 1;
            }, function () {
                expect(callCount).to.equal(0);
                done();
            });
        });
    });
});
