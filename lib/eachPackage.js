"use strict";
/*jslint stupid:true*/

var JSONStream = require('JSONStream'),
    es = require('event-stream');

function eachPackage(stream, f) {
    stream.pipe(JSONStream.parse('*'))
        .pipe(es.mapSync(f));
}

module.exports = eachPackage;
