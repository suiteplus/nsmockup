'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Encryption API>', function () {

    before(done => {
        nsmockup.init(done);
    });
    parallel('Encription API - nlapiEncrypt:', () => {
        let str = 'nsmockup - Test your Suitescripts before deploying to NetSuite.';

        it('encrypt str to base64', done => {
            let algorithm = 'base64',
                code = nlapiEncrypt(str, algorithm);
            should(code).be.equal('bnNtb2NrdXAgLSBUZXN0IHlvdXIgU3VpdGVzY3JpcHRzIGJlZm9yZSBkZXBsb3lpbmcgdG8gTmV0U3VpdGUu');
            return done();
        });

        it('encrypt str to sha1', done => {
            let algorithm = 'sha1',
                code = nlapiEncrypt(str, algorithm);
            should(code).be.equal('0fe627f37d6111044285073e751eedc73c140941');
            return done();
        });

        it('encrypt str to xor', done => {
            let algorithm = 'xor',
                code = nlapiEncrypt(str, algorithm);
            should(code).be.equal('BRYUBAYSHhVZRkUtDhYNSxwWHhdZOBAQHwAKCBcQGxEKSwccDQoLDkUdDhUVBBwQBQJZHwpZJQANOBAQHwBX');
            return done();
        });

        it('encrypt str to aes', done => {
            let algorithm = 'aes',
                key = '128-bit',
                code = nlapiEncrypt(str, algorithm, key);
            //should(code).be.ok();
            should(code).be.equal(null);
            return done();
        });

        it('encrypt missing str', done => {
            try {
                nlapiEncrypt();
                return done('missing str');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_STR_REQD');
                return done();
            }
        });

        it('encrypt missing algorithm', done => {
            try {
                nlapiEncrypt('opa');
                return done('missing algorithm');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ALGORITHM_REQD');
                return done();
            }
        });

        it('encrypt invalid algorithm', done => {
            try {
                nlapiEncrypt('opa', 'des');
                return done('missing algorithm');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_ALGORITHM');
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
