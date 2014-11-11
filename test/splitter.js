"use strict";
/*globals describe, it */

var assert = require("assert"),
    Splitter = require("../lib/splitter");

describe("json splitter", function () {
    it("runs a test", function () {
        assert.equal(1 + 2, 3);
    });

    it("creates a splitter", function () {
        var s = new Splitter();

        assert.ok(s);
    });
});
