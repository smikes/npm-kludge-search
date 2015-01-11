'use strict';

var JSONStream = require('JSONStream'),
    es = require('event-stream');

module.exports = function eachPackage(stream, f) {
    /*jslint stupid:true*/
    stream.pipe(JSONStream.parse('*'))
        .pipe(es.mapSync(f));
};
