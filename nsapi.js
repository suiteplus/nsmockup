'use strict';
var vmSim = require('./src/vm-sim');

// load node-uuid before create window property in global
require('uuid');

var moment = require('moment');
moment.createFromInputFallback = function(config) {
    // unreliable string magic, or
    config._d = new Date(config._i);
};

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

exports.importSuiteScript = vmSim.importSuiteScript;

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

exports.createSuiteScript = (type, opt, cb) => {
    switch(type) {
        case 'client':
        case 'mass-update':
        case 'portlet':
        case 'workflow':{
            throw `Cannot simulate "${type}" in nsmockup yeat!`;
        }
        case 'restlet': {
            exports.createRESTlet(opt, cb);
            break;
        }
        case 'schedule': {
            exports.createSchedule(opt, cb);
            break;
        }
        case 'suitelet': {
            exports.createSuitelet(opt, cb);
            break;
        }
        case 'user-event': {
            exports.createUserEvent(opt, cb);
            break;
        }
        default: {
            throw `Invalid SuiteScript type: ${type}`;
        }
    }
};