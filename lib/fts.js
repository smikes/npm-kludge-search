'use strict';

var authors = require('./authors');

function angleize(thing) {
    return thing && ('<' + thing + '>');
}

function fts(obj) {
    var words = [ obj.name ]
            .concat(authors(obj.maintainers))
            .concat(angleize(obj.url))
            .concat(obj.keywords)
            .concat(obj.description)
            .map(function (w) { return w && w.trim && w.trim(); });

    return words.join(' ');
}

module.exports = fts;
