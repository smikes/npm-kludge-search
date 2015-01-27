#!/usr/bin/env node
'use strict';

var searchDb = require('../lib/searchDb');

searchDb(process.argv[2], process.argv[3]);

