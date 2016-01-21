'use strict';

var should = require('should'),
    nsmockup = require('../');

var base = __dirname + '/_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create User Event>', function() {
    this.timeout(5000);
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

    beforeEach(done => {
        let metadata = [
                base + '/meta/customrecord_codeg_ids.json'
            ],
            records = {
                'customrecord_codeg_ids': base + '/data/customrecord_codeg_ids.json'
            };
        nsmockup.init({records, metadata}, done);
    });
    describe('Create Script - User Event', () => {
        it('user-event: type - "createUserEvent"', done => {
            nsmockup.createUserEvent(opts, (ctx) => {
                should(ctx.FakeUserEvent).be.ok();

                let init = {
                        custrecord_id_code_id: 434,
                        custrecord_id_title_id: 'japo 434'
                    },
                    record = nlapiCreateRecord('customrecord_codeg_ids', init);

                nlapiSubmitRecord(record);

                let context = ctx.nlapiGetContext();
                should(context).be.ok();

                let beforeSubmitType = context.getSessionObject('before-submit-type'),
                    beforeSubmitParam = context.getSessionObject('before-submit-param');
                should(beforeSubmitType).be.equal('create');
                should(beforeSubmitParam).be.equal('23');

                let beforeSubmitOldCode = context.getSessionObject('before-submit-old-code'),
                    beforeSubmitNewCode = context.getSessionObject('before-submit-new-code'),
                    beforeSubmitRecId = context.getSessionObject('before-submit-rec-id'),
                    beforeSubmitRecType = context.getSessionObject('before-submit-rec-type');

                should(beforeSubmitOldCode).be.equal(null);
                should(beforeSubmitNewCode).be.equal('434');
                should(beforeSubmitRecId).be.equal('-1');
                should(beforeSubmitRecType).be.equal('customrecord_codeg_ids');

                let afterSubmitType = context.getSessionObject('after-submit-type'),
                    afterSubmitParam = context.getSessionObject('after-submit-param');
                should(afterSubmitType).be.equal('create');
                should(afterSubmitParam).be.equal('23');

                let afterSubmitOldCode = context.getSessionObject('after-submit-old-code'),
                    afterSubmitNewCode = context.getSessionObject('after-submit-new-code'),
                    afterSubmitRecId = context.getSessionObject('after-submit-rec-id'),
                    afterSubmitRecType = context.getSessionObject('after-submit-rec-type');

                should(afterSubmitOldCode).be.equal(null);
                should(afterSubmitNewCode).be.equal('434');
                should(afterSubmitRecId).be.equal('90');
                should(afterSubmitRecType).be.equal('customrecord_codeg_ids');
                return done();
            });
        });

        it('user-event: type - "edit"', done => {
            nsmockup.createUserEvent(opts, (ctx) => {
                should(ctx.FakeUserEvent).be.ok();

                let record = nlapiLoadRecord('customrecord_codeg_ids', 219);
                record.setFieldValue('custrecord_id_code_id', 2190);

                nlapiSubmitRecord(record);

                let context = ctx.nlapiGetContext();
                should(context).be.ok();

                let beforeSubmitType = context.getSessionObject('before-submit-type'),
                    beforeSubmitParam = context.getSessionObject('before-submit-param');
                should(beforeSubmitType).be.equal('edit');
                should(beforeSubmitParam).be.equal('23');

                let beforeSubmitOldCode = context.getSessionObject('before-submit-old-code'),
                    beforeSubmitNewCode = context.getSessionObject('before-submit-new-code'),
                    beforeSubmitRecId = context.getSessionObject('before-submit-rec-id'),
                    beforeSubmitRecType = context.getSessionObject('before-submit-rec-type');

                should(beforeSubmitOldCode).be.equal('219');
                should(beforeSubmitNewCode).be.equal('2190');
                should(beforeSubmitRecId).be.equal('219');
                should(beforeSubmitRecType).be.equal('customrecord_codeg_ids');


                let afterSubmitType = context.getSessionObject('after-submit-type'),
                    afterSubmitParam = context.getSessionObject('after-submit-param');
                should(afterSubmitType).be.equal('edit');
                should(afterSubmitParam).be.equal('23');

                let afterSubmitOldCode = context.getSessionObject('after-submit-old-code'),
                    afterSubmitNewCode = context.getSessionObject('after-submit-new-code'),
                    afterSubmitRecId = context.getSessionObject('after-submit-rec-id'),
                    afterSubmitRecType = context.getSessionObject('after-submit-rec-type');

                should(afterSubmitOldCode).be.equal('219');
                should(afterSubmitNewCode).be.equal('2190');
                should(afterSubmitRecId).be.equal('219');
                should(afterSubmitRecType).be.equal('customrecord_codeg_ids');
                return done();
            });
        });

        it('user-event: type - "create" using "funcs"', done => {
            let _opts = JSON.parse(JSON.stringify(opts));
            _opts.funcs = _opts.functions;
            delete _opts.functions;
            nsmockup.createUserEvent(_opts, (ctx) => {
                should(ctx.FakeUserEvent).be.ok();

                let init = {
                        custrecord_id_code_id: 434,
                        custrecord_id_title_id: 'japo 434'
                    },
                    record = nlapiCreateRecord('customrecord_codeg_ids', init);

                nlapiSubmitRecord(record);

                let context = ctx.nlapiGetContext();
                should(context).be.ok();

                let beforeSubmitType = context.getSessionObject('before-submit-type'),
                    beforeSubmitParam = context.getSessionObject('before-submit-param');
                should(beforeSubmitType).be.equal('create');
                should(beforeSubmitParam).be.equal('23');
                return done();
            });
        });

        it('user-event: missing "opt.files"', done => {
            const errorDone = 'missing "opt.files"',
                errorMsg = 'script needs libraries: "opt.files"';

            try {
                nsmockup.createUserEvent(null, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createUserEvent({}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createUserEvent({file: {}}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createUserEvent({files: []}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('user-event: missing "opt.records"', done => {
            const errorDone = 'missing "opt.records"',
                errorMsg = 'user event needs one Record Type: "opt.records"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-user-event.js']
                };

            try {
                nsmockup.createUserEvent(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('user-event: missing "opt.functions"', done => {
            const errorDone = 'missing "opt.functions"',
                errorMsg = 'principal functions not def: "opt.functions"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-user-event.js'],
                    record: 'customrecord_codeg_ids'
                };

            try {
                nsmockup.createUserEvent(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('user-event: empty "opt.functions"', done => {
            const errorDone = 'missing "opt.functions"',
                errorMsg = 'principal functions was empty: "opt.functions"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-user-event.js'],
                    record: 'customrecord_codeg_ids',
                    functions: {}
                };

            try {
                nsmockup.createUserEvent(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('user-event: invalid step "opt.functions"', done => {
            const errorDone = 'invalid step "opt.functions"',
                errorMsg = 'invalid step opa',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-user-event.js'],
                    record: 'customrecord_codeg_ids',
                    functions: {opa: 'legal'}
                };

            try {
                nsmockup.createUserEvent(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });
    });
    afterEach(done => {
        nsmockup.destroy(done);
    });
});
