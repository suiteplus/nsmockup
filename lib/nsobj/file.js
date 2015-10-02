'use strict';

/**
 * Return a new instance of nlobjFile used for accessing and manipulating files in the file cabinet.
 *
 * @classDescription Encapsulation of files (media items) in the file cabinet.
 * @return {nlobjFile}
 * @constructor
 *
 * @since 2009.1
 */
function nlobjFile(name, type, content) {
    this.id = -1;
    this.name = name;
    this.type = type;
    this.content = content || '';
    this.folder = '.';
    this.encoding = 'utf-8';
    this.online = false;
    this.inactive = false;
    this.descr = null;
}
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
nlobjFile.prototype.getName = function () {
    return this.name;
};

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
nlobjFile.prototype.setName = function (name) {
    this.name = name;
};

/**
 * return the internal ID of the folder that this file is in.
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getFolder = function () {
    return this.folder;
};

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
nlobjFile.prototype.setFolder = function (folder) {
    this.folder = folder;
};

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
nlobjFile.prototype.setEncoding = function (encoding) {
    this.encoding = encoding;
};

/**
 * return true if the file is "Available without Login".
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.isOnline = function () {
    return this.online;
};

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
nlobjFile.prototype.setIsOnline = function (online) {
    this.online = !!online;
};

/**
 * return true if the file is inactive.
 * @return {boolean}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.isInactive = function () {
    return this.inactive;
};

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
nlobjFile.prototype.setIsInactive = function (inactive) {
    this.inactive = inactive;
};

/**
 * return the file description.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getDescription = function () {
    return this.descr;
};

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
nlobjFile.prototype.setDescription = function (descr) {
    this.descr = descr;
};

/**
 * Return the id of the file (if stored in the FC).
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getId = function () {
    return this.id;
};

/**
 * Return the size of the file in bytes.
 * @return {int}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getSize = function () {
    return this.content.length;
};

/**
 * Return the URL of the file (if stored in the FC).
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getURL = function () {
    return this.url;
};

/**
 * Return the type of the file.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getType = function () {
    return this.type;
};

/**
 * Return the value (base64 encoded for binary types) of the file.
 * @return {string}
 *
 * @method
 * @memberOf nlobjFile
 *
 * @since 2009.1
 */
nlobjFile.prototype.getValue = function () {
    return new Buffer(this.content).toString('base64');
};