'use strict';

/**
 * @projectDescription 	SuiteScript JavaScript library summary.
 *
 * Note that there are some restrictions on API usage. Also note that the only 2 objects that can be
 * contructed are nlobjSearchFilter and nlobjSearchColumn. All other objects can only be created via
 * top-level exports.or method calls.
 *
 * The @governance tag refers to the usage governance for an API call
 * The @restricted tag refers to any known restrictions with a particular API call
 *
 * All Object arguments are Javascript Objects used as hash tables for specifying key-value pairs
 *
 * @since 	2005.0 Support scripting of current record in Client SuiteScript
 * @version	2007.0 Support scripting of records in user events, portlets, and scheduled scripts
 * @version	2008.1 Support scripting of web requests (Suitelets) and user interfaces (UI Object API)
 * @version	2009.1 Support scripting of file objects
 * @version	2009.2 Support scripting of setup records and assistant (multi-step) pages
 * @version	2009.2 converted JS template to use eclipse code completion friendly format
 * @version	2010.1 Suppport dynamic scripting
 */

/**
 * Return a new record using values from an existing record.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {Object} 	initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}  Returns an nlobjRecord object of a copied record.
 *
 * @since	2007.0
 */
exports.nlapiCopyRecord = (type, id, initializeValues) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Load an existing record from the system.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {Object} 	initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}  Returns an nlobjRecord object of an existing NetSuite record.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_ID_ARG_REQD}
 *
 * @since	2007.0
 */
exports.nlapiLoadRecord = (type, id, initializeValues) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Instantiate a new nlobjRecord object containing all the default field data for that record type.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} type record type ID.
 * @param {Object} initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}   Returns an nlobjRecord object of a new record from the system.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 *
 * @since	2007.0
 */
exports.nlapiCreateRecord = (type, initializeValues) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Submit a record to the system for creation or update.
 * @governance 20 units for transactions, 4 for custom records, 8 for all other records
 *
 * @param {nlobjRecord} record nlobjRecord object containing the data record.
 * @param {boolean} 	[doSourcing] If not set, this argument defaults to false.
 * @param {boolean} 	[ignoreMandatoryFields] Disables mandatory field validation for this submit operation.
 * @return {string} internal ID for committed record.
 *
 * @exception {SSS_INVALID_RECORD_OBJ}
 * @exception {SSS_RECORD_OBJ_REQD}
 * @exception {SSS_INVALID_SOURCE_ARG}
 *
 * @since	2007.0
 */
exports.nlapiSubmitRecord = (record, doSourcing, ignoreMandatoryFields) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Delete a record from the system.
 * @governance 20 units for transactions, 4 for custom records, 8 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @return {void}
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_ID_ARG_REQD}
 *
 * @since	2007.0
 */
exports.nlapiDeleteRecord = (type, id) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Perform a record search using an existing search or filters and columns.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string} 		type record type ID.
 * @param {int, string} [id] The internal ID or script ID for the saved search to use for search.
 * @param {nlobjSearchFilter, nlobjSearchFilter[]} [filters] [optional] A single nlobjSearchFilter object - or - an array of nlobjSearchFilter objects.
 * @param {nlobjSearchColumn, nlobjSearchColumn[]} [columns] [optional] A single nlobjSearchColumn object - or - an array of nlobjSearchColumn objects.
 * @return {nlobjSearchResult[]} Returns an array of nlobjSearchResult objects corresponding to the searched records.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_SRCH_ID}
 * @exception {SSS_INVALID_SRCH_FILTER}
 * @exception {SSS_INVALID_SRCH_FILTER_JOIN}
 * @exception {SSS_INVALID_SRCH_OPERATOR}
 * @exception {SSS_INVALID_SRCH_COL_NAME}
 * @exception {SSS_INVALID_SRCH_COL_JOIN}
 *
 * @since	2007.0
 */
exports.nlapiSearchRecord = (type, id, filters, columns) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Perform a global record search across the system.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string} keywords Global search keywords string or expression.
 * @return {nlobjSearchResult[]} Returns an Array of nlobjSearchResult objects containing the following four columns: name, type (as shown in the UI), info1, and info2.
 *
 * @since	2008.1
 */
exports.nlapiSearchGlobal = (keywords) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Perform a duplicate record search using Duplicate Detection criteria.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string} 		type The recordType you are checking duplicates for (for example, customer|lead|prospect|partner|vendor|contact).
 * @param {string[]} 	[fields] array of field names used to detect duplicate (for example, companyname|email|name|phone|address1|city|state|zipcode).
 * @param {int} 		[id] internal ID of existing record. Depending on the use case, id may or may not be a required argument.
 * @return {nlobjSearchResult[]} Returns an Array of nlobjSearchResult objects corresponding to the duplicate records.
 *
 * @since	2008.1
 */
exports.nlapiSearchDuplicate = (type, fields, id) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Create a new record using values from an existing record of a different type.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {string} 	transformType The recordType you are transforming the existing record into.
 * @param {Object} 	[transformValues] An object containing transform default option/value pairs used to pre-configure transformed record
 * @return {nlobjRecord}
 *
 * @exception {SSS_INVALID_URL_CATEGORY}
 * @exception {SSS_CATEGORY_ARG_REQD}
 * @exception {SSS_INVALID_TASK_ID}
 * @exception {SSS_TASK_ID_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_INVALID_EDITMODE_ARG}
 *
 * @since	2007.0
 */
exports.nlapiTransformRecord = (type, id, transformType, transformValues) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * void a transaction based on type and id .
 * @governance 10 units for transactions
 *
 * @param {string} 	type The transaction type name.
 * @param {string} 	id The internal ID for the record.
 * @return {string}  if accounting preference is reversing journal, then it is new journal id,
 *                   otherwise, it is the input record id
 *
 * @since	2014.1
 */
exports.nlapiVoidTransaction = (type, id) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Fetch the value of one or more fields on a record. This API uses search to look up the fields and is much
 * faster than loading the record in order to get the field.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {string, string[]} fields - field or fields to look up.
 * @param {boolean} [text] If set then the display value is returned instead for select fields.
 * @return {string, Object} single value or an Object of field name/value pairs depending on the fields argument.
 *
 * @since	2008.1
 */
exports.nlapiLookupField = (type,id,fields, text) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Submit the values of a field or set of fields for an existing record.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 * @restriction only supported for records and fields where DLE (Direct List Editing) is supported
 *
 * @param {string} 		type The record type name.
 * @param {int} 		id The internal ID for the record.
 * @param {string, string[]} fields field or fields being updated.
 * @param {string, string[]} values field value or field values used for updating.
 * @param {boolean} 	[doSourcing] If not set, this argument defaults to false and field sourcing does not occur.
 * @return {void}
 *
 * @since	2008.1
 */
exports.nlapiSubmitField = (type,id,fields,values,doSourcing) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Attach a single record to another with optional properties.
 * @governance 10 units
 *
 * @param {string} 	type1 The record type name being attached
 * @param {int} 	id1 The internal ID for the record being attached
 * @param {string} 	type2 The record type name being attached to
 * @param {int} 	id2 The internal ID for the record being attached to
 * @param {Object} 	[properties] Object containing name/value pairs used to configure attach operation
 * @return {void}
 *
 * @since	2008.2
 */
exports.nlapiAttachRecord = (type1, id1, type2, id2, properties) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Detach a single record from another with optional properties.
 * @governance 10 units
 *
 * @param {string} 	type1 The record type name being attached
 * @param {int} 	id1 The internal ID for the record being attached
 * @param {string} 	type2 The record type name being attached to
 * @param {int} 	id2 The internal ID for the record being attached to
 * @param {Object} 	[properties] Object containing name/value pairs used to configure detach operation
 * @return {void}
 *
 * @since	2008.2
 */
exports.nlapiDetachRecord = (type1, id1, type2, id2, properties) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * Resolve a URL to a resource or object in the system.
 *
 * @param {string} type type specifier for URL: suitelet|tasklink|record|mediaitem
 * @param {string} subtype subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid
 * @param {string} [id] internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
 * @param {string} [pagemode] string specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view)
 * @return {string}
 *
 * @since	2007.0
 */
exports.nlapiResolveURL = (type, subtype, id, pagemode) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Redirect the user to a page. Only valid in the UI on Suitelets and User Events. In Client scripts this will initialize the redirect URL used upon submit.
 *
 * @param {string} type type specifier for URL: suitelet|tasklink|record|mediaitem
 * @param {string} subtype subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid
 * @param {string} [id] internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
 * @param {string} [pagemode] string specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view)
 * @param {Object} [parameters] Object used to specify additional URL parameters as name/value pairs
 * @return {void}
 *
 * @since	2007.0
 */
exports.nlapiSetRedirectURL = (type, subtype, id, pagemode, parameters) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Request a URL to an external or internal resource.
 * @restriction NetSuite maintains a white list of CAs that are allowed for https requests. Please see the online documentation for the complete list.
 * @governance 10 units
 *
 * @param {string} url 		A fully qualified URL to an HTTP = (s) resource
 * @param {string, Object} 	[postdata] - string, document, or Object containing POST payload
 * @param {Object} 			[headers] - Object containing request headers.
 * @param {function} 		[callback] - available on the Client to support asynchronous requests. exports.is passed an nlobjServerResponse with the results.
 * @return {nlobjServerResponse}
 *
 * @exception {SSS_UNKNOWN_HOST}
 * @exception {SSS_INVALID_HOST_CERT}
 * @exception {SSS_REQUEST_TIME_EXCEEDED}
 *
 * @since	2007.0
 */
exports.nlapiRequestURL = (url, postdata, headers, callback, method) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return context information about the current user/script.
 *
 * @return {nlobjContext}
 *
 * @since	2007.0
 */
exports.nlapiGetContext = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the internal ID for the currently logged in user. Returns -4 when called from online forms or "Available without Login" Suitelets.
 *
 * @return {int}
 *
 * @since	2005.0
 */
exports.nlapiGetUser = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the internal ID for the current user's role. Returns 31 (Online Form User) when called from online forms or "Available without Login" Suitelets.
 *
 * @return {int}
 *
 * @since	2005.0
 */
exports.nlapiGetRole = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the internal ID for the current user's department.
 *
 * @return {int}
 *
 * @since	2005.0
 */
exports.nlapiGetDepartment = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the internal ID for the current user's location.
 *
 * @return {int}
 *
 * @since	2005.0
 */
exports.nlapiGetLocation = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the internal ID for the current user's subsidiary.
 *
 * @return {int}
 *
 * @since	2008.1
 */
exports.nlapiGetSubsidiary = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the recordtype corresponding to the current page or userevent script.
 *
 * @return {string}
 *
 * @since	2007.0
 */
exports.nlapiGetRecordType = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the internal ID corresponding to the current page or userevent script.
 *
 *  @return {int}
 *
 * @since	2007.0
 */
exports.nlapiGetRecordId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Send out an email and associate it with records in the system.
 * Supported base types are entity for entities, transaction for transactions, activity for activities and cases, record|recordtype for custom records
 * @governance 10 units
 * @restriction all outbound emails subject to email Anti-SPAM policies
 *
 * @param {int} 		from internal ID for employee user on behalf of whom this email is sent
 * @param {string, int} to email address or internal ID of user that this email is being sent to
 * @param {string} 		subject email subject
 * @param {string} 		body email body
 * @param {string, string[]} cc copy email address = (es)
 * @param {string, string[]} bcc blind copy email address = (es)
 * @param {Object} 		records Object of base types -> internal IDs used to associate email to records. i.e. {entity: 100, record: 23, recordtype: customrecord_surveys}
 * @param {nlobjFile[]} files array of nlobjFile objects (files) to include as attachments
 * @param {boolean}     notifySenderOnBounce controls whether or not the sender will receive email notification of bounced emails (defaults to false)
 * @param {boolean}     internalOnly controls or not the resultingMmessage record will be visible to non-employees on the Communication tab of attached records (defaults to false)
 * @param {string} 		replyTo email reply-to address
 * @return {void}
 *
 * @since	2007.0
 */
