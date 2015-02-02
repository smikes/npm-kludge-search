#!/usr/bin/env node
'use strict';

var main = require('../lib/main');

function justExit() {
    process.exit(0);
}

main(process.argv, justExit);

