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
exports.nlobjSearchColumn = function nlobjSearchColumn(name, join, summary) {
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

    this._clone = function () {
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
    this.getName = function () {
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
    this.getJoin = function () {
        return this.join;
    };

    this.getType = function () {
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
    this.getLabel = function () {
        return this.label;
    };

    this.setLabel = function (label) {
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
    this.getSummary = function () {
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
    this.getFormula = function () {
        return this.formula;
    };

    this.setFormula = function (formula) {
        this.formula = formula;
        return this;
    };

    this.getFunction = function () {
        return this.functionid;
    };
    this.setFunction = function (functionid) {
        this.functionid = functionid;
        return this;
    };
    this.getSort = function () {
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
    this.setSort = function (descending) {
        this.sortdir = descending ? 'DESC' : 'ASC';
        return this;
    };

    this.getWhenOrderedBy = function () {
        return this.whenorderedby;
    };
    this.getWhenOrderedByJoin = function () {
        return this.whenorderedbyjoin;
    };
    this.setWhenOrderedBy = function (whenorderedby, whenorderedbyjoin) {
        this.whenorderedby = whenorderedby;
        this.whenorderedbyjoin = whenorderedbyjoin;
        return this;
    };
    this._marshal = function () {
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
};