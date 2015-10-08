'use strict';

/**
 * Return a new instance of nlobjError used system or user-defined error object.
 *
 * @classDescription Encapsulation of errors thrown during script execution.
 * @return {nlobjError}
 * @constructor
 */
exports.nlobjError = function nlobjError(code, error, suppressnotification) {
    this.id = null;
    this.code = code;
    this.details = error;
    this.stacktrace = 'stacktrace: ...';
    this.suppressnotification = suppressnotification;
    if (code instanceof nlobjError/* || code instanceof NLXMLResponseError*/) {
        this.id = code.getId();
        this.code = code.getCode();
        this.details = code.getDetails();
        if (code instanceof nlobjError)
            this.stacktrace = code.getStackTrace();
    }
    this.name = this.code;
    /* exposed for compatibility with Javascript Error object. */
    this.message = this.details;
    /* exposed for compatibility with Javascript Error object. */
    this.description = this.details;
    /* exposed for compatibility with Javascript Error object. */



    /**
     * return the error db ID for this error (if it was an unhandled unexpected error).
     * @return {string}
     *
     * @method
     * @memberOf nlobjError
     *
     * @since 2008.2
     */
    this.getId = function () {
        return this.id;
    };

    /**
     * return the error code for this system or user-defined error.
     * @return {string}
     *
     * @method
     * @memberOf nlobjError
     *
     * @since 2008.2
     */
    this.getCode = function () {
        return this.code;
    };

    /**
     * return the error description for this error.
     * @return {string}
     *
     * @method
     * @memberOf nlobjError
     *
     * @since 2008.2
     */
    this.getDetails = function () {
        return this.details;
    };

    /**
     * return a stacktrace containing the location of the error.
     * @return {string[]}
     *
     * @method
     * @memberOf nlobjError
     *
     * @since 2008.2
     */
    this.getStackTrace = function () {
        return this.stacktrace;
    };

    /**
     * return the userevent script name where this error was thrown.
     * @return {string}
     *
     * @method
     * @memberOf nlobjError
     *
     * @since 2008.2
     */
    this.getUserEvent = function () {
        return 'event';
    };

    /**
     * return the internalid of the record if this error was thrown in an aftersubmit script.
     * @return {int}
     *
     * @method
     * @memberOf nlobjError
     *
     * @since 2008.2
     */
    this.getInternalId = function () {
        return -1;
    };
};