'use strict';

var should = require('should'),
    nsmockup = require('../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Context API>', function () {
    this.timeout(10000);
    before(function (done) {
        return done();
    });
    describe('SuiteScript API - nlapiGetContext:', function () {
        it('just get context object', function (done) {
            var context = nlapiGetContext();
            should(context).have.instanceOf(nlobjContext);

            return done();
        });
    });
    after(function (done) {
        $NS_CONTECXT_OBJ = null;
       return done();
    });
});
