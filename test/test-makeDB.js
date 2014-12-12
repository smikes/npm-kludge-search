"use strict";
/*global describe, it*/

var assert = require('assert'),
    makeDb = require('../lib/makeDb'),
    testDB = "./test.sqlite";

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

describe('makedb', function () {
    it('makes a database', function (done) {
        makeDb(testDB, function (err, db) {
            assert.equal(err, null);

            db.all("SELECT COUNT(*) AS count FROM package;", function (err, result) {
                assert.equal(err, null);


                assert.equal(result[0].count, 0);
                done();
            });
        });
    });

    it('has no error if package already exists', function (done) {
        makeDb(testDB, function (err, db) {
            assert.equal(err, null);

            db.all("SELECT COUNT(*) AS count FROM package;", function (err, result) {
                assert.equal(err, null);

                assert.equal(result[0].count, 0);
                done();
            });
        });
    });
});
