'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Sublist API>', function () {
    this.timeout(5000);

    beforeEach(function (done) {
        let metadatas = [
                base + '/meta/recordType-metaData-codeg.json'
            ],
            records = {
                'customrecord_codeg': base + '/data/recordType-codeg.json'
            };
        nsmockup.init({records, metadatas}, done);
    });
    describe('SuiteScript API - nlapiSearchRecord:', function () {
        let recType = 'customrecord_codeg',
            item = 'item_code';

        it('record new line and commit', function (done) {
            let o = nlapiLoadRecord(recType, 4);
            should(o).have.instanceOf(nlobjRecord);
            o.selectNewLineItem(item);

            o.setCurrentLineItemValue(item, 'item-id', 12);
            o.setCurrentLineItemValue(item, 'item-title', 'item legal');
            o.setCurrentLineItemValue(item, 'item-value', '902193');

            let currentId = o.getCurrentLineItemValue(item, 'item-id'),
                currentTitle = o.getCurrentLineItemValue(item, 'item-title'),
                currentValue = o.getCurrentLineItemValue(item, 'item-value');

            should(currentId).be.equal('12');
            should(currentTitle).be.equal('item legal');
            should(currentValue).be.equal('902193');

            let index = o.getCurrentLineItemIndex(item);
            should(index).be.equal(3);

            o.commitLineItem(item);

            return done();
        });

        it('record new line and cancel', function (done) {
            let o = nlapiLoadRecord(recType, 4);
            should(o).have.instanceOf(nlobjRecord);
            o.selectNewLineItem(item);

            o.setCurrentLineItemValue(item, 'item-id', 12);
            o.setCurrentLineItemValue(item, 'item-title', 'item legal');
            o.setCurrentLineItemValue(item, 'item-value', '902193');

            o.cancelLineItem(item);

            let index = o.getCurrentLineItemIndex(item);
            should(index).be.equal(-1);

            try {
                o.getCurrentLineItemValue(item, 'item-id');
                return done(`invalid current item`);
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_CURRENT_LINE_ITEM');
                return done();
            }
        });

        it('record new line and commit', function (done) {
            let o = nlapiLoadRecord(recType, 4);
            should(o).have.instanceOf(nlobjRecord);
            o.selectLineItem(item, 1);

            o.setCurrentLineItemValue(item, 'item-id', 23);
            o.setCurrentLineItemValue(item, 'item-title', 'item super legal');
            o.setCurrentLineItemValue(item, 'item-value', '111');

            let index = o.getCurrentLineItemIndex(item);
            should(index).be.equal(1);

            o.commitLineItem(item);

            try {
                o.getCurrentLineItemValue(item, 'item-id');
                return done(`invalid current item`);
            } catch(e) {
                should(e).have.property('code', 'SSS_INVALID_CURRENT_LINE_ITEM');
                return done();
            }
        });
    });
    afterEach(function (done) {
        nsmockup.destroy(done);
    });
});
