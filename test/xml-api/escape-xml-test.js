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
    parallel('XML API - nlapiEscapeXML:', function () {
        it('xml convert string to xml document', function (done) {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8'),
                escape = nlapiEscapeXML(xml);

            should(escape).be.ok();

            let txtPath = path.resolve(fileDir + '/help-escape.txt'),
                txt = fs.readFileSync(txtPath, 'utf8');

            should(escape).be.equal(txt);
            return done();
        });

        it('xml missing xml', function (done) {
            let xml = nlapiEscapeXML();
            should(xml).be.equal('');
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
