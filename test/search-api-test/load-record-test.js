'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    before(function (done) {
        let metadatas = [
                base + '/meta/recordType-metaData-codeg.json',
                base + '/meta/recordType-metaData-codeg_ids.json'
            ],
            records = {
                'customrecord_codeg': base + '/data/recordType-codeg.json',
                'customrecord_codeg_ids': base + '/data/recordType-codeg_ids.json'
            };
        nsmockup.init({records, metadatas}, done);
    });
    describe('SuiteScript API - nlapiLoadRecord:', function () {
        let recType = 'customrecord_codeg';

        it('load by id', function (done) {
            let code = nlapiLoadRecord(recType, 1);
            should(code).have.instanceOf(nlobjRecord);
            should(code.getAllFields()).have.length(2);

            ['custrecord_type_id', 'custrecord_code_id'].forEach(f => {
                should(code.getFieldValue(f)).be.ok();
            });

            return done();
        });

        it('load missing record type', function (done) {
            try {
                let o = nlapiLoadRecord();
                should(o).have.instanceOf(nlobjRecord);
                return done('missing record type: '+o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ARG_REQD');
                return done();
            }
        });

        it('load missing id', function (done) {
            try {
                let o = nlapiLoadRecord(recType);
                should(o).have.instanceOf(nlobjRecord);
                return done('missing id: '+o.getId());
            } catch (e) {
                should(e).have.property('code', 'SSS_ID_ARG_REQD');
                return done();
            }
        });

        it('load invalid record type', function (done) {
            try {
                let invalidRecType = recType + 'japois';
                let o = nlapiLoadRecord(invalidRecType, 1);
                should(o).have.instanceOf(nlobjRecord);
                return done('invalid record type: '+o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_RECORD_TYPE');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
