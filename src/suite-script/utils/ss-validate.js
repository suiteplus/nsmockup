'use strict';
var should = require('should');

exports.principalFunction = (func, method, ctx) => {
    if (!func) {
        return exports.throwError('principal function not def', method ? `for method ${method}` : '');
    }

    let execFunc = func;
    if (typeof execFunc === 'object') {
        if (!method) {
            return exports.throwError(`method not def`);
        } else {
            execFunc = execFunc[method];
        }
    }

    let ff = execFunc.split('.'),
        test = ctx || global;
    for (let i = 0; i < ff.length; i++) {
        let field = ff[i];
        test = test[field];
        should(test).not.eql(undefined, `function not found: "${execFunc}"`);
    }
    should(test).be.type('function', `${execFunc} is not a Function`);
    global.$db.$scripts[execFunc] = test;
};

exports.throwError = (msg) => {
    should(0).be.eql(1, msg);
};