var FakeRestlet = {
    context: nlapiGetContext(),
    post: function (req, res) {
        'use strict';

        res.write(this.context.getSetting('SCRIPT', 'fake-param'));
    }
};
