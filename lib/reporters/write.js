'use strict';

var es = require('event-stream');

function makeReporter(output) {
    return es.through(function write(data) {
        output.write(data + "\n");
    }, function end() {
        output.end();
    });
}

module.exports = makeReporter;
