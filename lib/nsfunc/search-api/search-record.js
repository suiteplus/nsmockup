'use strict';
var _ = require('lodash'),
    formula = require('ns-formula-parse'),
    $metadata = require('../../db-utils/metadata');

var fieldValue = require('../../search-utils/field-value'),
    validateFields = require('../../search-utils/validate-fields'),
    operator = require('../../search-utils/operator');
/**
 * Perform a record search using an existing search or filters and columns.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string}        type record type ID.
 * @param {int, string} [id] The internal ID or script ID for the saved search to use for search.
 * @param {nlobjSearchFilter, nlobjSearchFilter[], object[]} [filters] [optional] A single nlobjSearchFilter object - or - an array of nlobjSearchFilter objects.
 * @param {nlobjSearchColumn, nlobjSearchColumn[]} [columns] [optional] A single nlobjSearchColumn object - or - an array of nlobjSearchColumn objects.
 * @return {nlobjSearchResult[]} Returns an array of nlobjSearchResult objects corresponding to the searched records.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_SRCH_ID}
 * @exception {SSS_INVALID_SRCH_FILTER}
 * @exception {SSS_INVALID_SRCH_FILTER_JOIN}
 * @exception {SSS_INVALID_SRCH_OPERATOR}
 * @exception {SSS_INVALID_SRCH_COL_NAME}
 * @exception {SSS_INVALID_SRCH_COL_JOIN}
 *
 * @since    2007.0
 */
