var FakeUserEvent = {
    context: nlapiGetContext(),
    beforeLoad: function (type) {
        'use strict';

        var param = this.context.getSetting('SCRIPT', 'fake-param');
        this.context.setSessionObject('before-load-type', type);
        this.context.setSessionObject('before-load-param', param);

        let recordOld = nlapiGetOldRecord(),
            recordNew = nlapiGetNewRecord(),
            recordId = nlapiGetRecordId(),
            recordType = nlapiGetRecordType();

        var field = this.context.getSetting('SCRIPT', 'field-param');
        if (recordOld) {
            this.context.setSessionObject('before-load-old-code', recordOld.getFieldValue(field));
        }
        this.context.setSessionObject('before-load-new-code', recordNew.getFieldValue(field));
        this.context.setSessionObject('before-load-rec-id', recordId);
        this.context.setSessionObject('before-load-rec-type', recordType);
    },
    beforeSubmit: function (type) {
        'use strict';

        var param = this.context.getSetting('SCRIPT', 'fake-param');
        this.context.setSessionObject('before-submit-type', type);
        this.context.setSessionObject('before-submit-param', param);

        let recordOld = nlapiGetOldRecord(),
            recordNew = nlapiGetNewRecord(),
            recordId = nlapiGetRecordId(),
            recordType = nlapiGetRecordType();

        var field = this.context.getSetting('SCRIPT', 'field-param');
        if (recordOld) {
            this.context.setSessionObject('before-submit-old-code', recordOld.getFieldValue(field));
        }
        this.context.setSessionObject('before-submit-new-code', recordNew.getFieldValue(field));
        this.context.setSessionObject('before-submit-rec-id', recordId);
        this.context.setSessionObject('before-submit-rec-type', recordType);
    },
    afterSubmit: function (type) {
        'use strict';

        var param = this.context.getSetting('SCRIPT', 'fake-param');
        this.context.setSessionObject('after-submit-type', type);
        this.context.setSessionObject('after-submit-param', param);

        let recordOld = nlapiGetOldRecord(),
            recordNew = nlapiGetNewRecord(),
            recordId = nlapiGetRecordId(),
            recordType = nlapiGetRecordType();

        var field = this.context.getSetting('SCRIPT', 'field-param');
        if (recordOld) {
            this.context.setSessionObject('after-submit-old-code', recordOld.getFieldValue(field));
        }
        this.context.setSessionObject('after-submit-new-code', recordNew.getFieldValue(field));
        this.context.setSessionObject('after-submit-rec-id', recordId);
        this.context.setSessionObject('after-submit-rec-type', recordType);
    }
};
