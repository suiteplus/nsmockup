'use strict';

/**
 * Return a new instance of nlobjField used for scriptable form/sublist field.
 * This object is READ-ONLY except for scripted fields created via the UI Object API using Suitelets or beforeLoad user events
 *
 * @classDescription Core descriptor for fields used to define records and also used to build pages and portlets.
 * @return {nlobjField}
 * @constructor
 */
exports.nlobjField = function nlobjField(name, type, subList) {
    this.name = name;
    this.type = type;
    this.noslaving = false;
    this.sublist = subList;
    this.label = null;
    this.required = false;
    this.disabled = false;
    this.hidden = false;
    this.display = false;
    this.visible = false;
    this.popup = false;
    this.readonly = false;
    this.parent = null;
    this.uifield = null;
    this.linenum = -1;

    /**
     *  return field name.
     *  @return {string}
     *
     * @method
     * @memberOf nlobjField
     *
     * @since 2009.2
     */
    this.getName = function () {
        return this.name;
    };
    /**
     * return field type.
     *  @return {string}
     *
     * @method
     * @memberOf nlobjField
     *
     * @since 2009.2
     */
    this.getType = function () {
        return this.type;
    };
    /**
     * return field label.
     * @return {string}
     *
     * @method
     * @memberOf nlobjField
     *
     * @since 2009.2
     */
    this.getLabel = function () {
        return this.label || '';
    };
    this.getSubList = function () {
        return this.sublist;
    };
    this.getParent = function () {
        return this.parent;
    };
    this.getLine = function () {
        return this.linenum;
    };
    this.getUIField = function () {
        return this.uifield;
    };
    this.noSlaving = function () {
        return this.noslaving;
    };
    /**
     * return true if field is mandatory.
     * @return {boolean}
     *
     * @method
     * @memberOf nlobjField
     *
     * @since 2009.2
     */
    this.isMandatory = function () {
        return this.required;
    };
    /**
     * return true if field is disabled.
     * @return {boolean}
     *
     * @method
     * @memberOf nlobjField
     *
     * @since 2009.2
     */
    this.isDisabled = function () {
        return this.disabled;
    };
    /**
     * return true if field is hidden.
     * @return {boolean}
     *
     * @method
     * @memberOf nlobjField
     *
     * @since 2009.2
     */
    this.isHidden = function () {
        return this.hidden;
    };
    this.isPopup = function () {
        return this.popup;
    };
    this.isDisplay = function () {
        return this.display;
    };
    this.isVisible = function () {
        return this.visible;
    };
    this.isReadOnly = function () {
        return this.readonly;
    };
    /**
     * set the display type for this field.
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} type display type: inline|normal|hidden|disabled|readonly|entry
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setDisplayType = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set the label for this field.
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} label
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setLabel = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set the alias used to set the value for this field. Defaults to field name.
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} alias column used to populate the field (mostly relevant when populating sublist fields)
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setAlias = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set the default value for this field.
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} value
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setDefaultValue = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * Disable field via field metadata.
     * This method is only supported on scripted fields via the UI Object API
     * @param {boolean} disabled if true then field should be disabled.
     * @return {nlobjField}
     *
     * @method
     * @memberOf nlobjField
     *
     * @since 2009.2
     */
    this.setDisabled = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * make this field mandatory.
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {boolean} mandatory if true then field becomes mandatory
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setMandatory = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set the maxlength for this field (only valid for certain field types).
     *  This method is only supported on scripted fields via the UI Object API
     *
     * @param {int} maxlength maximum length for this field
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setMaxLength = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set the layout type and optionally the break type.
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} type layout type: outside|startrow|midrow|endrow|normal
     * @param {string} [breaktype] break type: startcol|startrow|none
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setLayoutType = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set the text that gets displayed in lieu of the field value for URL fields.
     *
     * @param {string} text user-friendly display value in lieu of URL
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setLinkText = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set help text for this field. If inline is set on assistant pages, help is displayed inline below field
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} help	field level help content (rich text) for field
     * @param {string} [inline] if true then in addition to the popup field help, the help will also be displayed inline below field (supported on assistant pages only)
     * @return {nlobjField}
     *
     * @method
     * @memberOf nlobjField
     *
     * @since 2009.2
     */
    this.setHelpText = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set the width and height for this field.
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {int} width
     * @param {int} height
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setDisplaySize = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * set the amount of emppty vertical space (rows) between this field and the previous field.
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {int} padding # of empty rows to display above field
     * @return {nlobjField}
     *
     * @since 2008.2
     */
    this.setPadding = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    /**
     * add a select option to this field (valid for select/multiselect fields).
     * This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} value internal ID for this select option
     * @param {string} text display value for this select option
     * @param {boolean} [selected] if true then this select option will be selected by default
     * @since 2008.2
     */
    this.addSelectOption = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
    this.getSelectOptions = function () {
        throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
    };
};

exports.nlobjField.DISPLAY_TYPE = {
    INLINE: 'inline',
    HIDDEN: 'hidden',
    READ_ONLY: 'readonly',
    ENTRY: 'entry',
    DISABLED: 'disabled',
    NORMAL: 'normal'
};