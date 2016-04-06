'use strict';
var minimatch = require('minimatch'),
    moment = require('moment');

const $$NS_GROUP_TEXT = ['EMAIL', 'ADDRESS', 'TEXT', 'CLOBTEXT', 'PASSWORD', 'PERCENT', 'PHONE', 'RICHTEXT', 'TEXTAREA'],
    $$NS_GROUP_DATE = ['DATE', 'DATETIME'],
    $$NS_GROUP_NUM = ['CURRENCY', 'DECIMAL', 'INTEGER', 'TIMEOFDAY'],
    $NS_GROUP_DOC = ['DOCUMENT', 'IMAGE'],
    $$NS_OPERATORS = {
        'after': [].concat($$NS_GROUP_DATE),
        'allof': ['MULTISELECT'],
        'any': [].concat($$NS_GROUP_NUM).concat($$NS_GROUP_TEXT),
        'anyof': ['SELECT', 'MULTISELECT'].concat($NS_GROUP_DOC),
        'before': [].concat($$NS_GROUP_DATE),
        'between': [].concat($$NS_GROUP_NUM),
        'contains': [].concat($$NS_GROUP_TEXT),
        'doesnotcontain': [].concat($$NS_GROUP_TEXT),
        'doesnotstartwith': [].concat($$NS_GROUP_TEXT),
        'equalto': [].concat($$NS_GROUP_NUM),
        'greaterthan': [].concat($$NS_GROUP_NUM),
        'greaterthanorequalto': [].concat($$NS_GROUP_NUM),
        'haskeywords': [].concat($$NS_GROUP_TEXT),
        'is': ['SELECT', 'CHECKBOX'].concat($$NS_GROUP_TEXT),
        'isempty': [].concat($$NS_GROUP_NUM).concat($$NS_GROUP_DATE).concat($$NS_GROUP_TEXT),
        'isnot': [].concat($$NS_GROUP_TEXT),
        'isnotempty': [].concat($$NS_GROUP_NUM).concat($$NS_GROUP_DATE).concat($$NS_GROUP_TEXT),
        'lessthan': [].concat($$NS_GROUP_NUM),
        'lessthanorequalto': [].concat($$NS_GROUP_NUM),
        'noneof': ['SELECT', 'MULTISELECT'].concat($NS_GROUP_DOC),
        'notafter': [].concat($$NS_GROUP_DATE),
        'notallof': ['MULTISELECT'],
        'notbefore': [].concat($$NS_GROUP_DATE),
        'notbetween': [].concat($$NS_GROUP_NUM),
        'notequalto': [].concat($$NS_GROUP_NUM),
        'notgreaterthan': [].concat($$NS_GROUP_NUM),
        'notgreaterthanorequalto': [].concat($$NS_GROUP_NUM),
        'notlessthan': [].concat($$NS_GROUP_NUM),
        'notlessthanorequalto': [].concat($$NS_GROUP_NUM),
        'noton': [].concat($$NS_GROUP_DATE),
        'notonorafter': [].concat($$NS_GROUP_DATE),
        'notonorbefore': [].concat($$NS_GROUP_DATE),
        'notwithin': [].concat($$NS_GROUP_DATE),
        'on': [].concat($$NS_GROUP_DATE),
        'onorafter': [].concat($$NS_GROUP_DATE),
        'onorbefore': [].concat($$NS_GROUP_DATE),
        'startswith': [].concat($$NS_GROUP_TEXT),
        'within': [].concat($$NS_GROUP_DATE)
    };

