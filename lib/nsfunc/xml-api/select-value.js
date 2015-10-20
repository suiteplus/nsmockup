'use strict';

/**
 * select a value from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} node node being queried
 * @param {string} xpath string containing XPath expression.
 * @return {string}
 *
 * @since 2008.2
 */
exports.nlapiSelectValue = (node, xpath) => {
    let node_ = nlapiSelectNode(node, xpath);
    if (node_) {
        return node_.textContent;
    } else {
        return null;
    }
};
