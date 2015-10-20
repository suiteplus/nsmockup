'use strict';

/**
 * Generate a PDF from XML using the BFO report writer (see http://big.faceless.org/products/report/).
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} input string containing BFO compliant XHTML
 * @return {nlobjFile}
 *
 * @since 2009.1
 */
exports.nlapiXMLToPDF = (input) => {
    if (!input) {
        throw nlapiCreateError('SSS_INPUT_ARG_REQD');
    } else {
        return nlapiCreateFile('fipe.pdf', 'PDF', input);
    }
};
