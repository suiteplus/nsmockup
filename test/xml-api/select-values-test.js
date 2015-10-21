'use strict';

var fs = require('fs'),
    path = require('path'),
    should = require('should'),
    nsmockup = require('../../');

const fileDir = __dirname + '/../_input-files/files';

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite XML API>', function () {
    before(function (done) {
        nsmockup.init(done);
    });
    describe('XML API - nlapiSelectValues:', function () {
        let xmlDoc;
        before(function(done) {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8');
            xmlDoc = nlapiStringToXML(xml);

            should(xmlDoc).be.ok();
            return done();
        });
        it('select-values find by xpath', function (done) {
            let values = nlapiSelectValues(xmlDoc, '//table');

            should(values).be.ok();
            should(values.length).have.equal(3);
            return done();
        });

        it('select-values missing node', function (done) {
            try {
                nlapiSelectValues();
                return done('missing node');
            } catch (e) {
                should(e).have.property('code', 'SSS_NODE_ARG_REQD');
                return done();
            }
        });

        it('select-values missing xpath', function (done) {
            try {
                nlapiSelectValues(xmlDoc);
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
