'use strict';
var _ = require('lodash'),
    operator = require('../../db-utils/search-operator'),
    $metadata = require('../../db-utils/metadata');

const COLUMNS_IGNORE = {internalid: true, formulatext: true};
var validateFilters = (meta, filters) => {
    if (!meta) throw new Error('Metadata is empty');
    let metaFields = meta.fields,
        cacheColumn = JSON.parse(JSON.stringify(COLUMNS_IGNORE));
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
                    throw nlapiCreateError('SSS_INVALID_SRCH_FILTER_JOIN', `invalid column search "${code}".`);
                } else {
                    throw nlapiCreateError('SSS_INVALID_SRCH_FILTER', `invalid column search "${code}".`);
                }
            } else {
                cacheColumn[code] = true;
            }
        }
    }
    return true;
};
var validateColumns = (meta, columns) => {
    if (!meta) throw new Error('Metadata is empty');
    let metaFields = meta.fields,
        cacheColumn = JSON.parse(JSON.stringify(COLUMNS_IGNORE));
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
    validateFilters(meta, filters);
    validateColumns(meta, columns);

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

    function addSelect(n, f) {
        !select[n] && (select[n] = []);
        if (!f && !~select[n].indexOf('$val')) {
            select[n].push('$val');
            rawColumns.push([n]);
        } else if (f && !~select[n].indexOf(f)) {
            select[n].push(f);
            rawColumns.push([f, n]);
        }
        return select[n];
    }

    // find join columns
    let recordCache = {},
        joinCache = {},
        metaCache = {},
        metaFieldCache = {};
    // parent references
    let parentIdRef = {};

    function findJoinColumns(join, name, value, columns) {
        if (!recordCache[join]) recordCache[join] = {};

        let recordMeta = metaCache[recType] || (metaCache[recType] = $metadata.find(recType));
        let field = metaFieldCache[recType + '.' + join] ||
            (metaFieldCache[recType + '.' + join] = _.where(recordMeta.fields, {code: join}));
        if (!field || field.length === 0 || !field[0].recordType) return false;

        let nlFilter = new nlobjSearchFilter(name, null, 'is', value),
            nlColumn = columns ? columns.map((n) => new nlobjSearchColumn(n)) : [new nlobjSearchColumn(name)],
            recordName = field[0].recordType,
            fkey = name + '=' + value;

        // verify if is parent reference
        if (parentRefs[join]) {
            // indentify ID reference
            nlColumn = nlColumn.concat(new nlobjSearchColumn(join));
        }

        let records = nlapiSearchRecord(recordName, null, nlFilter, nlColumn) || [];
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
                addSelect(column_.join, column_.name);
            } else {
                let r = addSelect(column_.name);
                if (column_.name === 'formulatext') {
                    r[0] = column_.formula;
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
                if (findJoinColumns(filter_.join, filter_.name, filter_.values[0])) {
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
                    if (~valExpect.indexOf('%')) valExpect = valExpect.replace(/%/, '*');
                    if (!valActual) {
                        return false;
                    }

                    let fldType = filter_.name === 'internalid' ? 'TEXT' :fieldTypes[filter_.name];
                    if (!operator(fldType, filter_.operator, valActual, valExpect, filter_.values)) {
                        return false;
                    }
                }
            }
            return true;
        });
    }
    //console.log('search record', 'select: ', select);

    let $results = items.value().map(item => {
        let id = item.internalid;
        let columns_ = Object.keys(item).filter(c => select[c]),
            rawValues = {};

        for (let i = 0; i < columns_.length; i++) {
            let col = columns_[i],
                names = select[col];

            if (names) {
                for (let n = 0; n < names.length; n++) {
                    let name = names[n];
                    if (name === '$val') {
                        if (names.length === 1) rawValues[col] = item[col];
                        else {
                            if (!rawValues[col]) rawValues[col] = {};
                            rawValues[col].id = item[col];
                        }
                    } else {
                        let value = item[col],
                            key = col + '.' + name + '=' + value;

                        if (!joinCache[key]) {
                            let records = findJoinColumns(col, 'internalid', value, [name]),
                                results = _.where(records, {id: value});

                            if (records.length !== results.length) {
                                console.log(`EITAAA>>> ${type} - ${col} - ${value} = ${name}`);
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
                        if (!rawValues[col]) rawValues[col] = {id: value};
                        rawValues[col][name] = data.getValue(name);
                    }
                }
            }
        }
        // eval formulatext
        if (select.formulatext) {
            //TODO .. implement formulatext parse
            let fields = select.formulatext[0].match(/{[\w]*}/g);
            rawValues.formulatext = '';
            if (fields) {
                for (let i = 0; i < fields.length; i++) {
                    let field = fields[i].replace('{', '').replace('}', '');
                    item[field] && (rawValues.formulatext += item[field] + ' ');
                }
            }
        }

        let cloneRawColumns = JSON.parse(JSON.stringify(rawColumns));
        return new nlobjSearchResult(type, id, rawValues, cloneRawColumns);
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
                            records = findJoinColumns(join, 'internalid', parentId, names),
                            data = records[0],
                            rawValues = JSON.parse(JSON.stringify(result.rawValues));

                        if (!rawValues[join]) rawValues[join] = {id: parentId};
                        names = Array.isArray(names) ? names : [names];
                        for (let n = 0; n < names.length; n++) {
                            let name = names[n];
                            rawValues[join][name] = data.getValue(name);
                        }
                        let cloneRawColumns = JSON.parse(JSON.stringify(rawColumns)),
                            resultParent = new nlobjSearchResult(type, id, rawValues, cloneRawColumns);
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