'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Record API>', function () {
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
    describe('SuiteScript API - nlapiLoadRecord:', () => {
        let recType = 'customrecord_codeg';

        it('load by id', done => {
            let code = nlapiLoadRecord(recType, 1);
            should(code).have.instanceOf(nlobjRecord);
            should(code.getAllFields()).have.length(2);

            ['custrecord_type_id', 'custrecord_code_id'].forEach(f => {
                should(code.getFieldValue(f)).be.ok();
            });

            return done();
        });

        it('load missing record type', done => {
            try {
                let o = nlapiLoadRecord();
                should(o).have.instanceOf(nlobjRecord);
                return done('missing record type: ' + o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ARG_REQD');
                return done();
            }
        });

        it('load missing id', done => {
            try {
                let o = nlapiLoadRecord(recType);
                should(o).have.instanceOf(nlobjRecord);
                return done('missing id: ' + o.getId());
            } catch (e) {
                should(e).have.property('code', 'SSS_ID_ARG_REQD');
                return done();
            }
        });

        it('load invalid record type', done => {
            try {
                let invalidRecType = recType + 'japois';
                let o = nlapiLoadRecord(invalidRecType, 1);
                should(o).have.instanceOf(nlobjRecord);
                return done('invalid record type: ' + o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_RECORD_TYPE');
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
