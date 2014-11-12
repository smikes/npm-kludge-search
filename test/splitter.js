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

    it("splits json", function (done) {
        var s = new Splitter();

        s.on("data", function (object) {
            if (object.name === "0") {
                done();
            }
        });

        s.write('{"_updated":1415071799733,"0":{}}"');
    });
});
