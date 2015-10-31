'use strict';

var should = require('should'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Encryption API>', function () {

    before(function (done) {
        nsmockup.init(done);
    });
    describe('Encription API - nlapiEncrypt:', function () {
        let str = 'nsmockup - Test your Suitescripts before deploying to NetSuite.';

        it('encrypt str to base64', function (done) {
            let algorithm = 'base64',
                code = nlapiEncrypt(str, algorithm);
            should(code).be.equal('bnNtb2NrdXAgLSBUZXN0IHlvdXIgU3VpdGVzY3JpcHRzIGJlZm9yZSBkZXBsb3lpbmcgdG8gTmV0U3VpdGUu');
            return done();
        });

        it('encrypt str to sha1', function (done) {
            let algorithm = 'sha1',
                code = nlapiEncrypt(str, algorithm);
            should(code).be.equal('0fe627f37d6111044285073e751eedc73c140941');
            return done();
        });

        it('encrypt str to xor', function (done) {
            let algorithm = 'xor',
                code = nlapiEncrypt(str, algorithm);
            should(code).be.equal('BRYUBAYSHhVZRkUtDhYNSxwWHhdZOBAQHwAKCBcQGxEKSwccDQoLDkUdDhUVBBwQBQJZHwpZJQANOBAQHwBX');
            return done();
        });

        it('encrypt str to aes', function (done) {
            let algorithm = 'aes',
                key = '128-bit',
                code = nlapiEncrypt(str, algorithm, key);
            //should(code).be.ok();
            should(code).be.equal(null);
            return done();
        });

        it('encrypt missing str', function (done) {
            try {
                nlapiEncrypt();
                return done('missing str');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_STR_REQD');
                return done();
            }
        });

        it('encrypt missing algorithm', function (done) {
            try {
                nlapiEncrypt('opa');
                return done('missing algorithm');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ALGORITHM_REQD');
                return done();
            }
        });

        it('encrypt invalid algorithm', function (done) {
            try {
                nlapiEncrypt('opa', 'des');
                return done('missing algorithm');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_ALGORITHM');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
