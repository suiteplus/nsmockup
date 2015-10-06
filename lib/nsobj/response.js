'use strict';

/**
 * Return a new instance of nlobjResponse used for scripting web responses in Suitelets
 *
 * @classDescription Accessor to Http response made available to Suitelets.
 * @return {nlobjResponse}
 * @constructor
 */
exports.nlobjResponse = function nlobjResponse(res) {
    this.encoding = null;

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
    this.addHeader = ( name, value ) => {
        this.setHeader(name, value);
    };

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
    this.setHeader = ( name, value ) => {
        res.headers[name] = value;
    };

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
    this.getHeader = (name) => {
        return res.headers[name];
    };

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
    this.getHeaders = ( name ) => {
        return res.headers[name];
    };

    /**
     * return an Array of all response headers
     * @return  {Object}
     *
     * @method
     * @memberOf nlobjResponse
     *
     * @since 2008.2
     */
    this.getAllHeaders = ( ) => {
        return Object.keys(res.headers);
    };

    /**
     * Returns the body returned by the server. Only available in the return value of a call to nlapiRequestURL(url, postdata, headers, callback, httpMethod).
     *
     * @return {String} The string value of the body.
     */
    this.getBody =  () => {
        let body = res.body;
        if (typeof body === 'object') {
            return JSON.stringify(body);
        } else {
            return body;
        }
    };

    this.getCode = () => {
        return res.statusCode;
    };

    /**
     * suppress caching for this response.
     * @return  {void}
     *
     * @method
     * @memberOf nlobjResponse
     *
     * @since 2009.1
     */
    this.sendNoCache = ( ) => { };

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
    this.setContentType = ( type, filename, disposition ) => { };

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
    this.sendRedirect = ( type, subtype, id, pagemode, parameters ) => { };

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
    this.write = ( output ) => {
        res.send(output);
    };

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
    this.writeLine = ( output ) => {
        res.write(output);
    };

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
    this.writePage = ( pageobject )=>  { };

    /**
     * sets the character encoding for the response.
     * @param {String} encoding
     * @return {void}
     * @method
     * @memberOf nlobjResponse
     *
     * @since 2012.2
     */
    this.setEncoding = ( encoding ) => {
        this.encoding = encoding;
    };
};
