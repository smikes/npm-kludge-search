'use strict';

var getDb = require('./getDb');

function name(db, opts, done) {
    if (opts.rep === 'write') {
        opts.getReporter('slow');
    }
    var reporter = opts.reporter;

    function results_done() {
        reporter.end();
        done();
    }

    db.get(opts.name, function (err, val) {
        if (err) {
            return results_done();
        }

        reporter.write(val);
        setImmediate(results_done);
    });
}

module.exports = name;
name.useDb = true;
name.reporter = 'slow';
