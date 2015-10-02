var FakeRestlet = {
    context: nlapiGetContext(),
    post: function (req, res) {
        'use strict';

        return this.context.getSetting('SCRIPT', 'fake-param');
    }
};
