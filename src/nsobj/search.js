/**
 *
 * @classDescription search.
 * @return {nlobjSearch}
 * @constructor
 * @param {string}        type record type ID.
 * @param {int, string} [id] The internal ID or script ID for the saved search to use for search.
 * @param {nlobjSearchFilter, nlobjSearchFilter[], object[]} [filters] [optional] A single nlobjSearchFilter object - or - an array of nlobjSearchFilter objects.
 * @param {nlobjSearchColumn, nlobjSearchColumn[]} [columns] [optional] A single nlobjSearchColumn object - or - an array of nlobjSearchColumn objects.
 */
function nlobjSearch(type, id, filters, columns)
{
    this.type = type;
    this.searchId = id;
    this.scriptId = null;
    // if array, make a copy of it; if single value, make it an array
    this.filters = !filters ? null : (Array.isArray(filters) ? filters.slice() : [filters]);
    this.columns = !columns ? null : (Array.isArray(columns) ? columns.slice() : [columns]);
    this.isPublic = false;
}

//nlobjSearch.prototype._load = function()
//{
//    var payloadMap = nsServerCall(nsJSONProxyURL, 'loadSearch', [this.type, this.searchId]);
//    this.isPublic = payloadMap['ispublic'];
//    this.searchId = payloadMap['searchId'];
//    this.scriptId = payloadMap['scriptid'];
//    this.type = payloadMap['type'];
//    this.filters = nsapiUnmarshalArray(payloadMap, 'filter', nsapiUnmarshalSearchFilter);
//    this.columns = nsapiUnmarshalArray(payloadMap, 'column', nsapiUnmarshalSearchColumn);
//};
//function nsapiUnmarshalArray(payloadMap, prefix, unmarshalFunction)
//{
//    var array = [];
//    var count = payloadMap[prefix+'count'];
//    for (var i=0; i<count; ++i)
//    {
//        var attributeMap = payloadMap[prefix+i];
//        var obj = unmarshalFunction(attributeMap);
//        array.push(obj);
//    }
//    return array;
//};
nlobjSearch.prototype._clone = function() {
    'use strict';
    var filtersCopy = [];
    for (let i = 0; this.filters && i < this.filters.length; i++) {
        filtersCopy.push(this.filters[i]._clone());
    }
    var columnsCopy = [];
    for (let i = 0; this.columns && i < this.columns.length; i++) {
        columnsCopy.push(this.columns[i]._clone());
    }
    var clone = new nlobjSearch(this.type, this.searchId, filtersCopy, columnsCopy);
    clone.scriptId = this.scriptId;
    clone.isPublic = this.isPublic;
    clone.type = this.type;
    return clone;
};
nlobjSearch.prototype.runSearch = function()
{
    return new nlobjSearchResultSet(this._clone());
};
//nlobjSearch.prototype.saveSearch = function(title, scriptId)
//{
//    try
//    {
//        var rawFilters = nsapiMarshalSearchFilters(this.filters);
//        var rawColumns = nsapiMarshalSearchColumns(this.columns);
//        var searchId = nsServerCall(nsJSONProxyURL, 'saveSearch', [title, scriptId, this.type, this.searchId, rawFilters, rawColumns, this.isPublic], null, 'POST');
////		nsapiLogUsage( 'nlapiSearchRecord', isValEmpty(searchId) && nsapiIsLookup(this.filters) ? type : null );
//        return searchId;
//    }
//    catch (e)
//    {
//        throw nlapiCreateError( e );
//    }
//};
//nlobjSearch.prototype.deleteSearch = function()
//{
//    try
//    {
//        nsapiAssertTrue(this.searchId && this.searchId != -1, 'SSS_CANT_DELETE_AD_HOC_SEARCH');
//        nsServerCall(nsJSONProxyURL, 'deleteSearch', [this.type, this.searchId]);
////		nsapiLogUsage( 'nlapiSearchRecord', isValEmpty(searchId) && nsapiIsLookup(this.filters) ? type : null );
//    }
//    catch (e)
//    {
//        throw nlapiCreateError( e );
//    }
//};
nlobjSearch.prototype.getFilters = function()
{
    return this.filters;
};
nlobjSearch.prototype.setFilters = function(filters)
{
    // if array, make a copy of it; if single value, make it an array
    this.filters = !filters ? null : (Array.isArray(filters) ? filters.slice() : [filters]);
};
nlobjSearch.prototype.addFilter = function(filter)
{
    if (!this.filters)
        this.filters = [filter];
    else
        this.filters.push(filter);
};
nlobjSearch.prototype.addFilters = function(filters)
{
    if (filters) for (var i=0; i<filters.length; i++)
        this.addFilter(filters[i]);
};
//nlobjSearch.prototype.getFilterExpression = function()
//{
//    var rawFilters = nsapiMarshalSearchFilters(this.filters);
//    var payload = nsServerCall(nsJSONProxyURL, 'buildSearchFilterExpression', [rawFilters], null, 'POST');
//    return nsapiUnmarshalSearchFilterExpression(payload);
//};
//nlobjSearch.prototype.setFilterExpression = function(filterExpression)
//{
//    filterExpression = nsapiNormalizeFilters(filterExpression);
//    nsapiAssertTrue(!nsapiIsFlatSearchFilterList(filterExpression), 'SSS_INVALID_SRCH_FILTER_EXPR');
//    this.filters = nsapiParseSearchFilterExpression(filterExpression);
//};
nlobjSearch.prototype.getColumns = function()
{
    return this.columns;
};
nlobjSearch.prototype.setColumns = function(columns)
{
    this.columns = !columns? null : (Array.isArray(columns) ? columns.slice() : [columns]);
};
nlobjSearch.prototype.addColumn = function(column)
{
    if (!this.columns)
        this.columns = [column];
    else
        this.columns.push(column);
};
nlobjSearch.prototype.addColumns = function(columns)
{
    if (columns) for (var i=0; i<columns.length; i++)
        this.addColumn(columns[i]);
};
//nlobjSearch.prototype.setRedirectURLToSearch = function()
//{
//    try
//    {
//        var rawFilters = nsapiMarshalSearchFilters(this.filters);
//        var rawColumns = nsapiMarshalSearchColumns(this.columns);
//        var url = nsServerCall(nsJSONProxyURL, 'prepareSearchPage', [this.type, this.searchId, rawFilters, rawColumns]);
//        nsapiSetRedirectURL(url);
//    }
//    catch( e )
//    {
//        throw nlapiCreateError( e );
//    }
//};
//nlobjSearch.prototype.setRedirectURLToSearchResults = function()
//{
//    try
//    {
//        var rawFilters = nsapiMarshalSearchFilters(this.filters);
//        var rawColumns = nsapiMarshalSearchColumns(this.columns);
//        var url = nsServerCall(nsJSONProxyURL, 'prepareSearchResults', [this.type, this.searchId, rawFilters, rawColumns]);
//        nsapiSetRedirectURL(url);
//    }
//    catch( e )
//    {
//        throw nlapiCreateError( e );
//    }
//};
nlobjSearch.prototype.getId = function()
{
    return (!this.searchId || this.searchId == -1) ? null : this.searchId;
};
nlobjSearch.prototype.getScriptId = function()
{
    return this.scriptId;
};
nlobjSearch.prototype.getSearchType = function()
{
    return this.type;
};
//nlobjSearch.prototype.getIsPublic = function()
//{
//    return this.isPublic;
//};
//nlobjSearch.prototype.setIsPublic = function(isSearchPublic)
//{
//    this.isPublic = isSearchPublic;
//};
//nlobjSearch.prototype._getResultsSlice = function(start, end)
//{
//    try
//    {
//        var rawFilters = nsapiMarshalSearchFilters(this.filters);
//        var rawColumns = nsapiMarshalSearchColumns(this.columns);
//        var rawResults = nsServerCall(nsJSONProxyURL, 'searchRecordSlice', [this.type, this.searchId, rawFilters, rawColumns, start, end]);
//        var rowResults = nsapiExtractSearchResults( rawResults, this.columns );
//
//        nsapiLogUsage( 'nlapiSearchRecord', isValEmpty(this.searchId) && nsapiIsLookup(this.filters) ? type : null );
//        return rowResults && rowResults.length > 0 ? rowResults : null;
//    }
//    catch( e )
//    {
//        throw nlapiCreateError( e );
//    }
//};