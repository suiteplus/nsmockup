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
    describe('SuiteScript API - nlapiSubmitField:', () => {
        let recType = 'customrecord_codeg';

        it('submit array fields', done => {
            let fields = [
                'custrecord_type_id.custrecord_id_title_id',
                'custrecord_type_id.custrecord_id_code_id',
                'custrecord_code_id'
            ];

            let code = nlapiLookupField(recType, 2, fields);
            should(code).have.instanceOf(Object);
            should(code).have.property('custrecord_type_id.custrecord_id_title_id', 'japo 219');
            should(code).have.property('custrecord_type_id.custrecord_id_code_id', '219');
            should(code).have.property('custrecord_code_id', '14');

            let values = [
                'legal 123',
                '342',
                '666'
            ];

            nlapiSubmitField(recType, 2, fields[2], values[2]);

            code = nlapiLookupField(recType, 2, fields);
            should(code).have.instanceOf(Object);
            should(code).have.property('custrecord_type_id.custrecord_id_title_id', 'japo 219');
            should(code).have.property('custrecord_type_id.custrecord_id_code_id', '219');
            should(code).have.property('custrecord_code_id', values[2]);

            return done();
        });

        it('submit missing record type', done => {
            try {
                nlapiSubmitField();
                return done('missing record type ');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ARG_REQD');
                return done();
            }
        });

        it('submit missing id', done => {
            try {
                nlapiSubmitField(recType);
                return done('missing id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_ID_ARG_REQD');
                return done();
            }
        });

        it('submit missing fields', done => {
            try {
                nlapiSubmitField(recType, 5);
                return done('missing id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_FIELDS_ARG_REQD');
                return done();
            }
        });

        it('submit missing fields - []', done => {
            try {
                nlapiSubmitField(recType, 5, []);
                return done('missing id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_FIELDS_ARG_REQD');
                return done();
            }
        });

        it('submit missing values', done => {
            try {
                nlapiSubmitField(recType, 5, 'opa');
                return done('missing id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_VALUES_ARG_REQD');
                return done();
            }
        });

        it('submit missing values - []', done => {
            try {
                nlapiSubmitField(recType, 5, 'opa', []);
                return done('missing id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_VALUES_ARG_REQD');
                return done();
            }
        });

        it('submit invalid record type', done => {
            try {
                let invalidRecType = recType + 'japois';
                nlapiSubmitField(invalidRecType, 1, 'custrecord_code_id', 'opa', 'legal');
                return done('invalid record type: ' + invalidRecType);
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_RECORD_TYPE');
                return done();
            }
        });

        it('submit invalid id - {}', done => {
            try {
                nlapiSubmitField(recType, {}, 'opa', 'legal');
                return done('invalid id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_INTERNAL_ID');
                return done();
            }
        });

        it('submit invalid id - "opa"', done => {
            try {
                nlapiSubmitField(recType, 'opa', 'opa', 'legal');
                return done('invalid id ');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_INTERNAL_ID');
                return done();
            }
        });

        it('submit invalid id - 10000', done => {
            try {
                nlapiSubmitField(recType, '10000', 'custrecord_code_id', '14');
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
