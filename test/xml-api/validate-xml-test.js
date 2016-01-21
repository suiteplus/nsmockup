'use strict';

var fs = require('fs'),
    path = require('path'),
    should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../');

const fileDir = __dirname + '/../_input-files/files';

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite XML API>', function () {
    before(done => {
        nsmockup.init(done);
    });
    parallel('XML API - nlapiValidateXML:', () => {
        let xmlDoc;
        before(done => {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8');
            xmlDoc = nlapiStringToXML(xml);

            should(xmlDoc).be.ok();
            return done();
        });
        it('validate-xml find by xpath', done => {
            let valid = nlapiValidateXML(xmlDoc, {});

            should(valid).be.ok();
            return done();
        });

        it('validate-xml missing document', done => {
            try {
                nlapiValidateXML();
                return done('missing document');
            } catch (e) {
                should(e).have.property('code', 'SSS_DOCUMENT_ARG_REQD');
                return done();
            }
        });

        it('validate-xml missing xpath', done => {
            try {
                nlapiValidateXML(xmlDoc);
                return done('missing schema');
            } catch (e) {
                should(e).have.property('code', 'SSS_SCHEMA_ARG_REQD');
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