exports.nlapiSearchRecord = (type, id, filters, columns) => {
    if (!type) {
        throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    } else if (id && typeof id !== 'number' && isNaN(id = parseInt(id))) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    }
    // if no exists throw error
    let meta = $metadata.find(type);
    // valida filters and columns
    validateFields.validateFilters(meta, filters);
    validateFields.validateColumns(meta, columns);

    let metaFields = meta.fields,
        fieldTypes = {},
    // find parent references
        parentRefs = {},
        parentFields = _.where(metaFields, {parentRef: true});

    for (let i=0; i<metaFields.length; i++) {
        let metaField = metaFields[i];
        fieldTypes[metaField.code] = metaField.type;
    }

    if (parentFields) {
        for (let p = 0; p < parentFields.length; p++) {
            let field = parentFields[p];
            parentRefs[field.code] = field.recordType;
        }
    }

    let recType = meta.code,
        items = $db(recType).chain(),
        query = {};

    if (id) {
        query.internalid = id;
        items = items.where(query);
    }

    let select = {},
        rawColumns = [];

    function addSelect(n, f, force) {
        !select[n] && (select[n] = []);
        if (!f && !~select[n].indexOf('$val')) {
            select[n].push('$val');
            rawColumns.push([n]);
        } else if (f && !~select[n].indexOf(f)) {
            select[n].push(f);
            rawColumns.push([f, n]);
        } else if (force) {
            rawColumns.push([f, n]);
        }
        return select[n];
    }

    // find join columns
    let recordCache = {},
        joinCache = {};
    // parent references
    let parentIdRef = {};

    function findJoinColumns(opts) {
        let join = opts.join,
            name = opts.name,
            op = opts.operator,
            value = opts.values[0],
            columns = opts.columns;
        let field = $metadata.findField(recType, join);
        if (!field || !field.recordType) {
            return false;
        }

        let nlFilter = new nlobjSearchFilter(name, null, op, value),
            nlColumn = columns ? columns.map((n) => new nlobjSearchColumn(n)) : [new nlobjSearchColumn(name)],
            fkey = name + '=' + value;

        // verify if is parent reference
        if (parentRefs[join]) {
            // indentify ID reference
            nlColumn = nlColumn.concat(new nlobjSearchColumn(join));
        }

        let fieldJoinType = field.recordType,
            records = nlapiSearchRecord(fieldJoinType, null, nlFilter, nlColumn) || [];

        if (!recordCache[join]) {
            recordCache[join] = {};
        }
        return (recordCache[join][fkey] = records);
    }

    // #############
    // load columns
    // #############
    if (columns) {
        let columns_ = !Array.isArray(columns) ? [columns] : columns;
        for (let i = 0; i < columns_.length; i++) {
            let column_ = columns_[i];
            if (!column_.name && !column_.join) {
                throw nlapiCreateError('SSS_INVALID_SRCH_COL_INSTANCE');
            } else if (column_.join) {
                addSelect(column_.join, column_.name, true);
            } else {
                let r = addSelect(column_.name, null, true);
                if (column_.name === 'formulatext') {
                    r[0] = column_.formula;
                }
            }
        }
        if (select.formulatext) {
            let fields = select.formulatext[0].match(/{[\w]*(\.[\w]*)?}/g);
            for (let i=0; fields && i<fields.length; i++) {
                let field = fields[i].replace('{', '').replace('}', ''),
                    c = field.split('.');
                if (c.length > 1) {
                    addSelect(c[1], c[0]);
                } else {
                    addSelect(c[0]);
                }
            }
        }
    }

    // #############
    // load filters
    // #############
    if (filters) {
        let filters_ = !Array.isArray(filters) ? [filters] : filters;
        for (let i = 0; i < filters_.length; i++) {
            let filter_ = filters_[i];
            if (typeof filter_ === 'string') {
                continue;
            } else if (filter_.join) {
                if (findJoinColumns(filter_)) {
                    // add column
                    addSelect(filter_.join, filter_.name);
                }
            } else {
                addSelect(filter_.name);
            }
        }

        items = items.filter(item => {
            for (let i = 0; i < filters_.length; i++) {
                let filter_ = filters_[i];
                if (typeof filter_ === 'string') {
                    continue;
                } else if (filter_.join) {
                    let join = filter_.join,
                        value = item[join],
                        key;
                    if (parentRefs[join]) {
                        key = join + '=' + value;
                    } else {
                        key = join + '.' + filter_.name + '=' + value;
                    }

                    if (!joinCache[key]) {
                        joinCache[key] = {has: false};
                        let fkey = filter_.name + '=' + filter_.values[0],
                            records = recordCache[join][fkey],
                            query = {};

                        // verify if is parent reference
                        if (parentRefs[join]) {
                            query.rawValues = {};
                            query.rawValues[join] = item.internalid;
                        } else {
                            query.id = value;
                        }
                        let results = _.where(records, query);

                        if (!results || !results.length) {
                            return false;
                        } else {
                            joinCache[key].has = true;
                            // verify if is parent reference
                            if (parentRefs[join]) {
                                joinCache[key].rs = results;
                                parentIdRef[join] = results.map(r => r.id);
                            } else {
                                joinCache[key].rs = results[0];
                            }
                        }
                    }
                    if (!joinCache[key].has) {
                        return false;
                    }
                } else {
                    let valActual = item[filter_.name],
                        valExpect = filter_.values[0];

                    if (!valActual) {
                        return false;
                    } else if (valExpect && ~valExpect.indexOf('%')) {
                        valExpect = valExpect.replace(/%/, '*');
                    }

                    let fldType = filter_.name === 'internalid' ? 'TEXT' :fieldTypes[filter_.name],
                        opts = {
                            name: filter_.name,
                            type: fldType,
                            operator: filter_.operator,
                            valActual: valActual,
                            valExpect: valExpect,
                            valuesExpect: filter_.values
                        };
                    if (!operator(opts)) {
                        return false;
                    }
                }
            }
            return true;
        });
    }

    let $results = items.value().map(item => {
        let id = item.internalid;
        let columns_ = Object.keys(item).filter(c => select[c]),
            rawValues = {},
            rawTexts = {};

        for (let i = 0; i < columns_.length; i++) {
            let col = columns_[i],
                names = select[col];

            if (names) {
                for (let n = 0; n < names.length; n++) {
                    let name = names[n];
                    if (name === '$val') {
                        if (names.length === 1) {
                            let opts = {
                                type: recType,
                                code: col,
                                value: item[col]
                            };
                            let val = fieldValue(opts);
                            if (typeof val === 'object') {
                                rawValues[col] = val.id;
                                rawTexts[col] = val.txt;
                            } else {
                                rawValues[col] = val;
                                rawTexts[col] = val;
                            }
                        } else {
                            if (!rawValues[col]) {
                                rawValues[col] = {};
                                rawTexts[col] = {};
                            }
                            rawValues[col].id = item[col];
                            rawTexts[col].id = item[col];
                        }
                    } else {
                        let value = item[col],
                            key = col + '.' + name + '=' + value;

                        if (!joinCache[key]) {
                            let filterOpts = {
                                join: col,
                                name: 'internalid',
                                operator: 'is',
                                values: [value],
                                columns: [name]
                            };
                            let records = findJoinColumns(filterOpts),
                                results = _.where(records, {id: value});

                            if (typeof value === 'string' && (!results || !results.length)) {
                                results = _.where(records, {id: parseInt(value)});
                            }

                            if (!results || !results.length) {
                                continue;
                            } else {
                                joinCache[key] = {
                                    has: true,
                                    rs: results[0]
                                };
                            }
                        }

                        let data = joinCache[key] && joinCache[key].rs;
                        if (!data) {
                            continue;
                        }

                        if (!rawValues[col]) {
                            rawValues[col] = {id: value};
                            rawTexts[col] = {id: value};
                        }
                        rawValues[col][name] = data.getValue(name);
                        rawTexts[col][name] = data.getText(name);
                    }
                }
            }
        }
        // eval formulatext
        if (select.formulatext) {
            let formulaValue = select.formulatext[0],
                fields = formulaValue.match(/{[\w]*(\.[\w]*)?}/g),
                data = {};

            for (let i=0; fields && i<fields.length; i++) {
                let field = fields[i].replace('{', '').replace('}', ''),
                    c = field.split('.');
                if (c.length > 1) {
                    data[field] = rawValues[c[0]][c[1]];
                } else {
                    data[field] = rawValues[field];
                }
            }
            rawValues.formulatext = formula.parse(formulaValue, data);
        }

        let cloneRawColumns = JSON.parse(JSON.stringify(rawColumns)),
            rawResults = {values: rawValues, texts: rawTexts};
        return new nlobjSearchResult(type, id, rawResults, cloneRawColumns);
    });

    // verify if is parent reference
    let listParentsRef = Object.keys(parentIdRef);
    if (listParentsRef.length) {
        let $finalResults = [];
        for (let p = 0; p < listParentsRef.length; p++) {
            let join = listParentsRef[p];
            for (let r = 0; r < $results.length; r++) {
                let result = $results[r];
                if (parentIdRef[join]) {
                    let parentIds = parentIdRef[join];
                    for (let j = 0; j < parentIds.length; j++) {
                        let parentId = parentIds[j],
                            names = select[join],
                            filterOpts = {
                                join: join,
                                name: 'internalid',
                                operator: 'is',
                                values: [parentId],
                                columns: names
                            },
                            records = findJoinColumns(filterOpts),
                            data = records[0],
                            rawValues = JSON.parse(JSON.stringify(result.rawValues)),
                            rawTexts = JSON.parse(JSON.stringify(result.rawTexts));

                        if (!rawValues[join]) {
                            rawValues[join] = {id: parentId};
                            rawTexts[join] = {id: parentId};
                        }
                        names = Array.isArray(names) ? names : [names];
                        for (let n = 0; n < names.length; n++) {
                            let name = names[n];
                            rawValues[join][name] = data.getValue(name);
                            rawValues[join][name] = data.getText(name);
                        }
                        let cloneRawColumns = JSON.parse(JSON.stringify(rawColumns)),
                            rawResults = {values: rawValues, texts: rawTexts},
                            resultParent = new nlobjSearchResult(type, id, rawResults, cloneRawColumns);
                        $finalResults.push(resultParent);
                    }
                } else {
                    $finalResults.push(result);
                }
            }
        }
        $results = $finalResults;
    }

    if ($results && $results.length) {
        return $results;
    } else {
        return null;
    }
};