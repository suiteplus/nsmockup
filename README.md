# nsmockup [![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Netsuite API Mockup

## Required
 * node.js 4+

## Install [![Dependency Status][david-image]][david-url] [![devDependency Status][david-image-dev]][david-url-dev]
```bash
    npm install nsmockup
```

## Usage

#### nsmockup.init(opt, cb)
 - opt {records: [String], metadatas: [String]}
 - cb  {Function}
```javascript
    var opt = {
        records: {
            "customrecord_my-record": __dirname + '/data/customrecord_my-record.json'
        },
        metadatas: [
            __dirname + '/meta/metaData-customrecord_my-record.json'
        ]
    };
    nsmockup.init(opt, function(err) {
        if (err) console.log('ERROR', err);
        else console.log('start Netsuite API simulation')
    });
```

#### nsmockup.createSuitelet(cfg)
 - cfg {name: String, func: String, files: [String], params: Object}
```javascript
    nsmockup.createSuitelet({
        name: 'my_suitelet',
        func: 'MySuitelet.main',
        files: [
            __dirname + '/lib/my-suitelet.js'
        ]
    });
```

#### nsmockup.createRESTlet(cfg)
 - cfg {name: String, func: String, files: [String], params: Object}
```javascript
    nsmockup.createRESTlet({
        name: 'my_restlet',
        func: 'MyRestlet.main',
        files: [
            __dirname + '/lib/my-restlet.js'
        ]
    });
```

#### nsmockup.createSchedule(cfg)
 - cfg {name: String, func: String, files: [String], params: Object}
```javascript
    nsmockup.createSchedule({
        name: 'my_schedule',
        func: 'MySchedule.main',
        files: [
            __dirname + '/lib/my-schedule.js'
        ]
    });
```

#### nsmockup.destroy(cb)
 - cb  {Function}
```javascript
    nsmockup.destroy(function(err) {
        if (err) console.log('ERROR', err);
        else console.log('finish Netsuite API simulation')
    });
```

## Example with Mocha
```javascript
'use strict';
var nsmockup = require('nsmockup');
describe('<Unit Test - Netsuite API Simulation>', function () {

    before(function (done) {
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
        nsmockup.init({records, metadatas}, done);
    });

    it('simple load lib and execute function', function (done) {
        nsmockup.createReslet({
            name: 'my_restlet',
            func: 'MyRestlet.main',
            files: [
                __dirname + '/lib/my-restlet.js'
            ]
         });
         MyRestlet.main();
    });

    after(function (done) {
        nsmockup.destroy(done);
    });
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

[david-url-dev]: https://david-dm.org/suiteplus/nsmockup#info=devDependencies
[david-image-dev]: https://david-dm.org/suiteplus/nsmockup/dev-status.svg