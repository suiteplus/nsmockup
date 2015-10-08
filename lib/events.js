'use strict';
var ss = require('./suite-script'),
    vmSim = require('../src/vm-sim');

var $events = {};
/**
 * Find User Events attach on Record Type.
 *
 * @param recType {String} ID of Record Type.
 * @param step {'beforeLoad' | 'beforeSubmit' | 'afterSubmit'}
 * @returns {[{scriptName: String, step: String]} scripts names and step.
 */
exports.userEvent = (recType, step) => {
    let scripts = ss.find('user-event', {record: recType}) || [];
    return scripts.filter(script => {
        let event = script.name;
        // cache user events
        if (!$events[event]) $events[event] = script;
        // verify if user event has this step
        return script.events[step];
    }).map(script => {
        return {scriptName: script.name, step: step};
    });
};

/**
 * Execute User Event.
 *
 * @param event {{scriptName: String, step: String}} ID of User Event, example: "customscript_legal_event"
 * @param step {'beforeLoad' | 'beforeSubmit' | 'afterSubmit'}
 * @param etype {'create' | 'update' | 'edit' | 'delete' | 'copy' | 'view'}
 * @param records {{old: nlobjRecord, new: nlobjRecord}}
 *
 * @exception {SSS_INVALID_USER_EVENT}
 */
exports.executeUserEvent = (event, etype, records) => {
    let $scripts = $db.$scripts,
        scriptName = event.scriptName,
        step = event.step,
        cfg = $scripts[scriptName] || {},
        context = cfg.context,
        script = $events[scriptName];

    if (script && script.funcs && script.funcs[step]) {
        let code = script.funcs[step] + `("${etype}")`;
        if (!context) {
            context = vmSim.importSuiteScript(script, scriptName);
        }
        //context.$$THIS_RECORD = {
        global.$$THIS_RECORD = {
            step: step,
            type: etype,
            recordOld: records.old,
            recordNew: records.new,
            recordId: (records.new || {}).getId() || -1,
            recordType: script.record
        };

        // execute user event
        vmSim.evalContext(code, context);

        global.$$THIS_RECORD = {};
    } else {
        throw nlapiCreateError('SSS_INVALID_USER_EVENT');
    }
};

/**
 * Verify if exists User Event trigger for this Record Type.
 * @param recType {String} ID of Record Type.
 * @returns {boolean} true if exists User Events triggers.
 */
exports.existsTriggerUserEvent = (recType) => {
    let events = ss.find('user-event', {record: recType});
    return events && events.length > 0;
};

/**
 * Execute all User Events triggers.
 *
 * @param recType {String} ID of Record Type.
 * @param step {'beforeLoad' | 'beforeSubmit' | 'afterSubmit'}
 * @param etype {'create' | 'update' | 'edit' | 'delete' | 'copy' | 'view'}
 * @param records {{old: nlobjRecord, new: nlobjRecord}}
 */
exports.runTriggerUserEvent = (recType, step, etype, records) => {
    let events = exports.userEvent(recType, step);
    for (let e = 0; e < events.length; e++) {
        let event = events[e];
        exports.executeUserEvent(event, etype, records);
    }
};