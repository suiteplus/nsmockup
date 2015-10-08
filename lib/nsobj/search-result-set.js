'use strict';

/**
 *
 * @classDescription search.
 * @return {nlobjSearchResultSet}
 * @constructor
 * @param {nlobjSearch}        searchObject record type ID.
 */
exports.nlobjSearchResultSet = function nlobjSearchResultSet(search) {
    /* Not intended to be public; customers should use runSearch(). */
    this.search = search;
    this.results = nlapiSearchRecord(search.type, null, search.getFilters(), search.getColumns());

    this.getColumns = function () {
        return this.search.getColumns();
    };
    this.getResults = function (start, end) {
        if (start < 0) throw new nlapiCreateError('SSS_INVALID_SEARCH_RESULT_INDEX');
        if ((end - start) > 1000) throw new nlapiCreateError('SSS_SEARCH_RESULT_LIMIT_EXCEEDED');
        if (start >= end)
            return [];
        return this.results.slice(start, end);
    };
    this.forEachResult = function (callback) {
        var PAGE_SIZE = 50, continueIteration = true;
        for (var start = 0; ; start += PAGE_SIZE) {
            var searchResults = this.getResults(start, start + PAGE_SIZE);
            if (!searchResults)
                break;
            for (var i = 0; continueIteration && i < searchResults.length; ++i) {
                continueIteration = callback(searchResults[i], i + start);
            }
            if (searchResults.length < PAGE_SIZE)
                break;
        }
    };
};