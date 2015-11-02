'use strict';

/**
 * Find Suite Script data.
 *
 * @param type {String} ID of Record Type, example: "customscript_legal_event".
 * @param query {Object} query.
 * @returns {Object} script data or null.
 */
exports.find = (type, query) => {
    query.type = type;

    let scripts = $db('__scripts').chain().where(query).value();
    if (!scripts || !scripts.length) {
        return null;
    } else {
        return scripts;
    }
};