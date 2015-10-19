'use strict';

/**
 * Select an array of nodes from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 * @return {node[]}
 *
 * @since 2008.1
 */
exports.nlapiSelectNodes = (node, xpath) => {
    if (node) {
        let nodes = xpath ? node.get(xpath) : node;
        if (Array.isArray(nodes)) {
            return nodes;
        } else {
            return [nodes];
        }
    } else {
        return null;
    }
};
