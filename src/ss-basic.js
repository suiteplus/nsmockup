'use strict';
var vmAddFile = require('./add-file');

module.exports = (opt) => {
    if (!opt || !opt.files || opt.files.length === 0) return;

    for (let i = 0; i < opt.files.length; i++) {
        vmAddFile(opt.files[i]);
    }
    if (opt.params) {
        let pref = nlapiGetContext().preference,
            keys = Object.keys(opt.params);
        for (let i = 0; i < keys.length; i++) {
            let param = keys[i];
            pref[param] = opt.params[param];
        }
    }
};
