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
        let metadata = [
                base + '/meta/recordType-metaData-codeg.json'
            ],
            records = {
                'customrecord_codeg': base + '/data/recordType-codeg.json'
            };
        nsmockup.init({records, metadata}, done);
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
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_CURRENT_LINE_ITEM');
                return done();
            }
        });

        it('record select line and commit', function (done) {
            let o = nlapiLoadRecord(recType, 4);
            should(o).have.instanceOf(nlobjRecord);
            o.selectLineItem(item, 1);

            o.setCurrentLineItemValue(item, 'item-id', 23);
            o.setCurrentLineItemText(item, 'item-title', 'item super legal');
            o.setCurrentLineItemText(item, 'item-value', '111');

            let index = o.getCurrentLineItemIndex(item);
            should(index).be.equal(1);

            let currentId = o.getCurrentLineItemText(item, 'item-id'),
                currentTitle = o.getCurrentLineItemText(item, 'item-title'),
                currentValue = o.getCurrentLineItemText(item, 'item-value');

            should(currentId).be.equal('23');
            should(currentTitle).be.equal('item super legal');
            should(currentValue).be.equal('111');

            try {
                o.getCurrentLineItemText();
                return done(`missing SubList Type`);
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_SUBLIST_NAME');
            }

            o.commitLineItem(item);

            try {
                o.getCurrentLineItemValue(item, 'item-id');
                return done(`invalid current item`);
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_CURRENT_LINE_ITEM');
            }
            return done();
        });

        it('record count lines and find line', function (done) {
            let o = nlapiLoadRecord(recType, 4);
            should(o).have.instanceOf(nlobjRecord);

            let count = o.getLineItemCount(item);
            should(count).be.equal(2);

            try {
                o.getLineItemCount();
                return done(`missing SubList Type`);
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_SUBLIST_NAME');
            }

            let index = o.findLineItemValue(item, 'item-value', 'value 96');
            should(index).be.equal(2);

            o.setLineItemValue(item, 'item-value', index, 'VALUE-9966');

            o.commitLineItem(item);

            let title = o.getLineItemValue(item, 'item-title', index),
                value = o.getLineItemValue(item, 'item-value', index);

            should(title).be.equal('legal 96');
            should(value).be.equal('VALUE-9966');

            return done();
        });

        it('record insert new line and commit', function (done) {
            let o = nlapiLoadRecord(recType, 4);
            should(o).have.instanceOf(nlobjRecord);
            {
                o.insertLineItem(item, 2);

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
                should(index).be.equal(2);

                o.commitLineItem(item);

                let count = o.getLineItemCount(item);
                should(count).be.equal(3);

                o.selectLineItem(item, 3);

                let lastCurrentId = o.getCurrentLineItemText(item, 'item-id'),
                    lastCurrentTitle = o.getCurrentLineItemText(item, 'item-title'),
                    lastCurrentValue = o.getCurrentLineItemText(item, 'item-value');

                should(lastCurrentId).be.equal('96');
                should(lastCurrentTitle).be.equal('legal 96');
                should(lastCurrentValue).be.equal('value 96');
            }
            // pos insert
            {
                o.insertLineItem(item, 4);

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
                should(index).be.equal(4);

                o.commitLineItem(item);

                let count = o.getLineItemCount(item);
                should(count).be.equal(4);

                o.selectLineItem(item, 3);

                let lastCurrentId = o.getCurrentLineItemText(item, 'item-id'),
                    lastCurrentTitle = o.getCurrentLineItemText(item, 'item-title'),
                    lastCurrentValue = o.getCurrentLineItemText(item, 'item-value');

                should(lastCurrentId).be.equal('96');
                should(lastCurrentTitle).be.equal('legal 96');
                should(lastCurrentValue).be.equal('value 96');
            }
            return done();
        });
    });
    afterEach(function (done) {
        nsmockup.destroy(done);
    });
});
