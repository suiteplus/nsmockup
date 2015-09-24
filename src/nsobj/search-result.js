/**
 * Return a new instance of nlobjSearchResult used for search result row object.
 *
 * @classDescription Class definition for interacting with the results of a search operation
 * @return {nlobjSearchResult}
 * @constructor
 */
function nlobjSearchResult(type, id, rawValues, rawColumns) {
    this.type = type;
    this.id = id;
    this.rawValues = rawValues;
    this.rawColumns = rawColumns;
}

/**
 * return the internalId for the record returned in this row.
 * @method
 * @memberOf nlobjSearchResult
 * @return {int}
 */
nlobjSearchResult.prototype.getId = function () {
    return this.id;
};

/**
 * return the recordtype for the record returned in this row.
 * @method
 * @memberOf nlobjSearchResult
 * @return {string}
 */
nlobjSearchResult.prototype.getRecordType = function () {
    return this.type;
};

/**
 * return the value for a return column specified by name, join ID, and summary type.
 * @param {string} name the name of the search column
 * @param {string} join the join ID for the search column
 * @param {string} summary summary type specified for this column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2008.1
 */
nlobjSearchResult.prototype.getValue = function (name, join, summary) {
    var cell = this.rawValues[name];
    return cell
};

/**
 * return the text value of this return column if it's a select field.
 * @param {string} name the name of the search column
 * @param {string} join the join ID for the search column
 * @param {string} summary summary type specified for this column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2008.1
 */
nlobjSearchResult.prototype.getText = function (name, join, summary) {
    return this.getValue(name, join, summary);
};

/**
 * return an array of all nlobjSearchColumn objects returned in this search.
 * @return {nlobjSearchColumn[]}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2009.2
 */
nlobjSearchResult.prototype.getAllColumns = function () {
    return this.rawColumns.map(col => new nlobjSearchColumn(col));
};
