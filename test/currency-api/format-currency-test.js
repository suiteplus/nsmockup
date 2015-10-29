'use strict';

var should = require('should'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Currency API>', function () {
    describe('SuiteScript API - nlapiFormatCurrency:', function () {

        it('format-currency default currency', function (done) {
            nsmockup.init((err) => {
                if (err) return done(err);
                else {
                    should(nlapiFormatCurrency).be.ok();

                    let val1 = nlapiFormatCurrency(12),
                        val2 = nlapiFormatCurrency('14'),
                        val3 = nlapiFormatCurrency('15.8'),
                        val4 = nlapiFormatCurrency('15,9'),
                        val5 = nlapiFormatCurrency('12339159.1231');

                    should(val1).be.equal('$ 12.00');
                    should(val2).be.equal('$ 14.00');
                    should(val3).be.equal('$ 15.80');
                    should(val4).be.equal('$ 159.00');
                    should(val5).be.equal('$ 12,339,159.12');

                    try {
                        nlapiFormatCurrency('opaa');
                        return done('invalid current number');
                    } catch(e) {
                        should(e).have.property('code', 'SSS_INVALID_VALUE');
                    }

                    return done();
                }
            });
        });

        it('format-currency brazilian currency', function (done) {

            let localPrefs = {
                    currency: 'R$',
                    numberFormat: {
                        decimal: ',',
                        thousand: '.'
                    }
                },
                opts = {
                    general: localPrefs
                };
            nsmockup.init(opts, (err) => {
                if (err) return done(err);
                else {
                    should(nlapiFormatCurrency).be.ok();

                    let val1 = nlapiFormatCurrency(12),
                        val2 = nlapiFormatCurrency('14'),
                        val3 = nlapiFormatCurrency('15.8'),
                        val4 = nlapiFormatCurrency('15,9'),
                        val5 = nlapiFormatCurrency('12339159.1231');

                    should(val1).be.equal('R$ 12,00');
                    should(val2).be.equal('R$ 14,00');
                    should(val3).be.equal('R$ 15,80');
                    should(val4).be.equal('R$ 159,00');
                    should(val5).be.equal('R$ 12.339.159,12');

                    try {
                        nlapiFormatCurrency('opaa');
                        return done('invalid current number');
                    } catch(e) {
                        should(e).have.property('code', 'SSS_INVALID_VALUE');
                    }

                    return done();
                }
            });
        });
    });
    afterEach(function (done) {
        nsmockup.destroy(done);
    });
});
