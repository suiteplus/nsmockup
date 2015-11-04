'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../../');

var base = __dirname + '/../../_input-files/record-data';

var validateVendor = (vendors) => {
    should(vendors).have.length(1);
    let vendor = vendors[0];
    should(vendor.getValue('name')).be.equal('Japojão Legal');
    should(vendor.getValue('name', 'subsidiary')).be.equal('São Paulo');
};

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    this.timeout(5000);

    before(function (done) {
        let metadata = [
                ':vendor',
                ':subsidiary'
            ],
            records = {
                'subsidiary': `${base}/data/subsidiary.json`,
                'vendor': `${base}/data/user.json`
            },
            opts = {metadata, records};
        nsmockup.init(opts, done);
    });
    parallel('SuiteScript API - Search Utils - "operator" - NUMBER:', function () {
        it('operator "any": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'any', [300]]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "between": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'between', 200, 400]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "equalto": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'equalto', 300]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "greaterthan": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'greaterthan', 200]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "greaterthanorequalto": vendor by fxbalance', function (done) {
            [200, 300].forEach(value => {
                let recType = 'vendor',
                    columns = [
                        ['name'],
                        ['name', 'subsidiary']
                    ].map(c => new nlobjSearchColumn(c[0], c[1])),
                    filters = [
                        ['fxbalance', null, 'greaterthanorequalto', value]
                    ];

                let vendors = nlapiSearchRecord(recType, null, filters, columns);
                validateVendor(vendors);
            });
            return done();
        });

        it('operator "lessthan": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'lessthan', 400]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "lessthanorequalto": vendor by fxbalance', function (done) {
            [400, 300].forEach(value => {
                let recType = 'vendor',
                    columns = [
                        ['name'],
                        ['name', 'subsidiary']
                    ].map(c => new nlobjSearchColumn(c[0], c[1])),
                    filters = [
                        ['fxbalance', null, 'lessthanorequalto', value]
                    ];

                let vendors = nlapiSearchRecord(recType, null, filters, columns);
                validateVendor(vendors);
            });
            return done();
        });

        it('operator "isnotempty": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'isnotempty', '@NONE@']
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "notbetween": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'notbetween', 200, 250]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "notequalto": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'notequalto', 299]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "notgreaterthan": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'notgreaterthan', 400]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "notgreaterthanorequalto": vendor by fxbalance', function (done) {
            [400, 300].forEach(value => {
                let recType = 'vendor',
                    columns = [
                        ['name'],
                        ['name', 'subsidiary']
                    ].map(c => new nlobjSearchColumn(c[0], c[1])),
                    filters = [
                        ['fxbalance', null, 'notgreaterthanorequalto', value]
                    ];

                let vendors = nlapiSearchRecord(recType, null, filters, columns);
                validateVendor(vendors);
            });
            return done();
        });

        it('operator "notlessthan": vendor by fxbalance', function (done) {
            let recType = 'vendor',
                columns = [
                    ['name'],
                    ['name', 'subsidiary']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['fxbalance', null, 'notlessthan', 200]
                ];

            let vendors = nlapiSearchRecord(recType, null, filters, columns);
            validateVendor(vendors);
            return done();
        });

        it('operator "notlessthanorequalto": vendor by fxbalance', function (done) {
            [200, 300].forEach(value => {
                let recType = 'vendor',
                    columns = [
                        ['name'],
                        ['name', 'subsidiary']
                    ].map(c => new nlobjSearchColumn(c[0], c[1])),
                    filters = [
                        ['fxbalance', null, 'notlessthanorequalto', value]
                    ];

                let vendors = nlapiSearchRecord(recType, null, filters, columns);
                validateVendor(vendors);
            });
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
