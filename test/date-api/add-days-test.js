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
    parallel('SuiteScript API - nlapiAddDays:', () => {
        let date = new Date('2015-09-15T08:58:12+0000');

        it('add-days +1 day', done => {
            let add = nlapiAddDays(date, 1);
            should(add).have.instanceOf(Date);
            should(add.toJSON()).be.equal('2015-09-16T08:58:12.000Z', `Wrong day ${date.toJSON()} (+1 day) -> ${add.toJSON()}`);

            return done();
        });

        it('add-days -7 days', done => {
            let add = nlapiAddDays(date, -7);
            should(add).have.instanceOf(Date);
            should(add.toJSON()).be.equal('2015-09-08T08:58:12.000Z', `Wrong day ${date.toJSON()} (-7 days) -> ${add.toJSON()}`);

            return done();
        });

        it('add-days + 330 days', done => {
            let add = nlapiAddDays(date, 330);
            should(add).have.instanceOf(Date);
            should(add.toJSON()).be.equal('2016-08-10T08:58:12.000Z', `Wrong day ${date.toJSON()} (+330 days) -> ${add.toJSON()}`);

            return done();
        });

        it('add-days missing date', done => {
            try {
                nlapiAddDays();
                return done('missing date ');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_DATE_REQD');
                return done();
            }
        });

        it('add-days missing days', done => {
            try {
                nlapiAddDays(date);
                return done('missing days ');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_DAYS_REQD');
                return done();
            }
        });

        it('add-days invalid format', done => {
            try {
                nlapiAddDays('10-10-2015', 'japo');
                return done('invalid format');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_DAYS');
                return done();
            }
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
