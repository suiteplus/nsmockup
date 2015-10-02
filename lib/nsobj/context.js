'use strict';

var $NS_SESSION_OBJ = {},
    $NS_SHECDULE_PERCENT_COMPLETE = 0.0;

/**
 * Return a new instance of nlobjContext used for user and script context information.
 *
 * @classDescription Utility class providing information about the current user and the script runtime.
 * @return {nlobjContext}
 * @constructor
 */
function nlobjContext() {
    this.name = null;
    this.email = null;
    this.user = null;
    this.role = null;
    this.roleid = null;
    this.rolecenter = null;
    this.company = null;
    this.contact = null;
    this.department = null;
    this.location = null;
    this.version = null;
    this.subsidiary = null;
    this.environment = null;
    this.executioncontext = null;
    this.preference = {};
    //this.scriptprefs = null;
    this.usage = {};
    this.internal = true;
    //this.totalBundleUsage = {};
    //this.getTotalUsage = function () {
    //    return 0
    //};
    //this.setUsage = function (func, type) {};
}
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
nlobjContext.prototype.getName = function () {
    return this.name;
};

/**
 * return the internalId of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getUser = function () {
    return this.user;
};

/**
 * return the internalId of the current user's role.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getRole = function () {
    return this.role;
};

/**
 * return the script ID of the current user's role.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2008.2
 */
nlobjContext.prototype.getRoleId = function () {
    return this.roleid;
};

/**
 * return the internalId of the current user's center type.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2008.2
 */
nlobjContext.prototype.getRoleCenter = function () {
    return this.rolecenter;
};

/**
 * return the email address of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getEmail = function () {
    return this.email;
};

/**
 * return the internal ID of the contact logged in on behalf of a customer, vendor, or partner. It returns -1 for non-contact logins
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.1
 */
nlobjContext.prototype.getContact = function () {
    return this.contact;
};

/**
 * return the account ID of the current user.
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getCompany = function () {
    return this.company;
};

/**
 * return the internalId of the current user's department.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getDepartment = function () {
    return this.department;
};

/**
 * return the internalId of the current user's location.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getLocation = function () {
    return this.location;
};

/**
 * return the internalId of the current user's subsidiary.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getSubsidiary = function () {
    return this.subsidiary;
};

/**
 * return the environment that the script is executing in: SANDBOX, PRODUCTION, BETA, INTERNAL
 * @since 2008.2
 */
nlobjContext.prototype.getEnvironment = function () {
    return this.environment;
};

/**
 * return the logging level for the current script execution. Not supported in CLIENT scripts
 * @since 2008.2
 */
nlobjContext.prototype.getLogLevel = function () {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};

/**
 * return the execution context for this script: webServices|csvImport|client|userInterface|scheduledScript|portlet|suitelet|debugger|custommassupdate
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getExecutionContext = function () {
    return this.executioncontext;
};

/**
 * return the amount of usage units remaining for this script.
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2007.0
 */
nlobjContext.prototype.getRemainingUsage = function () {
    return 1000;
};
nlobjContext.prototype.getRemainingInstructions = function () {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};
nlobjContext.prototype.getBundleId = function () {
    return -1;
};

/**
 * return the script ID for the current script
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getScriptId = function () {
    return window.NLScriptId;
};
//nsapiQueryScript( 'scriptid' ); }  //old way is using stacktrace to find nsapiCallScript() call,  to get scriptId that's being passed, but it doesn't work in IE. Issue 192145.

/**
 * return the deployment ID for the current script
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getDeploymentId = function () {
    return 'dep';
};
nlobjContext.prototype.getScriptType = function () {
    return 'NSMOCKUP';
};

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
nlobjContext.prototype.getFeature = function (name) {
    return true;
};

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
nlobjContext.prototype.getPreference = function (name) {
    return this.preference[name];
};

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
nlobjContext.prototype.getPermission = function (name) {
    return 1;
};

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
nlobjContext.prototype.getSessionObject = function (name) {
    return $NS_SESSION_OBJ[name];
};

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
nlobjContext.prototype.setSessionObject = function (name, value) {
    $NS_SESSION_OBJ[name] = value;
};

/**
 * return an array containing the names of all keys used to set session objects
 * @return {string[]}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getAllSessionObjects = function () {
    return Object.keys($NS_SESSION_OBJ);
};

/**
 * return the % complete specified for the current scheduled script execution
 * @return {int}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getPercentComplete = function () {
    return $NS_SHECDULE_PERCENT_COMPLETE;
};

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
nlobjContext.prototype.setPercentComplete = function (value) {
    $NS_SHECDULE_PERCENT_COMPLETE = value;
};
nlobjContext.prototype.getRecordCount = function () {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};
nlobjContext.prototype.setRecordCount = function (value) {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};
nlobjContext.prototype.getRecordCompletedCount = function () {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};
nlobjContext.prototype.setRecordCompletedCount = function (value) {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};
nlobjContext.prototype.getRecordFailedCount = function () {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};
nlobjContext.prototype.setRecordFailedCount = function (value) {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};

/**
 * return a system/script setting. Types are SCRIPT, SESSION, FEATURE, PERMISSION
 *
 * @param {string} type
 * @param {string} name
 * @since 2007.0
 * @deprecated
 */
nlobjContext.prototype.getSetting = function (type, name) {
    switch (type.toLowerCase()) {
        case 'script' :
            return this.getPreference(name);
        case 'feature' :
            return this.getFeature(name) ? 'T' : 'F';
        case 'preference' :
            return this.getPreference(name);
        case 'permission' :
            return this.getPermission(name);
        case 'session' :
            return this.getSessionObject(name);
    }
    return null;
};

/**
 * set a system/script setting. Only supported type is SESSION
 *
 * @param {string} type
 * @param {string} name
 * @param {string} value
 * @since 2007.0
 * @deprecated
 */
nlobjContext.prototype.setSetting = function (type, name, value) {
    throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
};

/**
 * return the NetSuite version for the current account
 * @return {string}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2009.2
 */
nlobjContext.prototype.getVersion = function () {
    return this.version;
};
nlobjContext.prototype.isInternal = function () {
    return null;
};

/**
 * return an Object containing name/value pairs of color groups to their corresponding RGB hex color based on the currenly logged in user's color them preferences.
 * @return {Object}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2010.1
 */
nlobjContext.prototype.getColorPreferences = function () {
    return {};
};

/**
 * return the runtime version of SuiteScript, could be 1.0 or 2.0
 * @return {Object}
 *
 * @method
 * @memberOf nlobjContext
 *
 * @since 2014.1
 */
nlobjContext.prototype.getRuntimeVersion = function () {
    return {};
};
