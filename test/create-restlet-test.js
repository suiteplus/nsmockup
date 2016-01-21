'use strict';

var should = require('should'),
    nsmockup = require('../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create Restlet>', function () {
    this.timeout(10000);
    before(done => {
        nsmockup.init({server: true}, done);
    });
    describe('Create Script - Restlet', () => {
        it('restlet: createRESTlet', done => {
            let opts = {
                name: 'customscript_add_restlet',
                files: [
                    __dirname + '/_input-files/scripts/fake-restlet.js'
                ],
                functions: {
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

        it('restlet: create using "funcs"', done => {
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

        it('restlet: missing "opt.files"', done => {
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

        it('restlet: missing "opt.functions"', done => {
            const errorDone = 'missing "opt.functions"',
                errorMsg = 'principal functions not def: "opt.functions"',
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

        it('restlet: empty "opt.functions"', done => {
            const errorDone = 'missing "opt.functions"',
                errorMsg = 'principal functions was empty: "opt.functions"',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-restlet.js'],
                    functions: {}
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

        it('restlet: invalid method "opt.functions"', done => {
            const errorDone = 'invalid method "opt.functions"',
                errorMsg = 'invalid method opa',
                opts = {
                    files:[__dirname + '/_input-files/scripts/fake-restlet.js'],
                    functions: {opa: 'legal'}
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
    after(done => {
        nsmockup.destroy(done);
    });
});
