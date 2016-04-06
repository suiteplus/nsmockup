'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Date API>', function () {
    before(done => {
        let localPrefs = {
                dateFormat: 'DD-MM-YYYY',
                timeFormat: 'HH:mm:ss'
            },
            opts = {
                general: localPrefs
            };
        nsmockup.init(opts, done);
    });
    parallel('SuiteScript API - nlapiDateToString:', () => {
        it('date no format', done => {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date);
            should(str).have.instanceOf(String);
            should(str).be.equal('15-09-2015', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date format "date"', done => {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date, 'date');
            should(str).have.instanceOf(String);
            should(str).be.equal('15-09-2015', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date format "datetime"', done => {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date, 'datetime');
            should(str).have.instanceOf(String);
            should(str).be.equal('15-09-2015 08:58:12', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date format "datetimetz"', done => {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date, 'datetimetz');
            should(str).have.instanceOf(String);
            should(str).be.equal('15-09-2015 08:58:12 +00:00', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date format "timeofday"', done => {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date, 'timeofday');
            should(str).have.instanceOf(String);
            should(str).be.equal('08:58:12', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date missing str', done => {
            try {
                nlapiDateToString();
                return done('missing str ');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_DATE_REQD');
                return done();
            }
        });

        it('date invalid format', done => {
            try {
                nlapiDateToString('10-10-2015', 'japo');
                return done('invalid format');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_FORMATTYPE');
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
