'use strict';

var Hoek = require('hoek');
var authors = require('./authors');

function trimit(w) {
    return w && w.trim && w.trim();
}

function fts(obj) {
    var words = [ obj.name ]
            .concat(obj.keywords)
            .concat(obj.description);

    words = words.join(' ')
        .split(/(\s|[\.-\/\\!=])+/);

    words = words.concat(authors(obj.maintainers));

    words = Hoek.unique(words);

    return words.join(' ');
}

module.exports = fts;

fts.trimit = trimit;

