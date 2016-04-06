'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../../');

var base = __dirname + '/../../_input-files/record-data';

var validateCustomer = (customers, msg) => {
    should(customers).have.length(1, msg);
    let customer = customers[0];
    should(customer.getId()).be.equal(4, msg);
    should(customer.getValue('email')).be.equal('itil@sp.com.br', msg);
    should(customer.getValue('companynameforsupportmessages', 'subsidiary')).be.equal('YYUHHHNN847293 - DEV', msg);
};
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    this.timeout(5000);

    before(done => {
        let metadata = [
                ':customer',
                ':subsidiary'
            ],
            records = {
                'customer': `${base}/data/customer.json`,
                'subsidiary': `${base}/data/subsidiary.json`
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

    let recType = 'customer',
        columns = [
            ['email'],
            ['companynameforsupportmessages', 'subsidiary']
        ].map(c => new nlobjSearchColumn(c[0], c[1]));
    parallel('SuiteScript API - Search Utils - "operators" - DATE:', () => {
        it('operator "after": customer by datecreated', done => {
            let filters = [
                    ['datecreated', null, 'after', '12-07-2015 12:34:23']
                ];

            let customers = nlapiSearchRecord(recType, null, filters, columns);
            validateCustomer(customers);

            let oFilters = [
                    ['datecreated', null, 'after', '14-07-2015 12:34:23']
                ],
                empty = nlapiSearchRecord(recType, null, oFilters, columns);
            should(empty).not.ok();
            return done();
        });

        it('operator "before": customer by datecreated', done => {
            let filters = [
                    ['datecreated', null, 'before', '14-07-2015 12:34:23']
                ];

            let customers = nlapiSearchRecord(recType, null, filters, columns);
            validateCustomer(customers);

            let oFilters = [
                    ['datecreated', null, 'before', '12-07-2015 12:34:23']
                ],
                empty = nlapiSearchRecord(recType, null, oFilters, columns);
            should(empty).not.ok();
            return done();
        });

        it('operator "notwithin": customer by datecreated', done => {
            let filters = [
                    ['datecreated', null, 'notwithin', '16-07-2015 18:36:23']
                ];

            let customers = nlapiSearchRecord(recType, null, filters, columns);
            validateCustomer(customers);

            let oFilters = [
                    ['datecreated', null, 'notwithin', '13-07-2015 14:39:00']
                ],
                empty = nlapiSearchRecord(recType, null, oFilters, columns);
            should(empty).not.ok();
            return done();
        });

        it('operator "notafter": customer by datecreated', done => {
            let filters = [
                    ['datecreated', null, 'notafter', '14-07-2015']
                ];

            let customers = nlapiSearchRecord(recType, null, filters, columns);
            validateCustomer(customers);

            let oFilters = [
                    ['datecreated', null, 'notafter', '12-07-2015 12:34:23']
                ],
                empty = nlapiSearchRecord(recType, null, oFilters, columns);
            should(empty).not.ok();
            return done();
        });

        it('operator "notbefore": customer by datecreated', done => {
            let filters = [
                    ['datecreated', null, 'notbefore', '12-07-2015']
                ];

            let customers = nlapiSearchRecord(recType, null, filters, columns);
            validateCustomer(customers);

            let oFilters = [
                    ['datecreated', null, 'notbefore', '14-07-2015 12:34:23']
                ],
                empty = nlapiSearchRecord(recType, null, oFilters, columns);
            should(empty).not.ok();
            return done();
        });

        it('operator "noton": customer by datecreated', done => {
            ['12-07-2015 18:36:23', '14-07-2015 06:36:23', '10-07-2016', '02-01-2014'].forEach(function(date) {
                let filters = [
                    ['datecreated', null, 'noton', date]
                ];

                let customers = nlapiSearchRecord(recType, null, filters, columns);
                validateCustomer(customers, `invalid filter "${date}"`);
            });

            let oFilters = [
                    ['datecreated', null, 'noton', '13-07-2015 14:39:00']
                ],
                empty = nlapiSearchRecord(recType, null, oFilters, columns);
            should(empty).not.ok();
            return done();
        });

        it('operator "notonorafter": customer by datecreated', done => {
            ['12-07-2015 18:36:23', '10-07-2015', '02-01-2014'].forEach(function(date) {
                let filters = [
                    ['datecreated', null, 'notonorafter', date]
                ];

                let customers = nlapiSearchRecord(recType, null, filters, columns);
                validateCustomer(customers, `invalid filter "${date}"`);
            });

            ['13-07-2015 14:39:00'].forEach(function(date) {
                let oFilters = [
                        ['datecreated', null, 'notonorafter', date]
                    ],
                    empty = nlapiSearchRecord(recType, null, oFilters, columns);
                should(empty).not.ok();
            });
            return done();
        });

        it('operator "notonorbefore": customer by datecreated', done => {
            ['14-07-2015 18:36:23', '17-07-2015', '02-01-2016'].forEach(function(date) {
                let filters = [
                    ['datecreated', null, 'notonorbefore', date]
                ];

                let customers = nlapiSearchRecord(recType, null, filters, columns);
                validateCustomer(customers, `invalid filter "${date}"`);
            });

            ['13-07-2015 14:39:00'].forEach(function(date) {
                let oFilters = [
                        ['datecreated', null, 'notonorbefore', date]
                    ],
                    empty = nlapiSearchRecord(recType, null, oFilters, columns);
                should(empty).not.ok();
            });
            return done();
        });

        it('operator "on": customer by datecreated', done => {
            let filters = [
                ['datecreated', null, 'on', '13-07-2015 14:39:00']
            ];
            let customers = nlapiSearchRecord(recType, null, filters, columns);
            validateCustomer(customers);

            ['13-07-2015 13:39:00', '16-03-2015', '12-07-2015'].forEach(function(date) {
                let oFilters = [
                        ['datecreated', null, 'on', date]
                    ],
                    empty = nlapiSearchRecord(recType, null, oFilters, columns);
                should(empty).not.ok();
            });
            return done();
        });

        it('operator "onorafter": customer by datecreated', done => {
            ['13-07-2015 14:39:00', '16-03-2015', '11-01-2012'].forEach(function(date) {
                let filters = [
                    ['datecreated', null, 'onorafter', date]
                ];
                let customers = nlapiSearchRecord(recType, null, filters, columns);
                validateCustomer(customers, `invalid filter "${date}"`);
            });

            let oFilters = [
                    ['datecreated', null, 'onorafter', '12-08-2015 12:34:23']
                ],
                empty = nlapiSearchRecord(recType, null, oFilters, columns);
            should(empty).not.ok();
            return done();
        });

        it('operator "onorbefore": customer by datecreated', done => {
            ['14-07-2015 18:36:23', '13-07-2015 14:39:00', '16-08-2016'].forEach(function(date) {
                let filters = [
                    ['datecreated', null, 'onorbefore', date]
                ];
                let customers = nlapiSearchRecord(recType, null, filters, columns);
                validateCustomer(customers, `invalid filter "${date}"`);
            });

            let oFilters = [
                    ['datecreated', null, 'onorbefore', '12-07-2015 12:34:23']
                ],
                empty = nlapiSearchRecord(recType, null, oFilters, columns);
            should(empty).not.ok();
            return done();
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