exports.nlapiSendEmail = (from, to, subject, body, cc, bcc, records, files, notifySenderOnBounce, internalOnly, replyTo) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Sends a single on-demand campaign email to a specified recipient and returns a campaign response ID to track the email.
 * @governance 10 units
 * @restriction works in conjunction with the Lead Nurturing (campaigndrip) sublist only
 *
 * @param {int} campaigneventid internal ID of the campaign event
 * @param {int} recipientid internal ID of the recipient - the recipient must have an email
 * @return {int}
 *
 * @since	2010.1
 */
exports.nlapiSendCampaignEmail = (campaigneventid, recipientid) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Send out a fax and associate it with records in the system. This requires fax preferences to be configured.
 * Supported base types are entity for entities, transaction for transactions, activity for activities and cases, record|recordtype for custom records
 * @governance 10 units
 *
 * @param {int} 		from internal ID for employee user on behalf of whom this fax is sent
 * @param {string, int} to fax address or internal ID of user that this fax is being sent to
 * @param {string} 		subject fax subject
 * @param {string} 		body fax body
 * @param {Object} 		records Object of base types -> internal IDs used to associate fax to records. i.e. {entity: 100, record: 23, recordtype: customrecord_surveys}
 * @param {nlobjFile[]} files array of nlobjFile objects (files) to include as attachments
 * @return {void}
 *
 * @since	2008.2
 */
exports.nlapiSendFax = (from, to, subject, body, records, files) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return field definition for a field.
 *
 * @param {string} fldnam the name of the field
 * @return {nlobjField}
 *
 * @since	2009.1
 */
exports.nlapiGetField = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return field definition for a matrix field.
 *
 * @param {string} 	type	matrix sublist name
 * @param {string} 	fldnam matrix field name
 * @param {int} 	column matrix field column index (1-based)
 * @return {nlobjField}
 *
 * @since	2009.2
 */
exports.nlapiGetMatrixField = (type, fldnam, column) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return field definition for a sublist field.
 *
 * @param {string} 	type	sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	[linenum] line number for sublist field (1-based) and only valid for sublists of type staticlist and list
 * @return {nlobjField}
 *
 * @since	2009.1
 */
exports.nlapiGetLineItemField = (type, fldnam, linenum) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return an nlobjField containing sublist field metadata.
 *
 * @param {string} 	type	matrix sublist name
 * @param {string} 	fldnam matrix field name
 * @param {int} 	linenum line number (1-based)
 * @param {int} 	column matrix column index (1-based)
 * @return {nlobjField}
 *
 * @since	2009.2
 */
exports.nlapiGetLineItemMatrixField = (type, fldnam, linenum, column) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @return {string}
 *
 * @since	2005.0
 */
exports.nlapiGetFieldValue = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 	fldnam the field name
 * @param {string} 	value value used to set field
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2005.0
 */
exports.nlapiSetFieldValue = (fldnam,value,firefieldchanged,synchronous) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the display value of a select field's current selection on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @return {string}
 *
 * @since	2005.0
 */
exports.nlapiGetFieldText = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a field on the current record on a page using it's label.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 	fldnam the field name
 * @param {string} 	txt display name used to lookup field value
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2005.0
 */
exports.nlapiSetFieldText = (fldnam,txt,firefieldchanged,synchronous) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the values of a multiselect field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @return {string[]}
 *
 * @since	2005.0
 */
