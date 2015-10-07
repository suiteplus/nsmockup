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
    describe('SuiteScript API - nlapiSubmitRecord:', function () {
        let recType = 'customrecord_codeg';

        it('submit new record', function (done) {
            let initValues = {
                    custrecord_type_id: 111,
                    custrecord_code_id: 194
                },
                o = nlapiCreateRecord(recType, initValues);

            should(o).have.instanceOf(nlobjRecord);

            should(o.getAllFields()).have.length(2);

            Object.keys(initValues).forEach(f => {
                should(o.getFieldValue(f)).be.equal(initValues[f]);
            });

            let sizeBefore = $db(recType).size(),
                id = nlapiSubmitRecord(o);

            should(id).be.equal(sizeBefore + 1);

            let columns = [
                    'custrecord_type_id',
                    'custrecord_code_id'
                ].map(c => new nlobjSearchColumn(c)),
                result = nlapiSearchRecord(recType, id, null, columns);
            should(result).have.length(1);

            Object.keys(initValues).forEach(f => {
                should(o.getFieldValue(f)).be.equal(result[0].getValue(f));
            });

            return done();
        });

        it('submit update record', function (done) {
            let initValues = {
                    custrecord_type_id: 111,
                    custrecord_code_id: 194
                },
                o = nlapiCreateRecord(recType, initValues);

            should(o).have.instanceOf(nlobjRecord);

            should(o.getAllFields()).have.length(2);

            Object.keys(initValues).forEach(f => {
                should(o.getFieldValue(f)).be.equal(initValues[f]);
            });
            o.id = 1;

            let sizeBefore = $db(recType).size(),
                id = nlapiSubmitRecord(o);

            should($db(recType).size()).be.equal(sizeBefore);

            let columns = [
                    'custrecord_type_id',
                    'custrecord_code_id'
                ].map(c => new nlobjSearchColumn(c)),
                result = nlapiSearchRecord(recType, id, null, columns);
            should(result).have.length(1);

            should(result[0].getId(), o.id);
            Object.keys(initValues).forEach(f => {
                should(o.getFieldValue(f)).be.equal(result[0].getValue(f));
            });

            return done();
        });

        it('submit missing record', function (done) {
            try {
                let o = nlapiSubmitRecord();
                should(o).have.instanceOf(nlobjRecord);
                return done('missing record type: '+o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_RECORD_OBJ_REQD');
                return done();
            }
        });

        it('submit missing record type', function (done) {
            try {
                let invalidRecType = recType+'japoooo',
                    o = nlapiSubmitRecord(new nlobjRecord(invalidRecType));
                should(o).have.instanceOf(nlobjRecord);
                return done('missing record type: '+invalidRecType);
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
