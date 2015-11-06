# nsmockup ChangeLog

## 2015-11-05, Version 0.9.0 (unstable),

### Notable changes
  * add defaults NetSuite metadata.
  * rename "opts.metadatas" to "opts.metadata" in `smockup.init`.
  * add validations for principal functions for each SuiteScripts.
  * fix reload general preferences with `ulp.watch`.
  * add floder validation in `lapiSubmitFile`.
  * improve field type parse in query results.
  * implement **search operators** for `nlapiSearchRecord`.

### Netsuite API:
  * __Context APIs__
    - `function nlapiGetDepartment()`
    - `function nlapiGetSubsidiary()`
    - `function nlapiGetUser()`
  * __Currency APIs__
    - `function nlapiFormatCurrency(str)`


## 2015-10-26, Version 0.8.0 (unstable),

### Notable changes
  * improve File Cabinet simulations
  * change RESTlet service path to 'http://localhost:3030//app/site/hosting/restlet.nl?script=?'
  * set default timeout to kill Fake Server process, default: 20s.

### Netsuite API:
  * __Encription APIs__
    - `function nlapiDecrypt(s, algorithm, key)`
    - `function nlapiEncrypt(s, algorithm, key)`
  
## 2015-10-22, Version 0.7.0 (unstable),

### Notable changes
  * improve VM context initializations for User Event Simulations
  * add new test units for: Date API, Field API, File API, Record API, Scheduling API, Search API, SubList API and XML API

### Netsuite API:
  * __Record APIs__:
    - `function nlapiTransformRecord(type, id, transformType, transformValues)`
  * __Search APIs__:
    - `function nlapiSearchGlobal(keywords)`
  * __SubList APIs__:
    - `function nlapiCancelLineItem(type)`
    - `function nlapiCommitLineItem(type)`
    - `function nlapiFindLineItemValue(type, fldnam, val)`
    - `function nlapiGetCurrentLineItemIndex(type)`
    - `function nlapiGetCurrentLineItemText(type, fldnam)`
    - `function nlapiGetCurrentLineItemValue(type, fldnam)`
    - `function nlapiGetLineItemCount(type)`
    - `function nlapiGetLineItemText(type, fldnam, linenum)`
    - `function nlapiGetLineItemValue(type, fldnam, linenum)`
    - `function nlapiInsertLineItem(type, line)`
    - `function nlapiSelectLineItem(type, linenum)`
    - `function nlapiSelectNewLineItem(type)`
    - `function nlapiSetCurrentLineItemText(type, fldnam, value)`
    - `function nlapiSetCurrentLineItemValue(type, fldnam, value)`
    - `function nlapiSetLineItemValue(type, fldnam, linenum, value)`
  * __XML APIs__:
    - `function nlapiEscapeXML(txt)`
    - `function nlapiSelectNode(node, xpath)`
    - `function nlapiSelectNodes(node, xpath)`
    - `function nlapiSelectValue(node, xpath)`
    - `function nlapiSelectValues(node, xpath)`
    - `function nlapiStringToXML(str)`
    - `function nlapiValidateXML(xmlDocument, schemaDocument, schemaFolderId)`
    - `function nlapiXMLToPDF(input)`
    - `function nlapiXMLToString(xml)`

## 2015-10-18, Version 0.6.0 (unstable),

### Notable changes
  * improvements on Suitelet, Restlet and Schedule Simulations
  * improve stack errors in `nlapiLogExecution`
  * implement global date format
  * implement function to find parent joins
  * fix bugs in `nlapiSubmitField` and `nlapiSearchRecord`
  * fix `nlobjFile.getValue` to return the original file

### Netsuite API:
  * __Date APIs__:
    - `function nlapiStringToDate(str, format)`
    - `function nlapiAddDays(d, days)`
    - `function nlapiAddMonths(d, months)`
  * __Scheduling APIs__:
    - `function nlapiScheduleScript(id, deployment, parameters)`
    - `function nlapiSetRecoveryPoint()`
    - `function nlapiYieldScript()`

## 2015-10-08, Version 0.5.0 (unstable),

