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

### Get a snapshot of the npm registry index

```
$ curl https://registry.npmjs.org/-/all > npm-all-cache.json
```

This is >60 MB, so it takes a while to download.

### Build a database

```
$ node ./bin/populate.js [--db <name> || npmdb.pft] [--from <source-json> || npm-all-cache.json]
```

### Search the database

```
$ node ./bin/search-db.js [--db <name> || npmdb.pft] <term>
```

The search term is matched against name and substring-matched in description.

### TODO

Pure-fts (the pure-js full text search backend) is slow to load up right
now, because it loads the full `values` table.  Its full-text indexing is
unimplemented, so a 'full-text' search currentlly just consists of
substring searching all the descriptions.

Better documentation, more command-line options.

An author index.

More than one output method.  The records are being retrieved from `Purefts` as objects, so a JSON reporter would be trivial.  Columns is what we get now.  CSV, others?

Maybe add more control over what is / is not removed from the `all` file when indexing.

Test coverage is only 95%.  Exceptional conditions tend to be uncovered.
