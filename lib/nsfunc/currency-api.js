'use strict';

/**
 * Format a number for data entry into a currency field.
 *
 * @param {string} str numeric string used to format for display as currency using user's locale
 * @return {string}
 *
 * @since 2008.1
 */
exports.nlapiFormatCurrency = (str) => {
    let value = str || '0';
    if (typeof value !== 'string') {
        value = '' + value;
    }
    value = Number(value.replace(/,/g, ''));
    if (isNaN(value)) {
        throw nlapiCreateError('SSS_INVALID_VALUE', `Cannot format "${str}" to default currency.`);
    }

    const $GENERAL = global.$$GENERAL_PREFS;

    let currency = $GENERAL.currency,
        numberFormat = $GENERAL.numberFormat,
        decimal = numberFormat.decimal,
        precision = numberFormat.precision,
        thousand = numberFormat.thousand;

    var re = new RegExp('\\d(?=(\\d{3})+' + (precision > 0 ? '\\D' : '$') + ')', 'g'),
        valuePrecision = value.toFixed(Math.max(0, ~~precision)),
        valueDecFormat = valuePrecision.replace('.', decimal),
        valueFormat = valueDecFormat.replace(re, '$&' + thousand);

    return currency + ' ' + valueFormat;
};