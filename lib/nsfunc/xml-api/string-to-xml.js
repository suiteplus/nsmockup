'use strict';
var libxml = require('libxmljs');

/**
 * Convert a String into an XML document. Note that in Server SuiteScript XML is supported natively by the JS runtime using the e4x standard (http://en.wikipedia.org/wiki/E4X)
 * This makes scripting XML simpler and more efficient
 *
 * @param {string} str string being parsed into an XML document
 * @return {document}
 *
 * @since 2008.1
 */
exports.nlapiStringToXML = (str) => {
    if (str) {
        return libxml.parseXml(str);
    } else {
        return null;
    }
};