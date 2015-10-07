'use strict';

var should = require('should'),
    nsmockup = require('../');

var base = __dirname + '/_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Create Schedule>', function () {
    this.timeout(5000);
    before(function (done) {
        let metadatas = [
            base + '/meta/recordType-metaData-codeg_ids.json'
        ],
        records = {
            'customrecord_codeg_ids': base + '/data/recordType-codeg_ids.json'
        };
        nsmockup.init({records, metadatas}, done);
    });
    describe('Create Script - Schedule', function () {
        it('create schedule', function (done) {
            nsmockup.createSchedule({
                name: 'customscript_my_schedule',
                files: [
                    __dirname + '/_input-files/scripts/fake-schedule.js'
                ],
                func: 'ScheduleFake',
                params: {
                    'fake-param': 'customrecord_codeg_ids'
                },
                exec: true
            }, (ctx) => {
                should(ctx.context).be.ok();
                should(ctx.ScheduleFake).be.ok();

                return done();
            });
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
