"use strict";

function angleize(thing) {
    return thing && ("<" + thing + ">");
}

function fts(obj) {
    var words = [ obj.name ]
            .concat(obj.author)
            .concat(obj.maintainers)
            .concat(angleize(obj.url))
            .concat(obj.keywords)
            .concat(obj.description)
            .map(function (w) { return w && w.trim && w.trim(); });
            
    return words.join(" ");
}

module.exports = fts;
