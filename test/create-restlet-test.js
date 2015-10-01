'use strict';

var should = require('should'),
    nsmockup = require('../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create Restlet>', function () {
    before(function (done) {
        nsmockup.init({}, done);
    });
    describe('Create Script - Restlet', function () {
        it('create restlet', function (done) {
            nsmockup.createRESTlet({
                name: '_add_restlet',
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
