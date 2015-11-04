'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
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
    parallel('SuiteScript API - nlapiSearchRecord:', function () {
        let recType = 'customrecord_codeg';

        it('search all', function (done) {
            var columns = [
                'custrecord_type_id',
                'custrecord_code_id'
            ].map(c => new nlobjSearchColumn(c));

            let codes = nlapiSearchRecord(recType, null, null, columns);
            should(codes).have.length(1244);
            for (let i = 0; i < codes.length; i++) {
                let code = codes[i];
                should(code).have.instanceOf(nlobjSearchResult);
                should(code).have.property('id');
                should(code).have.property('type', 'customrecord_codeg');
                //should(code).have.property('rawColumns').have.length(3);

                let cols = code.getAllColumns();
                should(cols).have.length(2);
                for (let j = 0; j < cols.length; j++) {
                    let col = cols[j];
                    should(col).have.instanceOf(nlobjSearchColumn);
                    should(col).have.property('name').have.equalOneOf(['custrecord_type_id', 'custrecord_code_id']);
                }
            }

            return done();
        });

        it('search by internalid', function (done) {
            let columns = [
                'custrecord_type_id',
                'custrecord_code_id'
            ].map(c => new nlobjSearchColumn(c));

            var codes = nlapiSearchRecord(recType, 5, null, columns);
            should(codes).have.length(1);
            return done();
        });

        it('search one field (using nlobjSearchFilter)', function (done) {
            let columns = [
                    'custrecord_type_id',
                    'custrecord_code_id'
                ].map(c => new nlobjSearchColumn(c)),
                filters = [
                    ['custrecord_type_id', null, 'anyof', 237]
                ].map(f => new nlobjSearchFilter(f[0], f[1], f[2], f[3]));

            var codes = nlapiSearchRecord(recType, null, filters, columns);
            should(codes).have.length(224);
            return done();
        });

        it('search one field (using array filter)', function (done) {
            let columns = [
                    'custrecord_type_id',
                    'custrecord_code_id'
                ].map(c => new nlobjSearchColumn(c)),
                filters = [
                    ['custrecord_type_id', null, 'anyof', 237]
                ];

            var codes = nlapiSearchRecord(recType, null, filters, columns);
            should(codes).have.length(224);
            return done();
        });

        it('search one field + join', function (done) {
            let columns = [
                    'custrecord_type_id',
                    'custrecord_code_id'
                ].map(c => new nlobjSearchColumn(c)),
                filters = [
                    ['custrecord_id_title_id', 'custrecord_type_id', 'is', 'japo 266']
                ].map(f => new nlobjSearchFilter(f[0], f[1], f[2], f[3]));

            var codes = nlapiSearchRecord(recType, null, filters, columns);
            should(codes).have.length(15);
            return done();
        });

        it('search one field + join and column join (raw params)', function (done) {
            let columns = [
                    ['custrecord_id_title_id', 'custrecord_type_id'],
                    ['custrecord_code_id']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['internalid', 'custrecord_type_id', 'is', '266'],
                    ['custrecord_id_title_id', 'custrecord_type_id', 'is', 'japo 266']
                ].map(f => new nlobjSearchFilter(f[0], f[1], f[2], f[3]));

            let codes = nlapiSearchRecord(recType, null, filters, columns);
            should(codes).have.length(15);
            let code = codes[0];
            should(code).have.property('id', 11);
            should(code).have.property('type', 'customrecord_codeg');
            let code_id = code.getValue('custrecord_id_title_id', 'custrecord_type_id');
            should(code_id).have.equal('japo 266');

            return done();
        });

        it('search one field + join and column join (using nlobjSearchColumn)', function (done) {
            let columns = [
                    ['custrecord_id_title_id', 'custrecord_type_id'],
                    ['custrecord_code_id']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['custrecord_id_title_id', 'custrecord_type_id', 'is', 'japo 266']
                ].map(f => new nlobjSearchFilter(f[0], f[1], f[2], f[3]));

            let codes = nlapiSearchRecord(recType, null, filters, columns);
            should(codes).have.length(15);
            let code = codes[0];
            should(code).have.property('id', 11);
            should(code).have.property('type', 'customrecord_codeg');
            let code_id = code.getValue(new nlobjSearchColumn('custrecord_id_title_id', 'custrecord_type_id'));
            should(code_id).have.equal('japo 266');

            return done();
        });

        it('search missing "type"', function(done) {
            try {
                nlapiSearchRecord();
                return done('missing type');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ARG_REQD');
                return done();
            }
        });

        it('search ivalid "id"', function(done) {
            try {
                nlapiSearchRecord(recType, 'opa');
                return done('invalid id');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_INTERNAL_ID');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
