'use strict';

/**
 * Resolve a URL to a resource or object in the system.
 *
 * @param {string} type The base type for this resource. These types include: RECORD|TASKLINK|SUITELET|RESTLET
 * @param {string} identifier The primary id for this resource (recordType for RECORD, scriptId for SUITELET)
 * @param {string} [id] internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
 * @param {string} [displayMode] string specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view)
 * @return {string}
 *
 * @since    2007.0
 */
exports.nlapiResolveURL = (type, identifier, id, displayMode) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    if (!~['record', 'tasklink', 'suitelet', 'restlet'].indexOf(type.toLowerCase())) {
        throw nlapiCreateError('SSS_INVALID_TYPE_ARG');
    }
    type = type.toLowerCase();

    let db = global.$db;
    if (~['suitelet', 'restlet'].indexOf(type)) {
        if (!identifier) throw nlapiCreateError('SSS_IDENTFIER_ARG_REQ');
        let scripts = db('__scripts'),
            script = scripts.chain().where({name: identifier}).value();
        if (!script || script.length === 0) {
            throw nlapiCreateError('SSS_INVALID_IDENTFIER_ARG');
        }

        let data = Array.isArray(script) ? script[0] : script;
        return data.url;
    } else {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    }
};
