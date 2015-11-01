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
    parallel('XML API - nlapiStringToXML:', function () {
        it('xml convert string to xml document', function (done) {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8'),
                xmlDoc = nlapiStringToXML(xml);

            should(xmlDoc).be.ok();
            should(xmlDoc).have.property('firstChild');
            should(xmlDoc).have.property('lastChild');
            should(xmlDoc).have.property('nodeName');
            should(xmlDoc).have.property('childNodes').length(1);
            return done();
        });

        it('xml missing str', function (done) {
            let xml = nlapiStringToXML();
            should(xml).not.be.ok();
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
