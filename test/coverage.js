'use strict';

var fts = require('../lib/fts');
var populateDb = require('../lib/populateDb');
var getDb = require('../lib/getDb');

var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('angleize', function () {
    it('puts angles around strings', function (done) {
        expect(fts.angleize("foo")).to.equal("<foo>");
        done();
    });

    it("doesn't barf on undefined", function (done) {
        expect(fts.angleize()).to.equal();
        done();
    });
});

describe('trimit', function () {
    it('trims strings', function (done) {
        expect(fts.trimit("foo")).to.equal("foo");
        expect(fts.trimit(" foo\t")).to.equal("foo");
        done();
    });

    it("doesn't barf on undefined", function (done) {
        expect(fts.trimit()).to.equal();
        done();
    });

    it("returns 'undefined' for numbers", function (done) {
        expect(fts.trimit(1)).to.equal();
        done();
    });
});

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
