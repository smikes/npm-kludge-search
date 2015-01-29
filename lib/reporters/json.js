'use strict';

var es = require('event-stream');

function makeReporter(output) {
    var count = 0;

    return es.through(function write(data) {
        count += 1;
        delete data.fts;
        output.write(JSON.stringify(data, null, 0) + '\n');
    }, function end() {
        output.end();
    });
}

module.exports = makeReporter;
