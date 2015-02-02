'use strict';

function help(opts, done) {
    var reporter = opts.reporter;

    reporter.write('npm-kludge-search [flags] <term> [...<terms>]');
    reporter.write('');
    reporter.write('  --help             Brief help text');
    reporter.write('  --db       db      Search database <db>');
    reporter.write('  --name     name    Exact search by <name>');
    reporter.write('  --complete prefix  Show completions staring with <prefix>');
    reporter.write('  --script           Output completion shell script');
    reporter.write('  --reporter         Set reporter (slow, fast, json)');
    reporter.write('');

    reporter.end();
    done();
}

module.exports = help;
