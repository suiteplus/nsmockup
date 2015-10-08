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