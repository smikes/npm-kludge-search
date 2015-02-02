'use strict';

var fs = require('fs');
var path = require('path');

/*jslint nomen:true*/
var shellFile = path.resolve(__dirname, '../nks.sh');
/*jslint nomen:false*/

function script(opts, done) {
    var reporter = opts.reporter;

    fs.readFile(shellFile, {encoding: "utf8"}, function (err, body) {
        reporter.write(String(body));
        reporter.end();
        done(err);
    });
}

module.exports = script;
