'use strict';

var should = require('should');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Context API>', function () {
    describe('SuiteScript API - nlapiGetContext:', function () {
        it('just get context object', function (done) {
            var context = nlapiGetContext();
            should(context).have.instanceOf(nlobjContext);

            return done();
        });
    });

    describe('SuiteScript API - nlapiLogExecution:', function () {
        it('just test netsuite log', function (done) {
            nlapiLogExecution('DEBUG', 'oaiaia', 'oaooaoaas');
            nlapiLogExecution('AUDIT', 'cuidaaa', new Date());
            nlapiLogExecution('ERROR', 'errouuu', new Error());
            nlapiLogExecution('EMERGENCY', 'ihhh agoraaa??', nlapiCreateError());

            return done();
        });
    });
});
