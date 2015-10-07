var context = nlapiGetContext();
function ScheduleFake () {
    'use strict';
    var recordType = this.getContext().getSetting('SCRIPT', 'fake-param');
    var datas = nlapiSearchRecord(recordType);
    for (var i = 0; i < datas.length; i++) {
        datas[i].index = i;
    }
}

ScheduleFake.prototype.getContext = function () {
    'use strict';
    return context;
};
