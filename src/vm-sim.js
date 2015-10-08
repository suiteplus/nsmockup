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

$context.$$THIS_CONTEXT = 'global';
$context.$$THIS_RECORD = null;
$context.$db = null;

/**
 * Import NetSuite functions and add in global context.
 *
 * @param path {string} file path of nsmockup implementation.
 * @return {void}
 */
exports.importNsApi = (path, ctx) => {
    let context = ctx || $context,
        lib = require(path);
    Object.keys(lib).forEach(nsFunc => {
        // verify if this function was imported before
        let desc = Object.getOwnPropertyDescriptor(context, nsFunc);
        if (desc) return;

        Object.defineProperty(context, nsFunc, {
            enumerable: false,
            configurable: false,
            value: lib[nsFunc]
        });
    });
};

exports.importAllNsApi = (ctx) => {
    var glob = require('glob'),
        files = glob.sync(__dirname + '/../lib/ns*/**/*.js');
    for (let i = 0; i < files.length; i++) {
        let file = path.resolve(files[i]);
        exports.importNsApi(file, ctx);
    }
    exports.importNsApi(path.resolve(__dirname + '/../nsapi-def.js'), ctx);
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
        let context = vm.createContext({console, require, module, exports});
        context.$db = $context.$db;
        context.global = context;
        context.$$THIS_CONTEXT = scriptName;

        //let database = require('./database');
        //database.load(db => context.$db = db);

        // load Netsuite functions and objects
        exports.importAllNsApi(context);

        // create Script Configuration in new context
        $scripts[scriptName] = {
            context: context,
            files: []
        };
    }
    return $scripts[scriptName];
};

/**
 * Import script code on speficic context in VM.
 *
 * @param script {{
 *    name: String,
 *    files: [String],
 *    params: {}
 * }}
 * @returns {} his context.
 */
exports.importSuiteScript = (script) => {
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

var execCount = 0;
/**
 * Execute a function in specific context.
 *
 * @param code {string} simple function.
 * @param [ctx] {object} context. If null, use the global context.
 */
exports.evalContext = (code, ctx) => {
    if (!code) {
        throw new Error('code cannot be empty');
    }
    vmInclude(code, `executeScript-${execCount}.js`, ctx || $context);
};

exports.createInvokeFunction = (ctx) => {
    ctx.$$RESULT = null;
    return (name, args) => {
        args = args ? Array.isArray(args) ? args : [args] : [];
        let codeArgs = [];
        for (let a=0; a<args.length; a++) {
            let codeArg = `$$ARG$${a}`;
            ctx[codeArg] = args[a];
            codeArgs.push(codeArg);
        }
        let code = `$$RESULT = ${name}(${codeArgs.join(',')})`;

        // execute function
        exports.evalContext(code, ctx);
        return ctx.$$RESULT;
    };
};