'use strict';

var should = require('should'),
    nsmockup = require('../');

var base = __dirname + '/_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create Restlet>', function () {
    this.timeout(10000);
    before(done => {
        let cfg = {server: true};
        nsmockup.init(cfg, done);
    });
    describe('Create SuiteScript', () => {
        it('client', done => {
            let opts = {},
                type = 'client';
            try {
                nsmockup.createSuiteScript(type, opts, () => {
                    return done('invalid SuiteScript');
                });
            } catch(e) {
                should(e).be.equal(`Cannot simulate "${type}" in nsmockup yeat!`);
                return done();
            }
        });

        it('mass-update', done => {
            let opts = {},
                type = 'mass-update';
            try {
                nsmockup.createSuiteScript(type, opts, () => {
                    return done('invalid SuiteScript');
                });
            } catch(e) {
                should(e).be.equal(`Cannot simulate "${type}" in nsmockup yeat!`);
                return done();
            }
        });

        it('portlet', done => {
            let opts = {},
                type = 'portlet';
            try {
                nsmockup.createSuiteScript(type, opts, () => {
                    return done('invalid SuiteScript');
                });
            } catch(e) {
                should(e).be.equal(`Cannot simulate "${type}" in nsmockup yeat!`);
                return done();
            }
        });

        it('restlet', done => {
            let opts = {
                name: 'customscript_add_restlet',
                files: [
                    __dirname + '/_input-files/scripts/fake-restlet.js'
                ],
                functions: {
                    get: 'FakeRestlet.post'
                },
                params: {
                    'fake-param': 12
                }
            };
            nsmockup.createSuiteScript('restlet', opts, (ctx) => {
                should(ctx.FakeRestlet).be.ok();
                
                return done();
            });
        });

        it('schedule', done => {
            let opts = {
                name: 'customscript_my_schedule',
                files: [
                    __dirname + '/_input-files/scripts/fake-schedule.js'
                ],
                function: 'ScheduleFake',
                params: {
                    'fake-param': 'customrecord_codeg_ids'
                }
            };
            nsmockup.createSuiteScript('schedule', opts, (ctx) => {
                should(ctx.context).be.ok();
                should(ctx.ScheduleFake).be.ok();

                return done();
            });
        });

        it('suitelet', done => {
            let opts = {
                name: '_add_suitlet',
                files: [
                    __dirname + '/_input-files/scripts/add.js'
                ],
                function: 'addTest'
            };
            nsmockup.createSuiteScript('suitelet', opts, (ctx) => {
                should(ctx.addTest).be.ok();

                return done();
            });
        });

        it('workflow', done => {
            let opts = {},
                type = 'workflow';
            try {
                nsmockup.createSuiteScript(type, opts, () => {
                    return done('invalid SuiteScript');
                });
            } catch(e) {
                should(e).be.equal(`Cannot simulate "${type}" in nsmockup yeat!`);
                return done();
            }
        });

        it('user-event', done => {
            let opts = {
                name: 'customscript_add_user-event',
                files: [
                    __dirname + '/_input-files/scripts/fake-user-event.js'
                ],
                functions: {
                    beforeLoad: 'FakeUserEvent.beforeLoad',
                    beforeSubmit: 'FakeUserEvent.beforeSubmit',
                    afterSubmit: 'FakeUserEvent.afterSubmit'
                },
                params: {
                    'fake-param': 23,
                    'field-param': 'custrecord_id_code_id'
                },
                records: ['customrecord_codeg_ids']
            };
            nsmockup.createSuiteScript('user-event', opts, (ctx) => {
                should(ctx.FakeUserEvent).be.ok();
                
                return done();
            });
        });

        it('library', done => {
            let opts = {},
                type = 'library';
            try {
                nsmockup.createSuiteScript(type, opts, () => {
                    return done('invalid SuiteScript');
                });
            } catch(e) {
                should(e).be.equal(`Invalid SuiteScript type: ${type}`);
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
