'use strict';

function version(opts, done) {
    var p = require('../package.json'),
        r = opts.reporter;

    r.write('npm-kludge-search@' + p.version);
    r.end();

    done();
}

module.exports = version;
