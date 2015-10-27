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
                base + '/meta/recordType-metaData-codeg.json',
                base + '/meta/recordType-metaData-codeg_ids.json'
            ],
            records = {
                'customrecord_codeg': base + '/data/recordType-codeg.json',
                'customrecord_codeg_ids': base + '/data/recordType-codeg_ids.json'
            };
        nsmockup.init({records, metadata}, done);
    });
    describe('SuiteScript API - nlapiCreateRecord:', function () {
        let recType = 'customrecord_codeg';

        it('create new object', function (done) {
            let o = nlapiCreateRecord(recType);
            should(o).have.instanceOf(nlobjRecord);

            return done();
        });

        it('create new object + initializeValues', function (done) {
            let iniValues = {
                    custrecord_type_id: '239',
                    custrecord_code_id: '19'
                },
                o = nlapiCreateRecord(recType, iniValues);
            should(o).have.instanceOf(nlobjRecord);

            should(o.getAllFields()).have.length(2);

            Object.keys(iniValues).forEach(f => {
                should(o.getFieldValue(f)).be.equal(iniValues[f]);
            });

            return done();
        });

        it('create missing record type', function (done) {
            try {
                let o = nlapiCreateRecord();
                should(o).have.instanceOf(nlobjRecord);
                return done('invalid record type: '+o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ARG_REQD');
                return done();
            }
        });

        it('create invalid record type', function (done) {
            try {
                let invalidRecType = recType + 'japois';
                let o = nlapiCreateRecord(invalidRecType);
                should(o).have.instanceOf(nlobjRecord);
                return done('invalid record type: '+o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_RECORD_TYPE');
                return done();
            }
        });

        it('create new object + invalid initializeValues', function (done) {
            let initializeValues = {
                    custrecord_type_id_oba: 239,
                    custrecord_code_id: 19
                };

            try {
                let o = nlapiCreateRecord(recType, initializeValues);
                should(o).have.instanceOf(nlobjRecord);
                return done('invalid initializeValues type: '+o.getRecordType()+' -> '+o.getAllFields().toJSON());
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_INITIALIZE_DEFAULT_VALUE');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
