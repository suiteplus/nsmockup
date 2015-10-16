'use strict';

var should = require('should');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Date API>', function () {
    describe('SuiteScript API - nlapiDateToString:', function () {
        it('date no format', function (done) {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date);
            should(str).have.instanceOf(String);
            should(str).be.equal('15-09-2015', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date format "date"', function (done) {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date, 'date');
            should(str).have.instanceOf(String);
            should(str).be.equal('15-09-2015', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date format "datetime"', function (done) {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date, 'datetime');
            should(str).have.instanceOf(String);
            should(str).be.equal('15-09-2015 08:58:12', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date format "datetimetz"', function (done) {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date, 'datetimetz');
            should(str).have.instanceOf(String);
            should(str).be.equal('15-09-2015 08:58:12 +00:00', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date format "timeofday"', function (done) {
            let date = new Date('2015-09-15T08:58:12+0000'),
                str = nlapiDateToString(date, 'timeofday');
            should(str).have.instanceOf(String);
            should(str).be.equal('08:58:12', `Wrong format ${date.toJSON()} -> ${str}`);

            return done();
        });

        it('date missing str', function (done) {
            try {
                nlapiDateToString();
                return done('missing str ');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_DATE_REQD');
                return done();
            }
        });

        it('date invalid format', function (done) {
            try {
                nlapiDateToString('10-10-2015', 'japo');
                return done('invalid format');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_FORMATTYPE');
                return done();
            }
        });
    });
});
