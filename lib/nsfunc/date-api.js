'use strict';
var moment = require('moment');

const FORMATS = ['date', 'datetime', 'datetimetz', 'timeofday'];

var getValidFormat = (format) => {
    switch (format) {
        case 'date':
            return 'DD-MM-YYYY';
        case 'datetime':
            return 'DD-MM-YYYY HH:mm:ss';
        case 'datetimetz':
            return 'DD-MM-YYYY HH:mm:ss Z';
        case 'timeofday':
            return 'HH:mm:ss';
    }
};
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
    if (!str) {
        throw nlapiCreateError('SSS_TYPE_STR_REQD');
    } else if (!format) {
        throw nlapiCreateError('SSS_TYPE_FORMAT_REQD');
    } else if (!~FORMATS.indexOf(format.toLowerCase())) {
        throw nlapiCreateError('SSS_INVALID_FORMATTYPE');
    }
    let validFormat = getValidFormat(format);
    return moment.utc(str, validFormat).toDate();
};

/**
 * Convert a Date object into a String
 *
 * @param {date} 	d date object being converted to a string
 * @param {string} [formattype] format type to use: date|datetime|timeofday with date being the default
 * @return {string}
 *
 * @since 2005.0
 */
exports.nlapiDateToString = (d, formattype) => {
    if (!d) {
        throw nlapiCreateError('SSS_TYPE_DATE_REQD');
    } else if (formattype && !~FORMATS.indexOf(formattype.toLowerCase())) {
        throw nlapiCreateError('SSS_INVALID_FORMATTYPE');
    }
    let format = (formattype || 'date').toLowerCase(),
        date = moment.utc(d),
        validFormat = getValidFormat(format);
    return date.format(validFormat);
};

/**
 * Add days to a Date object and returns a new Date
 *
 * @param {date} d date object used to calculate the new date
 * @param {int}	days the number of days to add to this date object.
 * @return {date}
 *
 * @since 2008.1
 */
exports.nlapiAddDays = (d, days) => {
    if (!d) {
        throw nlapiCreateError('SSS_TYPE_DATE_REQD');
    } else if (!days) {
        throw nlapiCreateError('SSS_TYPE_DAYS_REQD');
    } else if (typeof days !== 'number' || isNaN(parseInt(days))) {
        throw nlapiCreateError('SSS_INVALID_DAYS');
    }
    let date = new Date(d),
        n = typeof days !== 'number' ? parseInt(days): days;
    date.setUTCDate(date.getUTCDate() + n);
    return date;
};

/**
 * Add months to a Date object and returns a new Date.
 *
 * @param {date} d date object used to calculate the new date
 * @param {int} months the number of months to add to this date object.
 * @return {date}
 *
 * @since 2008.1
 */
exports.nlapiAddMonths = (d, months) => {
    if (!d) {
        throw nlapiCreateError('SSS_TYPE_DATE_REQD');
    } else if (!months) {
        throw nlapiCreateError('SSS_TYPE_MONTHS_REQD');
    } else if (typeof months !== 'number' || isNaN(parseInt(months))) {
        throw nlapiCreateError('SSS_INVALID_MONTHS');
    }
    let date = new Date(d),
        n = typeof months !== 'number' ? parseInt(months): months;
    date.setUTCMonth(date.getUTCMonth() + n);
    return date;
};