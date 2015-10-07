'use strict';
var ss = require('./suite-script'),
    vmSim = require('../src/vm-sim');

var $events = {};
/**
 * Find User Events attach on Record Type.
 *
 * @param recType {String} ID of Record Type.
 * @param step {'beforeLoad' | 'beforeSubmit' | 'afterSubmit'}
 * @returns {[String]} scripts names.
 */
exports.userEvent = (recType, step) => {
    let scripts = ss.find('user-event', {record: recType}) || [];
    return scripts.filter(script => {
        let event = script.name;
        // cache user events
        if (!$events[event]) $events[event] = script;
        // verify if user event has this step
        return script.events[step];
    }).map(script => script.name);
};

/**
 * Execute User Event.
 *
 * @param event {String} ID of User Event, example: "customscript_legal_event"
 * @param step {'beforeLoad' | 'beforeSubmit' | 'afterSubmit'}
 * @param etype {'create' | 'update' | 'edit' | 'delete' | 'copy' | 'view'}
 *
 * @exception {SSS_INVALID_USER_EVENT}
 */
exports.executeUserEvent = (event, step, etype) => {
    let $scripts = $db.$scripts,
        cfg = $scripts[event] || {},
        context = cfg.context,
        script = $events[event];

    if (script && script.funcs && script.funcs[step]) {
        let code = script.funcs[step] + `("${etype}")`;
        if (!context) {
            context = vmSim.importSuiteScript(script);
        }

        // execute user event
        vmSim.evalContext(code, context);
    } else {
        throw new nlapiCreateError('SSS_INVALID_USER_EVENT');
    }
};