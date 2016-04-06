'use strict';
var opa = require('../scripts/lib/opa'),
    opa2 = require('./lib/opa'),
    low = require('lowdb');
module.exports = {
    legal: function() {
        if (opa2 && opa2.humm === 'joinha') {
            return low;
        } else {
            return opa.humm && true;
        }
    }
};
