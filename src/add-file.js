'use strict';

var fs = require('fs'),
    vm = require('vm'),
    vmInclude = function (code, path) {
        vm.runInThisContext(code, path);
    };

module.exports = (path) => {
    vmInclude(fs.readFileSync(path), path);
};
