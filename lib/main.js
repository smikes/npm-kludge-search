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
        "default": require('./searchDb')
    },
    known = {
        "db": path,
        "name": String,
        "author": String,
        "version": Boolean,
        "reporter": ["slow", "fast", "json", "write"],
        "complete": String,
        "script": Boolean,
        "help": Boolean
    };

function getReporter(r) {
    var opts = this,
        makeReporter;

    r = opts.reporter || r || 'write';
    makeReporter = require('./reporters/' + r);

    opts.reporter = makeReporter(process.stdout);

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

function main(args, done) {
    // deal with EPIPE
    process.stdout.on('error', done);

    var opts = getOptions(args),
        cmd = getCommand(opts);

    opts.getReporter(cmd.reporter);

    if (!cmd.useDb) {
        cmd(opts, done);
    } else {
        getDb(opts.db, function (err, db) {
            if (err) {
                console.error("ERR: " + err.message);
                // exit process with stacktrace
                return done(err);
            }

            cmd(db, opts, done);
        });
    }
}

module.exports = main;
