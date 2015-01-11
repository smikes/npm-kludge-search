'use strict';

var fts = require('../lib/fts');

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
