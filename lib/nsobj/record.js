'use strict';

/**
 * Return a new instance of nlobjRecord used for accessing and manipulating record objects.
 *
 * @classDescription Class definition for business records in the system.
 * @return {nlobjRecord}
 * @constructor
 *
 * @since 2008.2
 */
exports.nlobjRecord = function nlobjRecord(type, id) {
    this.type = type;
    this.id = id;
    this.fields = {};
    this.fieldnames = [];
    this.lineitems = {};
    this.linetypes = {};
    this.linefields = {};
    this.matrixfields = {};
    this.currentlineitems = {};
    this.currentlineitemindexes = {};
    this.initialized = false;
    this.operations = [];

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
        return this.fields[name];
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
        return Object.keys(this.lineitems);
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
        var linegroup = this.linefields[name];
        if (!linegroup)
            return null;

        var s = [];
        for (var i = 0; i < this.linefields[name].length; i++)
            s[s.length++] = this.linefields[name][i];
        return s;
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
        //nsapiAssertTrue(line > 0 && line - 1 <= this.getLineItemCount(group), 'SSS_INVALID_SUBLIST_OPERATION');
        /* Special case setting fields on the next line for edit machines and UI object list machines (backward compatiblity) */
        if (line - 1 == this.getLineItemCount(group))
            this.selectNewLineItem(group);
        else if (line <= this.getLineItemCount(group))
            this.selectLineItem(group, line);
        this.setCurrentLineItemValue(group, name, value);
        this.commitLineItem(group);
    };
    this.setAndCommitLineItemValue = function (group, name, line, value) {
        var linegroup = this.lineitems[group];
        if (!linegroup) {
            linegroup = [];
            this.lineitems[group] = linegroup;
        }
        var lineitem = linegroup[line];
        if (!lineitem) {
            lineitem = new Array(1);
            linegroup[line] = lineitem;
        }
        lineitem[name] = value;
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
        //nsapiAssertTrue(this.linetypes[type] == 'edit', 'SSS_INVALID_SUBLIST_OPERATION');
        if (this.getCurrentLineItemIndex(type) == -1) {
            if (line - 1 == this.getLineItemCount(type) || isNaN(parseInt(line)))
                this.selectNewLineItem(type);
            else if (line <= this.getLineItemCount(type))
                this.selectLineItem(type, line);
        }
        var linegroup = this.lineitems[type];
        if (!linegroup) {
            linegroup = new Array(1);
            this.lineitems[type] = linegroup;
        }
        linegroup.splice(line, 0, []);
        this.logOperation('insertLineItem', {'type': type});
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
        //nsapiAssertTrue(this.linetypes[type] == 'edit', 'SSS_INVALID_SUBLIST_OPERATION');
        if (this.getCurrentLineItemIndex(type) == -1) {
            if (line - 1 == this.getLineItemCount(type) || isNaN(parseInt(line)))
                this.selectNewLineItem(type);
            else if (line <= this.getLineItemCount(type))
                this.selectLineItem(type, line);
        }

        var linegroup = this.lineitems[type];
        if (!linegroup || this.getLineItemCount(type) < line)
            return;
        linegroup.splice(line, 1);
        this.logOperation('removeLineItem', {'type': type});
        if (~this.getCurrentLineItemIndex(type)) {
            this.currentlineitems[type] = null;
            this.currentlineitemindexes[type] = null;
        }
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
        var value = null;
        var linegroup = this.lineitems[group];
        if (linegroup) {
            var lineitem = linegroup[line];
            if (lineitem)
                value = lineitem[name];
        }
        return value;
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
        var linegroup = this.lineitems[group];
        return linegroup ? linegroup.length - 1 /* zeroth line is unused. */ : 0;
    };
    this.setLineItemMatrixValue = function (type, fldnam, linenum, column, value) {
        if (this.isMatrixField(type, fldnam))
            this.setLineItemValue(type, this.getMatrixFieldName(type, fldnam, column), linenum, value);
    };
    this.getLineItemMatrixValue = function (type, fldnam, linenum, column) {
        if (this.isMatrixField(type, fldnam))
            return this.getLineItemValue(type, this.getMatrixFieldName(type, fldnam, column), linenum);
        return null;
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
        for (var linenum = 1; linenum <= this.getLineItemCount(type); linenum++)
            if (value == this.getLineItemValue(type, fldnam, linenum))
                return linenum;
        return -1;
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
        if (this.isMatrixField(type, fldnam))
            return this.findLineItemValue(type, this.getMatrixFieldName(type, fldnam, column), value);
        return -1;
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
        if (this.isMatrixField(type, name)) {
            this.fields[this.getFieldValue(type + 'header') + column] = value;
            this.logOperation('setMatrixValue', {'type': type, 'field': name, 'column': column, 'value': value});
        }
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
        return this.isMatrixField(type, fldnam) ? this.getFieldValue(this.getFieldValue(type + 'header') + column) : null;
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
        return this.isMatrixField(type, fldnam) ? this.getFieldValue(this.getFieldValue(type + 'headercount')) : null;
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
        //nsapiAssertTrue(this.linetypes[type] && linenum > 0 && linenum <= this.getLineItemCount(type), 'SSS_INVALID_SUBLIST_OPERATION');
        this.currentlineitems[type] = {};
        this.currentlineitemindexes[type] = linenum;
        var flds = this.getAllLineItemFields(type);
        for (var i = 0; i < flds.length; i++)
            this.currentlineitems[type][flds[i]] = this.getLineItemValue(type, flds[i], linenum);
        this.logOperation('selectLineItem', {'type': type, 'linenum': linenum});
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
        //nsapiAssertTrue(this.linetypes[type] && this.linetypes[type] == 'edit', 'SSS_INVALID_SUBLIST_OPERATION');
        this.currentlineitems[type] = {};
        this.currentlineitemindexes[type] = this.getLineItemCount(type) + 1;
        this.logOperation('selectNewLineItem', {'type': type});
    };
    this.cancelLineItem = function (type) {
        //nsapiAssertTrue(this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION');
        this.currentlineitems[type] = null;
        this.currentlineitemindexes[type] = null;
        this.logOperation('cancelLineItem', {'type': type});
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
        //nsapiAssertTrue(this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION');
        var flds = this.getAllLineItemFields(type);
        var linenum = this.getCurrentLineItemIndex(type);
        for (var i = 0; i < flds.length; i++)
            this.setAndCommitLineItemValue(type, flds[i], linenum, this.currentlineitems[type][flds[i]]);
        this.currentlineitems[type] = null;
        this.currentlineitemindexes[type] = null;
        this.logOperation('commitLineItem', {'type': type});
    };
    this.getCurrentLineItemIndex = function (type) {
        return this.currentlineitems[type] || -1;
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
        //nsapiAssertTrue(this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION');
        return this.currentlineitems[type][name];
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
        //nsapiAssertTrue(this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION');
        this.currentlineitems[type][name] = value;
        this.logOperation('setCurrentLineItemValue', {'type': type, 'field': name, 'value': value});
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
        //nsapiAssertTrue(this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION');
        this.currentlineitems[type][this.getMatrixFieldName(type, fldnam, column)] = value;
        this.logOperation('setCurrentLineItemMatrixValue', {
            'type': type,
            'field': fldnam,
            'column': column,
            'value': value
        });
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
        //nsapiAssertTrue(this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION');
        return this.currentlineitems[type][this.getMatrixFieldName(type, fldnam, column)];
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
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
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
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
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
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
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
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
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
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
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
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.setCurrentLineItemText = function (type, name, text) {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
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
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
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
        return this.getFieldValue(type + 'matrixfields') && ~this.getFieldValue(type + 'matrixfields').split(',').indexOf(fld);
    };
    this.getMatrixFieldName = function (type, fldnam, column) {
        return this.isMatrixField(type, fldnam) ? fldnam + '_' + column + '_' : null;
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