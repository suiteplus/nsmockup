'use strict';
var xmldom = require('xmldom'),
    XMLSerializer = xmldom.XMLSerializer;

/**
 * Convert an XML document into a String.  Note that in Server SuiteScript XML is supported natively by the JS runtime using the e4x standard (http://en.wikipedia.org/wiki/E4X)
 * This makes scripting XML data simpler and more efficient
 *
 * @param {document} xml document being serialized into a string
 * @return {string}
 *
 * @since 2008.1
 */
exports.nlapiXMLToString = (xml) => {
    if (xml) {
        return new XMLSerializer().serializeToString(xml);
    } else {
        return null;
    }
};
