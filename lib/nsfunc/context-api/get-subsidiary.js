'use strict';

exports.$$hook = true;

exports.nlapiGetSubsidiary = (ctx) => {

    /**
     * Return the internal ID for the current user's subsidiary.
     *
     * @return {int}
     *
     * @since    2008.1
     */
    return () => {
        return ctx.nlapiGetContext().getSubsidiary();
    };
};
