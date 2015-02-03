'use strict';

var populateDb = require('../lib/populateDb');
var getDb = require('../lib/getDb');
var main = require('../lib/main');

var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('fixTime', function () {
    it('processes time.modified', function (done) {
        expect(populateDb.fixTime()).to.equal('prehistoric');
        expect(populateDb.fixTime({})).to.equal('prehistoric');
        expect(populateDb.fixTime({modified: undefined})).to.equal('prehistoric');
        expect(populateDb.fixTime({modified: '2014-01-11'})).to.equal('2014-01-11 ');
        expect(populateDb.fixTime({modified: 123456789000})).to.equal('1973-11-29 ');
        done();
    });
});

describe('cacheDb', function () {
    it('handles errors', function (done) {
        getDb.cacheDb('bar', function (err, db) {
            expect(err).to.be.instanceof(Error);
            expect(db).to.equal(undefined);
            done();
        })(new Error("foo"));
    });
});

function identity(x) {
    return x;
}

describe('completeApi', function () {
    it('completes packages', function (done) {
        var s = {
            write: identity,
            end: identity
        };

        main.complete('foo', s, function () {
            done();
        });
    });
});
