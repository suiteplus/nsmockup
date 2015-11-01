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
    before(function (done) {
        nsmockup.init(done);
    });
    parallel('XML API - nlapiSelectValue:', function () {
        let xmlDoc;
        before(function (done) {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8');
            xmlDoc = nlapiStringToXML(xml);

            should(xmlDoc).be.ok();
            return done();
        });
        it('select-value find by xpath', function (done) {
            let value = nlapiSelectValue(xmlDoc, '//table');

            should(value).be.ok();
            return done();
        });

        it('select-value missing node', function (done) {
            try {
                nlapiSelectValue();
                return done('missing node');
            } catch (e) {
                should(e).have.property('code', 'SSS_NODE_ARG_REQD');
                return done();
            }
        });

        it('elect-value missing xpath', function (done) {
            try {
                nlapiSelectValue(xmlDoc);
                return done('missing xpath');
            } catch (e) {
                should(e).have.property('code', 'SSS_XPATH_ARG_REQD');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
