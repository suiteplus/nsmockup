'use strict';
var _ = require('lodash');

const $$NS_COLUMNS_IGNORE = {
    internalid: true,
    formulatext: true
};

exports.validateFilters = (meta, filters) => {
    if (!meta) {
        throw nlapiCreateError('SSS_META_ARG_REQ', 'Metadata is empty');
    }
    let metaFields = meta.fields,
        cacheColumn = JSON.parse(JSON.stringify($$NS_COLUMNS_IGNORE));
    if (filters) {
        let filters_ = !Array.isArray(filters) ? [filters] : filters;
        for (let f = 0; f < filters_.length; f++) {

            let filter_ = filters_[f];
            if (typeof filter_ === 'string') {
                continue;
            } else if (Array.isArray(filter_)) {
                if (filter_.length <= 3) {
                    filter_ = new nlobjSearchFilter(filter_[0], null, filter_[1], filter_[2] || '@NONE@');
                } else {
                    filter_ = new nlobjSearchFilter(filter_[0], filter_[1], filter_[2], filter_[3], filter_[4]);
                }
                filters_[f] = filter_;
            }
            var code = filter_.join || filter_.name;

            if (cacheColumn[code]) {
                continue;
            }

            let metaField = _.where(metaFields, {code: code});
            if (!metaField || !metaField.length) {
                if (filter_.join) {
                    throw nlapiCreateError('SSS_INVALID_SRCH_FILTER_JOIN', `invalid column join search "${code}" in "${meta.code}".`);
                } else {
                    throw nlapiCreateError('SSS_INVALID_SRCH_FILTER', `invalid column search "${code}" in "${meta.code}".`);
                }
            } else {
                cacheColumn[code] = true;
            }
        }
    }
    return true;
};
exports.validateColumns = (meta, columns) => {
    if (!meta) {
        throw nlapiCreateError('SSS_META_ARG_REQ', 'Metadata is empty');
    }
    let metaFields = meta.fields,
        cacheColumn = JSON.parse(JSON.stringify($$NS_COLUMNS_IGNORE));
    if (columns) {
        let columns_ = !Array.isArray(columns) ? [columns] : columns;
        for (let f = 0; f < columns_.length; f++) {
            let column_ = columns_[f],
                code = column_.join || column_.name;

            if (cacheColumn[code]) {
                continue;
            }

            let metaField = _.where(metaFields, {code: code});
            if (!metaField || !metaField.length) {
                if (column_.join) {
                    throw nlapiCreateError('SSS_INVALID_SRCH_COL_JOIN', `invalid column search "${code}".`);
                } else {
                    throw nlapiCreateError('SSS_INVALID_SRCH_COL_NAME', `invalid column search "${code}".`);
                }
            } else {
                cacheColumn[code] = true;
            }
        }
    }
    return true;
};
