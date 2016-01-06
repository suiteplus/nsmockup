'use strict';

var should = require('should'),
    nsmockup = require('../../'),
    path = require('path');

var base = __dirname + '/../_input-files';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Bundle Script>', function () {
    this.timeout(5000);
    before(function (done) {
        nsmockup.init(done);
    });
    describe('SuiteScript - nlapiScheduleScript', function () {
        it('bundle-script execute', function (done) {
            nsmockup.createSchedule({
                id: 'customscript_my_schedule',
                files: ['-ignore-'],
                bundle: {
                    main: `${base}/scripts/my-require.js`,
                    var: 'MockVarFake'
                },
                func: 'MockVarFake.legal',
                exec: true
            }, (context) => {
                should(context.MockVarFake).be.ok();

                return done();
            });
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
