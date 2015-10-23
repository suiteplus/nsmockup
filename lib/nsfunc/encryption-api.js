'use strict';
var crypto = require('crypto');

const $NS_ENCRYPT_ALGORITHMS= ['sha1', 'aes', 'base64', 'xor'];
const $NS_DECRYPT_ALGORITHMS= ['aes', 'base64', 'xor'];

const $NS_AES_CONFIG = {
    cryptkey: crypto.createHash('sha256').update('nsmockup').digest(),
    iv: 'a2xhcgAAAAAAAAAA'
};

function xorStrings(key,input) {
    let output = '';
    for (var i = 0; i < input.length; i++) {
        let c = input.charCodeAt(i),
            k = key.charCodeAt(i % key.length);
        output += String.fromCharCode(c ^ k);
    }
    return output;
}

/**
 * Encodes, encrypts, or obfuscates a clear text string.
 *
 * @param {string} s - The string to encode, obfuscate or encrypt.
 * @param {string} algorithm - The algorithm to use. See options: sha1, aes, base64, xor.
 * @param {string} key - The secret key that is used for AES encryption. Only applicable when using the aes algorithm. This string can be a 128–bit, 192–bit, or 256–bit hex key.
 * @return {string}
 */
exports.nlapiEncrypt = (s, algorithm, key) => {
    if (!s) {
        throw nlapiCreateError('SSS_TYPE_STR_REQD');
    } else if (!algorithm) {
        throw nlapiCreateError('SSS_TYPE_ALGORITHM_REQD');
    } else if (!~$NS_ENCRYPT_ALGORITHMS.indexOf(algorithm.toLowerCase())) {
        throw nlapiCreateError('SSS_INVALID_ALGORITHM', `Invalid Algorithm (${algorithm}), see options: [${$NS_ENCRYPT_ALGORITHMS}]`);
    }

    algorithm = algorithm.toLowerCase();
    if (algorithm === 'base64') {
        let b = new Buffer(s);
        return b.toString('base64');
    } else if (algorithm === 'sha1') {
        let shasum = crypto.createHash('sha1');
        shasum.update(s);
        return shasum.digest('hex');
    } else if (algorithm === 'xor') {
        let b = new Buffer(xorStrings('key', s));
        return b.toString('base64');
    } else {
        //key = key ? key.replace('-bit', '-cbc') : '128-cbc';
        //let cipher = crypto.createCipheriv(`aes-${key}`, $NS_AES_CONFIG.cryptkey, $NS_AES_CONFIG.iv),
        //    crypted = cipher.update(s, 'utf8', 'binary');
        //crypted += cipher.final('binary');
        //
        //let b = new Buffer(crypted, 'binary');
        //return b.toString('base64');
        return null;
    }
};

/**
 * Decodes, dencrypts a clear text string.
 *
 * @param {string} s - The string to decode or dencrypt.
 * @param {string} algorithm - The algorithm to use. See options: aes, base64, xor.
 * @param {string} key - The secret key that is used for AES encryption. Only applicable when using the aes algorithm. This string can be a 128–bit, 192–bit, or 256–bit hex key.
 * @return {string}
 */
exports.nlapiDecrypt = (s, algorithm, key) => {
    if (!s) {
        throw nlapiCreateError('SSS_TYPE_STR_REQD');
    } else if (!algorithm) {
        throw nlapiCreateError('SSS_TYPE_ALGORITHM_REQD');
    } else if (!~$NS_DECRYPT_ALGORITHMS.indexOf(algorithm.toLowerCase())) {
        throw nlapiCreateError('SSS_INVALID_ALGORITHM', `Invalid Algorithm (${algorithm}), see options: [${$NS_DECRYPT_ALGORITHMS}]`);
    }

    algorithm = algorithm.toLowerCase();
    if (algorithm === 'base64') {
        let b = new Buffer(s, 'base64');
        return b.toString();
    } else if (algorithm === 'xor') {
        let b = new Buffer(s, 'base64');
        return xorStrings('key', b.toString('utf8'));
    } else {
        //key = key ? key.replace('-bit', '-cbc') : '128-cbc';
        //let b = new Buffer(s, 'base64'),
        //    decipher = crypto.createDecipheriv(`aes-${key}`, $NS_AES_CONFIG.cryptkey, $NS_AES_CONFIG.iv),
        //    dec = decipher.update(b.toString('binary'), 'binary', 'utf8');
        //dec += decipher.final('utf8');
        //return dec;
        return null;
    }
};