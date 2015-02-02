'use strict';

var complete = require('../lib/complete');

var makeNullReporter = require('../lib/reporters/null');

var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('complete', function () {
    it('passes expected args to database', function (done) {
        var s,
            e,
            db = {
                findRange: function (start, end, cb, done) {
                    s = start;
                    e = end;
                    done();
                }
            },
            opts = {
                complete: 'foo',
                reporter: makeNullReporter()
            };

        complete(db, opts, function () {
            expect(s).to.equal('foo');
            expect(e > s).to.equal(true);
            expect(e < 'fop').to.equal(true);
            done();
        });
    });
});
