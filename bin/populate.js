#!/usr/bin/env node
'use strict';

var populate = require('../lib/populate');

// todo - some command line parsing
populate(process.argv[2]);
