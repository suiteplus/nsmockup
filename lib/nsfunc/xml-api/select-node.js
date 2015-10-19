'use strict';

/**
 * Select a node from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 * @return {node}
 *
 * @since 2008.1
 */
exports.nlapiSelectNode = (node, xpath) => {
    let nodes = nlapiSelectNodes(node, xpath);
    if (nodes) {
        return nodes[0];
    } else {
        return null;
    }
};
