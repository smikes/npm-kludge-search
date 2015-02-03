'use strict';

var main = require('../lib/main');

var name = require('../lib/name');
var search = require('../lib/search');
var script = require('../lib/script');

var makeNullReporter = require('../lib/reporters/null');

var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('main', function () {

    it('can produce help', function (done) {
        main(['node', 'search.js', '--help', '--reporter', 'null'], function () {
            done();
        });
    });

    describe('getReporter', function () {
        it('has a default of "write"', function (done) {
            var opts = { getReporter: main.getReporter },
                target = makeNullReporter();

            opts.getReporter(undefined, target);

            expect(opts.rep).to.equal('write');

            target.on('end', function () {
                expect(target.res).to.deep.equal(['foo\n']);
                done();
            });

            opts.reporter.write('foo');
            opts.reporter.end();
        });

        it('has default that can be overridden by cmd', function (done) {
            var opts = { getReporter: main.getReporter },
                target = makeNullReporter();

            opts.getReporter('json', target);

            expect(opts.rep).to.equal('json');

            target.on('end', function () {
                expect(target.res).to.deep.equal(['"foo"\n']);
                done();
            });

            opts.reporter.write('foo');
            opts.reporter.end();
        });

        it('cmd can be overridden by user cmd', function (done) {
            var opts = {
                reporter: 'json',
                getReporter: main.getReporter
            },
                target = makeNullReporter();

            opts.getReporter('slow', target);

            expect(opts.rep).to.equal('json');

            target.on('end', function () {
                expect(target.res).to.deep.equal(['"foo"\n']);
                done();
            });

            opts.reporter.write('foo');
            opts.reporter.end();
        });
    });

    describe('getOptions', function () {
        it('has default db', function (done) {

            var opts = main.getOptions([]);

            expect(opts.db).to.match(/npm-kludge-search\/npmdb[.]pft/);
            done();
        });

        it('default db can be overridden', function (done) {

            var opts = main.getOptions(['node', 'search.js', '--db', 'foo.pft']);

            expect(opts.db).to.match(/foo[.]pft/);
            done();
        });

    });

    describe('getCommand', function () {
        it('identifies command when set', function (done) {
            var cmd = main.getCommand({name: 'foo'});

            expect(cmd).to.equal(name);
            done();
        });

        it('returns search when no command set', function (done) {
            var cmd = main.getCommand({});

            expect(cmd).to.equal(search);
            done();
        });
    });

    describe('runCommand', function () {
        it('avoids db when not required', function (done) {

            var save,
                opts = {},
                cmd = function (a, d) {
                    save = a;
                    d();
                };

            main.runCommand(cmd, opts, function () {
                expect(save).to.equal(opts);
                done();
            });
        });

        it('loads db when required', function (done) {

            var save,
                opts = { db: './fixtures/test.pft' },
                cmd = function (b, a, d) {
                    save = [b, a];
                    d();
                };
            cmd.useDb = true;

            main.runCommand(cmd, opts, function () {
                expect(save[1]).to.equal(opts);
                done();
            });
        });

    });
});

describe('script', function () {
    it('writes out the nks completion script', function (done) {

        var opts = { getReporter: main.getReporter, script: true },
            cmd,
            target = makeNullReporter();

        cmd = main.getCommand(opts);
        opts.getReporter(cmd.reporter, target);

        expect(opts.rep).to.equal('write');

        target.on('end', function () {
            expect(target.res[0]).to.match(/nks-completion/);
            expect(target.res.length > 10);
        });

        main.runCommand(cmd, opts, done);
    });
});

describe('version', function () {
    it('writes out the nks script', function (done) {

        var opts = { getReporter: main.getReporter, version: true },
            cmd,
            target = makeNullReporter();

        cmd = main.getCommand(opts);
        opts.getReporter(cmd.reporter, target);

        expect(opts.rep).to.equal('write');

        target.on('end', function () {
            expect(target.res[0]).to.match(/npm-kludge-search@/);
        });

        main.runCommand(cmd, opts, done);
    });
});

describe('withDb', function () {
    it('handles early error', function (done) {
        main.withDb(function (name, cb) {
            /*jslint unparam:true*/
            cb(new Error('test error'));
        }, {}, null, function (err) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).match(/test error/);
            done();
        });
    });
});
