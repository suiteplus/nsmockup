'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Application Navigation API>', function () {
    this.timeout(5000);

    let ropts = {
            // RESTlet Config
            name: 'customscript_add_restlet',
            files: [
                __dirname + '/../_input-files/scripts/fake-restlet.js'
            ],
            functions: {
                get: 'FakeRestlet.get',
                post: 'FakeRestlet.post'
            },
            params: {
                'fake-param': 12
            }
        },
        sopts = {
            // Suitelet Config
            name: 'customscript_add_suitelet',
            files: [
                __dirname + '/../_input-files/scripts/fake-suitelet.js'
            ],
            function: 'main',
            params: {
                'fake-param': 23
            }
        };

    before(function (done) {
        nsmockup.init({server: true}, () => {
            nsmockup.createRESTlet(ropts);
            nsmockup.createSuitelet(sopts);
            return done();
        });
    });
    parallel('SuiteScript API - nlapiResolveURL:', function () {
        it('resolve get internal URL from RESTlet', function (done) {
            let url = nlapiResolveURL('RESTLET', ropts.name, '1');
            should(url).be.ok();
            return done();
        });

        it('resolve get internal URL from Suitelet', function (done) {
            let url = nlapiResolveURL('SUITELET', sopts.name, '1');
            should(url).be.ok();
            return done();
        });

        it('resolve missing type', function (done) {
            try {
                let o = nlapiResolveURL();
                should(o).have.instanceOf(String);
                return done('missing record type');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_ARG_REQD');
                return done();
            }
        });

        it('resolve missing identifier', function (done) {
            try {
                let o = nlapiResolveURL('RESTLET');
                should(o).have.instanceOf(String);
                return done('missing identifier: ' + o.getId());
            } catch (e) {
                should(e).have.property('code', 'SSS_IDENTFIER_ARG_REQ');
                return done();
            }
        });

        it('resolve missing id', function (done) {
            try {
                let o = nlapiResolveURL('RESTLET', ropts.name);
                should(o).have.instanceOf(String);
                return done('missing id: ' + o.getId());
            } catch (e) {
                should(e).have.property('code', 'SSS_ID_ARG_REQ');
                return done();
            }
        });

        it('resolve identifier not found', function (done) {
            try {
                let o = nlapiResolveURL('SUITELET', 'customscript_japopop', '1');
                should(o).have.instanceOf(String);
                return done('missing id: ' + o.getId());
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_IDENTFIER_ARG');
                return done();
            }
        });

        it('resolve not supported', function (done) {
            try {
                let o = nlapiResolveURL('RECORD');
                should(o).have.instanceOf(String);
                return done('missing id: ' + o.getId());
            } catch (e) {
                should(e).have.property('code', 'SSS_NOT_YET_SUPPORTED');
                return done();
            }
        });

        it('resolve invalid type', function (done) {
            try {
                let invalidRecType = 'japois';
                let o = nlapiResolveURL(invalidRecType, 1, '1');
                should(o).have.instanceOf(String);
                return done('invalid record type: ' + o.getRecordType());
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_TYPE_ARG');
                return done();
            }
        });
    });

    describe('SuiteScript API - nlapiRequestURL:', function () {
        it('request only restlet URL', function (done) {
            let url = nlapiResolveURL('RESTLET', ropts.name, '1');
            should(url).be.ok();
            let res = nlapiRequestURL(url + '&fake=12');
            should(res).be.ok();
            let body = res.getBody();
            should(body).be.equal('12');
            return done();
        });

        it('request only suitelet URL', function (done) {
            let url = nlapiResolveURL('SUITELET', sopts.name, '1');
            should(url).be.ok();
            let res = nlapiRequestURL(url + '&fake=22');
            should(res).be.ok();
            let body = res.getBody();
            should(body).be.equal('22');
            return done();
        });

        it('request restlet URL method POST', function (done) {
            let url = nlapiResolveURL('RESTLET', ropts.name, '1');
            should(url).be.ok();
            let res = nlapiRequestURL(url, {fake: 12}, null, 'POST');
            should(res).be.ok();
            let body = res.getBody();
            should(body).be.equal('12');
            return done();
        });
    });

    after(function (done) {
        nsmockup.destroy(done);
    });
});
