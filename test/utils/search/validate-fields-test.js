'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../../'),
    $metadata = require('../../../lib/db-utils/metadata'),
    validateFields = require('../../../lib/search-utils/validate-fields');

var base = __dirname + '/../../_input-files/record-data';

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    this.timeout(5000);

    let meta;

    before(done => {
        let metadata = [
                `${base}/meta/customrecord_codeg.json`,
                `${base}/meta/customlist_batchtype.json`
            ],
            records = {
                'customlist_batchtype': `${base}/data/customlist_batchtype.json`
            },
            opts = {
                metadata,
                records
            };
        nsmockup.init(opts, err => {
            if (err) {
                return done(err);
            } else {
                meta = $metadata.find('customrecord_codeg');
                return done();
            }
        });
    });

    parallel('SuiteScript API - Search Utils - "validate-fields":', () => {
        it('validate-fields: customlist', done => {
            //let opts = {
            //    type: 'customrecord_codeg',
            //    code: 'custrecord_code_batch',
            //    value: o.value
            //};
            //let value = fieldValue(opts);
            //
            //should(value).be.equal(o.expect, `invalid value [${o.value}] != "${o.expect}"`);
            return done();
        });

        it('validate-fields: validateFilters - missing meta', done => {
            try {
                validateFields.validateFilters();
                return done('missing meta');
            } catch(e) {
                should(e).have.property('code', 'SSS_META_ARG_REQ');
                return done();
            }
        });

        it('validate-fields: validateColumns - missing meta', done => {
            try {
                validateFields.validateColumns();
                return done('missing meta');
            } catch(e) {
                should(e).have.property('code', 'SSS_META_ARG_REQ');
                return done();
            }
        });

        it('validate-fields: validateFilters - invalid filter name', done => {
            try {
                validateFields.validateFilters(meta, new nlobjSearchFilter('custrecord_code_invalid-col', null, 'is', 1));
                return done('invalid filter name');
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_SRCH_FILTER');
            }
            try {
                validateFields.validateFilters(meta, {name: 'custrecord_code_invalid-col'});
                return done('invalid filter name');
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_SRCH_FILTER');
            }
            return done();
        });

        it('validate-fields: validateFilters - invalid filter join', done => {
            try {
                validateFields.validateFilters(meta, new nlobjSearchFilter('legal', 'custrecord_code_invalid-col', 'is', 1));
                return done('invalid filter join');
            } catch(e) {
                console.log(e.stack);
                should(e).have.property('code', 'SSS_INVALID_SRCH_FILTER_JOIN');
            }
            try {
                validateFields.validateFilters(meta, {join: 'custrecord_code_invalid-col', name: 'legal'});
                return done('invalid filter join');
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_SRCH_FILTER_JOIN');
            }
            return done();
        });

        it('validate-fields: validateColumns - invalid column name', done => {
            try {
                validateFields.validateColumns(meta, new nlobjSearchColumn('custrecord_code_invalid-col'));
                return done('invalid column name');
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_SRCH_COL_NAME');
            }
            try {
                validateFields.validateColumns(meta, {name: 'custrecord_code_invalid-col'});
                return done('invalid column name');
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_SRCH_COL_NAME');
            }
            return done();
        });

        it('validate-fields: validateColumns - invalid column join', done => {
            try {
                validateFields.validateColumns(meta, new nlobjSearchColumn('legal', 'custrecord_code_invalid-col'));
                return done('invalid column join');
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_SRCH_COL_JOIN');
            }
            try {
                validateFields.validateColumns(meta, {join: 'custrecord_code_invalid-col', name: 'legal'});
                return done('invalid column join');
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_SRCH_COL_JOIN');
            }
            return done();
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});