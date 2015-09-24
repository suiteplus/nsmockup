'use strict';

module.exports = function() {

    var nsContextObj;

    /**
     * Return context information about the current user/script.
     *
     * @return {nlobjContext}
     *
     * @since    2007.0
     */
    return function nlapiGetContext() {
        try {
            if (nsContextObj == null)
                nsContextObj = new nlobjContext();
            return nsContextObj;
        }
        catch (e) {
            throw nlapiCreateError(e);
        }
    }
};
