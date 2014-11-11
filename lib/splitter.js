"use strict";

var stream = require('stream'),
    util = require('util'),
    Splitter;

Splitter = function Splitter_constructor() {
    stream.Transform.call(this);

};
util.inherits(Splitter, stream.Transform);

module.exports = Splitter;

/*jslint nomen:true */



