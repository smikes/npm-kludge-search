'use strict';

var fts = require('../lib/fts');

var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('trimit', function () {
    it('does not error on nonwords', function (done) {
        var a = [undefined, 3, " foo "].map(fts.trimit);

        expect(a).to.deep.equal([undefined, undefined, "foo"]);
        done();
    });
});
