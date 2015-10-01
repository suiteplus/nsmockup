'use strict';
var vmAddFile = require('./src/add-file');

// workaround to 'require' works in vm.runInThisContext
global.require = require;
// add window
global.window = {
    console: global.console
};
vmAddFile(__dirname + '/nsapi-doc.js');

// load Netsuite functions and objects
var glob = require('glob'),
    files = glob.sync(__dirname + '/lib/**/*.js');
for (let i = 0; i < files.length; vmAddFile(files[i++]));

global.$GLOBAL_VARS = global.$GLOBAL_VARS || Object.keys(global).concat(['$GLOBAL_VARS', '$db', '$GLOBAL_REM']);
global.$GLOBAL_REM = global.$GLOBAL_REM || [];

/**
 *
 */
exports.init = require('./src/init');

/**
 *
 */
exports.destroy = require('./src/destroy');

/**
 *
 */
exports.addScript = vmAddFile;

/**
 * Suitelets are extensions of the SuiteScript API that give developers the ability to build custom NetSuite pages and backend logic. Suitelets are server-side scripts that operate in a request-response model. They are invoked by HTTP GET or POST requests to system generated URLs.
 *
 */
exports.createSuitelet = require('./src/ss-basic');

/**
 * You can invoke a RESTlet via an HTTP request to a system-generated URL. RESTlets send and receive content in a request-response model using HTTP verbs, HTTP headers, HTTP status codes, URLs, and standard data formats.
 *
 * @type {createScript}
 */
exports.createRESTlet = require('./src/ss-basic');

/**
 * Scheduled scripts run on the NetSuite server.
 *
 */
exports.createSchedule = require('./src/ss-basic');

/**
 * User event scripts are executed on the NetSuite server. They are executed when users perform certain actions on records, such as create, load, update, copy, delete, or submit. Most standard NetSuite records and custom record types support user event scripts.
 *
 */
exports.createUserEvent = require('./src/ss-user-event');