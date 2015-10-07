'use strict';
var fs = require('fs'),
    path = require('path'),
    vm = require('vm'),
    ssParams = require('./suite-script/utils/ss-params'),
    $context = vm.createContext(global), // default context to nsmockup
    vmInclude = function (code, path, ctx) {
        let script = vm.createScript(code, path);
        script.runInContext(ctx || $context);
    };

var NS_IMPORTS = [];

/**
 * Import NetSuite functions and add in global context.
 *
 * @param path {string} file path of nsmockup implementation.
 * @return {void}
 */
exports.import = (path) => {
    let lib = require(path);
    Object.keys(lib).forEach(nsFunc => {
        // add import reference
        !~NS_IMPORTS.indexOf(nsFunc) && NS_IMPORTS.push(nsFunc);
        // verify if this function was imported before
        let desc = Object.getOwnPropertyDescriptor($context, nsFunc);
        if (desc) return;

        Object.defineProperty($context, nsFunc, {
            enumerable: false,
            configurable: false,
            value: lib[nsFunc]
        });
    });
};

/**
 * Load Script Configuration in other context.
 *
 * @param scriptName {string} name of script, example: "customscript_my_suitelet".
 * @returns {{context: {}, files: [string]}}
 */
exports.loadScriptConfig = (scriptName) => {
    let $scripts = $context.$db.$scripts;
    if (!$scripts[scriptName]) {
        let nsFuncDefaults = NS_IMPORTS.concat(['$db']),
            context = {console, require, module, exports};
        // create context from $context
        for (let n=0; n<nsFuncDefaults.length; n++) {
            let nsFunc = nsFuncDefaults[n];
            context[nsFunc] = $context[nsFunc];
        }
        // create Script Configuration in new context
        $scripts[scriptName] = {
            context: vm.createContext(context),
            files: []
        };
    }
    return $scripts[scriptName];
};


exports.createScript = (script) => {
    if (!script && !script.name) {
        throw new Error('invalid script ... I liked scripts with a name!!!');
    }

    let cfg = exports.loadScriptConfig(script.name),
        context = cfg.context,
        files = script.files || [];

    // load files
    for (let i=0; i<files.length; i++) {
        let file = path.resolve(files[i]);
        // verify if the file was cached
        if (!~cfg.files.indexOf(file)) {
            exports.addScript(file, context);
            cfg.files.push(file);
        }

    }

    // load params configurations
    ssParams.load(script.params, context);

    return context;
};

exports.addScript = (file, ctx) => {
    let file_ = path.resolve(file),
        code = fs.readFileSync(file_);
    vmInclude(code, file_, ctx);
};