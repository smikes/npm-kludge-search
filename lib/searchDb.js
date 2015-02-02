'use strict';

var populateDb = require('./populateDb'),
    getDb = require('./getDb');

function searchDb(db, opts, done) {
    var reporter = opts.reporter;

    function each_result(err, obj) {
        if (err) {
            console.error("ERR: " + err.message);
            // exit process with stacktrace
            throw err;
        }

        reporter.write(obj);
    }

    function results_done() {
        reporter.end();
        done();
    }

    if (opts.name) {
        db.get(opts.name, function (err, val) {
            each_result(err, val);
            setImmediate(results_done);
        });
    } else {
        // full text search
        db.search(opts.argv.remain[0], each_result, results_done);
    }
}

module.exports = searchDb;
