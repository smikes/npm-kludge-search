'use strict';

function complete(db, opts, done) {
    var start = opts.complete,
        end = start + String.fromCharCode(0x10FFFF),
        reporter = opts.reporter;

    db.findRange(start, end, function (err, val) {
        /*jslint unparam: true*/
        reporter.write(val);
    }, function () {
        reporter.end();
        done();
    });
}

module.exports = complete;
complete.useDb = true;
