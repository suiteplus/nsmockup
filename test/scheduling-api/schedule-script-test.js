'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Scheduling API>', function () {
    this.timeout(5000);
    before(done => {
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
    describe('SuiteScript - nlapiScheduleScript', () => {
        let ctx;
        before(done => {
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

        it('schedule-script execute with no params', done => {
            let status = nlapiScheduleScript('customscript_my_schedule', 'customdeploy_my_schedule');
            should(status).be.equal('QUEUED');
            return done();
        });

        it('schedule-script execute with params', done => {
            let params = {
                    'fake-param': 'customrecord_codeg'
                },
                status = nlapiScheduleScript('customscript_my_schedule', 'customdeploy_my_schedule', params);
            should(status).be.equal('QUEUED');
            return done();
        });

        it('schedule-script execute by ID', done => {
            let status = nlapiScheduleScript(1, {});
            should(status).be.equal('QUEUED');
            return done();
        });

        it('schedule-script execute by string ID', done => {
            let status = nlapiScheduleScript('1', {});
            should(status).be.equal('QUEUED');
            return done();
        });

        it('schedule-script missing script', done => {
            try {
                nlapiScheduleScript();
                return done('missing id');
            } catch (e) {
                should(e).have.property('code', 'SSS_SCRIPT_ARG_REQD');
                return done();
            }
        });

        it('schedule-script missing deploy', done => {
            try {
                nlapiScheduleScript('customscript_my_schedule');
                return done('missing id');
            } catch (e) {
                should(e).have.property('code', 'SSS_DEPLOY_ARG_REQD');
                return done();
            }
        });

        it('schedule-script invalid script', done => {
            try {
                nlapiScheduleScript('customscript_my_schedule_japo', 'customdeploy_my_schedule');
                return done('missing deploy');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_SCRIPT_ARG');
                return done();
            }
        });

        it('schedule-script invalid ID', done => {
            try {
                nlapiScheduleScript(2, {});
                return done('missing deploy');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_SCRIPT_ARG');
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
