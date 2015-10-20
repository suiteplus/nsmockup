'use strict';
var vmSim = require('../src/vm-sim');

exports.init = (type, item, id) => {
    let scriptName = `$$invoke#${type}.${item}=${id}`,
        cfg = vmSim.loadScriptConfig(scriptName),
        context = cfg.context;

    context.$$THIS_RECORD = {
        recordId: id,
        recordType: type
    };

    return {
        ctx: context,
        exec: (fn, args) => {
            let argsNames = args.map((a, i) => {
                    let param = `$$param${i}`;
                    context[param] = a;
                    return param;
                }),
                params = argsNames.join(','),
                code = `$resul = ${fn} ( ${params} )`;

            context.$resul = null;
            // execute function in context
            vmSim.evalContext(code, context);

            return context.$resul;
        }
    };
};
