'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Context API>', function () {
    describe('SuiteScript API - nlapiGetContext:', function () {
        it('get-context object', function (done) {
            nsmockup.init((err) => {
                if (err) return done(err);

                let context = nlapiGetContext();
                should(context).have.instanceOf(nlobjContext);

                nsmockup.destroy(done);
            });
        });

        it('get-context current "entity"', function (done) {
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

                let context = nlapiGetContext();
                should(context).have.instanceOf(nlobjContext);

                should(context.getName()).be.equal('Japojão Legal');
                should(context.getEmail()).be.equal('japo.japo@suiteplus.com');
                should(context.getUser()).be.equal('22');
                should(context.getDepartment()).be.equal('12');
                should(context.getSubsidiary()).be.equal('16');

                nsmockup.destroy(done);
            });
        });

        it('get-context current "employee"', function (done) {
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

                let context = nlapiGetContext();
                should(context).have.instanceOf(nlobjContext);

                should(context.getName()).be.equal('Japojão Legal');
                should(context.getEmail()).be.equal('japo.japo@suiteplus.com');
                should(context.getUser()).be.equal('22');
                should(context.getDepartment()).be.equal('12');
                should(context.getSubsidiary()).be.equal('16');

                nsmockup.destroy(done);
            });
        });

        it('get-context current "customer"', function (done) {
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

                let context = nlapiGetContext();
                should(context).have.instanceOf(nlobjContext);

                should(context.getName()).be.equal('Japojão Legal');
                should(context.getEmail()).be.equal('japo.japo@suiteplus.com');
                should(context.getUser()).be.equal('22');
                should(context.getDepartment()).be.equal('12');
                should(context.getSubsidiary()).be.equal('16');

                nsmockup.destroy(done);
            });
        });

        it('get-context current "vendor"', function (done) {
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

                let context = nlapiGetContext();
                should(context).have.instanceOf(nlobjContext);

                should(context.getName()).be.equal('Japojão Legal');
                should(context.getEmail()).be.equal('japo.japo@suiteplus.com');
                should(context.getUser()).be.equal('22');
                should(context.getDepartment()).be.equal('12');
                should(context.getSubsidiary()).be.equal('16');

                nsmockup.destroy(done);
            });
        });

        it('get-context current "partner"', function (done) {
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

                let context = nlapiGetContext();
                should(context).have.instanceOf(nlobjContext);

                should(context.getName()).be.equal('Japojão Legal');
                should(context.getEmail()).be.equal('japo.japo@suiteplus.com');
                should(context.getUser()).be.equal('22');
                should(context.getDepartment()).be.equal('12');
                should(context.getSubsidiary()).be.equal('16');

                nsmockup.destroy(done);
            });
        });
    });
});
