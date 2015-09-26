# nsmockup [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]
Netsuite API Mockup (unstable)

## Required
 * node.js 4+

## Install
```bash
    npm install suiteplus/nsmockup
```

## Usage
```javascript
    var nsmockup = require('nsmockup');

    // map record types
    let metadatas = [
            __dirname + '/record/meta/recordType-metaData-codeg.json',
            __dirname + '/record/meta/recordType-metaData-codeg_ids.json'
        ],
        records = {
            'customrecord_codeg': __dirname + '/record/data/recordType-codeg.json',
            'customrecord_codeg_ids': __dirname + '/record/data/recordType-codeg_ids.json'
        };

    // start database simulation
    nsmockup.initDB({records, metadatas}, function(err) {
        if (err) throw err;

        console.log('search record', nlapiSearchRecord('customrecord_codeg'));
    });
```

[travis-url]: https://travis-ci.org/suiteplus/nsmockup
[travis-image]: https://img.shields.io/travis/suiteplus/nsmockup.svg

[coveralls-url]: https://coveralls.io/r/suiteplus/nsmockup
[coveralls-image]: http://img.shields.io/coveralls/suiteplus/nsmockup/master.svg