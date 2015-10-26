'use strict';

exports.$$hook = true;

exports.nlapiGetUser = (ctx) => {

    /**
     * Return the internal ID for the currently logged in user. Returns -4 when called from online forms or "Available without Login" Suitelets.
     *
     * @return {int}
     *
     * @since	2005.0
     */
    return () => {
        return ctx.nlapiGetContext().getUser();
    };
};