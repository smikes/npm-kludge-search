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
            if (object.name === "_updated") {
                assert.equal(object.value, 1415071799733);
            }
            if (object.name === "0") {
                assert.deepEqual(object.value, {});
            }
        });

        s.on("end", function () {
            done();
        });

        s.write('{"_updated":1415071799733,"0":{}}"');
        s.end();
    });
});
