'use strict';

var should = require('should'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Date API>', function () {
    before(function (done) {
        let localPrefs = {
                dateFormat: 'DD-MM-YYYY',
                timeFormat: 'HH:mm:ss'
            },
            opts = {
                general: localPrefs
            };
        nsmockup.init(opts, done);
    });
    describe('SuiteScript API - nlapiAddMonths:', function () {
        let date = new Date('2015-09-15T08:58:12+0000');

        it('add-months +1 month', function (done) {
            let add = nlapiAddMonths(date, 1);
            should(add).have.instanceOf(Date);
            should(add.toJSON()).be.equal('2015-10-15T08:58:12.000Z', `Wrong month ${date.toJSON()} (+1 month) -> ${add.toJSON()}`);

            return done();
        });

        it('add-months -7 months', function (done) {
            let add = nlapiAddMonths(date, -7);
            should(add).have.instanceOf(Date);
            should(add.toJSON()).be.equal('2015-02-15T08:58:12.000Z', `Wrong month ${date.toJSON()} (-7 months) -> ${add.toJSON()}`);

            return done();
        });

        it('add-months + 330 months', function (done) {
            let add = nlapiAddMonths(date, 330);
            should(add).have.instanceOf(Date);
            should(add.toJSON()).be.equal('2043-03-15T08:58:12.000Z', `Wrong month ${date.toJSON()} (+330 months) -> ${add.toJSON()}`);

            return done();
        });

        it('add-months missing date', function (done) {
            try {
                nlapiAddMonths();
                return done('missing date');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_DATE_REQD');
                return done();
            }
        });

        it('add-months missing days', function (done) {
            try {
                nlapiAddMonths(date);
                return done('missing months');
            } catch (e) {
                should(e).have.property('code', 'SSS_TYPE_MONTHS_REQD');
                return done();
            }
        });

        it('add-months invalid format', function (done) {
            try {
                nlapiAddMonths('10-10-2015', 'japo');
                return done('invalid format');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_MONTHS');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
