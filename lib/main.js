'use strict';

var getDb = require('./getDb'),
    path = require('path'),
    nopt = require('nopt'),
    commands = {
        "help": require('./help'),
        "script": require('./script'),
        "version": require('./version'),
        "name": require('./name'),
        "complete": require('./complete'),
        "default": require('./search')
    },
    known = {
        "db": path,
        "name": String,
        "version": Boolean,
        "reporter": ["slow", "fast", "json", "write", "null"],
        "complete": String,
        "script": Boolean,
        "help": Boolean
    };

function getReporter(r, output) {
    var opts = this,
        makeReporter;

    r = opts.reporter || r || 'write';
    makeReporter = require('./reporters/' + r);

    opts.rep = r;
    opts.reporter = makeReporter(output);

    return opts.reporter;
}

function getOptions(argv) {
    /*jslint nomen:true */
    var opts = nopt(known, {}, argv, 2);

    // defaults
    opts.db = opts.db || path.resolve(__dirname, "..", "npmdb.pft");
    opts.getReporter = getReporter;

    return opts;
}

function getCommand(opts) {
    var cmd;

    Object.keys(opts).forEach(function (key) {
        if (commands[key]) {
            cmd = commands[key];
        }
    });

    if (!cmd) {
        cmd = commands.default;
    }

    return cmd;
}

function withDb(getDb, opts, cb, done) {
    getDb(opts.db, function (err, db) {
        if (err) {
            return done(err);
        }

        cb(db, opts, done);
    });
}

function runCommand(cmd, opts, done) {
    if (!cmd.useDb) {
        cmd(opts, done);
    } else {
        withDb(getDb, opts, cmd, done);
    }
}


function main(args, done) {
    // deal with EPIPE
    process.stdout.on('error', done);

    var opts = getOptions(args),
        cmd = getCommand(opts);

    opts.getReporter(cmd.reporter, process.stdout);

    runCommand(cmd, opts, done);
}

module.exports = main;

main.getCommand = getCommand;
main.getOptions = getOptions;
main.getReporter = getReporter;
main.runCommand = runCommand;
main.withDb = withDb;
