'use strict';

/**
 * Select an array of values from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node}    node node being queried
 * @param {string}    xpath string containing XPath expression.
 * @return {string[]}
 *
 * @since 2008.1
 */
exports.nlapiSelectValues = (node, xpath) => {
    let nodes = nlapiSelectNodes(node, xpath);
    if (nodes) {
        return nodes.map(n => n.textContent);
    } else {
        return null;
    }
};
