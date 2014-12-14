"use strict";
// get https://registry.npmjs.org/-/all


function search(needle) {

    var re = new RegExp(needle),
        path = require('path'),
        fs = require('fs'),
        eachPackage = require('../lib/eachPackage'),
        s = fs.createReadStream(path.resolve(__dirname, '..', 'npm-all-cache.json'));

    eachPackage(s, function (obj) {
        if (obj.name && re.test(obj.name)) {
            console.log(obj.name + '  ' + (obj.description && obj.description.substr(0, 50)));
        } else if (!obj.name) {
            console.log(obj);
        }
    });
}

module.exports = search;
