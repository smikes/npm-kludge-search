#!/usr/bin/env node
'use strict';

var populate = require('../lib/populate');

populate(process.argv[2], process.argv[3]);
