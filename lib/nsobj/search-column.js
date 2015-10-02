'use strict';

/**
 * Return a new instance of nlobjSearchColumn used for column objects used to define search return columns.
 *
 * @classDescription search column.
 * @return {nlobjSearchColumn}
 * @constructor
 * @param {string} name column name.
 * @param {string} join internal ID for joined search where this column is defined
 * @param {string} summary
 *
 * @since 2007.0
 */
function nlobjSearchColumn(name, join, summary) {
    this.name = name;
    this.join = join;
    this.summary = summary;
    this.type = null;
    this.label = null;
    this.functionid = null;
    this.formula = null;
    this.sortdir = null;
    this.index = -1;
    this.userindex = -1;
    this.whenorderedby = null;
    this.whenorderedbyjoin = null;
}

exports.nlobjSearchColumn = nlobjSearchColumn;

nlobjSearchColumn.prototype._clone = function () {
    var clone = new nlobjSearchColumn(this.name, this.join, this.summary);
    clone.type = this.type;
    clone.label = this.label;
    clone.functionid = this.functionid;
    clone.formula = this.formula;
    clone.sortdir = this.sortdir;
    clone.index = this.index;
    clone.userindex = this.userindex;
    clone.whenorderedby = this.whenorderedby;
    clone.whenorderedbyjoin = this.whenorderedbyjoin;
    return clone;
};

/**
 * return the name of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getName = function () {
    return this.name;
};

/**
 * return the join id for this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getJoin = function () {
    return this.join;
};

nlobjSearchColumn.prototype.getType = function () {
    return this.type;
};

/**
 * return the label of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2009.1
 */
nlobjSearchColumn.prototype.getLabel = function () {
    return this.label;
};

nlobjSearchColumn.prototype.setLabel = function (label) {
    this.label = label;
    return this;
};

/**
 * return the summary type (avg,group,sum,count) of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getSummary = function () {
    return this.summary;
};

/**
 * return formula for this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2009.2
 */
nlobjSearchColumn.prototype.getFormula = function () {
    return this.formula;
};

nlobjSearchColumn.prototype.setFormula = function (formula) {
    this.formula = formula;
    return this;
};

nlobjSearchColumn.prototype.getFunction = function () {
    return this.functionid;
};
nlobjSearchColumn.prototype.setFunction = function (functionid) {
    this.functionid = functionid;
    return this;
};
nlobjSearchColumn.prototype.getSort = function () {
    return this.sortdir;
};

/**
 * return nlobjSearchColumn sorted in either ascending or descending order.
 * @return {nlobjSearchColumn}
 * @param {boolean} sort if not set, defaults to false, which returns column data in ascending order.
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2010.1
 */
nlobjSearchColumn.prototype.setSort = function (descending) {
    this.sortdir = descending ? 'DESC' : 'ASC';
    return this;
};

nlobjSearchColumn.prototype.getWhenOrderedBy = function () {
    return this.whenorderedby;
};
nlobjSearchColumn.prototype.getWhenOrderedByJoin = function () {
    return this.whenorderedbyjoin;
};
nlobjSearchColumn.prototype.setWhenOrderedBy = function (whenorderedby, whenorderedbyjoin) {
    this.whenorderedby = whenorderedby;
    this.whenorderedbyjoin = whenorderedbyjoin;
    return this;
};
nlobjSearchColumn.prototype._marshal = function () {
    var columnObject = {};
    columnObject.name = this.name;
    columnObject.join = this.join;
    columnObject.summary = this.summary;
    columnObject.label = this.label;
    columnObject.type = this.type;
    columnObject.functionid = this.functionid;
    columnObject.formula = this.formula;
    columnObject.sortdir = this.sortdir;
    columnObject.whenorderedby = this.whenorderedby;
    columnObject.whenorderedbyjoin = this.whenorderedbyjoin;
    columnObject.userindex = this.userindex;
    return columnObject;
};
