'use strict';

/**
 * Create an nlobjError object that can be used to abort script execution and configure error notification
 *
 * @param {string}    code error code
 * @param {string}    details error description
 * @param {boolean} [suppressEmail] if true then suppress the error notification emails from being sent out (false by default).
 * @return {nlobjError}
 *
 * @since 2008.2
 */
exports.nlapiCreateError = (code, details, suppressEmail) => {
    return new nlobjError(code, details, suppressEmail);
};
