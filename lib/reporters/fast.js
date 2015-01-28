'use strict';

var es = require('event-stream');
var columnify = require('columnify');

function nice_output(obj, output) {
    output.write(columnify(obj, {
        include: ['name', 'description', 'author', 'date', 'version', 'keywords'],
        truncate: true,
        showHeaders: false,
        config: {
            name: { minWidth: 20, maxWidth: 20, truncateMarker: '>' },
            description: { minWidth: 40, maxWidth: 40 },
            author: { minWidth: 20, maxWidth: 20 },
            date: { minWidth: 11, maxWidth: 11 },
            version: { minWidth: 11, maxWidth: 11 },
            keywords: { minWidth: 11, maxWidth: 20 }
        }
    }) + "\n");
}

function makeReporter(output) {
    var count = 0;

    // output header row
    output.write("NAME                 DESCRIPTION                              AUTHOR               DATE        VERSION     KEYWORDS  \n");
    return es.through(function write(data) {
        count += 1;
        nice_output([data], output);
    }, function end() {
        output.write('\nFound packages: ' + count + '\n');
        output.end();
    });
}

module.exports = makeReporter;
