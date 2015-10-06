'use strict';

/**
 * Return a new instance of nlobjRequest used for scripting web requests in Suitelets
 *
 * @classDescription Accessor to Http request data made available to Suitelets
 * @return {nlobjRequest}
 * @constructor
 */
exports.nlobjRequest = function nlobjRequest(req) {
    this.params = req.query;
    this.headers = req.headers;
    this.body = req.body;
    this.url = req.url;
    this.method = req.method;

    /**
     * return the value of a request parameter.
     *
     * @param {string} name parameter name
     * @return {string}
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2008.2
     */
    this.getParameter = function (name) {
        return this.params[name];
    };

    /**
     * return the values of a request parameter as an Array.
     *
     * @param {string} name parameter name
     * @return {string[]}
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2008.2
     */
    this.getParameterValues = function (name) {
        return this.params[name];
    };

    /**
     * return an Object containing all the request parameters and their values.
     * @return {Object}
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2008.2
     */
    this.getAllParameters = function () {
        return Object.keys(this.params);
    };

    /**
     * return the value of a sublist value.
     * @param {string}    group sublist name
     * @param {string}    name  sublist field name
     * @param {int}    line  sublist line number
     * @return {string}
     *
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2008.2
     */
    this.getLineItemValue = function (group, name, line) {
    };

    /**
     * return the number of lines in a sublist.
     * @param {string} group sublist name
     * @return {int}
     *
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2008.2
     */
    this.getLineItemCount = function (group) {
    };

    /**
     * return the value of a request header.
     * @param {string} name
     * @return {string}
     *
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2008.2
     */
    this.getHeader = function (name) {
        return this.headers[name];
    };

    /**
     * return an Object containing all the request headers and their values.
     * @return {Object}
     *
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2008.2
     */
    this.getAllHeaders = function () {
        return Object.keys(this.headers);
    };

    /**
     * return the value of an uploaded file.
     * @param {string} name file field name
     * @return {nlobjFile}
     *
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2009.1
     */
    this.getFile = function (name) {
    };

    /**
     * return an Object containing field names to file objects for all uploaded files.
     * @return {Object}
     *
     * @method
     * @memberOf nlobjRequest
     *
     * @since 2009.1
     */
    this.getAllFiles = function () {
    };

    /**
     * return the body of the POST request
     * @return {string}
     *
     * @method
     * @memberOf nlobjRequest
     * @since 2008.1
     */
    this.getBody = function () {
        return JSON.stringify(this.body);
    };

    /**
     * return the URL of the request
     * @return {string}
     *
     * @method
     * @memberOf nlobjRequest
     * @since 2008.1
     */
    this.getURL = function () {
        return this.url;
    };

    /**
     * return the METHOD of the request
     * @return {string}
     *
     * @method
     * @memberOf nlobjRequest
     * @since 2008.1
     */
    this.getMethod = function () {
        return this.method.toUpperCase();
    };
};