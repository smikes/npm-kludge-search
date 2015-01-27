#!/bin/sh
set -e

echo
echo "Checking for registry snapshot."
sleep 1

if [ ! -e "npm-all-cache.json" ] ; then

    echo
    echo "Not found; downloading registry snapshot (about 70MB, 3min)..."
    echo
    curl --compressed https://registry.npmjs.org/-/all > npm-all-cache.json
else
    echo
fi

echo "Cleaning up old full text search index (npmdb.pft)."
echo
rm -fr npmdb.dir npmdb.pft

echo "Populating full text search (about 30s)..."
npm run populate -- -d npmdb.dir

echo "Compressing to zip file..."
(cd npmdb.dir && zip -qr npmdb.pft data)

echo "Cleaning up..."
mv npmdb.dir/npmdb.pft .
rm -fr npmdb.dir

echo "Done!"
