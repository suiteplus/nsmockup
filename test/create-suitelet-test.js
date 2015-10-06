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
        it('create suitelet', function (done) {
            nsmockup.createSuitelet({
                name: '_add_suitlet',
                files: [
                    __dirname + '/_input-files/scripts/add.js'
                ],
                func: 'addTest'
            });
            should(addTest).be.ok();

            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);

        should(addTest).equal(undefined);
    });
});
