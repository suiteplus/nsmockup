'use strict';

const $$NS_XML_ESCAPE = {
    '>': '&gt;',
    '<': '&lt;',
    '\'': '&apos;',
    '"': '&quot;',
    '&': '&amp;'
};

/**
 * Escape a String for use in an XML document.
 *
 * @param {string} text string to escape
 * @return {string}
 *
 * @since 2008.1
 */
exports.nlapiEscapeXML = (text) => {
    if (!text) {
        return '';
    } else {
        return text.replace(/([&"<>'])/g, function (str, item) {
            return $$NS_XML_ESCAPE[item];
        });
    }
};
