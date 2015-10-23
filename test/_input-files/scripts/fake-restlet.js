var FakeRestlet = {
    context: nlapiGetContext(),
    get: function (datain) {
        'use strict';

        let result = this.context.getSetting('SCRIPT', 'fake-param');
        return result;
    },
    post: function (datain) {
        'use strict';

        return datain.fake;
    }
};
