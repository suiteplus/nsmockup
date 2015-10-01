# nsmockup ChangeLog

## 2015-09-30, Version 0.3.0 (unstable),

### Notable changes

#### Record API:
   * [[` ee6d52c`](https://github.com/suiteplus/nsmockup/commit/ee6d52c89f84af6aed9666faf7ce61ba781b4118)] fix columns join
   * [[`9252f19`](https://github.com/suiteplus/nsmockup/commit/9252f19c32f798b48ea6a88d3f759a40767234df)] fix order columns in nlobjSearchResult
   * [[`3eecfca`](https://github.com/suiteplus/nsmockup/commit/3eecfca10d801eee0a42ca841923e3e6d5acca8b)] include stack on error log 

#### Mockup news - Netsuite API:
  * __Search APIs__:
    - function **nlapiCreateSearch(type, filters, columns)**
    - function **nlobjSearch(type, id, filters, columns)**
    - function **nlobjSearchResultSet(search)**
  * __Field APIs__:
    - function **nlapiLookupField(type, id, fields, text)**

## 2015-09-28, Version 0.2.0 (unstable),

### Notable changes

#### Mockup news - Netsuite API:
  * __Record APIs__:
    - function **nlapiCopyRecord(type, id, filters, columns)**
    - function **nlapiCreateRecord(type, id, filters, columns)**
    - function **nlapiDeleteRecord(type, id, filters, columns)**
    - function **nlapiLoadRecord(type, id, filters, columns)**
    - function **nlapiSubmitRecord(type, id, filters, columns)**
    - function **nlobjRecord()**

## 2015-09-26, Version 0.1.0 (unstable),

### Notable changes

#### lowdb: 
   - Use lowdb to simulate Netsuite database, its a simple solution to manager Record Types.

#### Mockup news - Netsuite API:
  * __File APIs__:
    - function **nlapiCreateFile(name, type, contents)**
    - function **nlapiDeleteFile(id)**
    - function **nlapiLoadFile(id)**
    - function **nlapiSubmitFile f(file)**
    - function **nlobjFile()**
  * __Record APIs__:
    - function **nlapiSearchRecord(type, id, filters, columns)**
    - function **nlobjSearchColumn()**
    - function **nlobjSearchFilter()**
    - function **nlobjSearchResult()**
  * __Execution Context APIs__:
    - function ** nlapiGetContext()**
    - function **nlapiLogExecution(type, title, details)**
    - function **nlobjContext()**
  * __Date APIs__:
    - function **nlapiDateToString(d, format)**