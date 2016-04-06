'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../../'),
    operator = require('../../../lib/search-utils/operator');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    before(done => {
        nsmockup.init(done);
    });
    parallel('SuiteScript API - Search Utils - "operators" - validate error messages:', () => {
        it('operator validate missing errors', (done) => {
            try {
                operator();
                done('missing field type');
            } catch (e) {
                should(e).have.property('code', 'SSS_FLDTYPE_OBJ_REQD');
            }

            try {
                operator({type: 'SELECT'});
                done('missing opertator');
            } catch (e) {
                should(e).have.property('code', 'SSS_OPERATOR_OBJ_REQD');
            }

            try {
                operator({type: 'SELECT', operator: 'anyof'});
                done('missing value');
            } catch (e) {
                should(e).have.property('code', 'SSS_VALUE_OBJ_REQD');
            }

            return done();
        });

        it('operator validate invalid operators', (done) => {
            let allOps = [
                'after', 'allof', 'any', 'anyof', 'before', 'between', 'contains', 'doesnotcontain', 'doesnotstartwith',
                'equalto', 'greaterthan', 'greaterthanorequalto', 'haskeywords', 'is', 'isempty', 'isnot', 'isnotempty',
                'lessthan', 'lessthanorequalto', 'noneof', 'notafter', 'notallof', 'notbefore', 'notbetween',
                'notequalto', 'notgreaterthan', 'notgreatert​h​a​n​o​r​e​q​u​a​lto', 'notlessthan', 'notlessthanorequalto', 'noton',
                'notonorafter', 'notonorbefore', 'notwithin', 'on', 'onorafter', 'onorbefore', 'startswith', 'within'
            ];

            let notSelectOp = allOps.filter(op => !~['anyof', 'noneof', 'is'].indexOf(op));
            notSelectOp.forEach((op) => {
                try {
                    operator({type: 'SELECT', operator: op, valActual: 1, valExpect: 1});
                    done(`missing operator "${op}" to field type "SELECT"`);
                } catch (e) {
                    should(e).have.property('code', 'SSS_INVALID_SRCH_OPERATOR');
                }
            });

            let notMultiSelectOp = allOps.filter(op => !~['allof', 'anyof', 'noneof', 'notallof'].indexOf(op));
            notMultiSelectOp.forEach((op) => {
                try {
                    operator({type: 'MULTISELECT', operator: op, valActual: 1, valExpect: 1});
                    done(`missing operator "${op}" to field type "MULTISELECT"`);
                } catch (e) {
                    should(e).have.property('code', 'SSS_INVALID_SRCH_OPERATOR');
                }
            });

            let notCheckboxOp = allOps.filter(op => op !== 'is');
            notCheckboxOp.forEach((op) => {
                try {
                    operator({type: 'CHECKBOX', operator: op, valActual: 1, valExpect: 1});
                    done(`missing operator "${op}" to field type "CHECKBOX"`);
                } catch (e) {
                    should(e).have.property('code', 'SSS_INVALID_SRCH_OPERATOR');
                }
            });

            let numberOp = [
                    'any', 'between', 'equalto', 'greaterthan', 'greaterthanorequalto', 'isempty', 'isnotempty',
                    'lessthan', 'lessthanorequalto', 'notbetween', 'notequalto', 'notgreaterthan', 'notgreatert​h​a​n​o​r​e​q​u​a​lto',
                    'notlessthan', 'notlessthanorequalto'
                ],
                notNumberOp = allOps.filter(op => !~numberOp.indexOf(op)),
                typeNumbers = ['CURRENCY', 'DECIMAL', 'INTEGER', 'TIMEOFDAY'];
            typeNumbers.forEach(fldType => {
                notNumberOp.forEach(op => {
                    try {
                        operator({type: `${fldType}`, operator: op, valActual: 1, valExpect: 1});
                        done(`missing operator "${op}" to field type "${fldType}"`);
                    } catch (e) {
                        should(e).have.property('code', 'SSS_INVALID_SRCH_OPERATOR');
                    }
                });
            });

            let stringOp = [
                    'any', 'contains', 'doesnotcontain', 'doesnotstartwith', 'haskeywords', 'is',
                    'isempty', 'isnot', 'isnotempty', 'startswith'
                ],
                notStringOp = allOps.filter(op => !~stringOp.indexOf(op)),
                typeString = ['EMAIL', 'ADDRESS', 'TEXT', 'CLOBTEXT', 'PASSWORD', 'PERCENT', 'PHONE', 'RICHTEXT', 'TEXTAREA'];
            typeString.forEach(fldType => {
                notStringOp.forEach(op => {
                    try {
                        operator({type: `${fldType}`, operator: op, valActual: 1, valExpect: 1});
                        done(`missing operator "${op}" to field type "${fldType}"`);
                    } catch (e) {
                        should(e).have.property('code', 'SSS_INVALID_SRCH_OPERATOR');
                    }
                });
            });

            let dateOp = [
                    'after', 'before', 'isempty', 'isnotempty', 'notafter', 'notbefore', 'noton', 'notonorafter',
                    'notonorbefore', 'notwithin', 'on', 'onorafter', 'onorbefore', 'within'
                ],
                notDateOp = allOps.filter(op => !~dateOp.indexOf(op)),
                typeDate = ['DATE', 'DATETIME'];
            typeDate.forEach(fldType => {
                notDateOp.forEach(op => {
                    try {
                        operator({type: `${fldType}`, operator: op, valActual: 1, valExpect: 1});
                        done(`missing operator "${op}" to field type "${fldType}"`);
                    } catch (e) {
                        should(e).have.property('code', 'SSS_INVALID_SRCH_OPERATOR');
                    }
                });
            });

            return done();
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });

});
