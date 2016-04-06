'use strict';

var nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Context API>', function () {
    before(done => {
        nsmockup.init(done);
    });

    describe('SuiteScript API - nlapiLogExecution:', () => {
        it('just test netsuite log', done => {
            nlapiLogExecution('DEBUG', 'oaiaia', 'oaooaoaas');
            nlapiLogExecution('AUDIT', 'cuidaaa', new Date());
            nlapiLogExecution('ERROR', 'errouuu', new Error());
            nlapiLogExecution('EMERGENCY', 'ihhh agoraaa??', nlapiCreateError());

            return done();
        });
    });

    after(done => {
        nsmockup.destroy(done);
    });
});
