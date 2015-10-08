'use strict';
var vmSim = require('./src/vm-sim');

// workaround to 'require' works in vm.runInThisContext
global.require = require;
// add window
global.window = {
    console: global.console
};

// load Netsuite functions and objects
vmSim.importAllNsApi();

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
exports.addScript = vmSim;

/**
 * Suitelets are extensions of the SuiteScript API that give developers the ability to build custom NetSuite pages and backend logic. Suitelets are server-side scripts that operate in a request-response model. They are invoked by HTTP GET or POST requests to system generated URLs.
 *
 */
exports.createSuitelet = require('./src/suite-script/ss-suitelet');

/**
 * You can invoke a RESTlet via an HTTP request to a system-generated URL. RESTlets send and receive content in a request-response model using HTTP verbs, HTTP headers, HTTP status codes, URLs, and standard data formats.
 *
 */
exports.createRESTlet = require('./src/suite-script/ss-restlet');

/**
 * Scheduled scripts run on the NetSuite server.
 *
 */
exports.createSchedule = require('./src/suite-script/ss-schedule');

/**
 * User event scripts are executed on the NetSuite server. They are executed when users perform certain actions on records, such as create, load, update, copy, delete, or submit. Most standard NetSuite records and custom record types support user event scripts.
 *
 */
exports.createUserEvent = require('./src/suite-script/ss-user-event');