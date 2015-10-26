'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Context API>', function () {
    describe('SuiteScript API - nlapiGetUser:', function () {

        it('get-user current "entity"', function (done) {
            let opts = {
                records: {
                    'entity': base + '/data/recordType-user.json'
                },
                current: {
                    user: {id: 22}
                }
            };
            nsmockup.init(opts, (err) => {
                if (err) return done(err);

                let id = nlapiGetUser();
                should(id).be.equal('22');

                nsmockup.destroy(done);
            });
        });

        it('get-user current "employee"', function (done) {
            let opts = {
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


                let id = nlapiGetUser();
                should(id).be.equal('22');

                nsmockup.destroy(done);
            });
        });

        it('get-user current "customer"', function (done) {
            let opts = {
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


                let id = nlapiGetUser();
                should(id).be.equal('22');

                nsmockup.destroy(done);
            });
        });

        it('get-user current "vendor"', function (done) {
            let opts = {
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


                let id = nlapiGetUser();
                should(id).be.equal('22');

                nsmockup.destroy(done);
            });
        });

        it('get-user current "partner"', function (done) {
            let opts = {
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


                let id = nlapiGetUser();
                should(id).be.equal('22');

                nsmockup.destroy(done);
            });
        });
    });
});
