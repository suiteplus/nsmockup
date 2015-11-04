'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Record API>', function () {
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
    describe('SuiteScript API - nlapiCopyRecord:', function () {
        let recType = 'customrecord_codeg';

        it('copy by id', function (done) {
            let code = nlapiLoadRecord(recType, 2);
            should(code).have.instanceOf(nlobjRecord);
            should(code).have.property('id', 2);

            let copy = nlapiCopyRecord(code.getRecordType(), code.getId());
            should(copy).have.instanceOf(nlobjRecord);
            should(copy).not.equal(code);
            should(copy.getRecordType()).be.equal(code.getRecordType());
            //should(copy.getAllFields()).be.equal(code.getAllFields());

            let fields = copy.getAllFields();
            for (let i = 0; i < fields.length; i++) {
                let field = fields[i];
                should(copy.getFieldValue(field)).be.equal(code.getFieldValue(field));
            }

            return done();
        });

        it('copy missing record type', function (done) {
            try {
                let o = nlapiCopyRecord();
                should(o).have.instanceOf(nlobjRecord);
                return done('missing record type: ' + o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ARG_REQD');
                return done();
            }
        });

        it('copy missing id', function (done) {
            try {
                let o = nlapiCopyRecord(recType);
                should(o).have.instanceOf(nlobjRecord);
                return done('missing id: ' + o.getId());
            } catch (e) {
                should(e).have.property('code', 'SSS_ID_ARG_REQD');
                return done();
            }
        });

        it('copy invalid record type', function (done) {
            try {
                let invalidRecType = recType + 'japois';
                let o = nlapiCopyRecord(invalidRecType, 1);
                should(o).have.instanceOf(nlobjRecord);
                return done('invalid record type: ' + o.getRecordType());
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
