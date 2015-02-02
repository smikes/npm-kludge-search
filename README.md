npm-kludge-search
=================

Kludgy fast search of `npm` registry

## INSTALLATION

```
$ npm i -g npm-kludge-search
```

Please be patient -- downloading and building the index takes 3-4 minutes.

## COMPLETION (experimental)

You can get completion over package names.  This feature is experimental and only
works for `bash` shell at present.

```
$ . <(npm-kluge-search --script)
$ ni grunt-fi<TAB>
```

This should show you all 67 possibilities, from `grunt-figlet` to `grunt-fixtures2js`.

The alias `ni` is short for `npm install`.  Making completion work for
subcommands of `npm` is tricky; this is just a proof of concept.

### Troubleshooting completion

The syntax `. <(cmd)` does not work with `bash 3.2`, which is the standard shell
on OSX.  If you have `brew`, you can get a newer version of bash:

```
$ brew install bash
$ exec bash -l
$ echo $BASH_VERSION
4.3.33(1)-release
```

## USE

Now you have fast local searching.  For example, here is a worst-case
search, where the entire index is searched in order to find a non-indexed
substring, and only a single hit is returned:

```
$ time npm-kludge-search kludge
NAME              DESCRIPTION              AUTHOR  DATE       VERSION KEYWORDS         
npm-kludge-search Kludgy fast npm searcher =smikes 2015-01-27 2.5.0   npm, search, fast
Found: 1 packages

real	0m1.026s
```

### Searching for a specific module by name

Use `-n` to search for a specific module by name.  Exact match only.

```
$ time npm-kludge-search -n npm-kludge-search
NAME              DESCRIPTION              AUTHOR  DATE       VERSION KEYWORDS         
npm-kludge-search Kludgy fast npm searcher =smikes 2015-01-27 2.5.0   npm, search, fast
Found: 1 packages

real	0m0.302s
```

### Full-text searching

The full text index includes package names, descriptions, keywords,
and the author fields.  Only one search term is supported, and there
is no stemming or other fancy stuff (as yet).

To find out how many modules mention food:
```
$ time npm-kludge-search food |wc
      28     322    3411

real	0m0.309s
```

Unicode characters work, provided your terminal supports them:
```
$ time npm-kludge-search 目 |wc
      53     364    7860

real	0m0.930s
```

On my machine indexed searches run about 0.5s and full table scans run 1-2s.

### Searching by author

There isn't an explicit author index, but because of the convention of
prefixing author names with `=`, we can fake it pretty easily:

```
$ time npm-kludge-search =substack |wc
     473    5365   67151

real	0m0.584s
```

### Reporters

There are currently three reporters: `slow` (the default), `fast`, and `json`.

The `slow` reporter waits until all the results are returned and then formats
them nicely in a table using `columnify`.

The `fast` reporter emits a line at a time in fixed format.  Paradoxically, it
is slightly slower than the `slow` reporter.

The `json` reporter emits a stream of unformatted `JSON` objects.

### Advanced Search: Boolean Operators & Regular Expressions

Not implemented yet.

## MAINTENANCE/DEVELOPMENT

### Rebuilding the index with fresh data

Simplest to uninstall/reinstall the module --

```
npm u -g npm-kludge-search
npm i -g npm-kludge-search
```

### Manually rebuilding the index

```
cd $(dirname `which npm-kludge-search`)/../lib/node_modules/npm-kludge-search
rm -fr npm-all-cache.json npmdb.pft
./build-zip.sh
```

### Get a snapshot of the npm registry index

```
$ curl https://registry.npmjs.org/-/all > npm-all-cache.json
```

This is >60 MB, so it takes a while to download.

### Build a database

```
$ node ./bin/populate.js [--db <name> || npmdb.pft] [--from <source-json> || npm-all-cache.json]
```

This builds an uncompressed (directory) index; to build a one-file
(zip-compressed) database, see the `build-zip.sh` script.

### Search the database

```
$ node ./bin/search-db.js [--db <dbfile> || npmdb.pft] [--reporter <rep> || slow] [--name <name> || <term>]
```

If `--name` (or `-n`) is specified, only an exact name search is performed.

Otherwise, the search `term` is checked against name and substring-matched in description.

### BUGS

Sometimes duplicate results are displayed.  Believed fixed as of 2.5.0.

### TODO

(Some of these are features on `pure-fts`, but all are listed here for
simplicity.)

Support for passing module-name completion lists to `npm`.  This will
require returning a range of values from `keys`.

Faster startup by only loading the indexes that are needed.

More tests, especially performance test so we can detect performance
regressions.

More tests of Unicode characters.

Pre-cook the `npmdb.fts` and distribute it via CDN.

Pure-fts is reasonably fast now, because all three main data tables
(keys, values, fts) are indexed, and only the index is loaded at
startup.

Search is currently case-sensitive; it should not be.

Regexp search is not supported.

Better documentation, more command-line options.

An author index.  (This may not be needed, as searching for `=name`
works pretty well.).

When populating index, use streaming JSON.stringify and compression.

Streaming output (currently all results are collected and analyzed to
choose correct column widths)

Other reporters. CSV? Others?

Maybe add more control over what is / is not removed from the `all`
file when indexing.

Test coverage is incorrectly reported as 100% because the `bin`-like
modules populateDb and searchDb are not included in coverage stats.
Exceptional conditions tend to be uncovered.
