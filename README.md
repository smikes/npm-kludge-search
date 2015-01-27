npm-kludge-search
=================

Kludgy fast search

## To Use

Right now to make this work:

### Install this module

```
npm i npm-kludge-search
cd ./node-modules/npm-kludge-search
```

### Build the index

You need to download the registry `all` endpoint and process it into a
full-text-search index.  This process takes 3-4 minutes (downloading a
60+MB file 2-3 mins, building index 30s).

There is a script to automate this; it requires `curl` and `zip`
commands to be present.

```
$ ./build-zip.sh
```

### Search

This module registers a bin script via `package.json`.





### Get a snapshot of the npm registry index

```
$ curl https://registry.npmjs.org/-/all > npm-all-cache.json
```

This is >60 MB, so it takes a while to download.

### Build a database

```
$ node ./bin/populate.js [--db <name> || npmdb.pft] [--from <source-json> || npm-all-cache.json]
```

To build a one-file (zip-compressed) database, use the `build-zip.sh` script.

### Search the database

```
$ node ./bin/search-db.js [--db <name> || npmdb.pft] <term>
```

The search term is matched against name and substring-matched in description.

### TODO

Pure-fts is reasonably fast now, because all three main data tables (keys, values, fts) are indexed, and only the index is loaded at startup.

Support for passing module-name completion lists to `npm`.

Better documentation, more command-line options.

An author index.  (This may not be needed, as searching for `=name` works pretty well.).

More than one output method.  The records are being retrieved from `Purefts` as objects, so a JSON reporter would be trivial.  Columns is what we get now.  CSV, others?

Maybe add more control over what is / is not removed from the `all` file when indexing.

Test coverage is reported as 100% because the `bin`-like modules populateDb and searchDb are not included in coverage stats.  Exceptional conditions tend to be uncovered.
