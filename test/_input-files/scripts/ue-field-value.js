var UEFieldValue = {
    exec: function(type) {
        'use strict';

        var v = nlapiGetFieldValue('custrecord_code_id'),
            t = nlapiGetFieldText('custrecord_type_id');

        nlapiSetFieldValue('custrecord_code_id', v + 1);
        nlapiSetFieldText('custrecord_type_id', t + 1);

        var field = nlapiGetField('custrecord_code_multiselect');
        if (field.getType() === 'MULTISELECT') {
            var ts = nlapiGetFieldTexts(field.getName());

            nlapiLogExecution('DEBUG', type + ' - ' + field.getLabel(), ts && ts.length);

            nlapiSetFieldTexts(field.getName(), []);
            var vs = nlapiGetFieldValues(field.getName());
            if (!vs.length) {
                nlapiSetFieldValues(field.getName(), ts);
            }
        }
    }
};
