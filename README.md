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
 - opt {
    records: [String],
    metadatas: [String],
    server: Boolean
 }
 - cb  {Function}
```javascript
    var opt = {
        records: {
            "customrecord_my-record": __dirname + '/data/customrecord_my-record.json'
        },
        metadatas: [
            __dirname + '/meta/metaData-customrecord_my-record.json'
        ],
        server: true
    };
    nsmockup.init(opt, function(err) {
        if (err) console.log('ERROR', err);
        else console.log('start Netsuite API simulation')
    });
```

#### nsmockup.createSuitelet(cfg, cb)
 - cfg {
    name: String,
    func: String,
    files: [String],
    params: Object
 }
 - cb (ctx, exec) => {} -- **callback**
```javascript
    nsmockup.createSuitelet({
        name: 'my_suitelet',
        func: 'MySuitelet.main',
        files: [
            __dirname + '/lib/my-suitelet.js'
        ]
    }, (ctx, exec) => {
        // verify if function 'MySuitelet' was loaded
        if (!ctx.MySuitelet) throw 'not found MySuitelet'

        // invoke my RESTlet
        let url = nlapiResolveURL('SUTELET', 'my_suitelet'),
          res = nlapiRequestURL(url + 'message=hi');

        if (res.getBody() === 'hello') {
         console.log('Finish Suitelet');
        }
    });
```

#### nsmockup.createRESTlet(cfg, cb)
 - cfg {
    name: String,
    funcs: {
        get: String,
        post: String,
        put: String,
        delete: String
    },
    files: [String],
    params: Object
 }
 - cb (ctx, exec) => {} -- **callback**
```javascript
    nsmockup.createRESTlet({
        name: 'my_restlet',
        funcs: {
            get: 'MyRestlet.get',
            post: 'MyRestlet.post'
        },
        files: [
            __drname + '/lib/my-restlet.js'
        ]
    }, (ctx, exec) => {
         // verify if function 'MyRestlet' was loaded
         if (!ctx.MyRestlet) throw 'not found MyRestlet'

         // invoke my RESTlet
         let url = nlapiResolveURL('RESTLET', 'my_restlet'),
             res = nlapiRequestURL(url, {message: 'live?'}, null, 'POST');

         if (res.getBody() === 'yeap!') {
            console.log('Finish RESTlet');
         }
     });
```

#### nsmockup.createSchedule(cfg, cb)
 - cfg {
    name: String,
    func: String,
    files: [String],
    params: Object,
    exec: Boolean
 }
 - cb (ctx, exec) => {} -- **callback**
```javascript
    nsmockup.createSchedule({
        name: 'my_schedule',
        func: 'MySchedule.main',
        files: [
            __dirname + '/lib/my-schedule.js'
        ],
        exec: false
    }, (ctx, exec) => {
        // verify if function 'MySchedule' was loaded
        if (!ctx.MySchedule) throw 'not found MySchedule'
        // execute 'MyOtherFunc.getJapo'
        // you can execute any function present in file '/lib/my-schedule.js'
        let japo = exec('MyOtherFunc.getJapo');

        if (japo.verifyFinishSchedule()) {
            console.log('Finished Schedule');
        }
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
        nsmockup.init({records, metadatas, server: true}, done);
    });

    it('simple load lib and execute function', function (done) {
        nsmockup.createReslet({
            name: 'my_restlet',
            funcs: {
                get: 'MyRestlet.get',
                post: 'MyRestlet.post'
            },
            files: [
                __drname + '/lib/my-restlet.js'
            ]
        }, (ctx, exec) => {
             // verify if function 'MyRestlet' was loaded
             if (!ctx.MyRestlet) throw 'not found MyRestlet'

             // invoke my RESTlet
             let url = nlapiResolveURL('RESTLET', 'my_restlet'),
                 res = nlapiRequestURL(url, {message: 'live?'}, null, 'POST');

             if (res && res.getBody() === 'yeap!') {
                console.log('Finish RESTlet');
             } else {
                throw new Error('invalid result');
             }
         });
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