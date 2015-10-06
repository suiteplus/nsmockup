'use strict';
var request = require('sync-request');

/**
 * Request a URL to an external or internal resource.
 * @restriction NetSuite maintains a white list of CAs that are allowed for https requests. Please see the online documentation for the complete list.
 * @governance 10 units
 *
 * @param {string} url        A fully qualified URL to an HTTP(s) resource
 * @param {string, Object}    [postdata] -  Body used for a POST request. It can either be an object of form parameters or a string. If set to null, then a GET request is used.
 * @param {Object}            [headers] - Object containing request headers.
 * @param {function}        [method] - Specify the appropriate http method to use for your integration.
 * @return {nlobjResponse}
 *
 * @exception {SSS_UNKNOWN_HOST}
 * @exception {SSS_INVALID_HOST_CERT}
 * @exception {SSS_REQUEST_TIME_EXCEEDED}
 *
 * @since    2007.0
 */
exports.nlapiRequestURL = (url, postdata, headers, method) => {
    let method_ = method || (postdata ? 'POST' : 'GET');
    let opts = {timeout: 10000};
    if (postdata) {
        if (typeof postdata === 'object') {
            opts.json = postdata;
        } else {
            opts.body = postdata;
        }
    }
    if (headers) opts.headers = headers;

    let res = request(method_, url, opts);
    return new nlobjResponse(res);
};

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
