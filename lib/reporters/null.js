'use strict';

var es = require('event-stream');

function makeReporter() {
    var rep, res = [];

    rep = es.through(function (item) {
        res.push(item);
    });
    rep.res = res;

    return rep;
}

module.exports = makeReporter;
