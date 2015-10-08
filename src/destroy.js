'use strict';
var fs = require('fs'),
    server = require('./server'),
    database = require('./database');

module.exports = (cb) => {
    const $globalVars = global.$GLOBAL_VARS;

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
        let globalVars = Object.keys(global),
            globalRem = global.$GLOBAL_REM;
        //console.log('>>>', globalVars);
        for (let k = 0; k < globalVars.length; k++) {
            let globalVar = globalVars[k];
            if ((~globalRem.indexOf(globalVar) || !~$globalVars.indexOf(globalVar)) && global[globalVar]) {
                global[globalVar] = undefined;
                !~globalRem.indexOf(globalVar) && globalRem.push(globalVar);
                //delete global[globalVar];
            }
        }
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
