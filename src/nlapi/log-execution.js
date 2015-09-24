'use strict';

module.exports = function() {

    const TYPES = ['debug', 'audit', 'error', 'emergency'];

    /**
     * Create an entry in the script execution log (note that execution log entries are automatically purged after 30 days).
     *
     * @param {string} type	log type: debug|audit|error|emergency
     * @param {string} title log title (up to 90 characters supported)
     * @param {string} [details] log details (up to 3000 characters supported)
     * @return {void}
     *
     * @since 2008.1
     */
    return function nlapiLogExecution(type, title, details) {
        if (!type || !~TYPES.indexOf(type.toLowerCase())) {
            throw 'SSS_MISSING_REQD_ARGUMENT';
        } else {
            console.log('NS >>', type, title, details);
        }
    }
};
