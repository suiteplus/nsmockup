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
function nlapiCreateError(code, details, suppressEmail) {
    window.errorObj = new nlobjError(code, details, suppressEmail);
    return window.errorObj;
}
