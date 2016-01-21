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
    parallel('XML API - nlapiXMLToString:', () => {
        it('xml convert string to xml document', done => {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8'),
                xmlDoc = nlapiStringToXML(xml);

            should(xmlDoc).be.ok();

            let str = nlapiXMLToString(xmlDoc);

            should(str).be.ok();
            should(str).be.equal(xml);

            return done();
        });

        it('xml missing str', done => {
            let xml = nlapiXMLToString();
            should(xml).not.be.ok();
            return done();
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
