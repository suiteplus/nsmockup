'use strict';
var fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
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

$context.$$CURRENT_AUTH = {};
$context.$$GENERAL_PREFS = {};

/**
 * Import NetSuite functions and add in global context.
 *
 * @param path {string} file path of nsmockup implementation.
 * @return {void}
 */
exports.importNsApi = (path, ctx) => {
    //console.log(Object.keys(require.cache));
    let context = ctx || $context,
        lib = context.require(path),
        hookFn = lib.$$hook === true;

    Object.keys(lib).forEach(nsFunc => {
        if (nsFunc === '$$hook') return;

        // verify if this function was imported before
        let desc = Object.getOwnPropertyDescriptor(context, nsFunc);
        if (desc) return;

        let fn = lib[nsFunc];
        Object.defineProperty(context, nsFunc, {
            enumerable: false,
            configurable: false,
            value: (hookFn ? fn(context) : fn)
        });
    });
};

exports.importAllNsApi = (ctx) => {
    var files = glob.sync(__dirname + '/../lib/ns*/**/*.js');

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
        let context = vm.createContext({console, require, module, exports, window});
        context.$db = $context.$db;
        context.global = context;
        context.$$THIS_CONTEXT = scriptName;
        context.$$GENERAL_PREFS = $context.$$GENERAL_PREFS;
        context.$$CURRENT_AUTH = $context.$$CURRENT_AUTH;

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
 *    code: string,
 *    files: [string | [string]],
 *    params: {}
 * }}
 * @returns {} his context.
 */
exports.importSuiteScript = (script) => {
    if (!script && !script.code) {
        throw new Error('invalid script ... I liked scripts with a code!!!');
    }

    let cfg = exports.loadScriptConfig(script.code),
        context = cfg.context,
        files = script.files || [],
        libs = {},
        refAlias = {};

    context.nsRequire = (libReq) => {
        return (mod) => {
            let alias = libReq[mod];
            return (alias && context[alias]) || require(mod);
        };
    };

    const requireRe = /require\(\s*['"]([^'")]*)['"]\s*\)/g;
    let nsify = (content, alias, libReq) => {
            let pre = `var ${alias} = (function(require, module, exports){`,
                lstr = JSON.stringify(libReq),
                pos = `\nreturn module.exports || exports;})(nsRequire(${lstr}), {}, {});`;
            return new Buffer(`${pre}${content}${pos}`);
        },
        findRequire = (dir, alias, libReq) => {
            let count = 0;
            return (orig, mod) => {
                let modPath = `${dir}/${mod}`;
                !fs.existsSync(modPath) && ['.js', '.json'].forEach(ext => {
                    if (fs.existsSync(`${modPath}${ext}`)) {
                        modPath += ext;
                    }
                });

                let file = path.resolve(modPath);
                if (fs.existsSync(file)) {
                    let code = fs.readFileSync(file),
                        content = code.toString(),
                        _dir = path.dirname(file),
                        _alias = `${alias}$${count++}`,
                        _libReq = {};
                    libReq[mod] = _alias;
                    content.replace(requireRe, findRequire(_dir, _alias, _libReq));

                    if (libs[file]) {
                        let orgAlias = refAlias[file],
                            _file = `${file}${_alias}`;
                        libs[_file] = new Buffer(`var ${_alias} = ${orgAlias}`);
                    } else {
                        libs[file] = nsify(content, _alias, _libReq);
                        refAlias[file] = _alias;
                    }
                }
                return orig;
            };
        };

    // load files
    for (let i = 0; i < files.length; i++) {
        let line = files[i],
            isArray = Array.isArray(line),
            file = path.resolve(isArray ? line[0] : line),
            code = fs.readFileSync(file);
        // verify if the file was cached
        if (!~cfg.files.indexOf(file)) {
            cfg.files.push(file);

            if (isArray && line.length > 1) {
                let dir = path.dirname(file),
                    alias = line[1],
                    libReq = {},
                    content = code.toString();
                content.replace(requireRe, findRequire(dir, alias, libReq));
                libs[file] = nsify(code, alias, libReq);
            } else {
                libs[file] = code;
            }
        }
    }

    let lkeys = Object.keys(libs);
    for (let i=0; i<lkeys.length; i++) {
        let file = lkeys[i],
            code = libs[file];
        vmInclude(code, file, context);

        // add JavaScript to File Cabinet
        let fileName = path.basename(file),
            filejs = nlapiCreateFile(fileName, 'JAVASCRIPT', code);
        nlapiSubmitFile(filejs);
    }

    // load params configurations
    ssParams.load(script.params, context);

    return context;
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
        for (let a = 0; a < args.length; a++) {
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