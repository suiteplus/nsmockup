'use strict';

var fs = require('fs'),
    vm = require('vm'),
    context = vm.createContext(global),
    vmInclude = function (code, path) {
        //let script = vm.createScript(code, path);
        //script.runInContext(context);
        vm.runInThisContext(code, path);
    };

//exports.newContext = () => {
//    console.log('new context');
//    context = vm.createContext(global);
//};

exports.addScript = (path) => {
    vmInclude(fs.readFileSync(path), path);
};

exports.import = (path) => {
    let lib = require(path);
    Object.keys(lib).forEach(f => {
        let desc = Object.getOwnPropertyDescriptor(context, f);
        if (desc) return;

        Object.defineProperty(context, f, {
            enumerable: false,
            configurable: false,
            value: lib[f]
        });
    });
};