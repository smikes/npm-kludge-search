"use strict";

var stream = require('stream'),
    util = require('util'),
    Splitter;

Splitter = function Splitter_constructor() {
    stream.Transform.call(this, {objectMode: true});

};
util.inherits(Splitter, stream.Transform);

function Splitter_transform(chunk, encoding, callback) {
    console.log(chunk);

    this.push({ name: "_updated", value: 1415071799733 });
    this.push({ name: "0", value: {} });

    callback();
    /*jslint unparam:true */
}

module.exports = Splitter;

/*jslint nomen:true */
Splitter.prototype._transform = Splitter_transform;


