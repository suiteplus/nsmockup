'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Field API>', function () {
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
    describe('SuiteScript API - nlapiLookupField:', () => {
        let recType = 'customrecord_codeg';

        it('lookup all fields', done => {
            var fields = [
                'custrecord_type_id',
                'custrecord_code_id'
            ];

            let code = nlapiLookupField(recType, 2, fields);
            should(code).have.instanceOf(Object);
            should(code).have.property('custrecord_type_id', 219);
            should(code).have.property('custrecord_code_id', '14');

            return done();
        });

        it('lookup one field', done => {
            var field = 'custrecord_code_id';

            let code = nlapiLookupField(recType, 2, field);
            should(code).have.instanceOf(String);

            return done();
        });

        it('lookup all fields + join', done => {
            var fields = [
                'custrecord_type_id.custrecord_id_title_id',
                'custrecord_type_id.custrecord_id_code_id',
                'custrecord_code_id'
            ];

            let code = nlapiLookupField(recType, 2, fields);
            should(code).have.instanceOf(Object);
            should(code).have.property('custrecord_type_id.custrecord_id_title_id', 'japo 219');
            should(code).have.property('custrecord_type_id.custrecord_id_code_id', '219');
            should(code).have.property('custrecord_code_id', '14');

            return done();
        });

        it('lookup missing record type', done => {
            try {
                nlapiLookupField();
                return done('missing record type ');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ARG_REQD');
                return done();
            }
        });

        it('lookup missing id', done => {
            try {
                nlapiLookupField(recType);
                return done('missing id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_ID_ARG_REQD');
                return done();
            }
        });

        it('lookup missing fields', done => {
            try {
                nlapiLookupField(recType, 5);
                return done('missing id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_FIELDS_ARG_REQD');
                return done();
            }
        });

        it('lookup missing fields - []', done => {
            try {
                nlapiLookupField(recType, 5, []);
                return done('missing id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_FIELDS_ARG_REQD');
                return done();
            }
        });

        it('lookup invalid record type', done => {
            try {
                let invalidRecType = recType + 'japois';
                nlapiLookupField(invalidRecType, 1, 'custrecord_code_id');
                return done('invalid record type: ' + invalidRecType);
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_RECORD_TYPE');
                return done();
            }
        });

        it('lookup invalid id - {}', done => {
            try {
                nlapiLookupField(recType, {});
                return done('invalid id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_INTERNAL_ID');
                return done();
            }
        });

        it('lookup invalid id - "opa"', done => {
            try {
                nlapiLookupField(recType, 'opa');
                return done('invalid id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_INTERNAL_ID');
                return done();
            }
        });

        it('lookup id not found', done => {
            try {
                nlapiLookupField(recType, -1, 'custrecord_code_id');
                return done('invalid id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_INTERNAL_ID');
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
