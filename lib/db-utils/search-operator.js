'use strict';
var minimatch = require('minimatch'),
    moment = require('moment');

const $$NS_GROUP_TEXT = ['EMAIL', 'ADDRESS', 'TEXT', 'CLOBTEXT', 'PASSWORD', 'PERCENT', 'PHONE', 'RICHTEXT', 'TEXTAREA'],
    $$NS_GROUP_DATE = ['DATE', 'DATETIME'],
    $$NS_GROUP_NUM = ['CURRENCY', 'DECIMAL', 'INTEGER', 'TIMEOFDAY'],
    $$NS_OPERATORS = {
        'after': [].concat($$NS_GROUP_DATE),
        'allof': ['MULTISELECT'],
        'any': [].concat($$NS_GROUP_NUM).concat($$NS_GROUP_TEXT),
        'anyof': ['SELECT', 'IMAGE', 'MULTISELECT'],
        'before': [].concat($$NS_GROUP_DATE),
        'between': [].concat($$NS_GROUP_NUM),
        'contains': [].concat($$NS_GROUP_TEXT),
        'doesnotcontain': [].concat($$NS_GROUP_TEXT),
        'doesnotstartwith': [].concat($$NS_GROUP_TEXT),
        'equalto': [].concat($$NS_GROUP_NUM),
        'greaterthan': [].concat($$NS_GROUP_NUM),
        'greaterthanorequalto': [].concat($$NS_GROUP_NUM),
        'haskeywords': [].concat($$NS_GROUP_TEXT),
        'is': ['CHECKBOX'].concat($$NS_GROUP_TEXT),
        'isempty': [].concat($$NS_GROUP_NUM).concat($$NS_GROUP_DATE).concat($$NS_GROUP_TEXT),
        'isnot': [].concat($$NS_GROUP_TEXT),
        'isnotempty': [].concat($$NS_GROUP_NUM).concat($$NS_GROUP_DATE).concat($$NS_GROUP_TEXT),
        'lessthan': [].concat($$NS_GROUP_NUM),
        'lessthanorequalto': [].concat($$NS_GROUP_NUM),
        'noneof': ['SELECT', 'IMAGE', 'MULTISELECT'],
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

module.exports = (fldType, operator, valRec, valFilter, valFilter2) => {
    if (!fldType) {
        throw nlapiCreateError('SSS_FLDTYPE_OBJ_REQD');
    } else if (!operator) {
        throw nlapiCreateError('SSS_OPERATOR_OBJ_REQD');
    } else if (!valRec) {
        throw nlapiCreateError('SSS_VALUE_OBJ_REQD');
    }

    let op = operator.toLowerCase(),
        type = fldType.toUpperCase();
    if (!$$NS_OPERATORS[op] || !~$$NS_OPERATORS[op].indexOf(type)) {
        throw nlapiCreateError('SSS_INVALID_OPERATOR', `You cannot use operator "${op}" with field type "${type}"`);
    }

    const $FORMAT = 'YYYY-MM-DDTHH:mm:ss';

    switch (op) {
        case 'notbefore':
        case 'after' :
        {
            let actualDate = nlapiStringToDate(valFilter, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(valRec, $FORMAT);

            return expected.isAfter(actual);
        }
        case 'any':
            if (valFilter2 && valFilter2.length > 1) {
                return ~valFilter2.indexOf(valRec);
            } else {
                return valFilter == valRec;
            }
        case 'anyof':
            if (valFilter === '@NONE@') {
                return !valRec || valRec === '@NONE@';
            } else {
                return valFilter == valRec;
            }
        case 'notafter':
        case 'before' :
        {
            let actualDate = nlapiStringToDate(valFilter, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(valRec, $FORMAT);

            return expected.isBefore(actual);
        }
        case 'between':
            return valFilter <= valRec && valRec <= valFilter2[1];
        case 'contains':
            return minimatch(valRec, valFilter);
        case 'doesnotcontain':
            return !minimatch(valRec, valFilter);
        case 'doesnotstartwith':
            return valRec.indexOf(valFilter) !== 0;
        case 'greaterthan':
        case 'notlessthan':
            return valRec > valFilter;
        case 'greaterthanorequalto':
        case 'notlessthanorequalto':
            return valRec >= valFilter;
        case 'equalto':
        case 'haskeywords':
        case 'is':
            return valFilter == valRec;
        case 'isempty':
            return !valRec || valRec.length === 0;
        case 'isnot':
        case 'notequalto':
            return valFilter != valRec;
        case 'isnotempty':
            return !!valRec && (Array.isArray(valRec) ? valRec.length : true) ;
        case 'lessthan':
        case 'notgreaterthan':
            return valRec < valFilter;
        case 'lessthanorequalto':
        case 'notgreaterthanorequalto':
            return valRec <= valFilter;
        case 'noneof':
            if (valFilter === '@NONE@') {
                return !!valRec && valRec !== '@NONE@';
            } else {
                return valFilter != valRec;
            }
        case 'notbetween':
            return valFilter < valRec || valRec > valFilter2[1];
        case 'notwithin':
        case 'noton':
        {
            let actualDate = nlapiStringToDate(valFilter, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(valRec, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return !expected.isSame(actual, unit);
        }
        case 'notonorafter':
        {
            let actualDate = nlapiStringToDate(valFilter, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(valRec, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return !expected.isSame(actual, unit) || expected.isAfter(actual);
        }
        case 'notonorbefore':
        {
            let actualDate = nlapiStringToDate(valFilter, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(valRec, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return !expected.isSame(actual, unit) || expected.isBefore(actual);
        }
        case 'within':
        case 'on':
        {
            let actualDate = nlapiStringToDate(valFilter, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(valRec, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return expected.isSame(actual, unit);
        }
        case 'onorafter':
        {
            let actualDate = nlapiStringToDate(valFilter, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(valRec, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return expected.isSame(actual, unit) || expected.isAfter(actual);
        }
        case 'onorbefore':
        {
            let actualDate = nlapiStringToDate(valFilter, type),
                actual = moment.utc(actualDate.toJSON(), $FORMAT),
                expected = moment.utc(valRec, $FORMAT),
                unit = type === 'DATE' ? 'day': 'second';

            return expected.isSame(actual, unit) || expected.isBefore(actual);
        }
        case 'startswith':
            return valRec.indexOf(valFilter) === 0;
    }
};
