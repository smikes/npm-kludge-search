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

function search(needle) {

    var re = new RegExp(needle),
        path = require('path'),
        fs = require('fs'),
        eachPackage = require('../lib/eachPackage'),
        s = fs.createReadStream(path.resolve(__dirname, "..", "npm-all-cache.json"))

    eachPackage(s, function (obj) {
        if (obj.name && re.test(obj.name)) {
            console.log(obj.name + "  " + (obj.description && obj.description.substr(0, 50)))
        } else if (!obj.name) {
            console.log(obj)
        }
    });
}

module.exports = search;
