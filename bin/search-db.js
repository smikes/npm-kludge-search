#!/usr/bin/env node
'use strict';

var searchDb = require('../lib/searchDb');

// todo - some command line parsing
searchDb(process.argv[2], process.argv[3]);
