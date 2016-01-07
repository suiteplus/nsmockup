'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Scheduling API>', function () {
    this.timeout(5000);
    before(function (done) {
        let metadata = [
                base + '/meta/customrecord_codeg.json',
                base + '/meta/customrecord_codeg_ids.json'
            ],
            records = {
                'customrecord_codeg': base + '/data/customrecord_codeg.json',
                'customrecord_codeg_ids': base + '/data/customrecord_codeg_ids.json'
            };
        nsmockup.init({records, metadata}, done);
    });
    describe('SuiteScript - nlapiScheduleScript', function () {
        let ctx;
        before(function (done) {
            nsmockup.createSchedule({
                id: 'customscript_my_schedule',
                files: [
                    __dirname + '/../_input-files/scripts/fake-schedule.js'
                ],
                function: 'ScheduleFake',
                params: {
                    'fake-param': 'customrecord_codeg_ids'
                },
                exec: false
            }, (context) => {
                should(context.context).be.ok();
                should(context.ScheduleFake).be.ok();
                ctx = context;

                return done();
            });
        });

        it('schedule-script execute with no params', function (done) {
            let status = nlapiScheduleScript('customscript_my_schedule', 'customdeploy_my_schedule');
            should(status).be.equal('QUEUED');
            return done();
        });

        it('schedule-script execute with params', function (done) {
            let params = {
                    'fake-param': 'customrecord_codeg'
                },
                status = nlapiScheduleScript('customscript_my_schedule', 'customdeploy_my_schedule', params);
            should(status).be.equal('QUEUED');
            return done();
        });

        it('schedule-script execute by ID', function (done) {
            let status = nlapiScheduleScript(1, {});
            should(status).be.equal('QUEUED');
            return done();
        });

        it('schedule-script execute by string ID', function (done) {
            let status = nlapiScheduleScript('1', {});
            should(status).be.equal('QUEUED');
            return done();
        });

        it('schedule-script missing script', function (done) {
            try {
                nlapiScheduleScript();
                return done('missing id');
            } catch (e) {
                should(e).have.property('code', 'SSS_SCRIPT_ARG_REQD');
                return done();
            }
        });

        it('schedule-script missing deploy', function (done) {
            try {
                nlapiScheduleScript('customscript_my_schedule');
                return done('missing id');
            } catch (e) {
                should(e).have.property('code', 'SSS_DEPLOY_ARG_REQD');
                return done();
            }
        });

        it('schedule-script invalid script', function (done) {
            try {
                nlapiScheduleScript('customscript_my_schedule_japo', 'customdeploy_my_schedule');
                return done('missing deploy');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_SCRIPT_ARG');
                return done();
            }
        });

        it('schedule-script invalid ID', function (done) {
            try {
                nlapiScheduleScript(2, {});
                return done('missing deploy');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_SCRIPT_ARG');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
