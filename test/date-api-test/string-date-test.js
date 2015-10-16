'use strict';

var should = require('should');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Date API>', function () {
    describe('SuiteScript API - nlapiStringToDate:', function () {
        it('date format "date"', function (done) {
            let str = '15-09-2015 08:58:12 -03:00',
                date = nlapiStringToDate(str, 'date');
            should(date).have.instanceOf(Date);
            should(date.getUTCDate()).be.equal(15, `Wrong day ${str} -> ${date.toJSON()}`);
            should(date.getUTCMonth()).be.equal(8, `Wrong month ${str} -> ${date.toJSON()}`);
            should(date.getUTCFullYear()).be.equal(2015, `Wrong year ${str} -> ${date.toJSON()}`);
            should(date.getUTCHours()).be.equal(0, `Wrong hours ${str} -> ${date.toJSON()}`);
            should(date.getUTCMinutes()).be.equal(0, `Wrong minutes ${str} -> ${date.toJSON()}`);
            should(date.getUTCSeconds()).be.equal(0, `Wrong seconds ${str} -> ${date.toJSON()}`);
            should(date.toJSON()).be.equal('2015-09-15T00:00:00.000Z');

            return done();
        });

        it('date format "date" not timezone', function (done) {
            let str = '15-09-2015 08:58:12',
                date = nlapiStringToDate(str, 'date');
            should(date).have.instanceOf(Date);
            should(date.getUTCDate()).be.equal(15, `Wrong day ${str} -> ${date.toJSON()}`);
            should(date.getUTCMonth()).be.equal(8, `Wrong month ${str} -> ${date.toJSON()}`);
            should(date.getUTCFullYear()).be.equal(2015, `Wrong year ${str} -> ${date.toJSON()}`);
            should(date.getUTCHours()).be.equal(0, `Wrong hours ${str} -> ${date.toJSON()}`);
            should(date.getUTCMinutes()).be.equal(0, `Wrong minutes ${str} -> ${date.toJSON()}`);
            should(date.getUTCSeconds()).be.equal(0, `Wrong seconds ${str} -> ${date.toJSON()}`);
            should(date.toJSON()).be.equal('2015-09-15T00:00:00.000Z');

            return done();
        });

        it('date format "datetime"', function (done) {
            let str = '15-09-2015 08:58:12',
                date = nlapiStringToDate(str, 'datetime');
            should(date).have.instanceOf(Date);
            should(date.getUTCDate()).be.equal(15, `Wrong day ${str} -> ${date.toJSON()}`);
            should(date.getUTCMonth()).be.equal(8, `Wrong month ${str} -> ${date.toJSON()}`);
            should(date.getUTCFullYear()).be.equal(2015, `Wrong year ${str} -> ${date.toJSON()}`);
            should(date.getUTCHours()).be.equal(8, `Wrong hours ${str} -> ${date.toJSON()}`);
            should(date.getUTCMinutes()).be.equal(58, `Wrong minutes ${str} -> ${date.toJSON()}`);
            should(date.getUTCSeconds()).be.equal(12, `Wrong seconds ${str} -> ${date.toJSON()}`);
            should(date.toJSON()).be.equal('2015-09-15T08:58:12.000Z');

            return done();
        });

        it('date format "datetimetz"', function (done) {
            let str = '15-09-2015 08:58:12',
                date = nlapiStringToDate(str, 'datetimetz');
            should(date).have.instanceOf(Date);
            should(date.getUTCDate()).be.equal(15, `Wrong day ${str} -> ${date.toJSON()}`);
            should(date.getUTCMonth()).be.equal(8, `Wrong month ${str} -> ${date.toJSON()}`);
            should(date.getUTCFullYear()).be.equal(2015, `Wrong year ${str} -> ${date.toJSON()}`);
            should(date.getUTCHours()).be.equal(8, `Wrong hours ${str} -> ${date.toJSON()}`);
            should(date.getUTCMinutes()).be.equal(58, `Wrong minutes ${str} -> ${date.toJSON()}`);
            should(date.getUTCSeconds()).be.equal(12, `Wrong seconds ${str} -> ${date.toJSON()}`);
            should(date.toJSON()).be.equal('2015-09-15T08:58:12.000Z');

            return done();
        });

        it('date format "timeofday"', function (done) {
            let str = '08:58:12',
                date = nlapiStringToDate(str, 'timeofday');
            should(date).have.instanceOf(Date);
            should(date.getUTCHours()).be.equal(8, `Wrong hours ${str} -> ${date.toJSON()}`);
            should(date.getUTCMinutes()).be.equal(58, `Wrong minutes ${str} -> ${date.toJSON()}`);
            should(date.getUTCSeconds()).be.equal(12, `Wrong seconds ${str} -> ${date.toJSON()}`);

            return done();
        });

        it('date missing str', function (done) {
            try {
                nlapiStringToDate();
                return done('missing str ');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_STR_REQD');
                return done();
            }
        });

        it('date missing format', function (done) {
            try {
                nlapiStringToDate('10-10-2015');
                return done('missing format');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_FORMAT_REQD');
                return done();
            }
        });

        it('date invalid format', function (done) {
            try {
                nlapiStringToDate('10-10-2015', 'japo');
                return done('invalid format');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_FORMATTYPE');
                return done();
            }
        });
    });
});
