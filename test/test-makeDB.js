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

// obsolete fixture - rewrite
