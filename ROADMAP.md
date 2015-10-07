# nsmockup Roadmap

## Version 0.5.x

### Simulate User Events
 - **nsmockup.createUserEvent(opt)**

### Netsuite API:
  * __Record APIs__:
    - function **nlapiGetNewRecord()**
    - function **nlapiGetOldRecord()**
    - function **nlapiGetRecordId()**
    - function **nlapiGetRecordType()**
  * __Field APIs__
    - function **nlapiGetField(fldnam)**
    - function **nlapiGetFieldText(fldnam)**
    - function **nlapiGetFieldtexts(fldnam)**
    - function **nlapiGetFieldValue(fldnam)**
    - function **nlapiGetFieldValues(fldnam)**
    - function **nlapiSetFieldText(fldnam)**
    - function **nlapiSetFieldtexts(fldnam)**
    - function **nlapiSetFieldValue(fldnam)**
    - function **nlapiSetFieldValues(fldnam)**

## Version 0.6.x

### Work with currency simulation

### Netsuite API:
  * __Currency APIs__:
    - function **nlapiExchangeRate(sourceCurrency, targetCurrency, effectiveDate)**
    - function **nlapiFormatCurrency(str)**

## Version 0.7.x

### Improvements on Suitelet, Restlet and Schedule Simulations

## Version 0.8.x

### Implement Mock of NetSuite tools APIs

### Netsuite API:
  * __Date APIs__:
    - function **nlapiAddDays(d, days)**
    - function **nlapiAddMonths(d, months)**
    - function **nlapiDateToString(d, format)**
    - function **nlapiStringToDate(str, format)**

## Version 0.9.x
...

## Version 0.1x.x
...

## Version 1.0.0 (I hope => Stable)

### Mock Suite Script 1.0