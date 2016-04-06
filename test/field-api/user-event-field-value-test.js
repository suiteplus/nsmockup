'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Field API>', function () {
    this.timeout(5000);
    let opts = {
        name: 'customscript_user-event_field-value',
        files: [
            __dirname + '/../_input-files/scripts/ue-field-value.js'
        ],
        functions: {
            beforeSubmit: 'UEFieldValue.exec'
        },
        record: 'customrecord_codeg'
    };

    before(done => {
        let metadata = [
                base + '/meta/customrecord_codeg.json'
            ],
            records = {
                'customrecord_codeg': base + '/data/customrecord_codeg.json'
            };
        nsmockup.init({records, metadata}, done);
    });
    describe('SuiteScript API - nlapiGetField, nlapiGetFieldValue, nlapiSetFieldValue', () => {
        it('user-event: type - "create"', (done) => {
            nsmockup.createUserEvent(opts, (ctx) => {
                should(ctx.UEFieldValue).be.ok();

                let record = nlapiLoadRecord('customrecord_codeg', 5);

                nlapiSubmitRecord(record);

                let recordNew = nlapiLoadRecord('customrecord_codeg', 5);
                should(recordNew.getFieldValue('custrecord_code_id')).be.equal('231');
                should(recordNew.getFieldText('custrecord_type_id')).be.equal('2821');

                return done();
            });
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});