### Notable changes
  * simulate User Events: **nsmockup.createUserEvent(opt)**
  * remove cache from load JSON database
  * User Event triggers in: **nlapiSubmitRecord => ('beforeSubmit', 'afterSubmit')** and **nlapiLoadRecord => ('beforeLoad')**
  * Manager Context: one context for each Suite Script loaded

### Netsuite API:
  * __Record APIs__:
    - `function nlapiGetNewRecord()`
    - `function nlapiGetOldRecord()`
    - `function nlapiGetRecordId()`
    - `function nlapiGetRecordType()`

## 2015-10-07, Version 0.4.0 (unstable),

### Notable changes

#### nsmock server:
  * add **server** configuration, example: **nsmockup.init({server: true})**
  * this servers use **express** to start on port **3030**
  * you can test **Suitelet** and **RESTlet** using **nlapiResolveURL** and **nlapiRequestURL**

#### Mockup news - Netsuite API:
  * __Application Navigation APIs__:
    - `function nlapiRequestURL(url, postdata, headers, method)`
    - `function nlapiResolveRUL(type, identifier, id, displayMode)`
    - `function nlobjRequest()`
    - `function nlobjResponse()`
  * __Communication APIs__:
    - `function nlapiSendCampaignEmail(campaigneventid, recipientid)`
    - `function nlapiSendEmail(from, to, subject, body, cc, bcc, records, files, notifySenderOnBounce, internalOnly, replyTo)`
    - `function nlapiSendFax(from, to, subject, body, records, files)`
  * __Field APIs__:
    - `function nlapiSubmitField(type,id,fields,values,doSourcing)`

## 2015-09-30, Version 0.3.0 => 0.3.1 (unstable),

### Notable changes

#### Record API:
   * [[`ee6d52c`](https://github.com/suiteplus/nsmockup/commit/ee6d52c89f84af6aed9666faf7ce61ba781b4118)] fix columns join
   * [[`9252f19`](https://github.com/suiteplus/nsmockup/commit/9252f19c32f798b48ea6a88d3f759a40767234df)] fix order columns in nlobjSearchResult
   * [[`3eecfca`](https://github.com/suiteplus/nsmockup/commit/3eecfca10d801eee0a42ca841923e3e6d5acca8b)] include stack on error log 

#### Mockup news - Netsuite API:
  * __Search APIs__:
    - `function nlapiCreateSearch(type, filters, columns)`
    - `function nlobjSearch(type, id, filters, columns)`
    - `function nlobjSearchResultSet(search)`
  * __Field APIs__:
    - `function nlapiLookupField(type, id, fields, text)`

## 2015-09-28, Version 0.2.0 (unstable),

### Notable changes

#### Mockup news - Netsuite API:
  * __Record APIs__:
    - `function nlapiCopyRecord(type, id, filters, columns)`
    - `function nlapiCreateRecord(type, id, filters, columns)`
    - `function nlapiDeleteRecord(type, id, filters, columns)`
    - `function nlapiLoadRecord(type, id, filters, columns)`
    - `function nlapiSubmitRecord(type, id, filters, columns)`
    - `function nlobjRecord()`

## 2015-09-26, Version 0.1.0 (unstable),

### Notable changes

#### lowdb: 
   - Use lowdb to simulate Netsuite database, its a simple solution to manager Record Types.

#### Mockup news - Netsuite API:
  * __File APIs__:
    - `function nlapiCreateFile(name, type, contents)`
    - `function nlapiDeleteFile(id)`
    - `function nlapiLoadFile(id)`
    - `function nlapiSubmitFile f(file)`
    - `function nlobjFile()`
  * __Record APIs__:
    - `function nlapiSearchRecord(type, id, filters, columns)`
    - `function nlobjSearchColumn()`
    - `function nlobjSearchFilter()`
    - `function nlobjSearchResult()`
  * __Execution Context APIs__:
    - `function nlapiGetContext()`
    - `function nlapiLogExecution(type, title, details)`
    - `function nlobjContext()`
  * __Date APIs__:
    - `function nlapiDateToString(d, format)`