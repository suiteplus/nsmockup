'use strict';
var $metadata = require('../db-utils/metadata'),
    $sublist = require('../ctx-utils/sublist'),
    uuid = require('node-uuid');

/**
 * Return a new instance of nlobjRecord used for accessing and manipulating record objects.
 *
 * @classDescription Class definition for business records in the system.
 * @return {nlobjRecord}
 * @constructor
 *
 * @since 2008.2
 */
exports.nlobjRecord = function nlobjRecord(type, id, _uuid) {
    this.type = type;
    this.id = id;
    this._uuid = _uuid || uuid.v4();
    this.fields = {};
    this.sublists = null;
    this.fieldnames = [];
    this.initialized = false;
    this.operations = [];

    // invoke subLists
    let invoke = $sublist.invoke(this.type, type, this._uuid);
    this.context = invoke.ctx;

    /**
     * Return the internalId of the record or NULL for new records.
     *
     * @return {int} Return the integer value of the record ID.
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.getId = function () {
        return this.id;
    };
    /**
     * Return the recordType corresponding to this record.
     *
     * @return {string} The string value of the record name internal ID
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.getRecordType = function () {
        return this.type;
    };
    /**
     * Set the value of a field.
     *
     * @param {string} name field name
     * @param {string} value field value
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.setFieldValue = function (name, value) {
        this.fields[name] = value;
        this.logOperation('setFieldValue', {'field': name, 'value': value});
    };
    /**
     * Set the values of a multi-select field.
     *
     * @param {string} name field name
     * @param {string[]} values string array containing field values
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.setFieldValues = function (name, values) {
        this.fields[name] = values;
        this.logOperation('setFieldValues', {'field': name, 'value': values});
    };
    /**
     * Return the value of a field.
     *
     * @param {string} name field name
     * @return {string}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.getFieldValue = function (name) {
        let value = this.fields[name];
        if (value) {
            return '' + value;
        } else {
            return null;
        }
    };
    /**
     * Return the selected values of a multi-select field as an Array.
     *
     * @param {string} name field name
     * @return {string[]}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.getFieldValues = function (name) {
        return this.fields[name];
    };

    /**
     * Return an Array of all field names on the record.
     *
     * @return {string[]}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.getAllFields = function () {
        var s = Object.keys(this.fields);
        for (var i = 0; i < this.fieldnames.length; i++) {
            var fieldName = this.fieldnames[i];
            !~s.indexOf(fieldName) && s.push(fieldName);
        }
        return s;
    };

    this.getAllLineItems = function () {

    };
    /**
     * Return an Array of all field names on a record for a particular sublist.
     *
     * @param {string} group sublist name
     * @return {string[]}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.2
     */
    this.getAllLineItemFields = function (name) {
        let subMeta = $metadata.findSubList(this.type, name);
        return subMeta.map(f => f.code);
    };
    /**
     * Set the value of a sublist field.
     *
     * @param {string}    group sublist name
     * @param {string}    name sublist field name
     * @param {int}    line line number (1-based)
     * @param {string}    value sublist field value
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.setLineItemValue = function (group, name, line, value) {
        invoke.exec('nlapiSetLineItemValue', [group, name, line, value]);
    };
    this.setAndCommitLineItemValue = function (group, name, line, value) {

    };
    /**
     * Insert a new line into a sublist.
     *
     * @param {string}    group sublist name
     * @param {int}    [line] line index at which to insert line
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.insertLineItem = function (type, line) {
        invoke.exec('nlapiInsertLineItem', [type, line]);
    };
    /**
     * Remove an existing line from a sublist.
     *
     * @param {string}    group sublist name
     * @param {int}    [line] line number to remove
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.removeLineItem = function (type, line) {

    };
    /**
     * Return the value of a sublist field.
     *
     * @param {string}    group sublist name
     * @param {string}    name sublist field name
     * @param {int}    line line number (1-based)
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.1
     */
    this.getLineItemValue = function (group, name, line) {
        return invoke.exec('nlapiGetLineItemValue', [group, name, line]);
    };
    /**
     * Return the number of lines in a sublist.
     *
     * @param {string} group sublist name
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getLineItemCount = function (group) {
        return invoke.exec('nlapiGetLineItemCount', [group]);
    };
    this.setLineItemMatrixValue = function (type, fldnam, linenum, column, value) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getLineItemMatrixValue = function (type, fldnam, linenum, column) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Return line number for 1st occurence of field value in a sublist column.
     *
     * @param {string} group    sublist name
     * @param {string} fldnam    sublist field name
     * @param {string} value    sublist field value
     * @return {int}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.findLineItemValue = function (type, fldnam, value) {
        return invoke.exec('nlapiFindLineItemValue', [type, fldnam, value]);
    };
    /**
     * Return line number for 1st occurence of field value in a sublist column.
     *
     * @param {string}    group    sublist name
     * @param {string}    fldnam    sublist field name
     * @param {int}    column  matrix column index (1-based)
     * @param {string}    value    matrix field value
     * @return {int}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.findLineItemMatrixValue = function (type, fldnam, column, value) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Set the value of a matrix header field.
     *
     * @param {string}    type matrix sublist name
     * @param {string}    name    matrix field name
     * @param {int}    column matrix column index (1-based)
     * @param {string}    value field value
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.setMatrixValue = function (type, name, column, value) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Get the value of a matrix header field.
     *
     * @param {string} type matrix sublist name
     * @param {string} name    matrix field name
     * @param {int} column matrix column index (1-based)
     * @return {string}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getMatrixValue = function (type, fldnam, column) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Return the number of columns for a matrix field.
     *
     * @param {string}    group matrix sublist name
     * @param {string}    name matrix field name
     * @return {int}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getMatrixCount = function (type, fldnam) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Select an existing line in a sublist.
     *
     * @param {string}    group sublist name
     * @param {int}    line  line number to select
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.selectLineItem = function (type, linenum) {
        invoke.exec('nlapiSelectLineItem', [type, linenum]);
    };
    /**
     * Insert and select a new line in a sublist.
     *
     * @param {string} group sublist name
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.selectNewLineItem = function (type) {
        invoke.exec('nlapiSelectNewLineItem', [type]);
    };
    this.cancelLineItem = function (type) {
        invoke.exec('nlapiCancelLineItem', [type]);
    };
    /**
     * Commit the current line in a sublist.
     *
     * @param {string}    group sublist name
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.commitLineItem = function (type) {
        invoke.exec('nlapiCommitLineItem', [type]);
        let $this = invoke.ctx.$$THIS_RECORD;
        if ($this.commitSubLists && $this.commitSubLists.length) {
            if (!this.sublists) this.sublists = {};
            this.sublists[type] = $this.commitSubLists;
        }
    };
    this.getCurrentLineItemIndex = function (type) {
        return invoke.exec('nlapiGetCurrentLineItemIndex', [type]);
    };
    /**
     * Return the current value of a sublist field.
     *
     * @param {string}    group sublist name
     * @param {string}    name sublist field name
     * @return {string}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getCurrentLineItemValue = function (type, name) {
        return invoke.exec('nlapiGetCurrentLineItemValue', [type, name]);
    };
    /**
     * Set the current value of a sublist field.
     * @param {string}    group sublist name
     * @param {string}    name sublist field name
     * @param {string}    value sublist field value
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.setCurrentLineItemValue = function (type, name, value) {
        invoke.exec('nlapiSetCurrentLineItemValue', [type, name, value]);
    };
    /**
     * Set the current value of a sublist matrix field.
     *
     * @param {string}    group matrix sublist name
     * @param {string}    name matrix field name
     * @param {int}    column matrix field column index (1-based)
     * @param {string}    value matrix field value
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.setCurrentLineItemMatrixValue = function (type, fldnam, column, value) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Return the current value of a sublist matrix field.
     *
     * @param {string}    group matrix sublist name
     * @param {string}    name matrix field name
     * @param {int}    column matrix field column index (1-based)
     * @return {string}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getCurrentLineItemMatrixValue = function (type, fldnam, column) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Set the value (via display value) of a select field.
     * @restriction only supported for select fields
     *
     * @param {string} name field name
     * @param {string} text field display value
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.2
     */
    this.setFieldText = function (name, text) {
        this.setFieldValue(name, text);
    };
    /**
     * Set the values (via display values) of a multi-select field.
     * @restriction only supported for multi-select fields
     *
     * @param {string} name field name
     * @param {string[]} texts array of field display values
     * @return {void}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.2
     */
    this.setFieldTexts = function (name, texts) {
        this.setFieldValues(name, texts);
    };
    /**
     * Return the display value for a select field.
     * @restriction only supported for select fields
     *
     * @param {string} name field name
     * @return {string}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.2
     */
    this.getFieldText = function (name) {
        return this.getFieldValue(name);
    };
    /**
     * Return the selected display values of a multi-select field as an Array.
     * @restriction only supported for multi-select fields
     *
     * @param {string} name field name
     * @return {string[]}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.2
     */
    this.getFieldTexts = function (name) {
        return this.getFieldValues(name);
    };
    /**
     * Return the text value of a sublist field.
     *
     * @param {string}    group sublist name
     * @param {string}    name sublist field name
     * @param {int}    line line number (1-based)
     * @return {string}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2008.2
     */
    this.getLineItemText = function (type, name, line) {
        return invoke.exec('nlapiGetLineItemText', [type, name, line]);
    };
    /**
     * Return the current display value of a sublist field.
     *
     * @param {string}    group sublist name
     * @param {string}    name sublist field name
     * @return {string}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getCurrentLineItemText = function (type, name) {
        return invoke.exec('nlapiGetCurrentLineItemText', [type, name]);
    };
    this.setCurrentLineItemText = function (type, name, text) {
        return invoke.exec('nlapiSetCurrentLineItemText', [type, name, text]);
    };
    /**
     * Return field metadata for field.
     *
     * @param {string} fldnam field name
     * @return    {nlobjField}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.1
     */
    this.getField = function (fldnam) {
        let fieldMeta = $metadata.findField(this.type, fldnam),
            field = new nlobjField(fldnam, fieldMeta.type);
        return field;
    };
    /**
     * Return sublist metadata for sublist.
     *
     * @param {string} type sublist name
     * @return {nlobjSubList}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getSublist = function (type) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Return field metadata for field.
     *
     * @param {string} type matrix sublist name
     * @param {string} fldnam matrix field name
     * @param {column} linenum matrix column (1-based)
     * @return {nlobjField}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getMatrixField = function (type, fldnam) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Return metadata for sublist field.
     *
     * @param {string} type sublist name
     * @param {string} fldnam sublist field name
     * @param {int} [linenum] line number (1-based). If empty, the current sublist field is returned. only settable for sublists of type list
     * @return {nlobjField}
     *
     * @method
     * @memberOf nlobjRecord
     *
     * @since 2009.2
     */
    this.getLineItemField = function (type, name, linenum) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getFieldDisabled = function (name) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getFieldMandatory = function (name) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getFieldDisplay = function (name) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getFieldVisibility = function (name) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getFieldLabel = function (name) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getLineItemDisplay = function (name) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getLineItemDisabled = function (type, name, linenum) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getLineItemMandatory = function (type, name, linenum) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getLineItemLabel = function (type, name) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /* internal nlobjRecord helper methods */
    this.isMatrixField = function (type, fld) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getMatrixFieldName = function (type, fldnam, column) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.logOperation = function (operation, args) {
        if (this.initialized) this.operations.push({'operation': operation, 'args': args});
    };
    this.getDateTimeValue = function (fldname, timezone) {
        if (!timezone)
            return this.getFieldValue(fldname);
        else {
            var storedDateTime = this.getFieldValue(fldname);
            var context = nlapiGetContext();
            var preferredTimeZone = context.getPreference('TIMEZONE');
            if (preferredTimeZone == timezone)
                return storedDateTime;
            else
            //TODO calulate date time with timeZone - daniel - 9/26/2015
                return this.getFieldValue(fldname);
        }
    };

    this.setDateTimeValue = function (fldname, value, timezone) {
        if (!timezone)
            return this.setFieldValue(fldname, value);
        else {
            var context = nlapiGetContext();
            var preferredTimeZone = context.getPreference('TIMEZONE');
            if (preferredTimeZone == timezone)
                return this.setFieldValue(fldname, value);
            else {

                //TODO calulate date time with timeZone - daniel - 9/26/2015
                return this.setFieldValue(fldname, value, timezone);
            }
        }
    };

    // this is only supported on server-side dynamic record
    this.calculateTax = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
};