'use strict';
var opa = require('../scripts/lib/opa'),
    low = require('lowdb');
module.exports = {
    legal: function() {
        return low || opa.humm && true;
    }
};
