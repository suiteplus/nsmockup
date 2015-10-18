'use strict';
var vmSim = require('../../src/vm-sim'),
    ssParams = require('../../src/suite-script/utils/ss-params');

/**
 * Queue a scheduled script for immediate execution and return the status QUEUED if successfull.
 * @restriction Server SuiteScript only
 * @governance 20 units
 *
 * @param {string, int}	id script ID or internal ID of scheduled script
 * @param {string, int} [deployment] script ID or internal ID of scheduled script deployment. If empty, the first "free" deployment (i.e. status = Not Scheduled or Completed) will be used
 * @param {Object} 		parameters Object of parameter name->values used in this scheduled script instance
 * @return {string}	QUEUED or null if no available deployments were found or the current status of the deployment specified if it was not available.
 *
 * @since 2008.1
 */
exports.nlapiScheduleScript = (id, deployment, parameters) => {
    //console.log(`NS >> Schedule Script "${id}" => "${deployment}"`);
    // TODO add generalConfig for async execution
    let db = global.$db,
        script;

    if (typeof id === 'number' || !isNaN(parseInt(id))) {
        if (typeof id !== 'number') {
            id = parseInt(id);
        }
        script = db.object.__scripts[id - 1];
    } else {
        let scripts = db('__scripts');
        script = scripts.chain().where({name: id, type: 'schedule'}).value();
    }
    if (!script) {
        throw nlapiCreateError('SSS_INVALID_SCRIPT_ARG', `not found ScheduleScript with name or id: "${id}"`);
    } else {
        if (Array.isArray(script)) script = script[0];

        let execFunc;
        if (script.funcs && method) {
            execFunc = script.funcs[method];
        } else {
            execFunc = script.func;
        }
        // load libs in specific context
        let context = vmSim.importSuiteScript(script);

        // load params configurations
        ssParams.load(parameters, context);

        // execute script on his context
        vmSim.evalContext(execFunc + '()', context);
    }

    return 'QUEUED';
};
