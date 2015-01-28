'use strict';

var es = require('event-stream');
var columnify = require('columnify');

function nice_output(obj, output) {
    output.write(columnify(obj, {
        include: ['name', 'description', 'author', 'date', 'version', 'keywords'],
        truncate: true,
        config: {
            name: { maxWidth: 40, truncateMarker: '>' },
            description: { maxWidth: 40 },
            author: { maxWidth: 20 },
            date: { maxWidth: 11 },
            version: { maxWidth: 11 },
            keywords: { maxWidth: 20 }
        }
    }));
    output.write('\nFound packages: ' + obj.length + '\n');
    output.end();
}

function makeReporter(output) {
    var all = [];

    return es.through(function write(data) {
        all.push(data);
    }, function end() {
        nice_output(all, output);
    });
}

module.exports = makeReporter;
