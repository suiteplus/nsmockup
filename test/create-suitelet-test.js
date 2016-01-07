'use strict';

var should = require('should'),
    nsmockup = require('../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create Suitelet>', function () {
    this.timeout(5000);
    before(function (done) {
        nsmockup.init({server: false}, done);
    });
    describe('Create Script - Suitelet', function () {
        it('suitelet: create', function (done) {
            nsmockup.createSuitelet({
                name: '_add_suitlet',
                files: [
                    __dirname + '/_input-files/scripts/add.js'
                ],
                function: 'addTest'
            }, (ctx) => {
                should(ctx.addTest).be.ok();

                return done();
            });
        });

        it('suitelet: create using "func"', function (done) {
            nsmockup.createSuitelet({
                name: '_add_suitlet',
                files: [
                    __dirname + '/_input-files/scripts/add.js'
                ],
                func: 'addTest'
            }, (ctx) => {
                should(ctx.addTest).be.ok();

                return done();
            });
        });

        it('suitelet: missing "opt.files"', function(done) {
            const errorDone = 'missing "opt.files"',
                errorMsg = 'script needs libraries: "opt.files"';

            try {
                nsmockup.createSuitelet(null, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createSuitelet({}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createSuitelet({file: {}}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createSuitelet({files: []}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('suitelet: missing "opt.function"', function(done) {
            const errorDone = 'missing "opt.function"',
                errorMsg = 'principal function not def: "opt.function"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/add.js']
                };

            try {
                nsmockup.createSuitelet(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('suitelet: invalid "opt.function"', function(done) {
            const errorDone = 'invalid method "opt.functions"',
                errorMsg = 'invalid type of principal function, string only: "opt.function"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/add.js'],
                    function: {opa: 1}
                };

            try {
                nsmockup.createSuitelet(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
