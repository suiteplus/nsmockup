# nsmockup [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependency Status][david-image]][david-url]
Netsuite API Mockup

## Required
 * node.js 4+

## Install
```bash
    npm install nsmockup
```

## Usage

#### nsmockup.init(opt, cb)
 - opt {records: [String], metadatas: [String]}
 - cb  {Function}

#### nsmockup.createSuitelet(cfg)
 - cfg {name: String, func: String, files: [String]}

#### nsmockup.createReslet(cfg)
 - cfg {name: String, func: String, files: [String]}

#### nsmockup.destroy(cb)
 - cb  {Function}

## Example
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
    nsmockup.init({records, metadatas}, function(err) {
        if (err) throw err;

        console.log('search record', nlapiSearchRecord('customrecord_codeg'));
    });
```

[npm-url]: https://npmjs.org/package/nsmockup
[npm-image]: http://img.shields.io/npm/v/nsmockup.svg

[travis-url]: https://travis-ci.org/suiteplus/nsmockup
[travis-image]: https://img.shields.io/travis/suiteplus/nsmockup.svg

[coveralls-url]: https://coveralls.io/r/suiteplus/nsmockup
[coveralls-image]: http://img.shields.io/coveralls/suiteplus/nsmockup/master.svg

[david-url]: https://david-dm.org/suiteplus/nsmockup
[david-image]: https://david-dm.org/suiteplus/nsmockup.svg