var operator = (opts) => {
    !opts && (opts = {});

    if (!opts.type) {
        throw nlapiCreateError('SSS_FLDTYPE_OBJ_REQD');
    } else if (!opts.operator) {
        throw nlapiCreateError('SSS_OPERATOR_OBJ_REQD');
    } else if (!opts.valActual) {
        throw nlapiCreateError('SSS_VALUE_OBJ_REQD');
    }

    let op = opts.operator.toLowerCase(),
        type = opts.type.toUpperCase();
    let isInternalId = (opts.name === 'internalid' && ~['anyof','noneof'].indexOf(op));
    if ((!$$NS_OPERATORS[op] || !~$$NS_OPERATORS[op].indexOf(type)) && !isInternalId) {
        throw nlapiCreateError('SSS_INVALID_SRCH_OPERATOR', `You cannot use operator "${op}" with field[${opts.name}] type "${type}"`);
    }

    const $FORMAT = 'YYYY-MM-DDTHH:mm:ss';

    switch (op) {
        case 'notbefore':
        case 'after' :
        {
            let actualDate = nlapiStringToDate(opts.valExpect, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(opts.valActual, $FORMAT);

            return expected.isAfter(actual);
        }
        case 'any':
            if (opts.valuesExpect && opts.valuesExpect.length > 1) {
                return !!~opts.valuesExpect.indexOf(opts.valActual);
            } else {
                return opts.valExpect == opts.valActual;
            }
        case 'anyof':
            if (opts.valExpect === '@NONE@') {
                return !opts.valActual || opts.valActual === '@NONE@';
            } else if (Array.isArray(opts.valExpect)){
                return !!~opts.valExpect.indexOf(opts.valActual);
            } else {
                return opts.valExpect == opts.valActual;
            }
        case 'notafter':
        case 'before' :
        {
            let actualDate = nlapiStringToDate(opts.valExpect, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(opts.valActual, $FORMAT);

            return expected.isBefore(actual);
        }
        case 'between':
            return opts.valExpect <= opts.valActual && opts.valActual <= opts.valuesExpect[1];
        case 'contains':
            return minimatch(opts.valActual, opts.valExpect);
        case 'doesnotcontain':
            return !minimatch(opts.valActual, opts.valExpect);
        case 'doesnotstartwith':
            return opts.valActual.indexOf(opts.valExpect) !== 0;
        case 'greaterthan':
        case 'notlessthan':
            return opts.valActual > opts.valExpect;
        case 'greaterthanorequalto':
        case 'notlessthanorequalto':
            return opts.valActual >= opts.valExpect;
        case 'equalto':
        case 'haskeywords':
        case 'is':
            return opts.valExpect == opts.valActual;
        case 'isempty':
            return !opts.valActual || opts.valActual.length === 0;
        case 'isnot':
        case 'notequalto':
            return opts.valExpect != opts.valActual;
        case 'isnotempty':
            return !!opts.valActual && (Array.isArray(opts.valActual) ? opts.valActual.length : true) ;
        case 'lessthan':
        case 'notgreaterthan':
            return opts.valActual < opts.valExpect;
        case 'lessthanorequalto':
        case 'notgreaterthanorequalto':
            return opts.valActual <= opts.valExpect;
        case 'noneof':
            if (opts.valExpect === '@NONE@') {
                return !!opts.valActual && opts.valActual !== '@NONE@';
            } else {
                return opts.valExpect != opts.valActual;
            }
        case 'notbetween':
            return opts.valExpect < opts.valActual || opts.valActual > opts.valuesExpect[1];
        case 'notwithin':
        case 'noton':
        {
            let actualDate = nlapiStringToDate(opts.valExpect, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(opts.valActual, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return !expected.isSame(actual, unit);
        }
        case 'notonorafter':
        {
            let actualDate = nlapiStringToDate(opts.valExpect, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(opts.valActual, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return !expected.isSame(actual, unit) || expected.isAfter(actual);
        }
        case 'notonorbefore':
        {
            let actualDate = nlapiStringToDate(opts.valExpect, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(opts.valActual, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return !expected.isSame(actual, unit) || expected.isBefore(actual);
        }
        case 'within':
        case 'on':
        {
            let actualDate = nlapiStringToDate(opts.valExpect, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(opts.valActual, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return expected.isSame(actual, unit);
        }
        case 'onorafter':
        {
            let actualDate = nlapiStringToDate(opts.valExpect, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(opts.valActual, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return expected.isSame(actual, unit) || expected.isAfter(actual);
        }
        case 'onorbefore':
        {
            let actualDate = nlapiStringToDate(opts.valExpect, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(opts.valActual, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return expected.isSame(actual, unit) || expected.isBefore(actual);
        }
        case 'startswith':
            return opts.valActual.indexOf(opts.valExpect) === 0;
    }
};

operator.GROUP_TEXT = $$NS_GROUP_TEXT;
operator.GROUP_DATE = $$NS_GROUP_DATE;
operator.GROUP_NUM = $$NS_GROUP_NUM;

module.exports = operator;