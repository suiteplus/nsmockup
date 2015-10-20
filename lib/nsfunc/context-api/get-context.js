'use strict';

exports.$$hook = true;

exports.nlapiGetContext = (ctx) => {
    var $contextObj = null;

    /**
     * Return context information about the current user/script.
     *
     * @return {nlobjContext}
     *
     * @since    2007.0
     */
    return () => {
        try {
            if (!$contextObj || ctx.$NS_RESET_CONTEXT) {
                $contextObj = new nlobjContext();
                ctx.$NS_RESET_CONTEXT && (ctx.$NS_RESET_CONTEXT = false);
            }
            return $contextObj;
        } catch (e) {
            throw nlapiCreateError(e);
        }
    };
};