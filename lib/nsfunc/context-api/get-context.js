'use strict';

var $contextObj = null;
/**
 * Return context information about the current user/script.
 *
 * @return {nlobjContext}
 *
 * @since    2007.0
 */
exports.nlapiGetContext = () => {
    try {
        if (!$contextObj || global.$NS_RESET_CONTEXT) {
            $contextObj = new nlobjContext();
            global.$NS_RESET_CONTEXT && (global.$NS_RESET_CONTEXT = false);
        }
        return $contextObj;
    } catch (e) {
        throw nlapiCreateError(e);
    }
};