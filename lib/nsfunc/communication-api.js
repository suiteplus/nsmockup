'use strict';

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
exports.nlapiSendEmail = (from, to, subject, body, cc, bcc, records, files, notifySenderOnBounce, internalOnly, replyTo) => {
    console.log('send email', arguments);
};

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
exports.nlapiSendCampaignEmail = (campaigneventid, recipientid) => {
    console.log('send campaing', arguments);
};

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
exports.nlapiSendFax = (from, to, subject, body, records, files) => {
    console.log('send fax', arguments);
};