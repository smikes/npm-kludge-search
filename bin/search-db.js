#!/usr/bin/env node
"use strict";

var search_db = require("../lib/search_db");

// todo - some command line parsing
search_db(process.argv[2], process.argv[3]);
