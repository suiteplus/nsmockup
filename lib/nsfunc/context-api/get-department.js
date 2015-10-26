'use strict';

exports.$$hook = true;

exports.nlapiGetDepartment = (ctx) => {

    /**
     * Return the internal ID for the current user's department.
     *
     * @return {int}
     *
     * @since	2005.0
     */
    return () => {
        return ctx.nlapiGetContext().getDepartment();
    };
};
