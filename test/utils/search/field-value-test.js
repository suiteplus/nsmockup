'use strict';

var should = require('should'),
    moment = require('moment'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../../'),
    fieldValue = require('../../../lib/search-utils/field-value');

var base = __dirname + '/../../_input-files/record-data';

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    this.timeout(5000);

    before(function (done) {
        let metadata = [
                `${base}/meta/customlist_batchtype.json`,
                `${base}/meta/customrecord_codeg.json`
            ],
            records = {
                'customlist_batchtype': `${base}/data/customlist_batchtype.json`,
                'customrecord_codeg': `${base}/data/customrecord_codeg.json`
            },
            opts = {
                general: {
                    dateFormat: 'DD-MM-YYYY',
                    timeFormat: 'HH:mm:ss'
                },
                metadata,
                records
            };
        nsmockup.init(opts, done);
    });

    parallel('SuiteScript API - Search Utils - "field-value":', function () {
        it('field-value: customlist', function (done) {
            let dataTest = [{value: 1, expect: 'DOC'}, {value: 3, expect: 3}];
            dataTest.forEach(o => {
                let opts = {
                    type: 'customrecord_codeg',
                    code: 'custrecord_code_batch',
                    value: o.value
                };
                let value = fieldValue(opts);

                should(value).be.equal(o.expect, `invalid value [${o.value}] != "${o.expect}"`);
            });
            return done();
        });

        it('field-value: currency', function (done) {
            let dataTest = [
                {value: 10.013, expect: 10.013},
                {value: '10.013', expect: 10.013},
                {value: null, expect: 0}
            ];
            dataTest.forEach(o => {
                let opts = {
                    type: 'customrecord_codeg',
                    code: 'custrecord_code_currency',
                    value: o.value
                };
                let value = fieldValue(opts);

                should(value).be.equal(o.expect, `invalid value [${o.value}] != "${o.expect}"`);
            });
            return done();
        });

        it('field-value: decimal', function (done) {
            let dataTest = [
                {value: 10.013, expect: 10.013},
                {value: '10.013', expect: 10.013},
                {value: null, expect: 0}
            ];
            dataTest.forEach(o => {
                let opts = {
                    type: 'customrecord_codeg',
                    code: 'custrecord_code_decimal',
                    value: o.value
                };
                let value = fieldValue(opts);

                should(value).be.equal(o.expect, `invalid value [${o.value}] != "${o.expect}"`);
            });
            return done();
        });

        it('field-value: multiselect', function (done) {
            let dataTest = [
                {value: 1, expect: 1},
                {value: '1', expect: '1'},
                {value: null, expect: null}
            ];
            dataTest.forEach(o => {
                let opts = {
                    type: 'customrecord_codeg',
                    code: 'custrecord_code_multiselect',
                    value: o.value
                };
                let value = fieldValue(opts);

                should(value).be.equal(o.expect, `invalid value [${o.value}] != "${o.expect}"`);
            });
            return done();
        });

        it('field-value: date', function (done) {
            let date = moment.utc([2015, 10, 14, 22, 34, 23]),
                dateStr = date.toJSON(),
                dataTest = [
                {value: dateStr, expect: '14-11-2015'},
                {value: date, expect: '14-11-2015'},
                {value: '14-11-2015 22:34:23', expect: '14-11-2015'},
                {value: null, expect: ''}
            ];
            dataTest.forEach(o => {
                let opts = {
                    type: 'customrecord_codeg',
                    code: 'custrecord_code_date',
                    value: o.value
                };
                let value = fieldValue(opts);

                should(value).be.equal(o.expect, `invalid value [${o.value}] != "${o.expect}"`);
            });
            return done();
        });

        it('field-value: datetime', function (done) {
            let date = moment.utc([2015, 10, 14, 22, 34, 23]),
                dateStr = date.toJSON(),
                dataTest = [
                    {value: dateStr, expect: '14-11-2015 22:34:23'},
                    {value: date, expect: '14-11-2015 22:34:23'},
                    {value: '14-11-2015 22:34:23', expect: '14-11-2015 22:34:23'},
                    {value: null, expect: ''}
                ];
            dataTest.forEach(o => {
                let opts = {
                    type: 'customrecord_codeg',
                    code: 'custrecord_code_datetime',
                    value: o.value
                };
                let value = fieldValue(opts);

                should(value).be.equal(o.expect, `invalid value [${o.value}] != "${o.expect}"`);
            });
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});