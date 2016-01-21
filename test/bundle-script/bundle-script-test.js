'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Bundle Script>', function () {
    this.timeout(5000);
    before(done => {
        nsmockup.init(done);
    });
    describe('SuiteScript - nlapiScheduleScript', () => {
        it('bundle-script execute', done => {
            nsmockup.createSchedule({
                id: 'customscript_my_schedule',
                files: [
                    [`${base}/scripts/my-require.js`, 'MockVarFake']
                ],
                function: 'MockVarFake.legal',
                exec: true
            }, (context) => {
                should(context.MockVarFake).be.ok();

                return done();
            });
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
