# nsmockup ChangeLog

## 2015-09-26, Version 0.1.0 (unstable),

### Notable changes

* **lowdb**: Use lowdb to simulate Netsuite database, its a simple solution to manager Record Types.
* **Netsuite API**: Mockup Netsuite Backend API:
  * __File APIs__:
```javascript
   function nlapiCreateFile(name, type, contents) { ; }
   function nlapiDeleteFile(id) { ; }
   function nlapiLoadFile(id) { ; }
   function nlapiSubmitFile f(file) { ; }
   /** SuiteScript Objects */
   function nlobjFile() { ; }
```
  * __Search APIs__:
```javascript
   function nlapiSearchRecord(type, id, filters, columns) { ; }
   /** SuiteScript Objects */
   function nlobjSearchColumn() { ; }
   function nlobjSearchFilter() { ; }
   function nlobjSearchResult() { ; }
```
  * __Execution Context APIs__:
```javascript
   function  nlapiGetContext() { ; }
   function nlapiLogExecution(type, title, details) { ; }
   /** SuiteScript Objects */
   function nlobjContext() { ; }
```
  * __Date APIs__:
```javascript
   function nlapiDateToString(d, format) { ; }
```