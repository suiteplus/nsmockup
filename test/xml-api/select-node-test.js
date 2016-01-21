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
    parallel('XML API - nlapiSelectNode:', () => {
        let xmlDoc;
        before(done => {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8');
            xmlDoc = nlapiStringToXML(xml);

            should(xmlDoc).be.ok();
            return done();
        });
        it('select-node find by xpath', done => {
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

        it('select-node missing node', done => {
            try {
                nlapiSelectNode();
                return done('missing node');
            } catch (e) {
                should(e).have.property('code', 'SSS_NODE_ARG_REQD');
                return done();
            }
        });

        it('select-node missing xpath', done => {
            try {
                nlapiSelectNode(xmlDoc);
                return done('missing xpath');
            } catch (e) {
                should(e).have.property('code', 'SSS_XPATH_ARG_REQD');
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
