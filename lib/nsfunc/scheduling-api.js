'use strict';
var vmSim = require('../../src/vm-sim'),
    ssParams = require('../../src/suite-script/utils/ss-params');

/**
 * Queue a scheduled script for immediate execution and return the status QUEUED if successfull.
 * @restriction Server SuiteScript only
 * @governance 20 units
 *
 * @param {string, int}    id script ID or internal ID of scheduled script
 * @param {string, int} [deployment] script ID or internal ID of scheduled script deployment. If empty, the first "free" deployment (i.e. status = Not Scheduled or Completed) will be used
 * @param {Object}        parameters Object of parameter name->values used in this scheduled script instance
 * @return {string}    QUEUED or null if no available deployments were found or the current status of the deployment specified if it was not available.
 *
 * @since 2008.1
 */
exports.nlapiScheduleScript = (id, deployment, parameters) => {
    //console.log(`NS >> Schedule Script "${id}" => "${deployment}"`, parameters);
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

        // load libs in specific context
        let context = vmSim.importSuiteScript(script);

        // reapply settings
        let params = {},
            preferences = nlapiGetContext().preference;
        [preferences, parameters].forEach(o => {
            o && Object.keys(o).forEach((name) => {
                params[name] = o[name];
            });
        });

        // load params configurations
        ssParams.load(params, context);

        // execute script on his context
        let execFunc = script.func;
        vmSim.evalContext(execFunc + '()', context);
    }

    return 'QUEUED';
};

/**
 * Creates a recovery point saving the state of the script's execution. When NetSuite resumes the execution of
 * the script, it resumes the script at the specified recovery point. Also note that when the script is resumed,
 * its governance units are reset. Be aware, however, all scheduled scripts have a 50 MB memory limit. For
 * complete details on scheduled script memory limits, see Understanding Memory Usage in Scheduled Scripts.
 *
 * @returns {{status: string}}
 */
exports.nlapiSetRecoveryPoint = () => {
    // TODo simulate schedule save point
    return {status: 'SUCCESS'};
};

/**
 * Creates a recovery point and then reschedules the script. The newly rescheduled script has its governance
 * units reset, and is then placed at the back of the scheduled script queue. To summarize, nlapiYieldScript
 * works as follows:
 *  1 - Creates a new recovery point.
 *  2 - Creates a new scheduled script with a governance reset.
 *  3 - Associates the recovery point to the scheduled script
 *  4 - Puts the script at the back of the scheduled script queue.
 *
 * @returns {{status: string}}
 */
exports.nlapiYieldScript = () => {
    // TODO simulate schedule recover point
    return {status: 'SUCCESS'};
};