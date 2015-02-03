'use strict';

var main = require('./main');
var complete = require('./complete');
var makeWriteReporter = require('./reporters/write');

function completeApi(term, stream, done) {
    var opts = {
        db: main.defaultDb(),
        reporter: makeWriteReporter(stream),
        complete: term
    };

    main.runCommand(complete, opts, done);
}

module.exports = completeApi;
