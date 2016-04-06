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
    parallel('XML API - nlapiSelectNodes:', () => {
        let xmlDoc;
        before(done => {
            let xmlPath = path.resolve(fileDir + '/help.xml'),
                xml = fs.readFileSync(xmlPath, 'utf8');
            xmlDoc = nlapiStringToXML(xml);

            should(xmlDoc).be.ok();
            return done();
        });
        it('select-nodes find by xpath', done => {
            let nodes = nlapiSelectNodes(xmlDoc, '//table');

            should(nodes).be.ok();
            should(nodes.length).have.equal(3);
            return done();
        });

        it('select-nodes missing node', done => {
            try {
                nlapiSelectNodes();
                return done('missing node');
            } catch (e) {
                should(e).have.property('code', 'SSS_NODE_ARG_REQD');
                return done();
            }
        });

        it('select-nodes missing xpath', done => {
            try {
                nlapiSelectNodes(xmlDoc);
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
