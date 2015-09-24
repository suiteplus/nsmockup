# nsmockup
Netsuite API Mockup


## Required
 * MongoDB 2+
 * node.js 4+

## Install
```bash
    npm install suiteplus/nsmockup
```

## Usage
```javascript
    var nsmockup = require('nsmockup');

    // map record types
    var records = {
        'customrecord_bacana': './record/bacana.json'
    };
    // start database simulation
    nsmockup.initDB(records, function(err) {
        if (err) throw err;

        console.log('search record', nlapiSearchRecord('customrecord_bacana'));
    });
```