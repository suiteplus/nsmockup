'use strict';
var fs = require('fs'),
    server = require('./server'),
    database = require('./database');

module.exports = (cb) => {
    var rmAllDirs = (path) => {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file) {
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    rmAllDirs(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    function destroy(db) {
        // ##############################
        // Drop All Records and Metadadatas
        // ##############################
        try {
            db.object = {}; // reset db object
            db.saveSync(); // save reset
        } catch (e) {
            console.error(e);
        }

        // ##############################
        // Remove all files from Cabinet
        // ##############################
        rmAllDirs(db.$pathCabinet);

        // ##############################
        // Drop All Thridparty Variables
        // ##############################
        // reset nlapiGetContext next time
        global.$NS_RESET_CONTEXT = true;

        // ##############################
        // Stop nsmockup server
        // ##############################
        if (server.isStarted()) {
            server.exec('stop', cb);
        } else {
            cb && cb();
        }

        global.$db = null;
    }

    if (global.$db) destroy(global.$db);
    else database.load(destroy);
};
