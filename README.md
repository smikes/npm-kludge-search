npm-kludge-search
=================

Kludgy fast search

## To Use

Right now you need to do a fair bit of manual work to make this function.

### Get a snapshot of the npm registry index

```
$ curl https://registry.npmjs.org/-/all > npm-all-cache.json
```

This is >60 MB, so it takes a while to download.

### Search the json file

```
$ node . <name-regex>
```

This is a regex applied to name.

### Build an sqlite database

```
$ node ./bin/populate.js [<name> || npmdb.sqlite]
```

### Search the sqlite database

```
$ node ./bin/search-db.js <term>
```

The search term is full-text matched using sqlite3 `match` over all of (name,
description, author, keywords).