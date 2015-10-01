'use strict';
var fs = require('fs');

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
        db.object = {};
        db.save();

        rmAllDirs(db.$pathCabinet);

        let globalVars = Object.keys(global),
            globalRem = global.$GLOBAL_REM;
        for (let k = 0; k < globalVars.length; k++) {
            let globalVar = globalVars[k];
            if ((~globalRem.indexOf(globalVar) || !~$globalVars.indexOf(globalVar)) && global[globalVar]) {
                global[globalVar] = undefined;
                !~globalRem.indexOf(globalVar) && globalRem.push(globalVar);
            }
        }
        return cb();
    }

    if (global.$db) destroy(global.$db);
    else require('./load-database')(destroy);
};
