'use strict';

var Hoek = require('hoek');
var authors = require('./authors');

function angleize(thing) {
    return thing && ('<' + thing + '>');
}

function trimit(w) {
    return w && w.trim && w.trim();
}

function fts(obj) {
    var words = [ obj.name ]
            .concat(authors(obj.maintainers))
            .concat(angleize(obj.url))
            .concat(obj.keywords)
            .concat(obj.description)
            .map(trimit);

    words = Hoek.unique(words);
}

module.exports = fts;

fts.angleize = angleize;
fts.trimit = trimit;

