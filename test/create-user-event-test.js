'use strict';

var should = require('should'),
    nsmockup = require('../');

var base = __dirname + '/_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create User Event>', function () {
    this.timeout(5000);
    let opts = {
        name: 'customscript_add_user-event',
        files: [
            __dirname + '/_input-files/scripts/fake-user-event.js'
        ],
        funcs: {
            beforeLoad: 'FakeUserEvent.beforeLoad',
            beforeSubmit: 'FakeUserEvent.beforeSubmit',
            afterSubmit: 'FakeUserEvent.afterSubmit'
        },
        params: {
            'fake-param': 23,
            'field-param': 'custrecord_id_code_id'
        },
        record: 'customrecord_codeg_ids'
    };

    beforeEach(function (done) {
        let metadatas = [
                base + '/meta/recordType-metaData-codeg_ids.json'
            ],
            records = {
                'customrecord_codeg_ids': base + '/data/recordType-codeg_ids.json'
            };
        nsmockup.init({records, metadatas}, done);
    });
    describe('Create Script - User Event', function () {
        it('user event - type: "create"', function (done) {
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
                should(afterSubmitRecId).be.equal('-1');
                should(afterSubmitRecType).be.equal('customrecord_codeg_ids');
                return done();
            });
        });
        it('user event - type: "edit"', function (done) {
            nsmockup.createUserEvent(opts, (ctx) => {
                should(ctx.FakeUserEvent).be.ok();

                let record = nlapiLoadRecord('customrecord_codeg_ids', 219);
                record.setFieldValue('custrecord_id_code_id', 2190);

                nlapiSubmitRecord(record);

                let context = ctx.nlapiGetContext();
                should(context).be.ok();

                let beforeLoadType = context.getSessionObject('before-load-type'),
                    beforeLoadParam = context.getSessionObject('before-load-param');
                should(beforeLoadType).be.equal('view');
                should(beforeLoadParam).be.equal('23');

                let beforeLoadOldCode = context.getSessionObject('before-load-old-code'),
                    beforeLoadNewCode = context.getSessionObject('before-load-new-code'),
                    beforeLoadRecId = context.getSessionObject('before-load-rec-id'),
                    beforeLoadRecType = context.getSessionObject('before-load-rec-type');

                should(beforeLoadOldCode).be.equal('219');
                should(beforeLoadNewCode).be.equal('219');
                should(beforeLoadRecId).be.equal('219');
                should(beforeLoadRecType).be.equal('customrecord_codeg_ids');

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
    });
    afterEach(function (done) {
        nsmockup.destroy(done);
    });
});
