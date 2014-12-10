"use strict";
/*global describe, it*/

var assert = require('assert'),
    populateDb = require('../lib/populateDb'),
    makeDb = require('../lib/makeDb'),
    testDB = "./test.sqlite";

describe('populate db', function () {
    it('can add a record', function (done) {
        makeDb(testDB, function (err, db) {
            // wrap db
            db = populateDb(db);

            db.addPackage({
                name: 'package',
                description: 'blah blah foobar',
                author: 'Near Perfect Memory',
                date: '2014-04-01T14:21:13',
                keywords: 'test, sample',
                url: 'https://github.org/nobody/package/'
            });

            assert(db.findByName('package'))

            done();
        });
    });
});
