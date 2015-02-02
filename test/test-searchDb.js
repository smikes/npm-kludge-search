'use strict';

var searchDb = require('../lib/searchDb');
var name = require('../lib/name');

var makeNullReporter = require('../lib/reporters/null');

var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('searchDb', function () {

    it('searches single word fts', function (done) {
        var db = {
            search: function (name, cb, done) {
                cb(null, { name: name });
                setImmediate(done);
            }
        },
            opts = {
                argv: {
                    remain: ['bar']
                },
                reporter: makeNullReporter()
            };


        searchDb(db, opts, function () {
            expect(opts.reporter.res).to.deep.equal([{ name: 'bar' }]);
            done();
        });
    });

    it('searches by name', function (done) {
        var db = {
            get: function (name, cb) {
                cb(null, { name: name });
            }
        },
            opts = {
                name: 'bar',
                reporter: makeNullReporter()
            };


        name(db, opts, function () {
            expect(opts.reporter.res).to.deep.equal([{ name: 'bar' }]);
            done();
        });
    });

    it('handles missing search by name', function (done) {
        var db = {
            get: function (name, cb) {
                /*jslint unparam: true*/
                cb(new Error('No object with name "fair"'));
            }
        },
            opts = {
                name: 'bar',
                reporter: makeNullReporter()
            };


        name(db, opts, function () {
            expect(opts.reporter.res).to.deep.equal([]);
            done();
        });
    });

});
