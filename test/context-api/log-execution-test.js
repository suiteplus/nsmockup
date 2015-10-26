'use strict';

var nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Context API>', function () {
    before(function (done) {
        nsmockup.init(done);
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

    after(function (done) {
        nsmockup.destroy(done);
    });
});
