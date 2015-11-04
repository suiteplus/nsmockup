'use strict';

var should = require('should'),
    nsmockup = require('../');

var base = __dirname + '/_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create Schedule>', function () {
    this.timeout(5000);
    before(function (done) {
        let metadata = [
                base + '/meta/customrecord_codeg_ids.json'
            ],
            records = {
                'customrecord_codeg_ids': base + '/data/customrecord_codeg_ids.json'
            };
        nsmockup.init({records, metadata}, done);
    });
    describe('Create Script - Schedule', function () {
        it('schedule: create', function (done) {
            nsmockup.createSchedule({
                name: 'customscript_my_schedule',
                files: [
                    __dirname + '/_input-files/scripts/fake-schedule.js'
                ],
                func: 'ScheduleFake',
                params: {
                    'fake-param': 'customrecord_codeg_ids'
                },
                exec: true
            }, (ctx) => {
                should(ctx.context).be.ok();
                should(ctx.ScheduleFake).be.ok();

                return done();
            });
        });

        it('schedule: missing "opt.files"', function(done) {
            const errorDone = 'missing "opt.files"',
                errorMsg = 'script needs libraries: "opt.files"';

            try {
                nsmockup.createSchedule(null, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createSchedule({}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createSchedule({file: {}}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createSchedule({files: []}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('schedule: missing "opt.func"', function(done) {
            const errorDone = 'missing "opt.func"',
                errorMsg = 'principal function not def: "opt.func"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-schedule.js']
                };

            try {
                nsmockup.createSchedule(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('schedule: invalid "opt.func"', function(done) {
            const errorDone = 'invalid method "opt.funcs"',
                errorMsg = 'invalid type of principal function, string only: "opt.func"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-schedule.js'],
                    func: {opa: 1}
                };

            try {
                nsmockup.createSchedule(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
