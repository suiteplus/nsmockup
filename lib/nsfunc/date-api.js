'use strict';

/**
 * Convert a String into a Date object.
 *
 * @param {string} str date string in the user's date format, timeofday format, or datetime format
 * @param {string} format format type to use: date|datetime|timeofday with date being the default
 * @return {date}
 *
 * @since 2005.0
 */
exports.nlapiStringToDate = (str, format) => {
    // TODO validate format - daniel.joppi - 9/24/2015
    return new Date(str);
};