'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Context API>', function () {
    describe('SuiteScript API - nlapiGetSubsidiary:', () => {

        it('get-subsidiary current "entity"', done => {
            let opts = {
                metadata: [':entity'],
                records: {
                    'entity': base + '/data/user.json'
                },
                current: {
                    user: {id: 22}
                }
            };
            nsmockup.init(opts, (err) => {
                if (err) return done(err);

                let id = nlapiGetSubsidiary();
                should(id).be.equal('16');

                nsmockup.destroy(done);
            });
        });

        it('get-subsidiary current "employee"', done => {
            let opts = {
                metadata: [':employee'],
                records: {
                    'employee': base + '/data/user.json'
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


                let id = nlapiGetSubsidiary();
                should(id).be.equal('16');

                nsmockup.destroy(done);
            });
        });

        it('get-subsidiary current "customer"', done => {
            let opts = {
                metadata: [':customer'],
                records: {
                    'customer': base + '/data/user.json'
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


                let id = nlapiGetSubsidiary();
                should(id).be.equal('16');

                nsmockup.destroy(done);
            });
        });

        it('get-subsidiary current "vendor"', done => {
            let opts = {
                metadata: [':vendor'],
                records: {
                    'vendor': base + '/data/user.json'
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


                let id = nlapiGetSubsidiary();
                should(id).be.equal('16');

                nsmockup.destroy(done);
            });
        });

        it('get-subsidiary current "partner"', done => {
            let opts = {
                metadata: [':partner'],
                records: {
                    'partner': base + '/data/user.json'
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


                let id = nlapiGetSubsidiary();
                should(id).be.equal('16');

                nsmockup.destroy(done);
            });
        });
    });
});
