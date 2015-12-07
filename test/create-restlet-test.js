'use strict';

var should = require('should'),
    nsmockup = require('../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create Restlet>', function () {
    this.timeout(10000);
    before(function (done) {
        nsmockup.init({server: true}, done);
    });
    describe('Create Script - Restlet', function () {
        it('restlet: create', function (done) {
            let opts = {
                name: 'customscript_add_restlet',
                files: [
                    __dirname + '/_input-files/scripts/fake-restlet.js'
                ],
                funcs: {
                    get: 'FakeRestlet.post'
                },
                params: {
                    'fake-param': 12
                }
            };
            nsmockup.createRESTlet(opts, (ctx) => {
                should(ctx.FakeRestlet).be.ok();

                let url = nlapiResolveURL('RESTLET', opts.name, '1');
                should(url).be.ok();

                let res = nlapiRequestURL(url + '&fake=12', null, null, 'GET');
                should(res).be.ok();

                let body = res.getBody();
                should(body).be.equal('12');
                return done();
            });
        });

        it('restlet: missing "opt.files"', function(done) {
            const errorDone = 'missing "opt.files"',
                errorMsg = 'script needs libraries: "opt.files"';

            try {
                nsmockup.createRESTlet(null, () => {
                    return done(errorDone);
                });
           } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createRESTlet({}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createRESTlet({file: {}}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }

            try {
                nsmockup.createRESTlet({files: []}, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('restlet: missing "opt.funcs"', function(done) {
            const errorDone = 'missing "opt.funcs"',
                errorMsg = 'principal functions not def: "opt.funcs"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-restlet.js']
                };

            try {
                nsmockup.createRESTlet(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('restlet: empty "opt.funcs"', function(done) {
            const errorDone = 'missing "opt.funcs"',
                errorMsg = 'principal functions was empty: "opt.funcs"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-restlet.js'],
                    funcs: {}
                };

            try {
                nsmockup.createRESTlet(opts, () => {
                    return done(errorDone);
                });
            } catch (e) {
                should(e).have.property('message', errorMsg);
            }
            return done();
        });

        it('restlet: invalid method "opt.funcs"', function(done) {
            const errorDone = 'invalid method "opt.funcs"',
                errorMsg = 'invalid method opa',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-restlet.js'],
                    funcs: {opa: 'legal'}
                };

            try {
                nsmockup.createRESTlet(opts, () => {
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
