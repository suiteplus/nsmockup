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
    describe('XML API - nlapiSelectNode:', function () {
        let xmlDoc;
        before(function(done) {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8');
            xmlDoc = nlapiStringToXML(xml);

            should(xmlDoc).be.ok();
            return done();
        });
        it('select-node find by xpath', function (done) {
            let node = nlapiSelectNode(xmlDoc, '//table');

            should(node).be.ok();

            should(node.hasAttributes()).be.equal(true);
            let attrs = node.attributes;
            should(attrs).have.length(6);
            let attr = attrs[0];
            should(attr.name).be.equal('id');
            should(attr.value).be.equal('outerfeedback');

            return done();
        });

        it('select-node missing node', function (done) {
            try {
                nlapiSelectNode();
                return done('missing node');
            } catch (e) {
                should(e).have.property('code', 'SSS_NODE_ARG_REQD');
                return done();
            }
        });

        it('select-node missing xpath', function (done) {
            try {
                nlapiSelectNode(xmlDoc);
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
