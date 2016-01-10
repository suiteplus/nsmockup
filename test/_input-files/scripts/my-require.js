'use strict';
var opa = require('../scripts/lib/opa');
module.exports = {
    legal: function() {
        return opa.humm && true;
    }
};
