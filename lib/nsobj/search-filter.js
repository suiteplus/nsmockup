'use strict';

/**
 * Return a new instance of nlobjSearchFilter filter objects used to define search criteria.
 *
 * @classDescription search filter
 * @constructor
 * @param {string} name filter name.
 * @param {string} join internal ID for joined search where this filter is defined
 * @param {string} operator operator name (i.e. anyOf, contains, lessThan, etc..)
 * @param {string|string[]} value
 * @param {string} value2
 * @return {nlobjSearchFilter}
 *
 * @since 2007.0
 */
function nlobjSearchFilter(name, join, operator, value, value2) {
    this.name = name;
    this.join = join;
    this.operator = operator;
    this.values = [];
    this.addValue(value);
    this.addValue(value2);
    this.formula = null;
    this.summarytype = null;
    this.isor = false;
    this.isnot = false;
    this.leftparens = 0;
    this.rightparens = 0;
}
exports.nlobjSearchFilter = nlobjSearchFilter;

nlobjSearchFilter.prototype._clone = function () {
    var clone = new nlobjSearchFilter(this.name, this.join, this.operator, null, null);
    clone.values = this.values.slice();
    clone.formula = this.formula;
    clone.summarytype = this.summarytype;
    clone.isor = this.isor;
    clone.isnot = this.isnot;
    clone.leftparens = this.leftparens;
    clone.rightparens = this.rightparens;
    return clone;
};

/**
 * Return the name of this search filter.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2007.0
 */
nlobjSearchFilter.prototype.getName = function () {
    return this.name;
};

/**
 * Return the join id for this search filter.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2008.1
 */
nlobjSearchFilter.prototype.getJoin = function () {
    return this.join;
};

/**
 * Return the filter operator used.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2008.2
 */
nlobjSearchFilter.prototype.getOperator = function () {
    return this.operator;
};

nlobjSearchFilter.prototype.getSummaryType = function () {
    return this.summarytype;
};
nlobjSearchFilter.prototype.getFormula = function () {
    return this.formula;
};
nlobjSearchFilter.prototype.setFormula = function (formula) {
    this.formula = formula;
    return this;
};
nlobjSearchFilter.prototype.setSummaryType = function (type) {
    this.summarytype = type;
    return this;
};
nlobjSearchFilter.prototype.addValue = function (value) {
    if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
            if (value[i])
                this.values.push(value[i].toString());
        }
    }
    else if (value)
        this.values.push(value.toString());
};