"use strict";
// get https://registry.npmjs.org/-/all

//   data.words = [ data.name ]
//               .concat(data.description)
//               .concat(data.maintainers)
//               .concat(data.url && ("<" + data.url + ">"))
//               .concat(data.keywords)
//               .map(function (f) { return f && f.trim && f.trim() })
//               .filter(function (f) { return f })
//               .join(" ")
//               .toLowerCase()

var populateDb = require('./populateDb'),
    columnify = require('columnify'),
    sprintf = require('sprintf-js').sprintf,
    getDb = require('./getDb');

function nice_output(obj) {
    console.log(columnify(obj, {
        include: ["name", "description", "author", "date", "version", "keywords"]
      , truncate: true
      , config: {
          name: { maxWidth: 40, truncateMarker: ">" }
        , description: { maxWidth: 40 }
        , author: { maxWidth: 20 }
        , date: { maxWidth: 11 }
        , version: { maxWidth: 11 }
        , keywords: { maxWidth: 20 }
      }
     }));

}

function search_db(arg1, arg2) {

    getDb('npmdb.sqlite', function (err, db) {
        var all = [];
        db = populateDb(db);

        if (arg1 === '--name') {
            // search name
        } else if (arg1 === '--author') {
            // search author
        } else {
            // full test search
            db.findFTS(arg1, function (err, obj) {
                all.push(obj);
            }, function () {
                nice_output(all);
                console.log("Found: %j packages", all.length);
            });
        }
    });
}

module.exports = search_db;