exports.nlapiGetFieldValues = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the values of a multiselect field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 		fldnam field name
 * @param {string[]} 	values array of strings containing values for field
 * @param {boolean} 	[firefieldchanged] if false then the field change event is suppressed (defaults to true)
 * @param {boolean} 	[synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2005.0
 */
exports.nlapiSetFieldValues = (fldnam,values,firefieldchanged,synchronous) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the values (via display text) of a multiselect field on the current record.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam field name
 * @return {string[]}
 *
 * @since	2009.1
 */
exports.nlapiGetFieldTexts = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the values (via display text) of a multiselect field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 		fldnam field name
 * @param {string[]}	texts array of strings containing display values for field
 * @param {boolean}		[firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} 	[synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2009.1
 */
exports.nlapiSetFieldTexts = (fldnam,texts,firefieldchanged,synchronous) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Get the value of a matrix header field
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	column matrix column index (1-based)
 * @return {string}
 *
 * @since	2009.2
 */
exports.nlapiGetMatrixValue = (type, fldnam, column) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a matrix header field
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	column matrix column index (1-based)
 * @param {string} 	value field value for matrix field
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2009.2
 */
exports.nlapiSetMatrixValue = (type, fldnam, column, value, firefieldchanged, synchronous) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Get the current value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	column matrix column index (1-based)
 * @return {string} value
 *
 * @since	2009.2
 */
exports.nlapiGetCurrentLineItemMatrixValue = (type, fldnam, column) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the current value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in Client SuiteScript
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	column matrix column index (1-based)
 * @param {string} 	value matrix field value
 * @param {boolean} [firefieldchanged] if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2009.2
 */
exports.nlapiSetCurrentLineItemMatrixValue = (type, fldnam, column, value, firefieldchanged, synchronous) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a sublist matrix field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {int} 	column column index (1-based)
 * @param {string} value
 *
 * @since	2009.2
 */
exports.nlapiGetLineItemMatrixValue = (type, fldnam, linenum, column) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @return {string}
 *
 * @since 2005.0
 */
exports.nlapiGetLineItemValue = (type,fldnam,linenum) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @return {string}
 *
 * @since 2013.2
 */
exports.nlapiGetLineItemDateTimeValue = (type,fldnam,linenum) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {string} 	timezone value
 * @return {string}
 *
 * @since 2013.2
 */
exports.nlapiGetLineItemDateTimeValue = (type,fldnam,linenum,timezone) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {string} value
 * @retun {void}
 *
 * @since 2005.0
 */
exports.nlapiSetLineItemValue = (type,fldnam,linenum,value) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {string} datetime value
 * @retun {void}
 *
 * @since 2013.2
 */
exports.nlapiSetLineItemDateTimeValue = (type,fldnam,linenum,value) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @param {string} datetime value
 * @param {string} timezone value
 * @retun {void}
 *
 * @since 2013.2
 */
exports.nlapiSetLineItemDateTimeValue = (type,fldnam,linenum,value,timezone) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the label of a select field's current selection for a particular line.
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {int} 	linenum line number (1-based)
 * @return {string}
 *
 * @since 2005.0
 */
exports.nlapiGetLineItemText = (type,fldnam,linenum) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the 1st line number that a sublist field value appears in
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} val the value being queried for in a sublist field
 * @return {int}
 *
 * @since 2009.2
 */
exports.nlapiFindLineItemValue = (type, fldnam, val) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the 1st line number that a matrix field value appears in
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam matrix field name
 * @param {int} 	column matrix column index (1-based)
 * @param {string} 	val the value being queried for in a matrix field
 * @return {int}
 *
 * @since 2009.2
 */
exports.nlapiFindLineItemMatrixValue = (type, fldnam, column, val) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the number of columns for a matrix field
 *
 * @param {string} type sublist name
 * @param {string} fldnam matrix field name
 * @return {int}
 *
 * @since 2009.2
 */
exports.nlapiGetMatrixCount = (type, fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the number of sublists in a sublist on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} type sublist name
 * @return {int}
 *
 * @since 2005.0
 */
exports.nlapiGetLineItemCount = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Insert and select a new line into the sublist on a page or userevent.
 *
 * @param {string} type sublist name
 * @param {int} [line] line number at which to insert a new line.
 * @return{void}
 *
 * @since 2005.0
 */
exports.nlapiInsertLineItem = (type, line) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Remove the currently selected line from the sublist on a page or userevent.
 *
 * @param {string} type sublist name
 * @param {int} [line]	line number to remove.
 * @return {void}
 *
 * @since 2005.0
 */
exports.nlapiRemoveLineItem = (type, line) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value field value
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since 2005.0
 */
exports.nlapiSetCurrentLineItemValue = (type,fldnam,value,firefieldchanged,synchronous) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value field value
 * @return {void}
 *
 * @since 2013.2
 */
exports.nlapiSetCurrentLineItemDateTimeValue = (type,fldnam,value) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value field value
 * @param {string} timezone value
 * @return {void}
 *
 * @since 2013.2
 */
exports.nlapiSetCurrentLineItemDateTimeValue = (type,fldnam,value,timezone) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a field on the currently selected line using it's label.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} txt string containing display value or search text.
 * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
 * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since 2005.0
 */
exports.nlapiSetCurrentLineItemText = (type,fldnam,txt,firefieldchanged,synchronous) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a field on the currently selected line.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @return {string}
 *
 * @since 2005.0
 */
exports.nlapiGetCurrentLineItemValue = (type,fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a field on the currently selected line.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @return {string}
 *
 * @since 2013.2
 */
exports.nlapiGetCurrentLineItemDateTimeValue = (type,fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a field on the currently selected line.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {string} timezone value
 * @return {string}
 *
 * @since 2013.2
 */
exports.nlapiGetCurrentLineItemDateTimeValue = (type,fldnam, timezone) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the label of a select field's current selection on the currently selected line.
 *
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @return {string}
 *
 * @since 2005.0
 */
exports.nlapiGetCurrentLineItemText = (type,fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the line number for the currently selected line.
 *
 * @param {string} type sublist name
 * @return {int}
 *
 * @since 2005.0
 */
exports.nlapiGetCurrentLineItemIndex = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Disable a sublist field.
 * @restriction Only supported on sublists of type inlineeditor, editor and list (current field only)
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {boolean} disable if true then field is disabled
 * @param {int} linenum line number for sublist field (1-based) and only valid for sublists of type list
 * @return {void}
 *
 * @since 2009.1
 */
exports.nlapiSetLineItemDisabled = (type,fldnam,disable, linenum) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return field mandatoriness.
 *
 * @param {string} fldnam field name
 * @return {boolean}
 *
 * @since 2009.1
 */
exports.nlapiGetFieldMandatory = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return sublist field mandatoriness.
 * @restriction Only supported on sublists of type inlineeditor or editor (current field only)
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @return {boolean}
 *
 * @since 2009.1
 */
exports.nlapiGetLineItemMandatory = (type,fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Make a field mandatory.
 *
 * @param {string} 	fldnam field name
 * @param {boolean} mandatory if true then field is made mandatory
 * @return {void}
 *
 * @since 2009.1
 */
exports.nlapiSetFieldMandatory = (fldnam,mandatory) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Make a sublist field mandatory.
 * @restriction Only supported on sublists of type inlineeditor or editor (current field only)
 *
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @param {boolean} mandatory if true then field is made mandatory
 * @return {void}
 *
 * @since 2009.2
 */
exports.nlapiSetLineItemMandatory = (type,fldnam,mandatory) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Select an existing line in a sublist.
 *
 * @param {string} type sublist name
 * @param {int} linenum line number to select
 * @return {void}
 *
 * @since 2005.0
 */
exports.nlapiSelectLineItem = (type, linenum) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Save changes made on the currently selected line to the sublist.
 *
 * @param {string} type sublist name
 * @return {void}
 *
 * @since 2005.0
 */
exports.nlapiCommitLineItem = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Cancel any changes made on the currently selected line.
 * @restriction Only supported for sublists of type inlineeditor and editor
 *
 * @param {string} type sublist name
 * @return {void}
 *
 * @since 2005.0
 */
exports.nlapiCancelLineItem = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Select a new line in a sublist.
 * @restriction Only supported for sublists of type inlineeditor and editor
 *
 * @param {string} type sublist name
 * @return {void}
 *
 * @since 2005.0
 */
exports.nlapiSelectNewLineItem = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Refresh the sublist table.
 * @restriction Only supported for sublists of type inlineeditor, editor, and staticlist
 * @restriction Client SuiteScript only.
 *
 * @param {string} type sublist name
 * @return{void}
 *
 * @since 2005.0
 */
exports.nlapiRefreshLineItems = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Adds a select option to a scripted select or multiselect field.
 * @restriction Client SuiteScript only
 *
 * @param {string} fldnam field name
 * @param {string} value internal ID for select option
 * @param {string} text display text for select option
 * @param {boolean} [selected] if true then option will be selected by default
 * @return {void}
 *
 * @since 2008.2
 */
exports.nlapiInsertSelectOption = (fldnam, value, text, selected) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Removes a select option (or all if value is null) from a scripted select or multiselect field.
 * @restriction Client SuiteScript only
 *
 * @param {string} fldnam field name
 * @param {string} value internal ID of select option to remove
 * @return {void}
 *
 * @since 2008.2
 */
exports.nlapiRemoveSelectOption = (fldnam, value) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Adds a select option to a scripted select or multiselect sublist field.
 * @restriction Client SuiteScript only
 *
 * @param {string} type	sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value internal ID for select option
 * @param {string} text display text for select option
 * @param {boolean} [selected] if true then option will be selected by default
 * @return {void}
 *
 * @since 2008.2
 */
exports.nlapiInsertLineItemOption = (type, fldnam, value, text, selected) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Removes a select option (or all if value is null) from a scripted select or multiselect sublist field.
 * @restriction Client SuiteScript only
 *
 * @param {string} type	sublist name
 * @param {string} fldnam sublist field name
 * @param {string} value internal ID for select option to remove
 * @return {void}
 *
 * @since 2008.2
 */
exports.nlapiRemoveLineItemOption = (type, fldnam, value) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Returns true if any changes have been made to a sublist.
 * @restriction Client SuiteScript only
 *
 * @param {string} type sublist name
 * @return {boolean}
 *
 * @since 2005.0
 */
exports.nlapiIsLineItemChanged = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return an record object containing the data being submitted to the system for the currenr record.
 * @restriction User Event scripts only
 *
 * @return {nlobjRecord}
 *
 * @since 2008.1
 */
exports.nlapiGetNewRecord = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return an record object containing the current record's data prior to the write operation.
 * @restriction beforeSubmit|afterSubmit User Event scripts only
 *
 * @return {nlobjRecord}
 *
 * @since 2008.1
 */
exports.nlapiGetOldRecord = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Create an nlobjError object that can be used to abort script execution and configure error notification
 *
 * @param {string} 	code error code
 * @param {string} 	details error description
 * @param {boolean} [suppressEmail] if true then suppress the error notification emails from being sent out (false by default).
 * @return {nlobjError}
 *
 * @since 2008.2
 */
exports.nlapiCreateError = (code,details,suppressEmail) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new entry form page.
 * @restriction Suitelets only
 *
 * @param {string} 	title page title
 * @param {boolean} [hideHeader] true to hide the page header (false by default)
 * @return {nlobjForm}
 *
 * @since 2008.2
 */
exports.nlapiCreateForm = (title, hideHeader) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new list page.
 * @restriction Suitelets only
 *
 * @param {string} 	title page title
 * @param {boolean} [hideHeader] true to hide the page header (false by default)
 * @return {nlobjList}
 *
 * @since 2008.2
 */
exports.nlapiCreateList = (title, hideHeader) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new assistant page.
 * @restriction Suitelets only
 *
 * @param {string} 	title page title
 * @param {boolean} [hideHeader] true to hide the page header (false by default)
 * @return {nlobjAssistant}
 *
 * @since 2009.2
 */
exports.nlapiCreateAssistant = (title, hideHeader) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Load a file from the file cabinet (via its internal ID or path).
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {string, int} id internal ID or relative path to file in the file cabinet (i.e. /SuiteScript/foo.js)
 * @return {nlobjFile}
 *
 * @since 2008.2
 */
exports.nlapiLoadFile = (id) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Add/update a file in the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {nlobjFile} file a file object to submit
 * @return {int} return internal ID of file
 *
 * @since 2009.1
 */
exports.nlapiSubmitFile = (file) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Delete a file from the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {int} id internal ID of file to be deleted
 * @return {id}
 *
 * @since 2009.1
 */
exports.nlapiDeleteFile = (id) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Instantiate a file object (specifying the name, type, and contents which are base-64 encoded for binary types.)
 * @restriction Server SuiteScript only
 *
 * @param {string} name file name
 * @param {string} type file type i.e. plainText, htmlDoc, pdf, word (see documentation for the list of supported file types)
 * @param {string} contents string containing file contents (must be base-64 encoded for binary types)
 * @return {nlobjFile}
 *
 * @since 2009.1
 */
exports.nlapiCreateFile = (name, type, contents) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Perform a mail merge operation using any template and up to 2 records and returns an nlobjFile with the results.
 * @restriction only supported for record types that are available in mail merge: transactions, entities, custom records, and cases
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {int} 	id internal ID of template
 * @param {string} 	baseType primary record type
 * @param {int} 	baseId internal ID of primary record
 * @param {string} 	[altType] secondary record type
 * @param {int} 	[altId] internal ID of secondary record
 * @param {Object} 	[fields] Object of merge field values to use in the mail merge (by default all field values are obtained from records) which overrides those from the record.
 * @return {nlobjFile}
 *
 * @since 2008.2
 */
exports.nlapiMergeRecord = (id, baseType, baseId, altType, altId, fields) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Print a record (transaction) gievn its type, id, and output format.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} 	type print output type: transaction|statement|packingslip|pickingticket
 * @param {int} 	id internal ID of record to print
 * @param {string} 	[format] output format: html|pdf|default
 * @param {Object} 	[properties] Object of properties used to configure print
 * @return {nlobjFile}
 *
 * @since 2008.2
 */
exports.nlapiPrintRecord = (type, id, format, properties) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Generate a PDF from XML using the BFO report writer (see http://big.faceless.org/products/report/).
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} input string containing BFO compliant XHTML
 * @return {nlobjFile}
 *
 * @since 2009.1
 */
exports.nlapiXMLToPDF = (input) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Create a template renderer used to generate various outputs based on a template.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} type	media type: pdf|html
 * @param {string} [engineType] [optional]: default is freemarker/html
 * @return {nlobjTemplateRenderer}
 *
 */
exports.nlapiCreateTemplateRenderer = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Create an email merger used to assemble subject and body text of an email from a given
 * FreeMarker template and a set of associated records.
 * @restriction Server SuiteScript only
 *
 * @param {int} templateId	internal ID of the template
 * @return {nlobjEmailMerger}
 *
 * @since 2015.1
 */
exports.nlapiCreateEmailMerger = (id) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Create an entry in the script execution log (note that execution log entries are automatically purged after 30 days).
 *
 * @param {string} type	log type: debug|audit|error|emergency
 * @param {string} title log title (up to 90 characters supported)
 * @param {string} [details] log details (up to 3000 characters supported)
 * @return {void}
 *
 * @since 2008.1
 */
exports.nlapiLogExecution = (type, title, details) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Queue a scheduled script for immediate execution and return the status QUEUED if successfull.
 * @restriction Server SuiteScript only
 * @governance 20 units
 *
 * @param {string, int}	script script ID or internal ID of scheduled script
 * @param {string, int} [deployment] script ID or internal ID of scheduled script deployment. If empty, the first "free" deployment (i.e. status = Not Scheduled or Completed) will be used
 * @param {Object} 		parameters Object of parameter name->values used in this scheduled script instance
 * @return {string}	QUEUED or null if no available deployments were found or the current status of the deployment specified if it was not available.
 *
 * @since 2008.1
 */
exports.nlapiScheduleScript = (script, deployment, parameters) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a URL with a generated OAuth token.
 * @restriction Suitelets and Portlets only
 * @governance 20 units
 *
 * @param {string} ssoAppKey
 * @return {string}
 *
 * @since 2009.2
 */
exports.nlapiOutboundSSO = (ssoAppKey) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Loads a configuration record
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} type
 * @return {nlobjConfiguration}
 *
 * @since 2009.2
 */
exports.nlapiLoadConfiguration = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Commits all changes to a configuration record.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {nlobjConfiguration} setup record
 * @return (void)
 *
 * @since 2009.2
 */
exports.nlapiSubmitConfiguration = (setup) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Convert a String into a Date object.
 *
 * @param {string} str date string in the user's date format, timeofday format, or datetime format
 * @param {string} format format type to use: date|datetime|timeofday with date being the default
 * @return {date}
 *
 * @since 2005.0
 */
exports.nlapiStringToDate = (str, format) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Convert a Date object into a String
 *
 * @param {date} 	d date object being converted to a string
 * @param {string} [formattype] format type to use: date|datetime|timeofday with date being the default
 * @return {string}
 *
 * @since 2005.0
 */
exports.nlapiDateToString = (d, formattype) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Add days to a Date object and returns a new Date
 *
 * @param {date} d date object used to calculate the new date
 * @param {int}	days the number of days to add to this date object.
 * @return {date}
 *
 * @since 2008.1
 */
exports.nlapiAddDays = (d, days) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Add months to a Date object and returns a new Date.
 *
 * @param {date} d date object used to calculate the new date
 * @param {int} months the number of months to add to this date object.
 * @return {date}
 *
 * @since 2008.1
 */
exports.nlapiAddMonths = (d, months) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Format a number for data entry into a currency field.
 *
 * @param {string} str numeric string used to format for display as currency using user's locale
 * @return {string}
 *
 * @since 2008.1
 */
exports.nlapiFormatCurrency = (str) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Encrypt a String using a SHA-1 hash function
 *
 * @param {string} s string to encrypt
 * @return {string}
 *
 * @since 2009.2
 */
exports.nlapiEncrypt = (s) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Escape a String for use in an XML document.
 *
 * @param {string} text string to escape
 * @return {string}
 *
 * @since 2008.1
 */
exports.nlapiEscapeXML = (text) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Convert a String into an XML document. Note that in Server SuiteScript XML is supported natively by the JS runtime using the e4x standard (http://en.wikipedia.org/wiki/E4X)
 * This makes scripting XML simpler and more efficient
 *
 * @param {string} str string being parsed into an XML document
 * @return {document}
 *
 * @since 2008.1
 */
exports.nlapiStringToXML = (str) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Convert an XML document into a String.  Note that in Server SuiteScript XML is supported natively by the JS runtime using the e4x standard (http://en.wikipedia.org/wiki/E4X)
 * This makes scripting XML data simpler and more efficient
 *
 * @param {document} xml document being serialized into a string
 * @return {string}
 *
 * @since 2008.1
 */
exports.nlapiXMLToString = (xml) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Validate that a given XML document conforms to a given XML schema. XML Schema Definition (XSD) is the expected schema format.
 *
 * @param {document} xmlDocument xml to validate
 * @param {document} schemaDocument schema to enforce
 * @param {string} schemaFolderId if your schema utilizes <import> or <include> tags which refer to sub-schemas by file name (as opposed to URL),
 *                 provide the Internal Id of File Cabinet folder containing these sub-schemas as the schemaFolderId argument
 * @throws {nlobjError} error containsing validation failure message = (s) - limited to first 10
 *
 * @since 2014.1
 */
exports.nlapiValidateXML = (xmlDocument, schemaDocument, schemaFolderId) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * select a value from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} node node being queried
 * @param {string} xpath string containing XPath expression.
 * @return {string}
 *
 * @since 2008.2
 */
exports.nlapiSelectValue = (node, xpath) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Select an array of values from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 * @return {string[]}
 *
 * @since 2008.1
 */
exports.nlapiSelectValues = (node, xpath) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Select a node from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 * @return {node}
 *
 * @since 2008.1
 */
exports.nlapiSelectNode = (node, xpath) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Select an array of nodes from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 * @return {node[]}
 *
 * @since 2008.1
 */
exports.nlapiSelectNodes = (node, xpath) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Calculate exchange rate between two currencies as of today or an optional effective date.
 * @governance 10 units
 *
 * @param {string, int} fromCurrency internal ID or currency code of currency we are converting from
 * @param {string, int} toCurrency internal ID or currency code of currency we are converting to
 * @param {string} [date] string containing date of effective exchange rate. defaults to today
 * @return {float}
 *
 * @since 2009.1
 */
exports.nlapiExchangeRate = (fromCurrency, toCurrency, date) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Initiates a workflow on-demand and returns the workflow instance ID for the workflow-record combination.
 * @governance 20 units
 *
 * @param {string} recordtype record type ID of the workflow base record
 * @param {int} id internal ID of the base record
 * @param {string, int} workflowid internal ID or script ID for the workflow definition
 * @return {int}
 *
 * @since 2010.1
 */
exports.nlapiInitiateWorkflow = (recordtype, id, workflowid) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Initiates a workflow on-demand and returns the workflow instance ID for the workflow-record combination.
 * @governance 20 units
 *
 * @param {string} recordtype record type ID of the workflow base record
 * @param {string, int} id internal ID of the base record
 * @param {string, int} workflowid internal ID or script ID for the workflow definition
 * @return {string}
 *
 * @since 2014.2
 */
exports.nlapiInitiateWorkflowAsync = (recordType, id, workflowId, parameters) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Triggers a workflow on a record.
 * @governance 20 units
 *
 * @param {string} recordtype record type ID of the workflow base record
 * @param {int} id internal ID of the base record
 * @param {string, int} workflowid internal ID or script ID for the workflow definition
 * @param {string, int} actionid internal ID or script ID of the action script
 * @param {string, int} stateid internal ID or script ID of the state contains the referenced add button action
 * @return {int}
 *
 * @since 2010.1
 */
exports.nlapiTriggerWorkflow = (recordtype, id, workflowid, actionid, stateid) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Create a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
exports.nlapiCreateCurrentLineSubrecord = (type,fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * edit a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
exports.nlapiEditCurrentLineItemSubrecord = (type,fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * remove a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {void}
 *
 * @since 2011.2
 */
exports.nlapiRemoveCurrentLineItemSubrecord = (type,fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * view a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
exports.nlapiViewCurrentLineItemSubrecord = (type,fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * view a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
exports.nlapiViewLineItemSubrecord = (type,fldnam,linenum) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * get a cache object.
 * @param {string} name of the cache
 * @return {nlobjCache}
 *
 * @since 2013.2
 */
exports.nlapiGetCache = (name) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * create a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
exports.createSubrecord = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * edit a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
exports.editSubrecord = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * remove a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 * @retun {void}
 *
 * @since 2011.2
 */
exports.removeSubrecord = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * view a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 * @retun {nlobjSubrecord}
 *
 * @since 2011.2
 */
exports.viewSubrecord = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

function nlobjSubrecord() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjSubrecord = nlobjSubrecord;

/**
 * Commit the subrecord after you finish modifying it.
 *
 * @return {void}
 *
 * @method
 * @memberOf nlobjSubrecord
 *
 * @since 2008.1
 */
nlobjSubrecord.prototype.commit = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Cancel the any modification on subrecord.
 *
 * @return {void}
 *
 * @method
 * @memberOf nlobjSubrecord
 *
 * @since 2008.1
 */
nlobjSubrecord.prototype.cancel = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjRecord used for accessing and manipulating record objects.
 *
 * @classDescription Class definition for business records in the system.
 * @return {nlobjRecord}
 * @constructor
 *
 * @since 2008.2
 */
function nlobjRecord() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjRecord = nlobjRecord;

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
nlobjRecord.prototype.getId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getRecordType = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return field metadata for field.
 *
 * @param {string} fldnam field name
 * @return	{nlobjField}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.1
 */
nlobjRecord.prototype.getField = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getSubList = (type) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getMatrixField = (type, fldnam, column) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getLineItemField = (type, fldnam, linenum) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return metadata for sublist field.
 *
 * @param {string} type matrix sublist name
 * @param {string} fldnam matrix field name
 * @param {int} linenum line number
 * @param {column} linenum matrix column (1-based)
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getLineItemMatrixField = (type, fldnam, linenum, column) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.setFieldValue = ( name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.setFieldValues = ( name, values ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getFieldValue = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getFieldValues = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.setFieldText = ( name, text ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.setFieldTexts = ( name, texts ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getFieldText = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getFieldTexts = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Get the value of a matrix header field.
 *
 * @param {string} type matrix sublist name
 * @param {string} name	matrix field name
 * @param {int} column matrix column index (1-based)
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getMatrixValue = ( type, name, column ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a matrix header field.
 *
 * @param {string} 	type matrix sublist name
 * @param {string} 	name	matrix field name
 * @param {int} 	column matrix column index (1-based)
 * @param {string} 	value field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.setMatrixValue = ( type, name, column, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getAllFields = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getAllLineItemFields = ( group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @param {string} 	value sublist field value
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.setLineItemValue = ( group, name, line, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @param {string} 	datetime value
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.setLineItemDateTimeValue = ( group, name, line, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @param {string} 	datetime value
 * @param {string} 	timezone value
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.setLineItemDateTimeValue = ( group, name, line, value, timezone ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.1
 */
nlobjRecord.prototype.getLineItemValue = ( group, name, line ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.getLineItemDateTimeValue = ( group, name, line ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @param {string} 	timezone value
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.getLineItemDateTimeValue = ( group, name, line, timezone ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the text value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line line number (1-based)
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2008.2
 */
nlobjRecord.prototype.getLineItemText = ( group, name, line ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the current value of a sublist field.
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {string} 	value sublist field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.setCurrentLineItemValue = ( group, name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the current value of a sublist field.
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {string} 	value sublist field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.setCurrentLineItemDateTimeValue = ( group, name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the current value of a sublist field.
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {string} 	value sublist field value
 * @param {string} 	timezone value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.setCurrentLineItemDateTimeValue = ( group, name, value,timezone ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the current value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getCurrentLineItemValue = ( group, name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the current value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.getCurrentLineItemDateTimeValue = ( group, name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the current value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {string} 	timezone value
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2013.2
 */
nlobjRecord.prototype.getCurrentLineItemDateTimeValue = ( group, name, timezone ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the current display value of a sublist field.
 *
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getCurrentLineItemText = ( group, name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the current value of a sublist matrix field.
 *
 * @param {string} 	group matrix sublist name
 * @param {string} 	name matrix field name
 * @param {int} 	column matrix field column index (1-based)
 * @param {string} 	value matrix field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.setCurrentLineItemMatrixValue = ( group, name, column, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the current value of a sublist matrix field.
 *
 * @param {string} 	group matrix sublist name
 * @param {string} 	name matrix field name
 * @param {int} 	column matrix field column index (1-based)
 * @return {string}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getCurrentLineItemMatrixValue = ( group, name, column ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the number of columns for a matrix field.
 *
 * @param {string} 	group matrix sublist name
 * @param {string} 	name matrix field name
 * @return {int}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.getMatrixCount = ( group, name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.getLineItemCount = ( group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return line number for 1st occurence of field value in a sublist column.
 *
 * @param {string} group	sublist name
 * @param {string} fldnam	sublist field name
 * @param {string} value	sublist field value
 * @return {int}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.findLineItemValue = ( group, fldnam, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return line number for 1st occurence of field value in a sublist column.
 *
 * @param {string} 	group	sublist name
 * @param {string} 	fldnam	sublist field name
 * @param {int} 	column  matrix column index (1-based)
 * @param {string} 	value 	matrix field value
 * @return {int}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.findLineItemMatrixValue = ( group, fldnam, column, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Insert a new line into a sublist.
 *
 * @param {string} 	group sublist name
 * @param {int} 	[line] line index at which to insert line
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.insertLineItem = ( group, line ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Remove an existing line from a sublist.
 *
 * @param {string} 	group sublist name
 * @param {int} 	[line] line number to remove
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.removeLineItem = ( group, line ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjRecord.prototype.selectNewLineItem = ( group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Select an existing line in a sublist.
 *
 * @param {string} 	group sublist name
 * @param {int} 	line  line number to select
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.selectLineItem = ( group, line ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Commit the current line in a sublist.
 *
 * @param {string} 	group sublist name
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 2009.2
 */
nlobjRecord.prototype.commitLineItem = ( group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the value of a field.
 *
 * @param {string} name field name
 * @param {string} value field value
 * @param {string} timezone Olson value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 20013.2
 */
nlobjRecord.prototype.setDateTimeValue = (name, value, timezone) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the value of a field.
 *
 * @param {string} name field name
 * @param {string} value field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjRecord
 *
 * @since 20013.2
 */
nlobjRecord.prototype.setDateTimeValue = (name, value) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @return {string}
 *
 * @since	2013.2
 */
nlobjRecord.prototype.getDateTimeValue = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value of a field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} fldnam the field name
 * @param {string} timezone Olson value
 * @return {string}
 *
 * @since	2013.2
 */
nlobjRecord.prototype.getDateTimeValue = (fldnam, timezone) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjConfiguration..
 *
 * @classDescription Class definition for interacting with setup/configuration pages
 * @return {nlobjConfiguration}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjConfiguration() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjConfiguration = nlobjConfiguration;

/**
 * return the type corresponding to this setup record.
 *
 * @return {string}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getType = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return field metadata for field.
 *
 * @param {string} fldnam field name
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getField = (fldnam) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the value of a field.
 *
 * @param {string} name field name
 * @param {string} value field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.setFieldValue = ( name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Set the values of a multi-select field.
 * @restriction only supported for multi-select fields
 *
 * @param {string} name field name
 * @param {string[]} value field values
 * @return {void}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.setFieldValues = ( name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value of a field.
 *
 * @param {string} name field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getFieldValue = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the selected values of a multi-select field as an Array.
 * @restriction only supported for multi-select fields
 *
 * @param {string} name field name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getFieldValues = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the value (via display value) of a field.
 * @restriction only supported for select fields
 *
 * @param {string} name field name
 * @param {string} text field display text
 * @return {void}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.setFieldText = ( name, text ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the values (via display values) of a multi-select field.
 * @restriction only supported for multi-select fields
 *
 * @param {string} 	 name field name
 * @param {string[]} texts array of field display text values
 * @return {void}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.setFieldTexts = ( name, texts ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the text value of a field.
 * @restriction only supported for select fields
 *
 * @param {string} name field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getFieldText = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the selected text values of a multi-select field as an Array.
 * @param {string} name field name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getFieldTexts = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an Array of all field names on the record.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjConfiguration
 *
 * @since 2009.2
 */
nlobjConfiguration.prototype.getAllFields = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjFile used for accessing and manipulating files in the file cabinet.
 *
 * @classDescription Encapsulation of files (media items) in the file cabinet.
 * @return {nlobjFile}
 * @constructor
 *
 * @since 2009.1
 */
function nlobjFile() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjFile = nlobjFile;

/**
 * Return the name of the file.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getName = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Sets the name of a file.
 * @param {string} name the name of the file
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setName = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internal ID of the folder that this file is in.
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getFolder = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * sets the internal ID of the folder that this file is in.
 * @param {int} folder
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setFolder = ( folder ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * sets the character encoding for the file.
 * @param {String} encoding
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2010.2
 */
nlobjFile.prototype.setEncoding = ( encoding ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return true if the file is "Available without Login".
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.isOnline = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * sets the file's "Available without Login" status.
 * @param {boolean} online
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setIsOnline = ( online ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return true if the file is inactive.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.isInactive = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * sets the file's inactive status.
 * @param {boolean} inactive
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setIsInactive = ( inactive ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the file description.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getDescription = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * sets the file's description.
 * @param {string} descr the file description
 * @return {void}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.setDescription = ( descr ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the id of the file (if stored in the FC).
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the size of the file in bytes.
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getSize = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the URL of the file (if stored in the FC).
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getURL = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the type of the file.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getType = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the value (base64 encoded for binary types) of the file.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getValue = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjSearchFilter filter objects used to define search criteria.
 *
 * @classDescription search filter
 * @constructor
 * @param {string} name filter name.
 * @param {string} join internal ID for joined search where this filter is defined
 * @param {string} operator operator name (i.e. anyOf, contains, lessThan, etc..)
 * @param {string|string[]} value
 * @param {string} value2
 * @return {nlobjSearchFilter}
 *
 * @since 2007.0
 */
function nlobjSearchFilter( name, join, operator, value, value2 ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjSearchFilter = nlobjSearchFilter;

/**
 * Return the name of this search filter.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2007.0
 */
nlobjSearchFilter.prototype.getName = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the join id for this search filter.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2008.1
 */
nlobjSearchFilter.prototype.getJoin = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the filter operator used.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchFilter
 *
 * @since 2008.2
 */
nlobjSearchFilter.prototype.getOperator = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjSearchColumn used for column objects used to define search return columns.
 *
 * @classDescription search column.
 * @return {nlobjSearchColumn}
 * @constructor
 * @param {string} name column name.
 * @param {string} join internal ID for joined search where this column is defined
 * @param {string} summary
 *
 * @since 2007.0
 */
function nlobjSearchColumn( name, join, summary ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjSearchColumn = nlobjSearchColumn;

/**
 * return the name of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getName = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the join id for this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getJoin = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the label of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2009.1
 */
nlobjSearchColumn.prototype.getLabel = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the summary type (avg,group,sum,count) of this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 * @since 2008.1
 */
nlobjSearchColumn.prototype.getSummary = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return formula for this search column.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2009.2
 */
nlobjSearchColumn.prototype.getFormula = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return nlobjSearchColumn sorted in either ascending or descending order.
 * @return {nlobjSearchColumn}
 * @param {boolean} sort if not set, defaults to false, which returns column data in ascending order.
 *
 * @method
 * @memberOf nlobjSearchColumn
 *
 * @since 2010.1
 */
nlobjSearchColumn.prototype.setSort = ( order ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjSearchResult used for search result row object.
 *
 * @classDescription Class definition for interacting with the results of a search operation
 * @return {nlobjSearchResult}
 * @constructor
 */
function nlobjSearchResult() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjSearchResult = nlobjSearchResult;

/**
 * return the internalId for the record returned in this row.
 * @method
 * @memberOf nlobjSearchResult
 * @return {int}
 */
nlobjSearchResult.prototype.getId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the recordtype for the record returned in this row.
 * @method
 * @memberOf nlobjSearchResult
 * @return {string}
 */
nlobjSearchResult.prototype.getRecordType = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value for this nlobjSearchColumn.
 * @param {nlobjSearchColumn} column search result column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2009.1
 */
nlobjSearchResult.prototype.getValue = ( column ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value for a return column specified by name, join ID, and summary type.
 * @param {string} name the name of the search column
 * @param {string} join the join ID for the search column
 * @param {string} summary summary type specified for this column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2008.1
 */
nlobjSearchResult.prototype.getValue = ( name, join, summary ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the text value for this nlobjSearchColumn if it's a select field.
 * @param {nlobjSearchColumn} column search result column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2009.1
 */
nlobjSearchResult.prototype.getText = ( column ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the text value of this return column if it's a select field.
 * @param {string} name the name of the search column
 * @param {string} join the join ID for the search column
 * @param {string} summary summary type specified for this column
 * @return {string}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2008.1
 */
nlobjSearchResult.prototype.getText = ( name, join, summary ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an array of all nlobjSearchColumn objects returned in this search.
 * @return {nlobjSearchColumn[]}
 *
 * @method
 * @memberOf nlobjSearchResult
 *
 * @since 2009.2
 */
nlobjSearchResult.prototype.getAllColumns = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjContext used for user and script context information.
 *
 * @classDescription Utility class providing information about the current user and the script runtime.
 * @return {nlobjContext}
 * @constructor
 */
function nlobjContext() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjContext = nlobjContext;

/**
 * return the name of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getName = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internalId of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getUser = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internalId of the current user's role.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getRole = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the script ID of the current user's role.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2008.2
 */
nlobjContext.prototype.getRoleId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internalId of the current user's center type.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2008.2
 */
nlobjContext.prototype.getRoleCenter = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the email address of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getEmail = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internal ID of the contact logged in on behalf of a customer, vendor, or partner. It returns -1 for non-contact logins
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.1
 */
nlobjContext.prototype.getContact = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the account ID of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getCompany = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internalId of the current user's department.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getDepartment = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internalId of the current user's location.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getLocation = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internalId of the current user's subsidiary.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getSubsidiary = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the execution context for this script: webServices|csvImport|client|userInterface|scheduledScript|portlet|suitelet|debugger|custommassupdate
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getExecutionContext = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the amount of usage units remaining for this script.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getRemainingUsage = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return true if feature is enabled, false otherwise
 * @param {string} name
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getFeature = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return current user's permission level (0-4) for this permission
 * @param {string} name
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getPermission = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return system or script preference selection for current user
 * @param {string} name
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getPreference = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return value of session object set by script
 * @param {string} name
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getSessionObject = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the value of a session object using a key.
 * @param {string} name
 * @param {string} value
 * @return {void}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.setSessionObject = ( name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an array containing the names of all keys used to set session objects
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getAllSessionObjects = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the NetSuite version for the current account
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getVersion = (  ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the environment that the script is executing in: SANDBOX, PRODUCTION, BETA, INTERNAL
 * @since 2008.2
 */
nlobjContext.prototype.getEnvironment = (  ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the logging level for the current script execution. Not supported in CLIENT scripts
 * @since 2008.2
 */
nlobjContext.prototype.getLogLevel = (  ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the script ID for the current script
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getScriptId = (  ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the deployment ID for the current script
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getDeploymentId = (  ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the % complete specified for the current scheduled script execution
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getPercentComplete = (  ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the % complete for the current scheduled script execution
 * @param {float} ct the percentage of records completed
 * @return {void}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.setPercentComplete = ( pct ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a system/script setting. Types are SCRIPT, SESSION, FEATURE, PERMISSION
 *
 * @param {string} type
 * @param {string} name
 * @since 2007.0
 * @deprecated
 */
nlobjContext.prototype.getSetting = ( type, name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set a system/script setting. Only supported type is SESSION
 *
 * @param {string} type
 * @param {string} name
 * @param {string} value
 * @since 2007.0
 * @deprecated
 */
nlobjContext.prototype.setSetting = ( type, name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an Object containing name/value pairs of color groups to their corresponding RGB hex color based on the currenly logged in user's color them preferences.
 * @return {Object}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2010.1
 */
nlobjContext.prototype.getColorPreferences = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the runtime version of SuiteScript, could be 1.0 or 2.0
 * @return {Object}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2014.1
 */
nlobjContext.prototype.getRuntimeVersion = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * Return a new instance of nlobjError used system or user-defined error object.
 *
 * @classDescription Encapsulation of errors thrown during script execution.
 * @return {nlobjError}
 * @constructor
 */
function nlobjError() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjError = nlobjError;

/**
 * return the error db ID for this error (if it was an unhandled unexpected error).
 * @return {string}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the error code for this system or user-defined error.
 * @return {string}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getCode = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the error description for this error.
 * @return {string}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getDetails = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a stacktrace containing the location of the error.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getStackTrace = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the userevent script name where this error was thrown.
 * @return {string}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getUserEvent = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the internalid of the record if this error was thrown in an aftersubmit script.
 * @return {int}
 *
 * @method
 * @memberOf nlobjError
 *
 * @since 2008.2
 */
nlobjError.prototype.getInternalId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjServerResponse..
 *
 * @classDescription Contains the results of a server response to an outbound Http = (s) call.
 * @return {nlobjServerResponse}
 * @constructor
 *
 * @since 2008.1
 */
function nlobjServerResponse() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjServerResponse = nlobjServerResponse;

/**
 * return the Content-Type header in response
 * @return {string}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getContentType = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value of a header returned.
 * @param {string} name the name of the header to return
 * @return {string}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getHeader = (name) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return all the values of a header returned.
 * @param {string} name the name of the header to return
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getHeaders = (name) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an Array of all headers returned.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getAllHeaders = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the response code returned.
 * @return {int}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getCode = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the response body returned.
 * @return {string}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getBody = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the nlobjError thrown via a client call to nlapiRequestURL.
 * @return {nlobjError}
 *
 * @method
 * @memberOf nlobjServerResponse
 *
 * @since 2008.1
 */
nlobjServerResponse.prototype.getError = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


function nlobjTemplateRenderer() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjTemplateRenderer = nlobjTemplateRenderer;

/**
 * add a record for to a template engine
 * @param  {string} [recordName] name of record used as a reference in template.
 * @param  {nlobjRecord} record to add to template engine
 * @return {void}
 *
 * @method
 * @memberOf nlobjTemplateRenderer
 *
 */
nlobjTemplateRenderer.prototype.addRecord = ( record ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add search results to a template engine
 * @param {string} [searchName] name of search results used as a reference in template.
 * @param {nlobjSearchResults[]} [results] An array of nlobjSearchResult objects.
 * @return {void}
 *
 * @method
 * @memberOf nlobjTemplateRenderer
 *
 */
nlobjTemplateRenderer.prototype.addSearchResults = ( searchName, results ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the template xml in the template engine
 * @param  {string} xml BFO template
 * @return {void}
 *
 * @method
 * @memberOf nlobjTemplateRenderer
 *
 */
nlobjTemplateRenderer.prototype.setTemplate = ( xml ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * render the output of the template engine into the response
 * @param {nlobjResponse}
 * @return {void}
 *
 * @method
 * @memberOf nlobjTemplateRenderer
 */
nlobjTemplateRenderer.prototype.renderToResponse = (nlobjResponse) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 *
 */
function nlobjEmailMerger() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjEmailMerger = nlobjEmailMerger;

/**
 * associate an entity to the merger
 * @param  {string} entityType type of the entity (customer/contact/partner/vendor/employee)
 * @param  {int} entityId ID of the entity to be associated with the merger
 * @return {void}
 *
 * @method
 * @memberOf nlobjEmailMerger
 */
nlobjEmailMerger.prototype.setEntity = ( entityType, entityId ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * associate a second entity (recipient) to the merger
 * @param  {string} recipientType type of the entity (customer/contact/partner/vendor/employee)
 * @param  {int} recipientId ID of the entity to be associated with the merger
 * @return {void}
 *
 * @method
 * @memberOf nlobjEmailMerger
 */
nlobjEmailMerger.prototype.setRecipient = ( recipientType, recipientId ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * associate a support case to the merger
 * @param  {int} caseId ID of the support case to be associated with the merger
 * @return {void}
 *
 * @method
 * @memberOf nlobjEmailMerger
 */
nlobjEmailMerger.prototype.setSupportCase = ( caseId ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * associate a transaction to the merger
 * @param  {int} transactionId ID of the transaction to be associated with the merger
 * @return {void}
 *
 * @method
 * @memberOf nlobjEmailMerger
 */
nlobjEmailMerger.prototype.setTransaction = ( transactionId ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * associate a custom record to the merger
 * @param  {string} recordType type of the custom record
 * @param  {int} recordId ID of the record to be associated with the merger
 * @return {void}
 *
 * @method
 * @memberOf nlobjEmailMerger
 */
nlobjEmailMerger.prototype.setCustomRecord = ( recordType, recordId ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * perform the merge and return an object containing email subject and body
 * @governance 20 units
 * @return {object} pure javascript object with two properties: subject and body
 *
 * @method
 * @memberOf nlobjEmailMerger
 */
nlobjEmailMerger.prototype.merge = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjResponse used for scripting web responses in Suitelets
 *
 * @classDescription Accessor to Http response made available to Suitelets.
 * @return {nlobjResponse}
 * @constructor
 */
function nlobjResponse() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjResponse = nlobjResponse;

/**
 * add a value for a response header.
 * @param  {string} name of header
 * @param  {string} value for header
 * @return  {void}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.addHeader = ( name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the value of a response header.
 * @param  {string} name of header
 * @param  {string} value for header
 * @return  {void}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.setHeader = ( name, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value of a response header.
 * @param  {string} name of header
 * @return  {string}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.getHeader = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an Array of all response header values for a header
 * @param  {string} name of header
 * @return  {string[]}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.getHeaders = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an Array of all response headers
 * @return  {Object}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.getAllHeaders = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * suppress caching for this response.
 * @return  {void}
 *
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2009.1
 */
nlobjResponse.prototype.sendNoCache = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * sets the content type for the response (and an optional filename for binary output).
 *
 * @param {string} type the file type i.e. plainText, word, pdf, htmldoc (see list of media item types)
 * @param {string} filename the file name
 * @param {string} disposition Content Disposition used for streaming attachments: inline|attachment
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.setContentType = ( type, filename, disposition ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * sets the redirect URL for the response. all URLs must be internal unless the Suitelet is being executed in an "Available without Login" context
 *  at which point it can use type "external" to specify an external url via the subtype arg
 *
 * @param {string} type type specifier for URL: suitelet|tasklink|record|mediaitem|external
 * @param {string} subtype subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid|url
 * @param {string} [id] internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
 * @param {string} [pagemode] string specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view)
 * @param {Object} [parameters] Object used to specify additional URL parameters as name/value pairs
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.sendRedirect = ( type, subtype, id, pagemode, parameters ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * write information (text/xml/html) to the response.
 *
 * @param {string} output
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.write = ( output ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * write line information (text/xml/html) to the response.
 *
 * @param {string} output
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.writeLine = ( output ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * write a UI object page.
 *
 * @param {Object} pageobject page UI object: nlobjList|nlobjAssistant|nlobjForm|nlobjDashboard
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2008.2
 */
nlobjResponse.prototype.writePage = ( pageobject ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * sets the character encoding for the response.
 * @param {String} encoding
 * @return {void}
 * @method
 * @memberOf nlobjResponse
 *
 * @since 2012.2
 */
nlobjResponse.prototype.setEncoding = ( encoding ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * Return a new instance of nlobjRequest used for scripting web requests in Suitelets
 *
 * @classDescription Accessor to Http request data made available to Suitelets
 * @return {nlobjRequest}
 * @constructor
 */
function nlobjRequest() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjRequest = nlobjRequest;

/**
 * return the value of a request parameter.
 *
 * @param {string} name parameter name
 * @return {string}
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getParameter = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the values of a request parameter as an Array.
 *
 * @param {string} name parameter name
 * @return {string[]}
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getParameterValues = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an Object containing all the request parameters and their values.
 * @return {Object}
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getAllParameters = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value of a sublist value.
 * @param {string} 	group sublist name
 * @param {string} 	name  sublist field name
 * @param {int} 	line  sublist line number
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getLineItemValue = ( group, name, line ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the number of lines in a sublist.
 * @param {string} group sublist name
 * @return {int}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getLineItemCount = ( group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value of a request header.
 * @param {string} name
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getHeader = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an Object containing all the request headers and their values.
 * @return {Object}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2008.2
 */
nlobjRequest.prototype.getAllHeaders = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value of an uploaded file.
 * @param {string} name file field name
 * @return {nlobjFile}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2009.1
 */
nlobjRequest.prototype.getFile = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an Object containing field names to file objects for all uploaded files.
 * @return {Object}
 *
 * @method
 * @memberOf nlobjRequest
 *
 * @since 2009.1
 */
nlobjRequest.prototype.getAllFiles = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the body of the POST request
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 * @since 2008.1
 */
nlobjRequest.prototype.getBody = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the URL of the request
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 * @since 2008.1
 */
nlobjRequest.prototype.getURL = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the METHOD of the request
 * @return {string}
 *
 * @method
 * @memberOf nlobjRequest
 * @since 2008.1
 */
nlobjRequest.prototype.getMethod = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjPortlet used for scriptable dashboard portlet.
 *
 * @classDescription UI Object used for building portlets that are displayed on dashboard pages
 * @return {nlobjPortlet}
 * @constructor
 */
function nlobjPortlet() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjPortlet = nlobjPortlet;

/**
 * set the portlet title.
 *
 * @param {string} title
 * @since 2008.2
 */
nlobjPortlet.prototype.setTitle = ( title ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the entire contents of the HTML portlet (will be placed inside a <TD>...</TD>).
 *
 * @param {string} html
 * @since 2008.2
 */
nlobjPortlet.prototype.setHtml = ( html ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a column (nlobjColumn) to this LIST portlet and return it.
 *
 * @param {string} name	column name
 * @param {string} type column type
 * @param {string} label column label
 * @param {string} [align] column alignment
 * @since 2008.2
 */
nlobjPortlet.prototype.addColumn = ( name, type, label, align ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add an Edit column (nlobjColumn) to the left of the column specified (supported on LIST portlets only).
 *
 * @param {nlobjColumn} column
 * @param {boolean} showView should Edit|View instead of Edit link
 * @param {string} 	[showHref] column that evaluates to T or F that determines whether to disable the edit|view link per-row.
 * @return {nlobjColumn}
 *
 * @since 2008.2
 */
nlobjPortlet.prototype.addEditColumn = ( column, showView, showHref ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a row (nlobjSearchResult or Array of name-value pairs) to this LIST portlet.
 *
 * @param {string[]|nlobjSearchResult} row
 * @since 2008.2
 */
nlobjPortlet.prototype.addRow = ( row ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add multiple rows (Array of nlobjSearchResults or name-value pair Arrays) to this LIST portlet.
 *
 * @param {string[][]|nlobjSearchResult[]} rows
 * @since 2008.2
 */
nlobjPortlet.prototype.addRows = ( rows ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a field (nlobjField) to this FORM portlet and return it.
 *
 * @param {string} name field name
 * @param {string} type field type
 * @param {string} [label] field label
 * @param {string, int} [source] script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjPortlet.prototype.addField = ( name,type,label,source ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a FORM submit button to this FORM portlet.
 *
 * @param {string} url	URL that this form portlet will POST to
 * @param {string} [label] label for submit button (defaults to Save)
 * @since 2008.2
 */
nlobjPortlet.prototype.setSubmitButton = ( url, label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a line (containing text or simple HTML) with optional indenting and URL to this LINKS portlet.
 *
 * @param {string} 	text data to output to line
 * @param {string} 	[url] URL if this line should be clickable (if NULL then line will not be clickable)
 * @param {int} 	indent # of indents to insert before text
 * @since 2008.2
 */
nlobjPortlet.prototype.addLine = ( text, url, indent ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjList used for scriptable list page.
 *
 * @classDescription UI Object page type used for building lists
 * @return {nlobjList}
 * @constructor
 */
function nlobjList() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjList = nlobjList;

/**
 * set the page title.
 *
 * @param {string} title
 * @since 2008.2
 */
nlobjList.prototype.setTitle = ( title ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the global style for this list: grid|report|plain|normal.
 *
 * @param {string} style overall style used to render list
 * @since 2008.2
 */
nlobjList.prototype.setStyle = ( style ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the Client SuiteScript used for this page.
 *
 * @param {string, int} script script ID or internal ID for global client script used to enable Client SuiteScript on page
 * @since 2008.2
 */
nlobjList.prototype.setScript = ( script ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a column (nlobjColumn) to this list and return it.
 *
 * @param {string} name column name
 * @param {string} type column type
 * @param {string} label column label
 * @param {string} [align] column alignment
 * @return {nlobjColumn}
 *
 * @since 2008.2
 */
nlobjList.prototype.addColumn = ( name, type, label, align ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add an Edit column (nlobjColumn) to the left of the column specified.
 *
 * @param {nlobjColumn} column
 * @param {boolean} showView should Edit|View instead of Edit link
 * @param {string} 	[showHref] column that evaluates to T or F that determines whether to disable the edit|view link per-row.
 * @return {nlobjColumn}
 *
 * @since 2008.2
 */
nlobjList.prototype.addEditColumn = ( column, showView, showHref ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a row (Array of name-value pairs or nlobjSearchResult) to this portlet.
 *
 * @param {string[], nlobjSearchResult} row data used to add a single row
 * @since 2008.2
 */
nlobjList.prototype.addRow = ( row ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add multiple rows (Array of nlobjSearchResults or name-value pair Arrays) to this portlet.
 *
 * @param {string[][], nlobjSearchResult[]} rows data used to add multiple rows
 * @since 2008.2
 */
nlobjList.prototype.addRows = ( rows ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a button (nlobjButton) to the footer of this page.
 *
 * @param {string} name button name
 * @param {string} label button label
 * @param {string} script button script (exports.name)
 * @since 2008.2
 */
nlobjList.prototype.addButton = ( name, label, script ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a navigation cross-link to the page.
 *
 * @param {string} type	page link type: crosslink|breadcrumb
 * @param {string} title page link title
 * @param {string} url URL for page link
 * @since 2008.2
 */
nlobjList.prototype.addPageLink = ( type, title, url ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjForm used for scriptable form page.
 *
 * @classDescription UI Object page type used for building basic data entry forms.
 * @return {nlobjForm}
 * @constructor
 */
function nlobjForm() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjForm = nlobjForm;

/**
 * set the page title.
 *
 * @param {string} title
 * @since 2008.2
 */
nlobjForm.prototype.setTitle = ( title ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set additional title Html. INTERNAL ONLY
 *
 * @param {string} title
 * @since 2008.2
 */
nlobjForm.prototype.addTitleHtml = ( html ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the Client Script definition used for this page.
 *
 * @param {string, int} script script ID or internal ID for global client script used to enable Client SuiteScript on page
 * @since 2008.2
 */
nlobjForm.prototype.setScript = ( script ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the values for all the fields on this form.
 *
 * @param {Object} values Object containing field name/value pairs
 * @since 2008.2
 */
nlobjForm.prototype.setFieldValues = ( values ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a navigation cross-link to the page.
 *
 * @param {string} type	page link type: crosslink|breadcrumb
 * @param {string} title page link title
 * @param {string} url URL for page link
 * @since 2008.2
 */
nlobjForm.prototype.addPageLink = ( type, title, url ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a button to this form.
 *
 * @param {string} name button name
 * @param {string} label button label
 * @param {string} script button script (exports.name)
 * @return {nlobjButton}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addButton = ( name, label, script ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * get a button from this form by name.
 * @param {string} name
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjForm
 *
 * @since 2009.2                                                                           add
 */
nlobjForm.prototype.getButton = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a reset button to this form.
 *
 * @param {string} [label] label for this button. defaults to "Reset"
 * @return {nlobjButton}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addResetButton = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a submit button to this form.
 *
 * @param {string} [label] label for this submit button. defaults to "Save"
 * @return {nlobjButton}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addSubmitButton = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a tab (nlobjTab) to this form and return it.
 *
 * @param {string} name tab name
 * @param {string} label tab label
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addTab = ( name, label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a field (nlobjField) to this form and return it.
 *
 * @param {string} name field name
 * @param {string} type field type
 * @param {string} [label] field label
 * @param {string, int} [source] script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
 * @param {string} [tab] tab name that this field will live on. If empty then the field is added to the main section of the form (immediately below the title bar)
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addField = ( name,type,label,sourceOrRadio,tab ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

nlobjForm.prototype.addCredentialField = ( name,label,domain,scriptId,value,entityMatch,tab ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };
nlobjForm.prototype.addCredentialField = ( name,label,domain,scriptId,value,entityMatch ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };
nlobjForm.prototype.addCredentialField = ( name,label,domain,scriptId,value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a subtab (nlobjTab) to this form and return it.
 *
 * @param {string} name subtab name
 * @param {string} label subtab label
 * @param {string} [tab] parent tab that this subtab lives on. If empty, it is added to the main tab.
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addSubTab = ( name,label,tab ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a sublist (nlobjSubList) to this form and return it.
 *
 * @param {string} name sublist name
 * @param {string} type sublist type: inlineeditor|editor|list|staticlist
 * @param {string} label sublist label
 * @param {string} [tab] parent tab that this sublist lives on. If empty, it is added to the main tab
 * @return {nlobjSubList}
 *
 * @since 2008.2
 */
nlobjForm.prototype.addSubList = ( name,type,label,tab ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * insert a tab (nlobjTab) before another tab (name).
 *
 * @param {nlobjTab} 		tab the tab object to insert
 * @param {string} 		nexttab the name of the tab before which to insert this tab
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.insertTab = ( tab, nexttab ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * insert a field (nlobjField) before another field (name).
 *
 * @param {nlobjField} 	field the field object to insert
 * @param {string} 		nextfld the name of the field before which to insert this field
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjForm.prototype.insertField = ( field, nextfld ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * insert a subtab (nlobjTab) before another subtab or sublist (name).
 *
 * @param {nlobjTab}	subtab the subtab object to insert
 * @param {string} 	nextsubtab the name of the subtab before which to insert this subtab
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.insertSubTab = ( subtab, nextsubtab ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * insert a sublist (nlobjSubList) before another subtab or sublist (name).
 *
 * @param {nlobjSubList}	sublist the sublist object to insert
 * @param {string} 		nextsublist the name of the sublist before which to insert this sublist
 * @return {nlobjSubList}
 *
 * @since 2008.2
 */
nlobjForm.prototype.insertSubList = ( sublist, nextsublist ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a tab (nlobjTab) on this form.
 *
 * @param {string} name tab name
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.getTab = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a field (nlobjField) on this form.
 *
 * @param {string} name field name
 * @param {string} [radio] if this is a radio field, specify which radio field to return based on radio value
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjForm.prototype.getField = ( name, radio ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a subtab (nlobjTab) on this form.
 *
 * @param {string} name subtab name
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjForm.prototype.getSubTab = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a sublist (nlobjSubList) on this form.
 *
 * @param {string} name sublist name
 * @return {nlobjSubList}
 *
 * @since 2008.2
 */
nlobjForm.prototype.getSubList = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a field group to the form.
 * @param {string} name field group name
 * @param {string} label field group label
 * @param tab
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjForm
 *
 * @since 2011.1
 */
nlobjForm.prototype.addFieldGroup = ( name, label, tab ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * get a list of all tabs.
 * @return an array with names of all tabs
 *
 * @method
 * @memberOf nlobjForm
 *
 * @since 2012.2
 */
nlobjForm.prototype.getTabs = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjAssistant.
 *
 * @classDescription UI Object page type used to build multi-step "assistant" pages to simplify complex workflows. All data and state for an assistant is tracked automatically
 * throughout the user's session up until completion of the assistant.
 *
 * @return {nlobjAssistant}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjAssistant() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjAssistant = nlobjAssistant;

/**
 * set the page title.
 * @param {string} title
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setTitle = ( title ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the script ID for Client Script used for this form.
 * @param {string, int} script script ID or internal ID for global client script used to enable Client SuiteScript on page
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setScript = ( script ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the splash screen used for this page.
 * @param {string} title splash portlet title
 * @param {string} text1 splash portlet content (left side)
 * @param {string} [text2] splash portlet content (right side)
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setSplash = ( title, text1, text2 ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * show/hide shortcut link. Always hidden on external pages
 * @param {boolean} show enable/disable "Add To Shortcut" link on this page
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setShortcut = (show) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the values for all the fields on this page.
 * @param {Object} values Object of field name/value pairs used to set all fields on page
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setFieldValues = ( values ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * if ordered, steps are show on left and must be completed sequentially, otherwise steps are shown on top and can be done in any order
 * @param {boolean} ordered	If true (default assistant behavior) then a navigation order thru the steps/pages will be imposed on the user. Otherwise the user
 * 							will be allowed to navigate across steps/pages in any order they choose.
 * @return  {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setOrdered = (ordered) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * if numbered, step numbers are displayed next to the step's label in the navigation area
 * @param {boolean} numbered	If true (default assistant behavior) step numbers will be displayed next to the step label
 * @return  {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setNumbered = (numbered) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return true if all the steps have been completed.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.isFinished = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * mark assistant page as completed and optionally set the rich text to display on completed page.
 * @param {string} html completion message (rich text) to display on the "Finish" page
 * @return  {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setFinished = ( html ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return true if the assistant has an error message to display for the current step.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.hasError = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the error message for the currrent step.
 * @param {string} html error message (rich text) to display on the page to the user
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setError = ( html ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * mark a step as current. It will be highlighted accordingly when the page is displayed
 * @param {nlobjAssistantStep} step assistant step object representing the current step that the user is on.
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.setCurrentStep = ( step ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a step to the assistant.
 * @param {string} name the name of the step
 * @param {string} label label used for this step
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.addStep = ( name, label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a field to this page and return it.
 * @param {string} name field name
 * @param {string} type field type
 * @param {string} [label] field label
 * @param {string, int} [source] script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
 * @param {string} [group] group name that this field will live on. If empty then the field is added to the main section of the page
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.addField = ( name,type,label,source, group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a sublist to this page and return it. For now only sublists of type inlineeditor are supported
 * @param {string} name sublist name
 * @param {string} type sublist type (inlineeditor only for now)
 * @param {string} label sublist label
 * @return {nlobjSubList}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.addSubList = ( name,type,label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a field group to the page.
 * @param {string} name field group name
 * @param {string} label field group label
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.addFieldGroup = ( name, label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an assistant step on this page.
 * @param {string} name step name
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getStep = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a field on this page.
 * @param {string} name field name
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getField = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a sublist on this page.
 * @param {string} name sublist name
 * @return {nlobjSubList}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getSubList = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return a field group on this page.
 * @param {string} name field group name
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getFieldGroup = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an array of all the assistant steps for this assistant.
 * @return {nlobjAssistantStep[]}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getAllSteps = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an array of the names of all fields on this page.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getAllFields = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 *  return an array of the names of all sublists on this page .
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getAllSubLists = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an array of the names of all field groups on this page.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getAllFieldGroups = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the last submitted action by the user: next|back|cancel|finish|jump
 * @return {string}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getLastAction = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return step from which the last submitted action came from
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getLastStep = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the next logical step corresponding to the user's last submitted action. You should only call this after
 * you have successfully captured all the information from the last step and are ready to move on to the next step. You
 * would use the return value to set the current step prior to continuing.
 *
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getNextStep = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return current step set via nlobjAssistant.setCurrentStep = (step)
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getCurrentStep = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the total number of steps in the assistant
 * @return {int}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.getStepCount = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * redirect the user following a user submit operation. Use this to automatically redirect the user to the next logical step.
 * @param {nlobjResponse} response the response object used to communicate back to the user's client
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistant
 *
 * @since 2009.2
 */
nlobjAssistant.prototype.sendRedirect = (response) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjField used for scriptable form/sublist field.
 * This object is READ-ONLY except for scripted fields created via the UI Object API using Suitelets or beforeLoad user events
 *
 * @classDescription Core descriptor for fields used to define records and also used to build pages and portlets.
 * @return {nlobjField}
 * @constructor
 */
function nlobjField() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjField = nlobjField;

/**
 *  return field name.
 *  @return {string}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.getName = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return field label.
 * @return {string}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.getLabel = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return field type.
 *  @return {string}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.getType = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return true if field is hidden.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.isHidden = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return true if field is mandatory.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.isMandatory = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return true if field is disabled.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.isDisabled = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the label for this field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} label
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setLabel = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the alias used to set the value for this field. Defaults to field name.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} alias column used to populate the field (mostly relevant when populating sublist fields)
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setAlias = ( alias ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the default value for this field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} value
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setDefaultValue = ( value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjField.prototype.setDisabled = ( disabled ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * make this field mandatory.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {boolean} mandatory if true then field becomes mandatory
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setMandatory = ( mandatory ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the maxlength for this field (only valid for certain field types).
 *  This method is only supported on scripted fields via the UI Object API
 *
 * @param {int} maxlength maximum length for this field
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setMaxLength = ( maxlength ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the display type for this field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} type display type: inline|normal|hidden|disabled|readonly|entry
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setDisplayType = ( type ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the break type (startcol|startrow|none) for this field. startrow is only used for fields with a layout type of outside
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} breaktype break type used to add a break in flow layout for this field: startcol|startrow|none
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjField
 *
 * @since 2009.2
 */
nlobjField.prototype.setBreakType = ( breaktype ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


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
nlobjField.prototype.setLayoutType = ( type, breaktype ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the text that gets displayed in lieu of the field value for URL fields.
 *
 * @param {string} text user-friendly display value in lieu of URL
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setLinkText = ( text ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjField.prototype.setDisplaySize = ( width, height ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the amount of emppty vertical space (rows) between this field and the previous field.
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {int} padding # of empty rows to display above field
 * @return {nlobjField}
 *
 * @since 2008.2
 */
nlobjField.prototype.setPadding = ( padding ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

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
nlobjField.prototype.setHelpText = ( help, inline ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a select option to this field (valid for select/multiselect fields).
 * This method is only supported on scripted fields via the UI Object API
 *
 * @param {string} value internal ID for this select option
 * @param {string} text display value for this select option
 * @param {boolean} [selected] if true then this select option will be selected by default
 * @since 2008.2
 */
nlobjField.prototype.addSelectOption = ( value, text, selected ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjSubList used for scriptable sublist (sublist).
 * This object is READ-ONLY except for instances created via the UI Object API using Suitelets or beforeLoad user events.
 *
 * @classDescription high level container for defining sublist (many to one) relationships on a record or multi-line data entry UIs on pages.
 * @return {nlobjSubList}
 * @constructor
 */
function nlobjSubList() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjSubList = nlobjSubList;

/**
 * set the label for this sublist.
 * This method is only supported on sublists via the UI Object API
 *
 * @param {string} label
 * @since 2008.2
 */
nlobjSubList.prototype.setLabel = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set helper text for this sublist.
 * This method is only supported on sublists via the UI Object API
 *
 * @param {string} help
 * @since 2008.2
 */
nlobjSubList.prototype.setHelpText = ( help ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the displaytype for this sublist: hidden|normal.
 * This method is only supported on scripted or staticlist sublists via the UI Object API
 *
 * @param {string} type
 * @since 2008.2
 */
nlobjSubList.prototype.setDisplayType = ( type ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the value of a cell in this sublist.
 *
 * @param {string} 	field sublist field name
 * @param {int} 	line  line number (1-based)
 * @param {string} 	value sublist value
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2008.2
 */
nlobjSubList.prototype.setLineItemValue = ( field, line, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the value of a matrix cell in this sublist.
 * @param {string} 	field	matrix field name
 * @param {int} 	line 	line number (1-based)
 * @param {int} 	column  matrix column index (1-based)
 * @param {string} 	value   matrix field value
 * @return {void}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2009.2
 */
nlobjSubList.prototype.setLineItemMatrixValue = ( field, line, column, value ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set values for multiple lines (Array of nlobjSearchResults or name-value pair Arrays) in this sublist.
 * Note that this method is only supported on scripted sublists via the UI Object API
 *
 * @param {string[][], nlobjSearchResult[]} values
 * @since 2008.2
 */
nlobjSubList.prototype.setLineItemValues = ( values ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return the number of lines in a sublist.
 *
 * @param {string} group sublist name
 *
 * @method
 * @memberOf nlobjSubList
 * @since 2010.1
 */
nlobjSubList.prototype.getLineItemCount = ( group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a field (column) to this sublist.
 *
 * @param {string} name field name
 * @param {string} type field type
 * @param {string} label field label
 * @param {string, int} [source] script ID or internal ID for source list used for this select field
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2008.2
 */
nlobjSubList.prototype.addField = ( name,type,label,source ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * designate a field on sublist that must be unique across all lines (only supported on sublists of type inlineeditor, editor).
 * @param {string} fldnam the name of a field on this sublist whose value must be unique across all lines
 * @return {nlobjField}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2009.2
 */
nlobjSubList.prototype.setUniqueField = ( fldnam ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a button to this sublist.
 *
 * @param {string} name button name
 * @param {string} label button label
 * @param {string} script button script (exports.name)
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2008.2
 */
nlobjSubList.prototype.addButton = ( name, label, script ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add "Refresh" button to sublists of type "staticlist" to support manual refreshing of the sublist (without entire page reloads) if it's contents are very volatile
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2009.2
 */
nlobjSubList.prototype.addRefreshButton = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add "Mark All" and "Unmark All" buttons to this sublist of type "list".
 *
 * @method
 * @memberOf nlobjSubList
 *
 * @since 2008.2
 */
nlobjSubList.prototype.addMarkAllButtons = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjColumn used for scriptable list column.
 *
 * @classDescription Class definition for columns used on lists and list portlets.
 * @return {nlobjColumn}
 * @constructor
 */
function nlobjColumn() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjColumn = nlobjColumn;

/**
 * set the header name for this column.
 *
 * @param {string} label the label for this column
 *
 * @method
 * @memberOf nlobjColumn
 *
 * @since 2008.2
 */
nlobjColumn.prototype.setLabel = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the base URL (optionally defined per row) for this column.
 *
 * @param {string} value the base URL or a column in the datasource that returns the base URL for each row
 * @param {boolean} perRow if true then the 1st arg is expected to be a column in the datasource
 *
 * @method
 * @memberOf nlobjColumn
 *
 * @since 2008.2
 */
nlobjColumn.prototype.setURL = ( value, perRow ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * add a URL parameter (optionally defined per row) to this column's URL.
 *
 * @param {string} param the name of a parameter to add to URL
 * @param {string} value the value of the parameter to add to URL -or- a column in the datasource that returns the parameter value for each row
 * @param {boolean} [perRow] if true then the 2nd arg is expected to be a column in the datasource
 *
 * @method
 * @memberOf nlobjColumn
 *
 * @since 2008.2
 */
nlobjColumn.prototype.addParamToURL = ( param, value, perRow ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjTab used for scriptable tab or subtab.
 *
 * @classDescription high level grouping for fields on a data entry form (nlobjForm).
 * @return {nlobjTab}
 * @constructor
 */
function nlobjTab() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjTab = nlobjTab;

/**
 * set the label for this tab or subtab.
 *
 * @param {string} label string used as label for this tab or subtab
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjTab.prototype.setLabel = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set helper text for this tab or subtab.
 *
 * @param {string} help inline help text used for this tab or subtab
 * @return {nlobjTab}
 *
 * @since 2008.2
 */
nlobjTab.prototype.setHelpText = ( help ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjAssistantStep.
 *
 * @classDescription assistant step definition. Used to define individual steps/pages in multi-step workflows.
 * @return {nlobjAssistantStep}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjAssistantStep() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjAssistantStep = nlobjAssistantStep;

/**
 * set the label for this assistant step.
 * @param {string} label display label used for this assistant step
 * @return {void}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.setLabel = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set helper text for this assistant step.
 * @param {string} help inline help text to display on assistant page for this step
 * @return {nlobjAssistantStep}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.setHelpText = ( help ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the index of this step in the assistant page (1-based)
 * @return  {int} the index of this step in the assistant (1-based) based on the order in which the steps were added.
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getStepNumber = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value of a field entered by the user during this step.
 * @param {string} name field name
 * @return {string}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getFieldValue = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the selected values of a multi-select field as an Array entered by the user during this step.
 * @param {string} name multi-select field name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getFieldValues = ( name ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the number of lines previously entered by the user in this step (or -1 if the sublist does not exist).
 * @param {string} group sublist name
 * @return {int}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getLineItemCount = ( group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return the value of a sublist field entered by the user during this step.
 * @param {string} 	group sublist name
 * @param {string} 	name sublist field name
 * @param {int} 	line sublist (1-based)
 * @return  {string}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getLineItemValue = (group, name, line) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an array of the names of all fields entered by the user during this step.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getAllFields = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an array of the names of all sublists entered by the user during this step.
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getAllLineItems = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return an array of the names of all sublist fields entered by the user during this step
 * @param {string} group sublist name
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjAssistantStep
 *
 * @since 2009.2
 */
nlobjAssistantStep.prototype.getAllLineItemFields = ( group ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjFieldGroup (currently only supported on nlobjAssistant pages)
 *
 * @classDescription object used for grouping fields on pages (currently only supported on assistant pages).
 * @return {nlobjFieldGroup}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjFieldGroup() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjFieldGroup = nlobjFieldGroup;

/**
 * set the label for this field group.
 * @param {string} label display label for field group
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjFieldGroup
 *
 * @since 2009.2
 */
nlobjFieldGroup.prototype.setLabel = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set collapsibility property for this field group.
 *
 * @param {boolean} collapsible if true then this field group is collapsible
 * @param {boolean} [defaultcollapsed] if true and the field group is collapsible, collapse this field group by default
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjFieldGroup
 *
 * @since 2009.2
 */
nlobjFieldGroup.prototype.setCollapsible = ( collapsible, defaultcollapsed ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set singleColumn property for this field group.
 *
 * @param {boolean} singleColumn if true then this field group is displayed in single column
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjFieldGroup
 *
 * @since 2011.1
 */
nlobjFieldGroup.prototype.setSingleColumn = ( singleColumn ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set showBorder property for this field group.
 *
 * @param {boolean} showBorder if true then this field group shows border including label of group
 * @return {nlobjFieldGroup}
 *
 * @method
 * @memberOf nlobjFieldGroup
 *
 * @since 2011.1
 */
nlobjFieldGroup.prototype.setShowBorder = ( showBorder ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * set the label for this button.
 * @param {string} label display label for button
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjButton
 *
 * @since 2008.2
 */
nlobjButton.prototype.setLabel = ( label ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjButton.
 *
 * @classDescription buttons used for triggering custom behaviors on pages.
 * @return {nlobjButton}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjButton() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjButton = nlobjButton;

/**
 * disable or enable button.
 * @param {boolean} disabled if true then this button should be disabled on the page
 * @return {nlobjButton}
 *
 * @method
 * @memberOf nlobjButton
 *
 * @since 2008.2
 */
nlobjButton.prototype.setDisabled = ( disabled ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * Return a new instance of nlobjSelectOption.
 *
 * @classDescription select|radio option used for building select fields via the UI Object API and for describing select|radio fields.
 * @return {nlobjSelectOption}
 * @constructor
 *
 * @since 2009.2
 */
function nlobjSelectOption() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };
exports.nlobjSelectOption = nlobjSelectOption;

/**
 * return internal ID for select option
 * @return {string}
 *
 * @method
 * @memberOf nlobjSelectOption
 *
 * @since 2009.2
 */
nlobjSelectOption.prototype.getId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * return display value for select option.
 * @return {string}
 *
 * @method
 * @memberOf nlobjSelectOption
 *
 * @since 2009.2
 */
nlobjSelectOption.prototype.getText = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return nlobjLogin
 *
 * @since 2012.2
 */
exports.nlapiGetLogin = () =>  { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

 /**
  *
  */
function nlobjLogin() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjLogin = nlobjLogin;

/**
 * @param {string} newEmail new Email
 * @param {boolean} justThisAccount indicates whether to apply email change only to roles within this account or apply email change to its all NetSuite accounts and roles
 * @return {void}
 *
 * @since 2012.2
 */
nlobjLogin.prototype.changeEmail = (currentPassword, newEmail, justThisAccount) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @param {string} newPassword new Password.
 * @return {void}
 *
 * @since 2012.2
 */
nlobjLogin.prototype.changePassword = (currentPassword, newPassword) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * @param {string} Job Type
 * @return {nlobjJobManager}
 *
 * @since 2013.1
 */
exports.nlapiGetJobManager = ( jobType ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

function nlobjJobManager() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjJobManager = nlobjJobManager;

/**
 * @return {nlobjJobRequest}
 *
 * @since 2013.1
 */
nlobjJobManager.prototype.createJobRequest = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @param {nlobjJobRequest} Job request
 * @return {String} Job Id
 *
 * @since 2013.1
 */
nlobjJobManager.prototype.submit = (request) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @param {String} Job Id
 * @return {nlobjFuture}
 *
 * @since 2013.1
 */
nlobjJobManager.prototype.getFuture = (id) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

function nlobjDuplicateJobRequest() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjDuplicateJobRequest = nlobjDuplicateJobRequest;

/**
 * Constant for Merge Duplicate recrods Entity Types
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.ENTITY_CUSTOMER = 'CUSTOMER';
nlobjDuplicateJobRequest.prototype.ENTITY_CONTACT = 'CONTACT';
nlobjDuplicateJobRequest.prototype.ENTITY_LEAD = 'LEAD';
nlobjDuplicateJobRequest.prototype.ENTITY_PROSPECT = 'PROSPECT';
nlobjDuplicateJobRequest.prototype.ENTITY_PARTNER = 'PARTNER';
nlobjDuplicateJobRequest.prototype.ENTITY_VENDOR = 'VENDOR';

/**
 * Constant for Merge Duplicate recrods Merge MASTERSELECTIONMODE
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.MASTERSELECTIONMODE_CREATED_EARLIEST = 'CREATED_EARLIEST';
nlobjDuplicateJobRequest.prototype.MASTERSELECTIONMODE_MOST_RECENT_ACTIVITY = 'MOST_RECENT_ACTIVITY';
nlobjDuplicateJobRequest.prototype.MASTERSELECTIONMODE_MOST_POPULATED_FIELDS = 'MOST_POPULATED_FIELDS';
nlobjDuplicateJobRequest.prototype.MASTERSELECTIONMODE_SELECT_BY_ID = 'SELECT_BY_ID';

/**
 * Constant for Merge Duplicate recrods Merge operation
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.OPERATION_MERGE = 'MERGE';
nlobjDuplicateJobRequest.prototype.OPERATION_DELETE = 'DELETE';
nlobjDuplicateJobRequest.prototype.OPERATION_MAKE_MASTER_PARENT = 'MAKE_MASTER_PARENT';
nlobjDuplicateJobRequest.prototype.OPERATION_MARK_AS_NOT_DUPES = 'MARK_AS_NOT_DUPES';
/**
 * @param {String} Entity Type
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setEntityType = ( entityType ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @param {String} Master record ID
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setMasterId = ( masterID ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @param {String} Criteria
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setMasterSelectionMode = ( masterSelectionMode ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @param {String} Array of duplicate records IDs
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setRecords = ( dupeRecords ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @param {String} Operation
 * @return {void}
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.setOperation = ( operation ) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return Entity Type
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getEntityType = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return Master record ID
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getMasterId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return Master Selection Mode
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getMasterSelectionMode = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return Array of duplicate records IDs
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getRecords = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return Operation
 *
 * @since 2013.1
 */
nlobjDuplicateJobRequest.prototype.getOperation = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

function nlobjFuture() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjFuture = nlobjFuture;

/**
 * @return {boolean} status
 *
 * @since 2013.1
 */
nlobjFuture.prototype.isDone = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return {String} Job ID
 *
 * @since 2013.1
 */
nlobjFuture.prototype.getId = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return {boolean} cancelled or not
 *
 * @since 2013.1
 */
nlobjFuture.prototype.cancel = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

/**
 * @return {boolean} is cancelled or not
 *
 * @since 2013.1
 */
nlobjFuture.prototype.isCancelled = () => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };

function nlobjCache() { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
exports.nlobjCache = nlobjCache;

/**
 * @param {string} key
 * @param {string} value
 * @param {int} ttl, time to live in seconds.
 * @return {Object} status.
 *
 * @since 2013.2
 */
nlobjCache.prototype.put = (key, value, ttl) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * @param {string} key
 * @return {String}  value associate with that key.
 *
 * @since 2013.2
 */
nlobjCache.prototype.get = (key) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };


/**
 * @param {string} key
 * @return {Object} status.
 *
 * @since 2013.2
 */
nlobjCache.prototype.remove = (key) => { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); };