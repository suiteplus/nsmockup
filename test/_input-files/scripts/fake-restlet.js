var FakeRestlet = {
    context: nlapiGetContext(),
    get: function (req, res) {
        'use strict';

        res.write(req.getParameter('fake'));
    },
    post: function (req, res) {
        'use strict';

        res.write(this.context.getSetting('SCRIPT', 'fake-param'));
    }
};
