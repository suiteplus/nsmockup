# nsmockup [![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

*Test your Suitescripts before deploying to NetSuite.*

**nsmockup** is a tool to create NetSuite Suite Scripts unit tests.

You can test your code before deploy it to your NetSuite account.
Do you develop NetSuite Suite Scripts? Well, then you know how complicated is to test your code! You need to upload it, configure your script, start the debbuger and, maybe, you can test that! 

This further complicates in larger projects, where you reuse your code in several Suite Scripts.

To improve our development process SuitePlus idealized the **nsmockup**, so developers can:

- Simulate NetSuite environment locally.
- Create automated tests for your projects in a controlled environment.


## Required
 * node.js 4+

## Install [![Dependency Status][david-image]][david-url] [![devDependency Status][david-image-dev]][david-url-dev]
```bash
    npm install nsmockup -save-dev
```

## Usage

<a name="nsmockup.init"></a>
#### nsmockup.init(opt, cb)
| Param  | Type                |Description  | 
| ------ | ------------------- | ------------|
| opt.current.company | <code>string</code> | Define company of the current NetSuite user. Default `NSMOCKUPVxxx`.|
| opt.current.user.id | <code>number</code> | Define the ID of the current NetSuite user. Default `-4` for anonymous. Default `null`. |
| opt.current.user.type | <code>string</code> | Define the type of the current NetSuite user, see options: `"employee"`, `"customer"`, `"vendor"` or `"partner"`. Default `"entity"` |
| opt.general.dateFormat | <code>string</code> | Global Preferences: `dateformat`, default `"MM/DD/YYYY"`. |
| opt.general.timeFormat | <code>string</code> | Global Preferences: `timeFormat`, default `"hh:mm A"`. |
| opt.general.lang | <code>string</code> | Global Preferences: `lang`, default `"en"`. |
| opt.metadatas | <code>[string]</code> | List of Records Types Metadatas, generate that with [ns-export][nsexport-url]. |
| opt.records | <code>[string]</code> | Data list of Records, generate that with [ns-export][nsexport-url]. | 
| opt.server | <code>boolean</code> | Set `true` and start server on port `3030`. Used for Suitelet and RESTlet simulations. |
| cb   | <code>function</code> | Callback Function. |

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

<a name="nsmockup.createSuitelet"></a>
#### nsmockup.createSuitelet(cfg, cb)
| Param  | Type                |Description  | 
| ------ | ------------------- | ------------|
| cfg.name | <code>string</code> | Custom ID of Suitelet. |
| cfg.func | <code>string</code> | Defines the function that should be called from the selected script file. |
| cfg.files | <code>[string]</code> | Path to JavaScripts files that contains your implementation. |
| cfg.params | <code>object</code> | Default parameters to run your implementation. |
| cb   | <code>function</code> | Callback Function sent `ctx` (type: <code>object</code>) - the context *and* `exec` (type: <code>function</code>) invoke your code in side the context. |

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

<a name="nsmockup.createRESTlet"></a>
#### nsmockup.createRESTlet(cfg, cb)
| Param  | Type                |Description  | 
| ------ | ------------------- | ------------|
| cfg.name | <code>string</code> | Custom ID of Suitelet. |
| cfg.funcs.get | <code>string</code> | Sets the script function that should execute as the HTTP GET method. |
| cfg.funcs.post | <code>string</code> | Sets the script function that should execute as the HTTP POST method. |
| cfg.funcs.put | <code>string</code> | Sets the script function that should execute as the HTTP PUT method. |
| cfg.funcs.delete | <code>string</code> | Sets the script function that should execute as the HTTP DELETE method. |
| cfg.files | <code>[string]</code> | Path to JavaScripts files that contains your implementation. |
| cfg.params | <code>object</code> | Default parameters to run your implementation. |
| cb   | <code>function</code> | Callback Function sent `ctx` (type: <code>object</code>) - the context *and* `exec` (type: <code>function</code>) invoke your code in side the context. |

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

<a name="nsmockup.createSchedule"></a>
#### nsmockup.createSchedule(cfg, cb)
| Param  | Type                |Description  | 
| ------ | ------------------- | ------------|
| cfg.name | <code>string</code> | Custom ID of Suitelet. |
| cfg.func | <code>string</code> | Defines the function that should be called from the selected script file. |
| cfg.files | <code>[string]</code> | Path to JavaScripts files that contains your implementation. |
| cfg.params | <code>object</code> | Default parameters to run your implementation. |
| cfg.exec | <code>boolean</code> | If `true`, **nsmockup** will run de ScheduleScript before the callback function was called. |
| cb   | <code>function</code> | Callback Function sent `ctx` (type: <code>object</code>) - the context *and* `exec` (type: <code>function</code>) invoke your code in side the context. |

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

<a name="nsmockup.createUserEvent"></a>
#### nsmockup.createUserEvent(cfg, cb)
| Param  | Type                |Description  | 
| ------ | ------------------- | ------------|
| cfg.name | <code>string</code> | Custom ID of Suitelet. |
| cfg.funcs.beforeLoad | <code>string</code> | Sets the script function that should execute whenever a read operation on a record occurs. |
| cfg.funcs.beforeSubmit | <code>string</code> | Sets the function that should execute before the associated record is submitted |
| cfg.funcs.afterSubmit | <code>string</code> | Sets the function that should execute after the associated record is submitted. |
| cfg.files | <code>[string]</code> | Path to JavaScripts files that contains your implementation. |
| cfg.params | <code>object</code> | Default parameters to run your implementation. |
| cfg.record | <code>string</code> | Apply this event in this record. |
| cb   | <code>function</code> | Callback Function sent `ctx` (type: <code>object</code>) - the context *and* `exec` (type: <code>function</code>) invoke your code in side the context. |

```javascript
    nsmockup.createUserEvent({
        name: 'my_user-event',
        funcs: {
            beforeLoad: 'MyUserEvent.beforeLoad',
            beforeSubmit: 'MyUserEvent.beforeSubmit',
            afterSubmit: 'MyUserEvent.afterSubmit',
        },
        files: [
            __dirname + '/lib/my-user-event.js'
        ],
        record: 'customer'
    }, (ctx, exec) => {
        // verify if function 'MyUserEvent' was loaded
        if (!ctx.MyUserEvent) throw 'not found MySchedule'
        var should = require('should')

        let record = nlapiLoadRecord('customer', 219);
        record.setFieldValue('name', 'Muito Legal');

        nlapiSubmitRecord(record);

        let context = ctx.nlapiGetContext();
        should(context).be.ok();

        let beforeLoadType = context.getSessionObject('before-load-type');
        should(beforeLoadType).be.equal('view');

        let beforeSubmitType = context.getSessionObject('before-submit-type');
        should(beforeSubmitType).be.equal('edit');

        let afterSubmitType = context.getSessionObject('after-submit-type');
        should(afterSubmitType).be.equal('edit');
    });
```

<a name="nsmockup.destroy"></a>
#### nsmockup.destroy(cb)
| Param  | Type                |Description  | 
| ------ | ------------------- | ------------|
| cb   | <code>function</code> | Callback Function. |

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
                __dirname + '/lib/my-restlet.js'
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

[nsexport-url]: https://github.com/suiteplus/ns-export