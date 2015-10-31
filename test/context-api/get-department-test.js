'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Context API>', function () {
    describe('SuiteScript API - nlapiGetDepartment:', function () {

        it('get-department current "entity"', function (done) {
            let opts = {
                metadata: [':entity'],
                records: {
                    'entity': base + '/data/recordType-user.json'
                },
                current: {
                    user: {id: 22}
                }
            };
            nsmockup.init(opts, (err) => {
                if (err) return done(err);

                let id = nlapiGetDepartment();
                should(id).be.equal('12');

                nsmockup.destroy(done);
            });
        });

        it('get-department current "employee"', function (done) {
            let opts = {
                metadata: [':employee'],
                records: {
                    'employee': base + '/data/recordType-user.json'
                },
                current: {
                    user: {
                        id: 22,
                        type: 'employee'
                    }
                }
            };
            nsmockup.init(opts, (err) => {
                if (err) return done(err);


                let id = nlapiGetDepartment();
                should(id).be.equal('12');

                nsmockup.destroy(done);
            });
        });

        it('get-department current "customer"', function (done) {
            let opts = {
                metadata: [':customer'],
                records: {
                    'customer': base + '/data/recordType-user.json'
                },
                current: {
                    user: {
                        id: 22,
                        type: 'customer'
                    }
                }
            };
            nsmockup.init(opts, (err) => {
                if (err) return done(err);


                let id = nlapiGetDepartment();
                should(id).be.equal('12');

                nsmockup.destroy(done);
            });
        });

        it('get-department current "vendor"', function (done) {
            let opts = {
                metadata: [':vendor'],
                records: {
                    'vendor': base + '/data/recordType-user.json'
                },
                current: {
                    user: {
                        id: 22,
                        type: 'vendor'
                    }
                }
            };
            nsmockup.init(opts, (err) => {
                if (err) return done(err);


                let id = nlapiGetDepartment();
                should(id).be.equal('12');

                nsmockup.destroy(done);
            });
        });

        it('get-department current "partner"', function (done) {
            let opts = {
                metadata: [':partner'],
                records: {
                    'partner': base + '/data/recordType-user.json'
                },
                current: {
                    user: {
                        id: 22,
                        type: 'partner'
                    }
                }
            };
            nsmockup.init(opts, (err) => {
                if (err) return done(err);


                let id = nlapiGetDepartment();
                should(id).be.equal('12');

                nsmockup.destroy(done);
            });
        });
    });
});
