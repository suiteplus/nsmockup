'use strict';

var should = require('should'),
    nsmockup = require('../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create Suitelet>', function () {
    before(function (done) {
        nsmockup.init({}, done);
    });
    describe('Create Script - Suitelet', function () {
        it('create suitelet', function (done) {
            nsmockup.createSuitelet({
                name: '_add_suitlet',
                files: [
                    __dirname + '/_input-files/scripts/add.js'
                ],
                func: 'add'
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
