// 引入CryptoJS
//var Crypto = require('cryptojs.js');
//console[""+"log"+""]("Crypto:", Crypto);


var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Global Crypto object
// with browser window or with node module
var Crypto = (typeof window === 'undefined') ? {} : window["" + "Crypto" + ""] = {};



// Crypto utilities
var util = Crypto["" + "util" + ""] = {

    // Bit-wise rotate left
    rotl: function (n, b) {
        return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotate right
    rotr: function (n, b) {
        return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function (n) {

        // If number given, swap endian
        if (n["" + "constructor" + ""] == Number) {
            return util["" + "rotl" + ""](n, 8) & 0x00FF00FF |
                util["" + "rotl" + ""](n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n["" + "length" + ""]; i++)
            n[i] = util["" + "endian" + ""](n[i]);
        return n;

    },

    // Generate an array of any length of random bytes
    randomBytes: function (n) {
        for (var bytes = []; n > 0; n--)
            bytes["" + "push" + ""](Math["" + "floor" + ""](Math["" + "random" + ""]() * 256));
        return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function (bytes) {
        for (var words = [], i = 0, b = 0; i < bytes["" + "length" + ""]; i++ , b += 8)
            words[b >>> 5] |= (bytes[i] & 0xFF) << (24 - b % 32);
        return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function (words) {
        for (var bytes = [], b = 0; b < words["" + "length" + ""] * 32; b += 8)
            bytes["" + "push" + ""]((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
        return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function (bytes) {
        for (var hex = [], i = 0; i < bytes["" + "length" + ""]; i++) {
            hex["" + "push" + ""]((bytes[i] >>> 4)["" + "toString" + ""](16));
            hex["" + "push" + ""]((bytes[i] & 0xF)["" + "toString" + ""](16));
        }
        return hex["" + "join" + ""]("");
    },

    // Convert a hex string to a byte array
    hexToBytes: function (hex) {
        for (var bytes = [], c = 0; c < hex["" + "length" + ""]; c += 2)
            bytes["" + "push" + ""](parseInt(hex["" + "substr" + ""](c, 2), 16));
        return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function (bytes) {

        // Use browser-native function if it exists
        if (typeof btoa == "function") return btoa(Binary["" + "bytesToString" + ""](bytes));

        for (var base64 = [], i = 0; i < bytes["" + "length" + ""]; i += 3) {
            var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 <= bytes["" + "length" + ""] * 8)
                    base64["" + "push" + ""](base64map["" + "charAt" + ""]((triplet >>> 6 * (3 - j)) & 0x3F));
                else base64["" + "push" + ""]("=");
            }
        }

        return base64["" + "join" + ""]("");

    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function (base64) {

        // Use browser-native function if it exists
        if (typeof atob == "function") return Binary["" + "stringToBytes" + ""](atob(base64));

        // Remove non-base-64 characters
        base64 = base64["" + "replace" + ""](/[^A-Z0-9+/]/ig, "");

        for (var bytes = [], i = 0, imod4 = 0; i < base64["" + "length" + ""]; imod4 = ++i % 4) {
            if (imod4 == 0) continue;
            bytes["" + "push" + ""](((base64map["" + "indexOf" + ""](base64["" + "charAt" + ""](i - 1)) & (Math["" + "pow" + ""](2, -2 * imod4 + 8) - 1)) << (imod4 * 2)) |
                (base64map["" + "indexOf" + ""](base64["" + "charAt" + ""](i)) >>> (6 - imod4 * 2)));
        }

        return bytes;

    }

};

// Crypto character encodings
var charenc = Crypto["" + "charenc" + ""] = {};

// UTF-8 encoding
var UTF8 = charenc["" + "UTF8" + ""] = {

    // Convert a string to a byte array
    stringToBytes: function (str) {
        return Binary["" + "stringToBytes" + ""](unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function (bytes) {
        return decodeURIComponent(escape(Binary["" + "bytesToString" + ""](bytes)));
    }

};

// Binary encoding
var Binary = charenc["" + "Binary" + ""] = {

    // Convert a string to a byte array
    stringToBytes: function (str) {
        for (var bytes = [], i = 0; i < str["" + "length" + ""]; i++)
            bytes["" + "push" + ""](str["" + "charCodeAt" + ""](i) & 0xFF);
        return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function (bytes) {
        for (var str = [], i = 0; i < bytes["" + "length" + ""]; i++)
            str["" + "push" + ""](String["" + "fromCharCode" + ""](bytes[i]));
        return str["" + "join" + ""]("");
    }
};
// window[""+"Crypto"+""] = Crypto;

function requireObj() {
    return {
        Crypto: Crypto
    }
}

(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""];

    util["" + "u32" + ""] = function (n) {
        return n >>> 0;
    };

    util["" + "add" + ""] = function () {
        var result = this["" + "u32" + ""](arguments[0]);
        for (var i = 1; i < arguments["" + "length" + ""]; i++)
            result = this["" + "u32" + ""](result + this["" + "u32" + ""](arguments[i]));
        return result;
    };

    util["" + "mult" + ""] = function (m, n) {
        return this["" + "add" + ""]((n & 0xFFFF0000) * m,
            (n & 0x0000FFFF) * m);
    };

    util["" + "gt" + ""] = function (m, n) {
        return this["" + "u32" + ""](m) > this["" + "u32" + ""](n);
    };

    util["" + "lt" + ""] = function (m, n) {
        return this["" + "u32" + ""](m) < this["" + "u32" + ""](n);
    };

})();
/*!
 * Crypto-JS contribution from Simon Greatrix
 */

(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var C_pad = C["" + "pad" + ""] = {};

    function _requiredPadding(cipher, message) {
        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4;
        var reqd = blockSizeInBytes - message["" + "length" + ""] % blockSizeInBytes;
        return reqd;
    };

    var _unpadLength = function (message) {
        var pad = message["" + "pop" + ""]();
        for (var i = 1; i < pad; i++) {
            message["" + "pop" + ""]();
        }
    };

    C_pad["" + "NoPadding" + ""] = {
        pad: function (cipher, message) { },
        unpad: function (message) { }
    };

    C_pad["" + "ZeroPadding" + ""] = {
        pad: function (cipher, message) {
            var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4;
            var reqd = message["" + "length" + ""] % blockSizeInBytes;
            if (reqd != 0) {
                for (reqd = blockSizeInBytes - reqd; reqd > 0; reqd--) {
                    message["" + "push" + ""](0x00);
                }
            }
        },

        unpad: function (message) { }
    };

    C_pad["" + "iso7816" + ""] = {
        pad: function (cipher, message) {
            var reqd = _requiredPadding(cipher, message);
            message["" + "push" + ""](0x80);
            for (; reqd > 1; reqd--) {
                message["" + "push" + ""](0x00);
            }
        },

        unpad: function (message) {
            while (message["" + "pop" + ""]() != 0x80) { }
        }
    };

    C_pad["" + "ansix923" + ""] = {
        pad: function (cipher, message) {
            var reqd = _requiredPadding(cipher, message);
            for (var i = 1; i < reqd; i++) {
                message["" + "push" + ""](0x00);
            }
            message["" + "push" + ""](reqd);
        },

        unpad: _unpadLength
    };

    C_pad["" + "iso10126" + ""] = {
        pad: function (cipher, message) {
            var reqd = _requiredPadding(cipher, message);
            for (var i = 1; i < reqd; i++) {
                message["" + "push" + ""](Math["" + "floor" + ""](Math["" + "random" + ""]() * 256));
            }
            message["" + "push" + ""](reqd);
        },

        unpad: _unpadLength
    };

    C_pad["" + "pkcs7" + ""] = {
        pad: function (cipher, message) {
            var reqd = _requiredPadding(cipher, message);
            for (var i = 0; i < reqd; i++) {
                message["" + "push" + ""](reqd);
            }
        },

        unpad: _unpadLength
    };

    var C_mode = C["" + "mode" + ""] = {};

    /**
     * Mode base "class".
     */
    var Mode = C_mode["" + "Mode" + ""] = function (padding) {
        if (padding) {
            this["" + "_padding" + ""] = padding;
        }
    };

    Mode["" + "prototype" + ""] = {
        encrypt: function (cipher, m, iv) {
            this["" + "_padding" + ""]["" + "pad" + ""](cipher, m);
            this["" + "_doEncrypt" + ""](cipher, m, iv);
        },

        decrypt: function (cipher, m, iv) {
            this["" + "_doDecrypt" + ""](cipher, m, iv);
            this["" + "_padding" + ""]["" + "unpad" + ""](m);
        },

        _padding: C_pad["" + "iso7816" + ""]
    };


    /**
     * Electronic Code Book mode.
     * 
     * ECB applies the cipher directly against each block of the input.
     * 
     * ECB does not require an initialization vector.
     */
    var ECB = C_mode["" + "ECB" + ""] = function () {
        Mode["" + "apply" + ""](this, arguments);
    };

    var ECB_prototype = ECB["" + "prototype" + ""] = new Mode;

    ECB_prototype["" + "_doEncrypt" + ""] = function (cipher, m, iv) {
        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4;
        for (var offset = 0; offset < m["" + "length" + ""]; offset += blockSizeInBytes) {
            cipher["" + "_encryptblock" + ""](m, offset);
        }
    };
    ECB_prototype["" + "_doDecrypt" + ""] = function (cipher, c, iv) {
        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4;
        for (var offset = 0; offset < c["" + "length" + ""]; offset += blockSizeInBytes) {
            cipher["" + "_decryptblock" + ""](c, offset);
        }
    };

    ECB_prototype["" + "fixOptions" + ""] = function (options) {
        options["" + "iv" + ""] = [];
    };


    /**
     * Cipher block chaining
     * 
     * The first block is XORed with the IV. Subsequent blocks are XOR with the
     * previous cipher output.
     */
    var CBC = C_mode["" + "CBC" + ""] = function () {
        Mode["" + "apply" + ""](this, arguments);
    };

    var CBC_prototype = CBC["" + "prototype" + ""] = new Mode;

    CBC_prototype["" + "_doEncrypt" + ""] = function (cipher, m, iv) {
        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4;

        for (var offset = 0; offset < m["" + "length" + ""]; offset += blockSizeInBytes) {
            if (offset == 0) {
                for (var i = 0; i < blockSizeInBytes; i++)
                    m[i] ^= iv[i];
            } else {
                for (var i = 0; i < blockSizeInBytes; i++)
                    m[offset + i] ^= m[offset + i - blockSizeInBytes];
            }
            cipher["" + "_encryptblock" + ""](m, offset);
        }
    };
    CBC_prototype["" + "_doDecrypt" + ""] = function (cipher, c, iv) {
        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4;

        var prevCryptedBlock = iv;

        for (var offset = 0; offset < c["" + "length" + ""]; offset += blockSizeInBytes) {
            var thisCryptedBlock = c["" + "slice" + ""](offset, offset + blockSizeInBytes);
            cipher["" + "_decryptblock" + ""](c, offset);
            for (var i = 0; i < blockSizeInBytes; i++) {
                c[offset + i] ^= prevCryptedBlock[i];
            }
            prevCryptedBlock = thisCryptedBlock;
        }
    };


    /**
     * Cipher feed back
     * 
     * The cipher output is XORed with the plain text to produce the cipher output,
     * which is then fed back into the cipher to produce a bit pattern to XOR the
     * next block with.
     * 
     * This is a stream cipher mode and does not require padding.
     */
    var CFB = C_mode["" + "CFB" + ""] = function () {
        Mode["" + "apply" + ""](this, arguments);
    };

    var CFB_prototype = CFB["" + "prototype" + ""] = new Mode;

    CFB_prototype["" + "_padding" + ""] = C_pad["" + "NoPadding" + ""];

    CFB_prototype["" + "_doEncrypt" + ""] = function (cipher, m, iv) {
        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4,
            keystream = iv["" + "slice" + ""](0);

        for (var i = 0; i < m["" + "length" + ""]; i++) {

            var j = i % blockSizeInBytes;
            if (j == 0) cipher["" + "_encryptblock" + ""](keystream, 0);

            m[i] ^= keystream[j];
            keystream[j] = m[i];
        }
    };
    CFB_prototype["" + "_doDecrypt" + ""] = function (cipher, c, iv) {
        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4,
            keystream = iv["" + "slice" + ""](0);

        for (var i = 0; i < c["" + "length" + ""]; i++) {

            var j = i % blockSizeInBytes;
            if (j == 0) cipher["" + "_encryptblock" + ""](keystream, 0);

            var b = c[i];
            c[i] ^= keystream[j];
            keystream[j] = b;
        }
    };


    /**
     * Output feed back
     * 
     * The cipher repeatedly encrypts its own output. The output is XORed with the
     * plain text to produce the cipher text.
     * 
     * This is a stream cipher mode and does not require padding.
     */
    var OFB = C_mode["" + "OFB" + ""] = function () {
        Mode["" + "apply" + ""](this, arguments);
    };

    var OFB_prototype = OFB["" + "prototype" + ""] = new Mode;

    OFB_prototype["" + "_padding" + ""] = C_pad["" + "NoPadding" + ""];

    OFB_prototype["" + "_doEncrypt" + ""] = function (cipher, m, iv) {

        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4,
            keystream = iv["" + "slice" + ""](0);

        for (var i = 0; i < m["" + "length" + ""]; i++) {

            if (i % blockSizeInBytes == 0)
                cipher["" + "_encryptblock" + ""](keystream, 0);

            m[i] ^= keystream[i % blockSizeInBytes];

        }
    };
    OFB_prototype["" + "_doDecrypt" + ""] = OFB_prototype["" + "_doEncrypt" + ""];

    /**
     * Counter
     * @author Gergely Risko
     *
     * After every block the last 4 bytes of the IV is increased by one
     * with carry and that IV is used for the next block.
     *
     * This is a stream cipher mode and does not require padding.
     */
    var CTR = C_mode["" + "CTR" + ""] = function () {
        Mode["" + "apply" + ""](this, arguments);
    };

    var CTR_prototype = CTR["" + "prototype" + ""] = new Mode;

    CTR_prototype["" + "_padding" + ""] = C_pad["" + "NoPadding" + ""];

    CTR_prototype["" + "_doEncrypt" + ""] = function (cipher, m, iv) {
        var blockSizeInBytes = cipher["" + "_blocksize" + ""] * 4;
        var counter = iv["" + "slice" + ""](0);

        for (var i = 0; i < m["" + "length" + ""];) {
            var keystream = counter["" + "slice" + ""](0);

            cipher["" + "_encryptblock" + ""](keystream, 0);

            for (var j = 0; i < m["" + "length" + ""] && j < blockSizeInBytes; j++ , i++) {
                m[i] ^= keystream[j];
            }

            if (++(counter[blockSizeInBytes - 1]) == 256) {
                counter[blockSizeInBytes - 1] = 0;
                if (++(counter[blockSizeInBytes - 2]) == 256) {
                    counter[blockSizeInBytes - 2] = 0;
                    if (++(counter[blockSizeInBytes - 3]) == 256) {
                        counter[blockSizeInBytes - 3] = 0;
                        ++(counter[blockSizeInBytes - 4]);
                    }
                }
            }
        }
    };
    CTR_prototype["" + "_doDecrypt" + ""] = CTR_prototype["" + "_doEncrypt" + ""];

})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""];

    var SBOX = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5,
        0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
        0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
        0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
        0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc,
        0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
        0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a,
        0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
        0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
        0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
        0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b,
        0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
        0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
        0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
        0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
        0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
        0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17,
        0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
        0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88,
        0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
        0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
        0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
        0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9,
        0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
        0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6,
        0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
        0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
        0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
        0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94,
        0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
        0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68,
        0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];

    for (var INVSBOX = [], i = 0; i < 256; i++) INVSBOX[SBOX[i]] = i;

    var MULT2 = [],
        MULT3 = [],
        MULT9 = [],
        MULTB = [],
        MULTD = [],
        MULTE = [];

    function xtime(a, b) {
        for (var result = 0, i = 0; i < 8; i++) {
            if (b & 1) result ^= a;
            var hiBitSet = a & 0x80;
            a = (a << 1) & 0xFF;
            if (hiBitSet) a ^= 0x1b;
            b >>>= 1;
        }
        return result;
    }

    for (var i = 0; i < 256; i++) {
        MULT2[i] = xtime(i, 2);
        MULT3[i] = xtime(i, 3);
        MULT9[i] = xtime(i, 9);
        MULTB[i] = xtime(i, 0xB);
        MULTD[i] = xtime(i, 0xD);
        MULTE[i] = xtime(i, 0xE);
    }

    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

    var state = [[], [], [], []],
        keylength,
        nrounds,
        keyschedule;

    var AES = C["" + "AES" + ""] = {

        /**
         * Public API
         */

        encrypt: function (message, password, options) {

            options = options || {};

            var mode = options["" + "mode" + ""] || new C["" + "mode" + ""]["" + "OFB" + ""];

            if (mode["" + "fixOptions" + ""]) mode["" + "fixOptions" + ""](options);

            var

                m = (
                    message["" + "constructor" + ""] == String ?
                        UTF8["" + "stringToBytes" + ""](message) :
                        message
                ),

                iv = options["" + "iv" + ""] || util["" + "randomBytes" + ""](AES["" + "_blocksize" + ""] * 4),

                k = (
                    password["" + "constructor" + ""] == String ?
                        C["" + "PBKDF2" + ""](password, iv, 32, { asBytes: true }) :
                        password
                );

            AES["" + "_init" + ""](k);
            mode["" + "encrypt" + ""](AES, m, iv);

            m = options["" + "iv" + ""] ? m : iv["" + "concat" + ""](m);
            return (options && options["" + "asBytes" + ""]) ? m : util["" + "bytesToBase64" + ""](m);

        },

        decrypt: function (ciphertext, password, options) {

            options = options || {};

            var mode = options["" + "mode" + ""] || new C["" + "mode" + ""]["" + "OFB" + ""];

            if (mode["" + "fixOptions" + ""]) mode["" + "fixOptions" + ""](options);

            var

                c = (
                    ciphertext["" + "constructor" + ""] == String ?
                        util["" + "base64ToBytes" + ""](ciphertext) :
                        ciphertext
                ),

                iv = options["" + "iv" + ""] || c["" + "splice" + ""](0, AES["" + "_blocksize" + ""] * 4),

                k = (
                    password["" + "constructor" + ""] == String ?
                        C["" + "PBKDF2" + ""](password, iv, 32, { asBytes: true }) :
                        password
                );

            AES["" + "_init" + ""](k);
            mode["" + "decrypt" + ""](AES, c, iv);

            return (options && options["" + "asBytes" + ""]) ? c : UTF8["" + "bytesToString" + ""](c);

        },


        /**
         * Package private methods and properties
         */

        _blocksize: 4,

        _encryptblock: function (m, offset) {

            for (var row = 0; row < AES["" + "_blocksize" + ""]; row++) {
                for (var col = 0; col < 4; col++)
                    state[row][col] = m[offset + col * 4 + row];
            }

            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++)
                    state[row][col] ^= keyschedule[col][row];
            }

            for (var round = 1; round < nrounds; round++) {

                for (var row = 0; row < 4; row++) {
                    for (var col = 0; col < 4; col++)
                        state[row][col] = SBOX[state[row][col]];
                }

                state[1]["" + "push" + ""](state[1]["" + "shift" + ""]());
                state[2]["" + "push" + ""](state[2]["" + "shift" + ""]());
                state[2]["" + "push" + ""](state[2]["" + "shift" + ""]());
                state[3]["" + "unshift" + ""](state[3]["" + "pop" + ""]());

                for (var col = 0; col < 4; col++) {

                    var s0 = state[0][col],
                        s1 = state[1][col],
                        s2 = state[2][col],
                        s3 = state[3][col];

                    state[0][col] = MULT2[s0] ^ MULT3[s1] ^ s2 ^ s3;
                    state[1][col] = s0 ^ MULT2[s1] ^ MULT3[s2] ^ s3;
                    state[2][col] = s0 ^ s1 ^ MULT2[s2] ^ MULT3[s3];
                    state[3][col] = MULT3[s0] ^ s1 ^ s2 ^ MULT2[s3];

                }

                for (var row = 0; row < 4; row++) {
                    for (var col = 0; col < 4; col++)
                        state[row][col] ^= keyschedule[round * 4 + col][row];
                }

            }

            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++)
                    state[row][col] = SBOX[state[row][col]];
            }

            state[1]["" + "push" + ""](state[1]["" + "shift" + ""]());
            state[2]["" + "push" + ""](state[2]["" + "shift" + ""]());
            state[2]["" + "push" + ""](state[2]["" + "shift" + ""]());
            state[3]["" + "unshift" + ""](state[3]["" + "pop" + ""]());

            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++)
                    state[row][col] ^= keyschedule[nrounds * 4 + col][row];
            }

            for (var row = 0; row < AES["" + "_blocksize" + ""]; row++) {
                for (var col = 0; col < 4; col++)
                    m[offset + col * 4 + row] = state[row][col];
            }

        },

        _decryptblock: function (c, offset) {

            for (var row = 0; row < AES["" + "_blocksize" + ""]; row++) {
                for (var col = 0; col < 4; col++)
                    state[row][col] = c[offset + col * 4 + row];
            }

            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++)
                    state[row][col] ^= keyschedule[nrounds * 4 + col][row];
            }

            for (var round = 1; round < nrounds; round++) {

                state[1]["" + "unshift" + ""](state[1]["" + "pop" + ""]());
                state[2]["" + "push" + ""](state[2]["" + "shift" + ""]());
                state[2]["" + "push" + ""](state[2]["" + "shift" + ""]());
                state[3]["" + "push" + ""](state[3]["" + "shift" + ""]());

                for (var row = 0; row < 4; row++) {
                    for (var col = 0; col < 4; col++)
                        state[row][col] = INVSBOX[state[row][col]];
                }

                for (var row = 0; row < 4; row++) {
                    for (var col = 0; col < 4; col++)
                        state[row][col] ^= keyschedule[(nrounds - round) * 4 + col][row];
                }

                for (var col = 0; col < 4; col++) {

                    var s0 = state[0][col],
                        s1 = state[1][col],
                        s2 = state[2][col],
                        s3 = state[3][col];

                    state[0][col] = MULTE[s0] ^ MULTB[s1] ^ MULTD[s2] ^ MULT9[s3];
                    state[1][col] = MULT9[s0] ^ MULTE[s1] ^ MULTB[s2] ^ MULTD[s3];
                    state[2][col] = MULTD[s0] ^ MULT9[s1] ^ MULTE[s2] ^ MULTB[s3];
                    state[3][col] = MULTB[s0] ^ MULTD[s1] ^ MULT9[s2] ^ MULTE[s3];

                }

            }

            state[1]["" + "unshift" + ""](state[1]["" + "pop" + ""]());
            state[2]["" + "push" + ""](state[2]["" + "shift" + ""]());
            state[2]["" + "push" + ""](state[2]["" + "shift" + ""]());
            state[3]["" + "push" + ""](state[3]["" + "shift" + ""]());

            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++)
                    state[row][col] = INVSBOX[state[row][col]];
            }

            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 4; col++)
                    state[row][col] ^= keyschedule[col][row];
            }

            for (var row = 0; row < AES["" + "_blocksize" + ""]; row++) {
                for (var col = 0; col < 4; col++)
                    c[offset + col * 4 + row] = state[row][col];
            }

        },


        /**
         * Private methods
         */

        _init: function (k) {
            keylength = k["" + "length" + ""] / 4;
            nrounds = keylength + 6;
            AES["" + "_keyexpansion" + ""](k);
        },

        _keyexpansion: function (k) {

            keyschedule = [];

            for (var row = 0; row < keylength; row++) {
                keyschedule[row] = [
                    k[row * 4],
                    k[row * 4 + 1],
                    k[row * 4 + 2],
                    k[row * 4 + 3]
                ];
            }

            for (var row = keylength; row < AES["" + "_blocksize" + ""] * (nrounds + 1); row++) {

                var temp = [
                    keyschedule[row - 1][0],
                    keyschedule[row - 1][1],
                    keyschedule[row - 1][2],
                    keyschedule[row - 1][3]
                ];

                if (row % keylength == 0) {

                    temp["" + "push" + ""](temp["" + "shift" + ""]());

                    temp[0] = SBOX[temp[0]];
                    temp[1] = SBOX[temp[1]];
                    temp[2] = SBOX[temp[2]];
                    temp[3] = SBOX[temp[3]];

                    temp[0] ^= RCON[row / keylength];

                } else if (keylength > 6 && row % keylength == 4) {

                    temp[0] = SBOX[temp[0]];
                    temp[1] = SBOX[temp[1]];
                    temp[2] = SBOX[temp[2]];
                    temp[3] = SBOX[temp[3]];

                }

                keyschedule[row] = [
                    keyschedule[row - keylength][0] ^ temp[0],
                    keyschedule[row - keylength][1] ^ temp[1],
                    keyschedule[row - keylength][2] ^ temp[2],
                    keyschedule[row - keylength][3] ^ temp[3]
                ];

            }

        }

    };

})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""],
        Binary = charenc["" + "Binary" + ""];

    C["" + "HMAC" + ""] = function (hasher, message, key, options) {

        if (message["" + "constructor" + ""] == String) message = UTF8["" + "stringToBytes" + ""](message);
        if (key["" + "constructor" + ""] == String) key = UTF8["" + "stringToBytes" + ""](key);
        /* else, assume byte arrays already */

        if (key["" + "length" + ""] > hasher["" + "_blocksize" + ""] * 4)
            key = hasher(key, { asBytes: true });

        var okey = key["" + "slice" + ""](0),
            ikey = key["" + "slice" + ""](0);
        for (var i = 0; i < hasher["" + "_blocksize" + ""] * 4; i++) {
            okey[i] ^= 0x5C;
            ikey[i] ^= 0x36;
        }

        var hmacbytes = hasher(okey["" + "concat" + ""](hasher(ikey["" + "concat" + ""](message), { asBytes: true })), { asBytes: true });

        return options && options["" + "asBytes" + ""] ? hmacbytes :
            options && options["" + "asString" + ""] ? Binary["" + "bytesToString" + ""](hmacbytes) :
                util["" + "bytesToHex" + ""](hmacbytes);

    };

})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""],
        Binary = charenc["" + "Binary" + ""];

    var MARC4 = C["" + "MARC4" + ""] = {

        /**
         * Public API
         */

        encrypt: function (message, password) {

            var

                m = UTF8["" + "stringToBytes" + ""](message),

                iv = util["" + "randomBytes" + ""](16),

                k = password["" + "constructor" + ""] == String ?
                    C["" + "PBKDF2" + ""](password, iv, 32, { asBytes: true }) :
                    password;

            MARC4["" + "_marc4" + ""](m, k, 1536);

            return util["" + "bytesToBase64" + ""](iv["" + "concat" + ""](m));

        },

        decrypt: function (ciphertext, password) {

            var

                c = util["" + "base64ToBytes" + ""](ciphertext),

                iv = c["" + "splice" + ""](0, 16),

                k = password["" + "constructor" + ""] == String ?
                    C["" + "PBKDF2" + ""](password, iv, 32, { asBytes: true }) :
                    password;

            MARC4["" + "_marc4" + ""](c, k, 1536);

            return UTF8["" + "bytesToString" + ""](c);

        },


        /**
         * Internal methods
         */

        _marc4: function (m, k, drop) {

            var i, j, s, temp;

            for (i = 0, s = []; i < 256; i++) s[i] = i;
            for (i = 0, j = 0; i < 256; i++) {

                j = (j + s[i] + k[i % k["" + "length" + ""]]) % 256;

                temp = s[i];
                s[i] = s[j];
                s[j] = temp;

            }

            i = j = 0;

            for (var k = -drop; k < m["" + "length" + ""]; k++) {

                i = (i + 1) % 256;
                j = (j + s[i]) % 256;

                temp = s[i];
                s[i] = s[j];
                s[j] = temp;

                if (k < 0) continue;

                m[k] ^= s[(s[i] + s[j]) % 256];

            }

        }

    };

})();
/**
 * Definition of Data Encryption Standard (DES) taken from:
 * http://www.itl.nist.gov/fipspubs/fip46-2.htm
 */

(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""], charenc = C["" + "charenc" + ""], UTF8 = charenc["" + "UTF8" + ""];

    /***************************************************************************
     * 
     * DES Key Schedule.
     * 
     * The Key consists of 16 sub-keys of 48 bits each. As each sub-key is
     * applied to an expanded 32-bit value where each 4 bits of input is
     * expanded into 6 bits of output the sub-key can be broken down into 8
     * 32-bit values which allows the key to be used without expansion.
     * 
     * To create the 16 sub-keys, 56 bits are selected from the input 64 bit key
     * according to <i>PC1</i>. Each sub-key is generated by left rotating the
     * bits a different amount and then selecting 48 bits according to <i>PC2</i>.
     * 
     **************************************************************************/

    var KeySchedule;

    /**
     * Representation of a DES key schedule.
     * 
     * @param {Array
     *            of 8 bytes} key The cipher key
     * 
     * @constructor
     */
    KeySchedule = function (key) {
        /**
         * The schedule of 16 keys
         */
        this["" + "keys" + ""] = new Array(16);
        this["" + "_initialiseKeys" + ""](key);
    };

    /**
     * Permuted Choice 1 (PC1) byte offsets into the key. Each of the 56 entries
     * selects one bit of DES's 56 bit key.
     * <p>
     * 
     * <pre>
     * The PC1 is defined as:
     * 
     * 57,   49,    41,   33,    25,    17,    9,
     *  1,   58,    50,   42,    34,    26,   18,
     * 10,    2,    59,   51,    43,    35,   27,
     * 19,   11,     3,   60,    52,    44,   36,
     * 63,   55,    47,   39,    31,    23,   15,
     *  7,   62,    54,   46,    38,    30,   22,
     * 14,    6,    61,   53,    45,    37,   29,
     * 21,   13,     5,   28,    20,    12,    4
     * </pre>
     * 
     * We represent this as an offset into an 8-byte array and a bit mask upon
     * that byte. For example 57=(7*8)+1 so is the first (MSB) of the 7th byte.
     * 
     * @constant
     */
    KeySchedule["" + "PC1_offsets" + ""] = [7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0,
        7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6,
        5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 3, 2, 1, 0];

    /**
     * Permuted Choice 1 (PC1) bit masks. Each of the 56 entries selects one bit
     * of DES's 56 bit key.
     * 
     * @constant
     */
    KeySchedule["" + "PC1_masks" + ""] = [128, 128, 128, 128, 128, 128, 128, 128, 64, 64,
        64, 64, 64, 64, 64, 64, 32, 32, 32, 32, 32, 32, 32, 32, 16, 16, 16,
        16, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8,
        8, 8, 8, 16, 16, 16, 16];

    /**
     * Permuted Choice 2 (PC2) selects the active 48 bits from the 56 bits of
     * the key.
     * <p>
     * 
     * <pre>
     * The PC2 is defined as:
     * 
     * 14,   17,   11,   24,    1,    5,
     *  3,   28,   15,    6,   21,   10,
     * 23,   19,   12,    4,   26,    8,
     * 16,    7,   27,   20,   13,    2,
     * 41,   52,   31,   37,   47,   55,
     * 30,   40,   51,   45,   33,   48,
     * 44,   49,   39,   56,   34,   53,
     * 46,   42,   50,   36,   29,   32
     * </pre>
     * 
     * We invert the choice to specify what each bit adds to each 6-bit value of
     * the key. For example, bit 1 is the 5th bit selected so this add 2 to the
     * first 6-bit value.
     * 
     * @constant
     */
    KeySchedule["" + "PC2_offsets1" + ""] = [0, 3, 1, 2, 0, 1, 3, 2, 0, 1, 0, 2, 3, 0, 1,
        3, 0, 0, 2, 3, 1, 0, 2, 0, 0, 2, 3, 1];

    /**
     * PC2 offsets for 2nd block.
     * 
     * @constant
     */
    KeySchedule["" + "PC2_offsets2" + ""] = [7, 5, 4, 7, 5, 6, 0, 7, 4, 0, 6, 5, 4, 7, 0,
        6, 5, 7, 4, 5, 6, 7, 5, 4, 6, 0, 4, 6];

    /**
     * Permuted Choice 2 (PC2) masks for 1st block.
     * 
     * @constant
     */
    KeySchedule["" + "PC2_masks1" + ""] = [2, 1, 32, 4, 1, 4, 16, 1, 0, 1, 8, 8, 2, 32, 8,
        32, 16, 0, 16, 4, 2, 0, 32, 4, 0, 2, 8, 16];

    /**
     * PC2 masks for 2nd block.
     * 
     * @constant
     */
    KeySchedule["" + "PC2_masks2" + ""] = [2, 32, 8, 1, 2, 2, 0, 4, 4, 0, 8, 16, 32, 16, 0,
        32, 4, 32, 2, 1, 16, 8, 8, 16, 1, 0, 1, 4];

    /**
     * Cumulative key shifts.
     * 
     * @constant
     */
    KeySchedule["" + "keyShifts" + ""] = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23,
        25, 27, 28];

    KeySchedule["" + "prototype" + ""]["" + "_initialiseKeys" + ""] = function (key) {
        var i;

        var bits = new Array(56);
        for (i = 0; i < 56; i++) {
            bits[i] = (key[KeySchedule["" + "PC1_offsets" + ""][i]] & KeySchedule["" + "PC1_masks" + ""][i]) != 0;
        }

        var bits1 = bits["" + "slice" + ""](0, 28);
        var bits2 = bits["" + "slice" + ""](28, 56);

        bits1 = bits1["" + "concat" + ""](bits1);
        bits2 = bits2["" + "concat" + ""](bits2);

        for (i = 0; i < 16; i++) {
            var k = [0, 0, 0, 0, 0, 0, 0, 0];

            var s = KeySchedule["" + "keyShifts" + ""][i];
            for (var j = 0; j < 28; j++) {
                if (bits1[j + s]) {
                    k[KeySchedule["" + "PC2_offsets1" + ""][j]] += KeySchedule["" + "PC2_masks1" + ""][j];
                }
                if (bits2[j + s]) {
                    k[KeySchedule["" + "PC2_offsets2" + ""][j]] += KeySchedule["" + "PC2_masks2" + ""][j];
                }
            }

            k[0] = ((k[0] & 0x1f) << 27) + ((k[0] & 0x20) >> 5);
            for (var j = 1; j <= 6; j++) {
                k[j] = k[j] << (27 - 4 * j);
            }
            k[7] = ((k[7] & 0x3e) >> 1) + ((k[7] & 0x1) << 31);
            this["" + "keys" + ""][i] = k;
        }
    };

    /**
     * Retrieve the key for a specified round
     * 
     * @param i
     *            the round
     * @returns the key
     */
    KeySchedule["" + "prototype" + ""]["" + "getKey" + ""] = function (i) {
        return this["" + "keys" + ""][i];
    };

    /***************************************************************************
     * 
     * DES Engine State
     * 
     **************************************************************************/

    var State;

    /**
     * The algorithm's state. DES operates on two sets of 32-bits, with each
     * block of 32-bits treated as a single number.
     * 
     * @class
     */
    State = function () {
        /** The LHS of the Feistel scheme */
        this["" + "lhs" + ""] = 0;
        /** The RHS of the Feistel scheme */
        this["" + "rhs" + ""] = 0;
    };

    /**
     * The masks that select the SBOX input. Each SBOX accepts 6 bits from the
     * input.
     * 
     * @constant
     */
    State["" + "SBOX_MASK" + ""] = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];

    /**
     * The SBOXes. The 8 SBOXes each map 6 bit masked bit of the input to 4 bits
     * of output. These SBOXes include the post SBOX permutation and benefit
     * from JavaScript's sparse arrays to make specifying the input match
     * simple.
     * 
     * @constant
     */
    State["" + "SBOX" + ""] = new Array(8);

    var SBOX = State["" + "SBOX" + ""];

    SBOX[0] = new Array();
    SBOX[0][0] = 0x808200; // 0 (0, 0) = 14
    SBOX[0][268435456] = 0x8000; // 10000000 (0, 1) = 4
    SBOX[0][536870912] = 0x808002; // 20000000 (0, 2) = 13
    SBOX[0][805306368] = 0x2; // 30000000 (0, 3) = 1
    SBOX[0][1073741824] = 0x200; // 40000000 (0, 4) = 2
    SBOX[0][1342177280] = 0x808202; // 50000000 (0, 5) = 15
    SBOX[0][1610612736] = 0x800202; // 60000000 (0, 6) = 11
    SBOX[0][1879048192] = 0x800000; // 70000000 (0, 7) = 8
    SBOX[0][-2147483648] = 0x202; // 80000000 (0, 8) = 3
    SBOX[0][-1879048192] = 0x800200; // 90000000 (0, 9) = 10
    SBOX[0][-1610612736] = 0x8200; // a0000000 (0, 10) = 6
    SBOX[0][-1342177280] = 0x808000; // b0000000 (0, 11) = 12
    SBOX[0][-1073741824] = 0x8002; // c0000000 (0, 12) = 5
    SBOX[0][-805306368] = 0x800002; // d0000000 (0, 13) = 9
    SBOX[0][-536870912] = 0x0; // e0000000 (0, 14) = 0
    SBOX[0][-268435456] = 0x8202; // f0000000 (0, 15) = 7
    SBOX[0][134217728] = 0x0; // 8000000 (1, 0) = 0
    SBOX[0][402653184] = 0x808202; // 18000000 (1, 1) = 15
    SBOX[0][671088640] = 0x8202; // 28000000 (1, 2) = 7
    SBOX[0][939524096] = 0x8000; // 38000000 (1, 3) = 4
    SBOX[0][1207959552] = 0x808200; // 48000000 (1, 4) = 14
    SBOX[0][1476395008] = 0x200; // 58000000 (1, 5) = 2
    SBOX[0][1744830464] = 0x808002; // 68000000 (1, 6) = 13
    SBOX[0][2013265920] = 0x2; // 78000000 (1, 7) = 1
    SBOX[0][-2013265920] = 0x800200; // 88000000 (1, 8) = 10
    SBOX[0][-1744830464] = 0x8200; // 98000000 (1, 9) = 6
    SBOX[0][-1476395008] = 0x808000; // a8000000 (1, 10) = 12
    SBOX[0][-1207959552] = 0x800202; // b8000000 (1, 11) = 11
    SBOX[0][-939524096] = 0x800002; // c8000000 (1, 12) = 9
    SBOX[0][-671088640] = 0x8002; // d8000000 (1, 13) = 5
    SBOX[0][-402653184] = 0x202; // e8000000 (1, 14) = 3
    SBOX[0][-134217728] = 0x800000; // f8000000 (1, 15) = 8
    SBOX[0][1] = 0x8000; // 1 (2, 0) = 4
    SBOX[0][268435457] = 0x2; // 10000001 (2, 1) = 1
    SBOX[0][536870913] = 0x808200; // 20000001 (2, 2) = 14
    SBOX[0][805306369] = 0x800000; // 30000001 (2, 3) = 8
    SBOX[0][1073741825] = 0x808002; // 40000001 (2, 4) = 13
    SBOX[0][1342177281] = 0x8200; // 50000001 (2, 5) = 6
    SBOX[0][1610612737] = 0x200; // 60000001 (2, 6) = 2
    SBOX[0][1879048193] = 0x800202; // 70000001 (2, 7) = 11
    SBOX[0][-2147483647] = 0x808202; // 80000001 (2, 8) = 15
    SBOX[0][-1879048191] = 0x808000; // 90000001 (2, 9) = 12
    SBOX[0][-1610612735] = 0x800002; // a0000001 (2, 10) = 9
    SBOX[0][-1342177279] = 0x8202; // b0000001 (2, 11) = 7
    SBOX[0][-1073741823] = 0x202; // c0000001 (2, 12) = 3
    SBOX[0][-805306367] = 0x800200; // d0000001 (2, 13) = 10
    SBOX[0][-536870911] = 0x8002; // e0000001 (2, 14) = 5
    SBOX[0][-268435455] = 0x0; // f0000001 (2, 15) = 0
    SBOX[0][134217729] = 0x808202; // 8000001 (3, 0) = 15
    SBOX[0][402653185] = 0x808000; // 18000001 (3, 1) = 12
    SBOX[0][671088641] = 0x800000; // 28000001 (3, 2) = 8
    SBOX[0][939524097] = 0x200; // 38000001 (3, 3) = 2
    SBOX[0][1207959553] = 0x8000; // 48000001 (3, 4) = 4
    SBOX[0][1476395009] = 0x800002; // 58000001 (3, 5) = 9
    SBOX[0][1744830465] = 0x2; // 68000001 (3, 6) = 1
    SBOX[0][2013265921] = 0x8202; // 78000001 (3, 7) = 7
    SBOX[0][-2013265919] = 0x8002; // 88000001 (3, 8) = 5
    SBOX[0][-1744830463] = 0x800202; // 98000001 (3, 9) = 11
    SBOX[0][-1476395007] = 0x202; // a8000001 (3, 10) = 3
    SBOX[0][-1207959551] = 0x808200; // b8000001 (3, 11) = 14
    SBOX[0][-939524095] = 0x800200; // c8000001 (3, 12) = 10
    SBOX[0][-671088639] = 0x0; // d8000001 (3, 13) = 0
    SBOX[0][-402653183] = 0x8200; // e8000001 (3, 14) = 6
    SBOX[0][-134217727] = 0x808002; // f8000001 (3, 15) = 13

    SBOX[1] = new Array();
    SBOX[1][0] = 0x40084010; // 0 (0, 0) = 15
    SBOX[1][16777216] = 0x4000; // 1000000 (0, 1) = 1
    SBOX[1][33554432] = 0x80000; // 2000000 (0, 2) = 8
    SBOX[1][50331648] = 0x40080010; // 3000000 (0, 3) = 14
    SBOX[1][67108864] = 0x40000010; // 4000000 (0, 4) = 6
    SBOX[1][83886080] = 0x40084000; // 5000000 (0, 5) = 11
    SBOX[1][100663296] = 0x40004000; // 6000000 (0, 6) = 3
    SBOX[1][117440512] = 0x10; // 7000000 (0, 7) = 4
    SBOX[1][134217728] = 0x84000; // 8000000 (0, 8) = 9
    SBOX[1][150994944] = 0x40004010; // 9000000 (0, 9) = 7
    SBOX[1][167772160] = 0x40000000; // a000000 (0, 10) = 2
    SBOX[1][184549376] = 0x84010; // b000000 (0, 11) = 13
    SBOX[1][201326592] = 0x80010; // c000000 (0, 12) = 12
    SBOX[1][218103808] = 0x0; // d000000 (0, 13) = 0
    SBOX[1][234881024] = 0x4010; // e000000 (0, 14) = 5
    SBOX[1][251658240] = 0x40080000; // f000000 (0, 15) = 10
    SBOX[1][8388608] = 0x40004000; // 800000 (1, 0) = 3
    SBOX[1][25165824] = 0x84010; // 1800000 (1, 1) = 13
    SBOX[1][41943040] = 0x10; // 2800000 (1, 2) = 4
    SBOX[1][58720256] = 0x40004010; // 3800000 (1, 3) = 7
    SBOX[1][75497472] = 0x40084010; // 4800000 (1, 4) = 15
    SBOX[1][92274688] = 0x40000000; // 5800000 (1, 5) = 2
    SBOX[1][109051904] = 0x80000; // 6800000 (1, 6) = 8
    SBOX[1][125829120] = 0x40080010; // 7800000 (1, 7) = 14
    SBOX[1][142606336] = 0x80010; // 8800000 (1, 8) = 12
    SBOX[1][159383552] = 0x0; // 9800000 (1, 9) = 0
    SBOX[1][176160768] = 0x4000; // a800000 (1, 10) = 1
    SBOX[1][192937984] = 0x40080000; // b800000 (1, 11) = 10
    SBOX[1][209715200] = 0x40000010; // c800000 (1, 12) = 6
    SBOX[1][226492416] = 0x84000; // d800000 (1, 13) = 9
    SBOX[1][243269632] = 0x40084000; // e800000 (1, 14) = 11
    SBOX[1][260046848] = 0x4010; // f800000 (1, 15) = 5
    SBOX[1][268435456] = 0x0; // 10000000 (2, 0) = 0
    SBOX[1][285212672] = 0x40080010; // 11000000 (2, 1) = 14
    SBOX[1][301989888] = 0x40004010; // 12000000 (2, 2) = 7
    SBOX[1][318767104] = 0x40084000; // 13000000 (2, 3) = 11
    SBOX[1][335544320] = 0x40080000; // 14000000 (2, 4) = 10
    SBOX[1][352321536] = 0x10; // 15000000 (2, 5) = 4
    SBOX[1][369098752] = 0x84010; // 16000000 (2, 6) = 13
    SBOX[1][385875968] = 0x4000; // 17000000 (2, 7) = 1
    SBOX[1][402653184] = 0x4010; // 18000000 (2, 8) = 5
    SBOX[1][419430400] = 0x80000; // 19000000 (2, 9) = 8
    SBOX[1][436207616] = 0x80010; // 1a000000 (2, 10) = 12
    SBOX[1][452984832] = 0x40000010; // 1b000000 (2, 11) = 6
    SBOX[1][469762048] = 0x84000; // 1c000000 (2, 12) = 9
    SBOX[1][486539264] = 0x40004000; // 1d000000 (2, 13) = 3
    SBOX[1][503316480] = 0x40000000; // 1e000000 (2, 14) = 2
    SBOX[1][520093696] = 0x40084010; // 1f000000 (2, 15) = 15
    SBOX[1][276824064] = 0x84010; // 10800000 (3, 0) = 13
    SBOX[1][293601280] = 0x80000; // 11800000 (3, 1) = 8
    SBOX[1][310378496] = 0x40080000; // 12800000 (3, 2) = 10
    SBOX[1][327155712] = 0x4000; // 13800000 (3, 3) = 1
    SBOX[1][343932928] = 0x40004000; // 14800000 (3, 4) = 3
    SBOX[1][360710144] = 0x40084010; // 15800000 (3, 5) = 15
    SBOX[1][377487360] = 0x10; // 16800000 (3, 6) = 4
    SBOX[1][394264576] = 0x40000000; // 17800000 (3, 7) = 2
    SBOX[1][411041792] = 0x40084000; // 18800000 (3, 8) = 11
    SBOX[1][427819008] = 0x40000010; // 19800000 (3, 9) = 6
    SBOX[1][444596224] = 0x40004010; // 1a800000 (3, 10) = 7
    SBOX[1][461373440] = 0x80010; // 1b800000 (3, 11) = 12
    SBOX[1][478150656] = 0x0; // 1c800000 (3, 12) = 0
    SBOX[1][494927872] = 0x4010; // 1d800000 (3, 13) = 5
    SBOX[1][511705088] = 0x40080010; // 1e800000 (3, 14) = 14
    SBOX[1][528482304] = 0x84000; // 1f800000 (3, 15) = 9

    SBOX[2] = new Array();
    SBOX[2][0] = 0x104; // 0 (0, 0) = 10
    SBOX[2][1048576] = 0x0; // 100000 (0, 1) = 0
    SBOX[2][2097152] = 0x4000100; // 200000 (0, 2) = 9
    SBOX[2][3145728] = 0x10104; // 300000 (0, 3) = 14
    SBOX[2][4194304] = 0x10004; // 400000 (0, 4) = 6
    SBOX[2][5242880] = 0x4000004; // 500000 (0, 5) = 3
    SBOX[2][6291456] = 0x4010104; // 600000 (0, 6) = 15
    SBOX[2][7340032] = 0x4010000; // 700000 (0, 7) = 5
    SBOX[2][8388608] = 0x4000000; // 800000 (0, 8) = 1
    SBOX[2][9437184] = 0x4010100; // 900000 (0, 9) = 13
    SBOX[2][10485760] = 0x10100; // a00000 (0, 10) = 12
    SBOX[2][11534336] = 0x4010004; // b00000 (0, 11) = 7
    SBOX[2][12582912] = 0x4000104; // c00000 (0, 12) = 11
    SBOX[2][13631488] = 0x10000; // d00000 (0, 13) = 4
    SBOX[2][14680064] = 0x4; // e00000 (0, 14) = 2
    SBOX[2][15728640] = 0x100; // f00000 (0, 15) = 8
    SBOX[2][524288] = 0x4010100; // 80000 (1, 0) = 13
    SBOX[2][1572864] = 0x4010004; // 180000 (1, 1) = 7
    SBOX[2][2621440] = 0x0; // 280000 (1, 2) = 0
    SBOX[2][3670016] = 0x4000100; // 380000 (1, 3) = 9
    SBOX[2][4718592] = 0x4000004; // 480000 (1, 4) = 3
    SBOX[2][5767168] = 0x10000; // 580000 (1, 5) = 4
    SBOX[2][6815744] = 0x10004; // 680000 (1, 6) = 6
    SBOX[2][7864320] = 0x104; // 780000 (1, 7) = 10
    SBOX[2][8912896] = 0x4; // 880000 (1, 8) = 2
    SBOX[2][9961472] = 0x100; // 980000 (1, 9) = 8
    SBOX[2][11010048] = 0x4010000; // a80000 (1, 10) = 5
    SBOX[2][12058624] = 0x10104; // b80000 (1, 11) = 14
    SBOX[2][13107200] = 0x10100; // c80000 (1, 12) = 12
    SBOX[2][14155776] = 0x4000104; // d80000 (1, 13) = 11
    SBOX[2][15204352] = 0x4010104; // e80000 (1, 14) = 15
    SBOX[2][16252928] = 0x4000000; // f80000 (1, 15) = 1
    SBOX[2][16777216] = 0x4010100; // 1000000 (2, 0) = 13
    SBOX[2][17825792] = 0x10004; // 1100000 (2, 1) = 6
    SBOX[2][18874368] = 0x10000; // 1200000 (2, 2) = 4
    SBOX[2][19922944] = 0x4000100; // 1300000 (2, 3) = 9
    SBOX[2][20971520] = 0x100; // 1400000 (2, 4) = 8
    SBOX[2][22020096] = 0x4010104; // 1500000 (2, 5) = 15
    SBOX[2][23068672] = 0x4000004; // 1600000 (2, 6) = 3
    SBOX[2][24117248] = 0x0; // 1700000 (2, 7) = 0
    SBOX[2][25165824] = 0x4000104; // 1800000 (2, 8) = 11
    SBOX[2][26214400] = 0x4000000; // 1900000 (2, 9) = 1
    SBOX[2][27262976] = 0x4; // 1a00000 (2, 10) = 2
    SBOX[2][28311552] = 0x10100; // 1b00000 (2, 11) = 12
    SBOX[2][29360128] = 0x4010000; // 1c00000 (2, 12) = 5
    SBOX[2][30408704] = 0x104; // 1d00000 (2, 13) = 10
    SBOX[2][31457280] = 0x10104; // 1e00000 (2, 14) = 14
    SBOX[2][32505856] = 0x4010004; // 1f00000 (2, 15) = 7
    SBOX[2][17301504] = 0x4000000; // 1080000 (3, 0) = 1
    SBOX[2][18350080] = 0x104; // 1180000 (3, 1) = 10
    SBOX[2][19398656] = 0x4010100; // 1280000 (3, 2) = 13
    SBOX[2][20447232] = 0x0; // 1380000 (3, 3) = 0
    SBOX[2][21495808] = 0x10004; // 1480000 (3, 4) = 6
    SBOX[2][22544384] = 0x4000100; // 1580000 (3, 5) = 9
    SBOX[2][23592960] = 0x100; // 1680000 (3, 6) = 8
    SBOX[2][24641536] = 0x4010004; // 1780000 (3, 7) = 7
    SBOX[2][25690112] = 0x10000; // 1880000 (3, 8) = 4
    SBOX[2][26738688] = 0x4010104; // 1980000 (3, 9) = 15
    SBOX[2][27787264] = 0x10104; // 1a80000 (3, 10) = 14
    SBOX[2][28835840] = 0x4000004; // 1b80000 (3, 11) = 3
    SBOX[2][29884416] = 0x4000104; // 1c80000 (3, 12) = 11
    SBOX[2][30932992] = 0x4010000; // 1d80000 (3, 13) = 5
    SBOX[2][31981568] = 0x4; // 1e80000 (3, 14) = 2
    SBOX[2][33030144] = 0x10100; // 1f80000 (3, 15) = 12

    SBOX[3] = new Array();
    SBOX[3][0] = 0x80401000; // 0 (0, 0) = 7
    SBOX[3][65536] = 0x80001040; // 10000 (0, 1) = 13
    SBOX[3][131072] = 0x401040; // 20000 (0, 2) = 14
    SBOX[3][196608] = 0x80400000; // 30000 (0, 3) = 3
    SBOX[3][262144] = 0x0; // 40000 (0, 4) = 0
    SBOX[3][327680] = 0x401000; // 50000 (0, 5) = 6
    SBOX[3][393216] = 0x80000040; // 60000 (0, 6) = 9
    SBOX[3][458752] = 0x400040; // 70000 (0, 7) = 10
    SBOX[3][524288] = 0x80000000; // 80000 (0, 8) = 1
    SBOX[3][589824] = 0x400000; // 90000 (0, 9) = 2
    SBOX[3][655360] = 0x40; // a0000 (0, 10) = 8
    SBOX[3][720896] = 0x80001000; // b0000 (0, 11) = 5
    SBOX[3][786432] = 0x80400040; // c0000 (0, 12) = 11
    SBOX[3][851968] = 0x1040; // d0000 (0, 13) = 12
    SBOX[3][917504] = 0x1000; // e0000 (0, 14) = 4
    SBOX[3][983040] = 0x80401040; // f0000 (0, 15) = 15
    SBOX[3][32768] = 0x80001040; // 8000 (1, 0) = 13
    SBOX[3][98304] = 0x40; // 18000 (1, 1) = 8
    SBOX[3][163840] = 0x80400040; // 28000 (1, 2) = 11
    SBOX[3][229376] = 0x80001000; // 38000 (1, 3) = 5
    SBOX[3][294912] = 0x401000; // 48000 (1, 4) = 6
    SBOX[3][360448] = 0x80401040; // 58000 (1, 5) = 15
    SBOX[3][425984] = 0x0; // 68000 (1, 6) = 0
    SBOX[3][491520] = 0x80400000; // 78000 (1, 7) = 3
    SBOX[3][557056] = 0x1000; // 88000 (1, 8) = 4
    SBOX[3][622592] = 0x80401000; // 98000 (1, 9) = 7
    SBOX[3][688128] = 0x400000; // a8000 (1, 10) = 2
    SBOX[3][753664] = 0x1040; // b8000 (1, 11) = 12
    SBOX[3][819200] = 0x80000000; // c8000 (1, 12) = 1
    SBOX[3][884736] = 0x400040; // d8000 (1, 13) = 10
    SBOX[3][950272] = 0x401040; // e8000 (1, 14) = 14
    SBOX[3][1015808] = 0x80000040; // f8000 (1, 15) = 9
    SBOX[3][1048576] = 0x400040; // 100000 (2, 0) = 10
    SBOX[3][1114112] = 0x401000; // 110000 (2, 1) = 6
    SBOX[3][1179648] = 0x80000040; // 120000 (2, 2) = 9
    SBOX[3][1245184] = 0x0; // 130000 (2, 3) = 0
    SBOX[3][1310720] = 0x1040; // 140000 (2, 4) = 12
    SBOX[3][1376256] = 0x80400040; // 150000 (2, 5) = 11
    SBOX[3][1441792] = 0x80401000; // 160000 (2, 6) = 7
    SBOX[3][1507328] = 0x80001040; // 170000 (2, 7) = 13
    SBOX[3][1572864] = 0x80401040; // 180000 (2, 8) = 15
    SBOX[3][1638400] = 0x80000000; // 190000 (2, 9) = 1
    SBOX[3][1703936] = 0x80400000; // 1a0000 (2, 10) = 3
    SBOX[3][1769472] = 0x401040; // 1b0000 (2, 11) = 14
    SBOX[3][1835008] = 0x80001000; // 1c0000 (2, 12) = 5
    SBOX[3][1900544] = 0x400000; // 1d0000 (2, 13) = 2
    SBOX[3][1966080] = 0x40; // 1e0000 (2, 14) = 8
    SBOX[3][2031616] = 0x1000; // 1f0000 (2, 15) = 4
    SBOX[3][1081344] = 0x80400000; // 108000 (3, 0) = 3
    SBOX[3][1146880] = 0x80401040; // 118000 (3, 1) = 15
    SBOX[3][1212416] = 0x0; // 128000 (3, 2) = 0
    SBOX[3][1277952] = 0x401000; // 138000 (3, 3) = 6
    SBOX[3][1343488] = 0x400040; // 148000 (3, 4) = 10
    SBOX[3][1409024] = 0x80000000; // 158000 (3, 5) = 1
    SBOX[3][1474560] = 0x80001040; // 168000 (3, 6) = 13
    SBOX[3][1540096] = 0x40; // 178000 (3, 7) = 8
    SBOX[3][1605632] = 0x80000040; // 188000 (3, 8) = 9
    SBOX[3][1671168] = 0x1000; // 198000 (3, 9) = 4
    SBOX[3][1736704] = 0x80001000; // 1a8000 (3, 10) = 5
    SBOX[3][1802240] = 0x80400040; // 1b8000 (3, 11) = 11
    SBOX[3][1867776] = 0x1040; // 1c8000 (3, 12) = 12
    SBOX[3][1933312] = 0x80401000; // 1d8000 (3, 13) = 7
    SBOX[3][1998848] = 0x400000; // 1e8000 (3, 14) = 2
    SBOX[3][2064384] = 0x401040; // 1f8000 (3, 15) = 14

    SBOX[4] = new Array();
    SBOX[4][0] = 0x80; // 0 (0, 0) = 2
    SBOX[4][4096] = 0x1040000; // 1000 (0, 1) = 12
    SBOX[4][8192] = 0x40000; // 2000 (0, 2) = 4
    SBOX[4][12288] = 0x20000000; // 3000 (0, 3) = 1
    SBOX[4][16384] = 0x20040080; // 4000 (0, 4) = 7
    SBOX[4][20480] = 0x1000080; // 5000 (0, 5) = 10
    SBOX[4][24576] = 0x21000080; // 6000 (0, 6) = 11
    SBOX[4][28672] = 0x40080; // 7000 (0, 7) = 6
    SBOX[4][32768] = 0x1000000; // 8000 (0, 8) = 8
    SBOX[4][36864] = 0x20040000; // 9000 (0, 9) = 5
    SBOX[4][40960] = 0x20000080; // a000 (0, 10) = 3
    SBOX[4][45056] = 0x21040080; // b000 (0, 11) = 15
    SBOX[4][49152] = 0x21040000; // c000 (0, 12) = 13
    SBOX[4][53248] = 0x0; // d000 (0, 13) = 0
    SBOX[4][57344] = 0x1040080; // e000 (0, 14) = 14
    SBOX[4][61440] = 0x21000000; // f000 (0, 15) = 9
    SBOX[4][2048] = 0x1040080; // 800 (1, 0) = 14
    SBOX[4][6144] = 0x21000080; // 1800 (1, 1) = 11
    SBOX[4][10240] = 0x80; // 2800 (1, 2) = 2
    SBOX[4][14336] = 0x1040000; // 3800 (1, 3) = 12
    SBOX[4][18432] = 0x40000; // 4800 (1, 4) = 4
    SBOX[4][22528] = 0x20040080; // 5800 (1, 5) = 7
    SBOX[4][26624] = 0x21040000; // 6800 (1, 6) = 13
    SBOX[4][30720] = 0x20000000; // 7800 (1, 7) = 1
    SBOX[4][34816] = 0x20040000; // 8800 (1, 8) = 5
    SBOX[4][38912] = 0x0; // 9800 (1, 9) = 0
    SBOX[4][43008] = 0x21040080; // a800 (1, 10) = 15
    SBOX[4][47104] = 0x1000080; // b800 (1, 11) = 10
    SBOX[4][51200] = 0x20000080; // c800 (1, 12) = 3
    SBOX[4][55296] = 0x21000000; // d800 (1, 13) = 9
    SBOX[4][59392] = 0x1000000; // e800 (1, 14) = 8
    SBOX[4][63488] = 0x40080; // f800 (1, 15) = 6
    SBOX[4][65536] = 0x40000; // 10000 (2, 0) = 4
    SBOX[4][69632] = 0x80; // 11000 (2, 1) = 2
    SBOX[4][73728] = 0x20000000; // 12000 (2, 2) = 1
    SBOX[4][77824] = 0x21000080; // 13000 (2, 3) = 11
    SBOX[4][81920] = 0x1000080; // 14000 (2, 4) = 10
    SBOX[4][86016] = 0x21040000; // 15000 (2, 5) = 13
    SBOX[4][90112] = 0x20040080; // 16000 (2, 6) = 7
    SBOX[4][94208] = 0x1000000; // 17000 (2, 7) = 8
    SBOX[4][98304] = 0x21040080; // 18000 (2, 8) = 15
    SBOX[4][102400] = 0x21000000; // 19000 (2, 9) = 9
    SBOX[4][106496] = 0x1040000; // 1a000 (2, 10) = 12
    SBOX[4][110592] = 0x20040000; // 1b000 (2, 11) = 5
    SBOX[4][114688] = 0x40080; // 1c000 (2, 12) = 6
    SBOX[4][118784] = 0x20000080; // 1d000 (2, 13) = 3
    SBOX[4][122880] = 0x0; // 1e000 (2, 14) = 0
    SBOX[4][126976] = 0x1040080; // 1f000 (2, 15) = 14
    SBOX[4][67584] = 0x21000080; // 10800 (3, 0) = 11
    SBOX[4][71680] = 0x1000000; // 11800 (3, 1) = 8
    SBOX[4][75776] = 0x1040000; // 12800 (3, 2) = 12
    SBOX[4][79872] = 0x20040080; // 13800 (3, 3) = 7
    SBOX[4][83968] = 0x20000000; // 14800 (3, 4) = 1
    SBOX[4][88064] = 0x1040080; // 15800 (3, 5) = 14
    SBOX[4][92160] = 0x80; // 16800 (3, 6) = 2
    SBOX[4][96256] = 0x21040000; // 17800 (3, 7) = 13
    SBOX[4][100352] = 0x40080; // 18800 (3, 8) = 6
    SBOX[4][104448] = 0x21040080; // 19800 (3, 9) = 15
    SBOX[4][108544] = 0x0; // 1a800 (3, 10) = 0
    SBOX[4][112640] = 0x21000000; // 1b800 (3, 11) = 9
    SBOX[4][116736] = 0x1000080; // 1c800 (3, 12) = 10
    SBOX[4][120832] = 0x40000; // 1d800 (3, 13) = 4
    SBOX[4][124928] = 0x20040000; // 1e800 (3, 14) = 5
    SBOX[4][129024] = 0x20000080; // 1f800 (3, 15) = 3

    SBOX[5] = new Array();
    SBOX[5][0] = 0x10000008; // 0 (0, 0) = 12
    SBOX[5][256] = 0x2000; // 100 (0, 1) = 1
    SBOX[5][512] = 0x10200000; // 200 (0, 2) = 10
    SBOX[5][768] = 0x10202008; // 300 (0, 3) = 15
    SBOX[5][1024] = 0x10002000; // 400 (0, 4) = 9
    SBOX[5][1280] = 0x200000; // 500 (0, 5) = 2
    SBOX[5][1536] = 0x200008; // 600 (0, 6) = 6
    SBOX[5][1792] = 0x10000000; // 700 (0, 7) = 8
    SBOX[5][2048] = 0x0; // 800 (0, 8) = 0
    SBOX[5][2304] = 0x10002008; // 900 (0, 9) = 13
    SBOX[5][2560] = 0x202000; // a00 (0, 10) = 3
    SBOX[5][2816] = 0x8; // b00 (0, 11) = 4
    SBOX[5][3072] = 0x10200008; // c00 (0, 12) = 14
    SBOX[5][3328] = 0x202008; // d00 (0, 13) = 7
    SBOX[5][3584] = 0x2008; // e00 (0, 14) = 5
    SBOX[5][3840] = 0x10202000; // f00 (0, 15) = 11
    SBOX[5][128] = 0x10200000; // 80 (1, 0) = 10
    SBOX[5][384] = 0x10202008; // 180 (1, 1) = 15
    SBOX[5][640] = 0x8; // 280 (1, 2) = 4
    SBOX[5][896] = 0x200000; // 380 (1, 3) = 2
    SBOX[5][1152] = 0x202008; // 480 (1, 4) = 7
    SBOX[5][1408] = 0x10000008; // 580 (1, 5) = 12
    SBOX[5][1664] = 0x10002000; // 680 (1, 6) = 9
    SBOX[5][1920] = 0x2008; // 780 (1, 7) = 5
    SBOX[5][2176] = 0x200008; // 880 (1, 8) = 6
    SBOX[5][2432] = 0x2000; // 980 (1, 9) = 1
    SBOX[5][2688] = 0x10002008; // a80 (1, 10) = 13
    SBOX[5][2944] = 0x10200008; // b80 (1, 11) = 14
    SBOX[5][3200] = 0x0; // c80 (1, 12) = 0
    SBOX[5][3456] = 0x10202000; // d80 (1, 13) = 11
    SBOX[5][3712] = 0x202000; // e80 (1, 14) = 3
    SBOX[5][3968] = 0x10000000; // f80 (1, 15) = 8
    SBOX[5][4096] = 0x10002000; // 1000 (2, 0) = 9
    SBOX[5][4352] = 0x10200008; // 1100 (2, 1) = 14
    SBOX[5][4608] = 0x10202008; // 1200 (2, 2) = 15
    SBOX[5][4864] = 0x2008; // 1300 (2, 3) = 5
    SBOX[5][5120] = 0x200000; // 1400 (2, 4) = 2
    SBOX[5][5376] = 0x10000000; // 1500 (2, 5) = 8
    SBOX[5][5632] = 0x10000008; // 1600 (2, 6) = 12
    SBOX[5][5888] = 0x202000; // 1700 (2, 7) = 3
    SBOX[5][6144] = 0x202008; // 1800 (2, 8) = 7
    SBOX[5][6400] = 0x0; // 1900 (2, 9) = 0
    SBOX[5][6656] = 0x8; // 1a00 (2, 10) = 4
    SBOX[5][6912] = 0x10200000; // 1b00 (2, 11) = 10
    SBOX[5][7168] = 0x2000; // 1c00 (2, 12) = 1
    SBOX[5][7424] = 0x10002008; // 1d00 (2, 13) = 13
    SBOX[5][7680] = 0x10202000; // 1e00 (2, 14) = 11
    SBOX[5][7936] = 0x200008; // 1f00 (2, 15) = 6
    SBOX[5][4224] = 0x8; // 1080 (3, 0) = 4
    SBOX[5][4480] = 0x202000; // 1180 (3, 1) = 3
    SBOX[5][4736] = 0x200000; // 1280 (3, 2) = 2
    SBOX[5][4992] = 0x10000008; // 1380 (3, 3) = 12
    SBOX[5][5248] = 0x10002000; // 1480 (3, 4) = 9
    SBOX[5][5504] = 0x2008; // 1580 (3, 5) = 5
    SBOX[5][5760] = 0x10202008; // 1680 (3, 6) = 15
    SBOX[5][6016] = 0x10200000; // 1780 (3, 7) = 10
    SBOX[5][6272] = 0x10202000; // 1880 (3, 8) = 11
    SBOX[5][6528] = 0x10200008; // 1980 (3, 9) = 14
    SBOX[5][6784] = 0x2000; // 1a80 (3, 10) = 1
    SBOX[5][7040] = 0x202008; // 1b80 (3, 11) = 7
    SBOX[5][7296] = 0x200008; // 1c80 (3, 12) = 6
    SBOX[5][7552] = 0x0; // 1d80 (3, 13) = 0
    SBOX[5][7808] = 0x10000000; // 1e80 (3, 14) = 8
    SBOX[5][8064] = 0x10002008; // 1f80 (3, 15) = 13

    SBOX[6] = new Array();
    SBOX[6][0] = 0x100000; // 0 (0, 0) = 4
    SBOX[6][16] = 0x2000401; // 10 (0, 1) = 11
    SBOX[6][32] = 0x400; // 20 (0, 2) = 2
    SBOX[6][48] = 0x100401; // 30 (0, 3) = 14
    SBOX[6][64] = 0x2100401; // 40 (0, 4) = 15
    SBOX[6][80] = 0x0; // 50 (0, 5) = 0
    SBOX[6][96] = 0x1; // 60 (0, 6) = 8
    SBOX[6][112] = 0x2100001; // 70 (0, 7) = 13
    SBOX[6][128] = 0x2000400; // 80 (0, 8) = 3
    SBOX[6][144] = 0x100001; // 90 (0, 9) = 12
    SBOX[6][160] = 0x2000001; // a0 (0, 10) = 9
    SBOX[6][176] = 0x2100400; // b0 (0, 11) = 7
    SBOX[6][192] = 0x2100000; // c0 (0, 12) = 5
    SBOX[6][208] = 0x401; // d0 (0, 13) = 10
    SBOX[6][224] = 0x100400; // e0 (0, 14) = 6
    SBOX[6][240] = 0x2000000; // f0 (0, 15) = 1
    SBOX[6][8] = 0x2100001; // 8 (1, 0) = 13
    SBOX[6][24] = 0x0; // 18 (1, 1) = 0
    SBOX[6][40] = 0x2000401; // 28 (1, 2) = 11
    SBOX[6][56] = 0x2100400; // 38 (1, 3) = 7
    SBOX[6][72] = 0x100000; // 48 (1, 4) = 4
    SBOX[6][88] = 0x2000001; // 58 (1, 5) = 9
    SBOX[6][104] = 0x2000000; // 68 (1, 6) = 1
    SBOX[6][120] = 0x401; // 78 (1, 7) = 10
    SBOX[6][136] = 0x100401; // 88 (1, 8) = 14
    SBOX[6][152] = 0x2000400; // 98 (1, 9) = 3
    SBOX[6][168] = 0x2100000; // a8 (1, 10) = 5
    SBOX[6][184] = 0x100001; // b8 (1, 11) = 12
    SBOX[6][200] = 0x400; // c8 (1, 12) = 2
    SBOX[6][216] = 0x2100401; // d8 (1, 13) = 15
    SBOX[6][232] = 0x1; // e8 (1, 14) = 8
    SBOX[6][248] = 0x100400; // f8 (1, 15) = 6
    SBOX[6][256] = 0x2000000; // 100 (2, 0) = 1
    SBOX[6][272] = 0x100000; // 110 (2, 1) = 4
    SBOX[6][288] = 0x2000401; // 120 (2, 2) = 11
    SBOX[6][304] = 0x2100001; // 130 (2, 3) = 13
    SBOX[6][320] = 0x100001; // 140 (2, 4) = 12
    SBOX[6][336] = 0x2000400; // 150 (2, 5) = 3
    SBOX[6][352] = 0x2100400; // 160 (2, 6) = 7
    SBOX[6][368] = 0x100401; // 170 (2, 7) = 14
    SBOX[6][384] = 0x401; // 180 (2, 8) = 10
    SBOX[6][400] = 0x2100401; // 190 (2, 9) = 15
    SBOX[6][416] = 0x100400; // 1a0 (2, 10) = 6
    SBOX[6][432] = 0x1; // 1b0 (2, 11) = 8
    SBOX[6][448] = 0x0; // 1c0 (2, 12) = 0
    SBOX[6][464] = 0x2100000; // 1d0 (2, 13) = 5
    SBOX[6][480] = 0x2000001; // 1e0 (2, 14) = 9
    SBOX[6][496] = 0x400; // 1f0 (2, 15) = 2
    SBOX[6][264] = 0x100400; // 108 (3, 0) = 6
    SBOX[6][280] = 0x2000401; // 118 (3, 1) = 11
    SBOX[6][296] = 0x2100001; // 128 (3, 2) = 13
    SBOX[6][312] = 0x1; // 138 (3, 3) = 8
    SBOX[6][328] = 0x2000000; // 148 (3, 4) = 1
    SBOX[6][344] = 0x100000; // 158 (3, 5) = 4
    SBOX[6][360] = 0x401; // 168 (3, 6) = 10
    SBOX[6][376] = 0x2100400; // 178 (3, 7) = 7
    SBOX[6][392] = 0x2000001; // 188 (3, 8) = 9
    SBOX[6][408] = 0x2100000; // 198 (3, 9) = 5
    SBOX[6][424] = 0x0; // 1a8 (3, 10) = 0
    SBOX[6][440] = 0x2100401; // 1b8 (3, 11) = 15
    SBOX[6][456] = 0x100401; // 1c8 (3, 12) = 14
    SBOX[6][472] = 0x400; // 1d8 (3, 13) = 2
    SBOX[6][488] = 0x2000400; // 1e8 (3, 14) = 3
    SBOX[6][504] = 0x100001; // 1f8 (3, 15) = 12

    SBOX[7] = new Array();
    SBOX[7][0] = 0x8000820; // 0 (0, 0) = 13
    SBOX[7][1] = 0x20000; // 1 (0, 1) = 2
    SBOX[7][2] = 0x8000000; // 2 (0, 2) = 8
    SBOX[7][3] = 0x20; // 3 (0, 3) = 4
    SBOX[7][4] = 0x20020; // 4 (0, 4) = 6
    SBOX[7][5] = 0x8020820; // 5 (0, 5) = 15
    SBOX[7][6] = 0x8020800; // 6 (0, 6) = 11
    SBOX[7][7] = 0x800; // 7 (0, 7) = 1
    SBOX[7][8] = 0x8020000; // 8 (0, 8) = 10
    SBOX[7][9] = 0x8000800; // 9 (0, 9) = 9
    SBOX[7][10] = 0x20800; // a (0, 10) = 3
    SBOX[7][11] = 0x8020020; // b (0, 11) = 14
    SBOX[7][12] = 0x820; // c (0, 12) = 5
    SBOX[7][13] = 0x0; // d (0, 13) = 0
    SBOX[7][14] = 0x8000020; // e (0, 14) = 12
    SBOX[7][15] = 0x20820; // f (0, 15) = 7
    SBOX[7][-2147483648] = 0x800; // 80000000 (1, 0) = 1
    SBOX[7][-2147483647] = 0x8020820; // 80000001 (1, 1) = 15
    SBOX[7][-2147483646] = 0x8000820; // 80000002 (1, 2) = 13
    SBOX[7][-2147483645] = 0x8000000; // 80000003 (1, 3) = 8
    SBOX[7][-2147483644] = 0x8020000; // 80000004 (1, 4) = 10
    SBOX[7][-2147483643] = 0x20800; // 80000005 (1, 5) = 3
    SBOX[7][-2147483642] = 0x20820; // 80000006 (1, 6) = 7
    SBOX[7][-2147483641] = 0x20; // 80000007 (1, 7) = 4
    SBOX[7][-2147483640] = 0x8000020; // 80000008 (1, 8) = 12
    SBOX[7][-2147483639] = 0x820; // 80000009 (1, 9) = 5
    SBOX[7][-2147483638] = 0x20020; // 8000000a (1, 10) = 6
    SBOX[7][-2147483637] = 0x8020800; // 8000000b (1, 11) = 11
    SBOX[7][-2147483636] = 0x0; // 8000000c (1, 12) = 0
    SBOX[7][-2147483635] = 0x8020020; // 8000000d (1, 13) = 14
    SBOX[7][-2147483634] = 0x8000800; // 8000000e (1, 14) = 9
    SBOX[7][-2147483633] = 0x20000; // 8000000f (1, 15) = 2
    SBOX[7][16] = 0x20820; // 10 (2, 0) = 7
    SBOX[7][17] = 0x8020800; // 11 (2, 1) = 11
    SBOX[7][18] = 0x20; // 12 (2, 2) = 4
    SBOX[7][19] = 0x800; // 13 (2, 3) = 1
    SBOX[7][20] = 0x8000800; // 14 (2, 4) = 9
    SBOX[7][21] = 0x8000020; // 15 (2, 5) = 12
    SBOX[7][22] = 0x8020020; // 16 (2, 6) = 14
    SBOX[7][23] = 0x20000; // 17 (2, 7) = 2
    SBOX[7][24] = 0x0; // 18 (2, 8) = 0
    SBOX[7][25] = 0x20020; // 19 (2, 9) = 6
    SBOX[7][26] = 0x8020000; // 1a (2, 10) = 10
    SBOX[7][27] = 0x8000820; // 1b (2, 11) = 13
    SBOX[7][28] = 0x8020820; // 1c (2, 12) = 15
    SBOX[7][29] = 0x20800; // 1d (2, 13) = 3
    SBOX[7][30] = 0x820; // 1e (2, 14) = 5
    SBOX[7][31] = 0x8000000; // 1f (2, 15) = 8
    SBOX[7][-2147483632] = 0x20000; // 80000010 (3, 0) = 2
    SBOX[7][-2147483631] = 0x800; // 80000011 (3, 1) = 1
    SBOX[7][-2147483630] = 0x8020020; // 80000012 (3, 2) = 14
    SBOX[7][-2147483629] = 0x20820; // 80000013 (3, 3) = 7
    SBOX[7][-2147483628] = 0x20; // 80000014 (3, 4) = 4
    SBOX[7][-2147483627] = 0x8020000; // 80000015 (3, 5) = 10
    SBOX[7][-2147483626] = 0x8000000; // 80000016 (3, 6) = 8
    SBOX[7][-2147483625] = 0x8000820; // 80000017 (3, 7) = 13
    SBOX[7][-2147483624] = 0x8020820; // 80000018 (3, 8) = 15
    SBOX[7][-2147483623] = 0x8000020; // 80000019 (3, 9) = 12
    SBOX[7][-2147483622] = 0x8000800; // 8000001a (3, 10) = 9
    SBOX[7][-2147483621] = 0x0; // 8000001b (3, 11) = 0
    SBOX[7][-2147483620] = 0x20800; // 8000001c (3, 12) = 3
    SBOX[7][-2147483619] = 0x820; // 8000001d (3, 13) = 5
    SBOX[7][-2147483618] = 0x20020; // 8000001e (3, 14) = 6
    SBOX[7][-2147483617] = 0x8020800; // 8000001f (3, 15) = 11

    State["" + "prototype" + ""]["" + "_exchangeLR" + ""] = function (v, m) {
        var t = ((this["" + "lhs" + ""] >> v) ^ this["" + "rhs" + ""]) & m;
        this["" + "rhs" + ""] ^= t;
        this["" + "lhs" + ""] ^= (t << v);
    };

    State["" + "prototype" + ""]["" + "_exchangeRL" + ""] = function (v, m) {
        var t = ((this["" + "rhs" + ""] >> v) ^ this["" + "lhs" + ""]) & m;
        this["" + "lhs" + ""] ^= t;
        this["" + "rhs" + ""] ^= (t << v);
    };

    /**
     * Perform the initial permutation of the input to create the starting state
     * of the algorithm. The initial permutation maps each consecutive bit of
     * the input into a different byte of the state.
     * 
     * <pre>
     * The initial permutation is defined to be:
     * 
     *      58    50   42    34    26   18    10    2  
     *      60    52   44    36    28   20    12    4
     *      62    54   46    38    30   22    14    6
     *      64    56   48    40    32   24    16    8
     *      57    49   41    33    25   17     9    1
     *      59    51   43    35    27   19    11    3
     *      61    53   45    37    29   21    13    5
     *      63    55   47    39    31   23    15    7
     * </pre>
     * 
     * 
     * @param message
     *            The message as an array of unsigned bytes.
     * @param offset
     *            The offset into the message that the current 64-bit block
     *            begins.
     * @returns the initial engine state
     */
    State["" + "prototype" + ""]["" + "initialPerm" + ""] = function (message, offset) {
        var input = message["" + "slice" + ""](offset, offset + 8);

        this["" + "lhs" + ""] = (input[0] << 24) + (input[1] << 16) + (input[2] << 8)
            + input[3];
        this["" + "rhs" + ""] = (input[4] << 24) + (input[5] << 16) + (input[6] << 8)
            + input[7];

        this["" + "_exchangeLR" + ""](4, 0x0f0f0f0f);
        this["" + "_exchangeLR" + ""](16, 0x0000ffff);
        this["" + "_exchangeRL" + ""](2, 0x33333333);
        this["" + "_exchangeRL" + ""](8, 0x00ff00ff);
        this["" + "_exchangeLR" + ""](1, 0x55555555);
    };

    /**
     * Perform one round of the DES algorithm using the given key. A round is
     * defined as:
     * 
     * <pre>
     * L&amp;rsquo = R
     * R&amp;rsquo = L &circ; f(R, k)
     * </pre>
     * 
     * where f consists of expanding, XORing with the key and contracting back
     * with the SBOXes.
     * 
     * Note that the final round is defined slightly differently as:
     * 
     * <pre>
     * L&amp;rsquo = L &circ; f(R, k)
     * R&amp;rsquo = R
     * </pre>
     * 
     * Therefore in the final round this function produces LHS and RHS the wrong
     * way around.
     * 
     * @param k
     *            the key
     */
    State["" + "prototype" + ""]["" + "round" + ""] = function (k) {
        var r = this["" + "rhs" + ""], l = this["" + "lhs" + ""];
        var f = 0;
        for (var i = 0; i < 8; i++) {
            var v = (r ^ k[i]) & State["" + "SBOX_MASK" + ""][i];
            f += State["" + "SBOX" + ""][i][v];
        }

        this["" + "lhs" + ""] = r;
        this["" + "rhs" + ""] = l ^ f;
    };

    /**
     * Apply the inverse of the initial permutation.
     * 
     * <pre>
     * The inverse is defined to be:
     * 
     *      40     8   48    16    56   24    64   32
     *      39     7   47    15    55   23    63   31
     *      38     6   46    14    54   22    62   30
     *      37     5   45    13    53   21    61   29
     *      36     4   44    12    52   20    60   28
     *      35     3   43    11    51   19    59   27
     *      34     2   42    10    50   18    58   26
     *      33     1   41     9    49   17    57   25
     * </pre>
     * 
     * @param cipherText
     * @param offset
     */
    State["" + "prototype" + ""]["" + "finalPerm" + ""] = function (cipherText, offset) {
        var t = this["" + "lhs" + ""];
        this["" + "lhs" + ""] = this["" + "rhs" + ""];
        this["" + "rhs" + ""] = t;

        this["" + "_exchangeLR" + ""](1, 0x55555555);
        this["" + "_exchangeRL" + ""](8, 0x00ff00ff);
        this["" + "_exchangeRL" + ""](2, 0x33333333);
        this["" + "_exchangeLR" + ""](16, 0x0000ffff);
        this["" + "_exchangeLR" + ""](4, 0x0f0f0f0f);

        cipherText[offset] = (this["" + "lhs" + ""] >> 24) & 0xff;
        cipherText[offset + 1] = (this["" + "lhs" + ""] >> 16) & 0xff;
        cipherText[offset + 2] = (this["" + "lhs" + ""] >> 8) & 0xff;
        cipherText[offset + 3] = (this["" + "lhs" + ""]) & 0xff;
        cipherText[offset + 4] = (this["" + "rhs" + ""] >> 24) & 0xff;
        cipherText[offset + 5] = (this["" + "rhs" + ""] >> 16) & 0xff;
        cipherText[offset + 6] = (this["" + "rhs" + ""] >> 8) & 0xff;
        cipherText[offset + 7] = (this["" + "rhs" + ""]) & 0xff;
    };

    /**
     * DES cipher
     */
    var DES = C["" + "DES" + ""] = {
        _blocksize: 2,

        _keyschedule: null,

        _state: new State(),

        _init: function (k) {
            this["" + "_keyschedule" + ""] = new KeySchedule(k);
        },

        encrypt: function (message, password, options) {

            options = options || {};

            var mode = options["" + "mode" + ""] || new C["" + "mode" + ""]["" + "OFB" + ""];

            if (mode["" + "fixOptions" + ""])
                mode["" + "fixOptions" + ""](options);

            var
                m = (message["" + "constructor" + ""] == String ? UTF8["" + "stringToBytes" + ""](message)
                    : message),

                iv = options["" + "iv" + ""] || util["" + "randomBytes" + ""](8),

                k = (password["" + "constructor" + ""] == String ?
                    C["" + "PBKDF2" + ""](password, iv, 8, {
                        asBytes: true
                    }) :
                    password);

            this["" + "_keyschedule" + ""] = new KeySchedule(k);

            mode["" + "encrypt" + ""](DES, m, iv);

            m = options["" + "iv" + ""] ? m : iv["" + "concat" + ""](m);
            return (options && options["" + "asBytes" + ""]) ? m : util["" + "bytesToBase64" + ""](m);
        },

        _encryptblock: function (message, offset) {
            this["" + "_state" + ""]["" + "initialPerm" + ""](message, offset);
            for (var i = 0; i <= 15; i++) {
                this["" + "_state" + ""]["" + "round" + ""](this["" + "_keyschedule" + ""]["" + "getKey" + ""](i));
            }
            this["" + "_state" + ""]["" + "finalPerm" + ""](message, offset);
        },

        decrypt: function (ciphertext, password, options) {
            options = options || {};

            var mode = options["" + "mode" + ""] || new C["" + "mode" + ""]["" + "OFB" + ""];

            if (mode["" + "fixOptions" + ""])
                mode["" + "fixOptions" + ""](options);

            var

                c = (ciphertext["" + "constructor" + ""] == String ? util
                ["" + "base64ToBytes" + ""](ciphertext) : ciphertext),

                iv = options["" + "iv" + ""] || c["" + "splice" + ""](0, 8),

                k = (password["" + "constructor" + ""] == String ?
                    C["" + "PBKDF2" + ""](password, iv, 32, {
                        asBytes: true
                    }) :
                    password);

            this["" + "_keyschedule" + ""] = new KeySchedule(k);

            mode["" + "decrypt" + ""](DES, c, iv);

            return (options && options["" + "asBytes" + ""]) ? c : UTF8["" + "bytesToString" + ""](c);
        },

        _decryptblock: function (message, offset) {
            this["" + "_state" + ""]["" + "initialPerm" + ""](message, offset);
            for (var i = 15; i >= 0; i--) {
                this["" + "_state" + ""]["" + "round" + ""](this["" + "_keyschedule" + ""]["" + "getKey" + ""](i));
            }
            this["" + "_state" + ""]["" + "finalPerm" + ""](message, offset);
        }

    };
})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""],
        Binary = charenc["" + "Binary" + ""];

    var MD5 = C["" + "MD5" + ""] = function (message, options) {
        var digestbytes = util["" + "wordsToBytes" + ""](MD5["" + "_md5" + ""](message));
        return options && options["" + "asBytes" + ""] ? digestbytes :
            options && options["" + "asString" + ""] ? Binary["" + "bytesToString" + ""](digestbytes) :
                util["" + "bytesToHex" + ""](digestbytes);
    };

    MD5["" + "_md5" + ""] = function (message) {

        if (message["" + "constructor" + ""] == String) message = UTF8["" + "stringToBytes" + ""](message);
        /* else, assume byte array already */

        var m = util["" + "bytesToWords" + ""](message),
            l = message["" + "length" + ""] * 8,
            a = 1732584193,
            b = -271733879,
            c = -1732584194,
            d = 271733878;

        for (var i = 0; i < m["" + "length" + ""]; i++) {
            m[i] = ((m[i] << 8) | (m[i] >>> 24)) & 0x00FF00FF |
                ((m[i] << 24) | (m[i] >>> 8)) & 0xFF00FF00;
        }

        m[l >>> 5] |= 0x80 << (l % 32);
        m[(((l + 64) >>> 9) << 4) + 14] = l;

        var FF = MD5["" + "_ff" + ""],
            GG = MD5["" + "_gg" + ""],
            HH = MD5["" + "_hh" + ""],
            II = MD5["" + "_ii" + ""];

        for (var i = 0; i < m["" + "length" + ""]; i += 16) {

            var aa = a,
                bb = b,
                cc = c,
                dd = d;

            a = FF(a, b, c, d, m[i + 0], 7, -680876936);
            d = FF(d, a, b, c, m[i + 1], 12, -389564586);
            c = FF(c, d, a, b, m[i + 2], 17, 606105819);
            b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
            a = FF(a, b, c, d, m[i + 4], 7, -176418897);
            d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
            c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
            b = FF(b, c, d, a, m[i + 7], 22, -45705983);
            a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
            d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
            c = FF(c, d, a, b, m[i + 10], 17, -42063);
            b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
            a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
            d = FF(d, a, b, c, m[i + 13], 12, -40341101);
            c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
            b = FF(b, c, d, a, m[i + 15], 22, 1236535329);

            a = GG(a, b, c, d, m[i + 1], 5, -165796510);
            d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
            c = GG(c, d, a, b, m[i + 11], 14, 643717713);
            b = GG(b, c, d, a, m[i + 0], 20, -373897302);
            a = GG(a, b, c, d, m[i + 5], 5, -701558691);
            d = GG(d, a, b, c, m[i + 10], 9, 38016083);
            c = GG(c, d, a, b, m[i + 15], 14, -660478335);
            b = GG(b, c, d, a, m[i + 4], 20, -405537848);
            a = GG(a, b, c, d, m[i + 9], 5, 568446438);
            d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
            c = GG(c, d, a, b, m[i + 3], 14, -187363961);
            b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
            a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
            d = GG(d, a, b, c, m[i + 2], 9, -51403784);
            c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
            b = GG(b, c, d, a, m[i + 12], 20, -1926607734);

            a = HH(a, b, c, d, m[i + 5], 4, -378558);
            d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
            c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
            b = HH(b, c, d, a, m[i + 14], 23, -35309556);
            a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
            d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
            c = HH(c, d, a, b, m[i + 7], 16, -155497632);
            b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
            a = HH(a, b, c, d, m[i + 13], 4, 681279174);
            d = HH(d, a, b, c, m[i + 0], 11, -358537222);
            c = HH(c, d, a, b, m[i + 3], 16, -722521979);
            b = HH(b, c, d, a, m[i + 6], 23, 76029189);
            a = HH(a, b, c, d, m[i + 9], 4, -640364487);
            d = HH(d, a, b, c, m[i + 12], 11, -421815835);
            c = HH(c, d, a, b, m[i + 15], 16, 530742520);
            b = HH(b, c, d, a, m[i + 2], 23, -995338651);

            a = II(a, b, c, d, m[i + 0], 6, -198630844);
            d = II(d, a, b, c, m[i + 7], 10, 1126891415);
            c = II(c, d, a, b, m[i + 14], 15, -1416354905);
            b = II(b, c, d, a, m[i + 5], 21, -57434055);
            a = II(a, b, c, d, m[i + 12], 6, 1700485571);
            d = II(d, a, b, c, m[i + 3], 10, -1894986606);
            c = II(c, d, a, b, m[i + 10], 15, -1051523);
            b = II(b, c, d, a, m[i + 1], 21, -2054922799);
            a = II(a, b, c, d, m[i + 8], 6, 1873313359);
            d = II(d, a, b, c, m[i + 15], 10, -30611744);
            c = II(c, d, a, b, m[i + 6], 15, -1560198380);
            b = II(b, c, d, a, m[i + 13], 21, 1309151649);
            a = II(a, b, c, d, m[i + 4], 6, -145523070);
            d = II(d, a, b, c, m[i + 11], 10, -1120210379);
            c = II(c, d, a, b, m[i + 2], 15, 718787259);
            b = II(b, c, d, a, m[i + 9], 21, -343485551);

            a = (a + aa) >>> 0;
            b = (b + bb) >>> 0;
            c = (c + cc) >>> 0;
            d = (d + dd) >>> 0;

        }

        return util["" + "endian" + ""]([a, b, c, d]);

    };

    MD5["" + "_ff" + ""] = function (a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    };
    MD5["" + "_gg" + ""] = function (a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    };
    MD5["" + "_hh" + ""] = function (a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    };
    MD5["" + "_ii" + ""] = function (a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    };

    MD5["" + "_blocksize" + ""] = 16;

    MD5["" + "_digestsize" + ""] = 16;

})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""],
        Binary = charenc["" + "Binary" + ""];

    C["" + "PBKDF2" + ""] = function (password, salt, keylen, options) {

        if (password["" + "constructor" + ""] == String) password = UTF8["" + "stringToBytes" + ""](password);
        if (salt["" + "constructor" + ""] == String) salt = UTF8["" + "stringToBytes" + ""](salt);
        /* else, assume byte arrays already */

        var hasher = options && options["" + "hasher" + ""] || C["" + "SHA1" + ""],
            iterations = options && options["" + "iterations" + ""] || 1;

        function PRF(password, salt) {
            return C["" + "HMAC" + ""](hasher, salt, password, { asBytes: true });
        }

        var derivedKeyBytes = [],
            blockindex = 1;
        while (derivedKeyBytes["" + "length" + ""] < keylen) {
            var block = PRF(password, salt["" + "concat" + ""](util["" + "wordsToBytes" + ""]([blockindex])));
            for (var u = block, i = 1; i < iterations; i++) {
                u = PRF(password, u);
                for (var j = 0; j < block["" + "length" + ""]; j++) block[j] ^= u[j];
            }
            derivedKeyBytes = derivedKeyBytes["" + "concat" + ""](block);
            blockindex++;
        }

        derivedKeyBytes["" + "length" + ""] = keylen;

        return options && options["" + "asBytes" + ""] ? derivedKeyBytes :
            options && options["" + "asString" + ""] ? Binary["" + "bytesToString" + ""](derivedKeyBytes) :
                util["" + "bytesToHex" + ""](derivedKeyBytes);

    };

})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""],
        Binary = charenc["" + "Binary" + ""];

    if (!C["" + "nextTick" + ""]) {
        if (typeof process != 'undefined' && typeof process["" + "nextTick" + ""] !== 'undefined') {
            C["" + "nextTick" + ""] = process["" + "nextTick" + ""];
        } else if (typeof setTimeout !== 'undefined') {
            C["" + "nextTick" + ""] = function (callback) {
                setTimeout(callback, 0);
            };
        }
    }

    C["" + "PBKDF2Async" + ""] = function (password, salt, keylen, callback, options) {

        if (password["" + "constructor" + ""] == String) password = UTF8["" + "stringToBytes" + ""](password);
        if (salt["" + "constructor" + ""] == String) salt = UTF8["" + "stringToBytes" + ""](salt);
        /* else, assume byte arrays already */

        var hasher = options && options["" + "hasher" + ""] || C["" + "SHA1" + ""],
            iterations = options && options["" + "iterations" + ""] || 1;

        var progressChangeHandler = options && options["" + "onProgressChange" + ""];
        var totalIterations = Math["" + "ceil" + ""](keylen / hasher["" + "_digestsize" + ""]) * iterations;
        function fireProgressChange(currentIteration) {
            if (progressChangeHandler) {
                var iterationsSoFar = derivedKeyBytes["" + "length" + ""] / hasher["" + "_digestsize" + ""] * iterations + currentIteration;
                setTimeout(function () {
                    progressChangeHandler(Math["" + "round" + ""](iterationsSoFar / totalIterations * 100));
                }, 0);
            }
        }

        function PRF(password, salt) {
            return C["" + "HMAC" + ""](hasher, salt, password, { asBytes: true });
        }

        var nextTick = C["" + "nextTick" + ""];

        var derivedKeyBytes = [],
            blockindex = 1;

        var outer, inner;
        nextTick(outer = function () {
            if (derivedKeyBytes["" + "length" + ""] < keylen) {
                var block = PRF(password, salt["" + "concat" + ""](util["" + "wordsToBytes" + ""]([blockindex])));
                fireProgressChange(1);

                var u = block, i = 1;
                nextTick(inner = function () {
                    if (i < iterations) {
                        u = PRF(password, u);
                        for (var j = 0; j < block["" + "length" + ""]; j++) block[j] ^= u[j];
                        i++;
                        fireProgressChange(i);

                        nextTick(inner);
                    } else {
                        derivedKeyBytes = derivedKeyBytes["" + "concat" + ""](block);
                        blockindex++;
                        nextTick(outer);
                    }
                });
            } else {
                derivedKeyBytes["" + "length" + ""] = keylen;
                callback(
                    options && options["" + "asBytes" + ""] ? derivedKeyBytes :
                        options && options["" + "asString" + ""] ? Binary["" + "bytesToString" + ""](derivedKeyBytes) :
                            util["" + "bytesToHex" + ""](derivedKeyBytes));
            }
        });
    };

})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""],
        Binary = charenc["" + "Binary" + ""];

    var x = [],
        c = [],
        b;

    var Rabbit = C["" + "Rabbit" + ""] = {

        /**
         * Public API
         */

        encrypt: function (message, password) {

            var

                m = UTF8["" + "stringToBytes" + ""](message),

                iv = util["" + "randomBytes" + ""](8),

                k = password["" + "constructor" + ""] == String ?
                    C["" + "PBKDF2" + ""](password, iv, 32, { asBytes: true }) :
                    password;

            Rabbit["" + "_rabbit" + ""](m, k, util["" + "bytesToWords" + ""](iv));

            return util["" + "bytesToBase64" + ""](iv["" + "concat" + ""](m));

        },

        decrypt: function (ciphertext, password) {

            var

                c = util["" + "base64ToBytes" + ""](ciphertext),

                iv = c["" + "splice" + ""](0, 8),

                k = password["" + "constructor" + ""] == String ?
                    C["" + "PBKDF2" + ""](password, iv, 32, { asBytes: true }) :
                    password;

            Rabbit["" + "_rabbit" + ""](c, k, util["" + "bytesToWords" + ""](iv));

            return UTF8["" + "bytesToString" + ""](c);

        },


        /**
         * Internal methods
         */

        _rabbit: function (m, k, iv) {

            Rabbit["" + "_keysetup" + ""](k);
            if (iv) Rabbit["" + "_ivsetup" + ""](iv);

            for (var s = [], i = 0; i < m["" + "length" + ""]; i++) {

                if (i % 16 == 0) {

                    Rabbit["" + "_nextstate" + ""]();

                    s[0] = x[0] ^ (x[5] >>> 16) ^ (x[3] << 16);
                    s[1] = x[2] ^ (x[7] >>> 16) ^ (x[5] << 16);
                    s[2] = x[4] ^ (x[1] >>> 16) ^ (x[7] << 16);
                    s[3] = x[6] ^ (x[3] >>> 16) ^ (x[1] << 16);

                    for (var j = 0; j < 4; j++) {
                        s[j] = ((s[j] << 8) | (s[j] >>> 24)) & 0x00FF00FF |
                            ((s[j] << 24) | (s[j] >>> 8)) & 0xFF00FF00;
                    }

                    for (var b = 120; b >= 0; b -= 8)
                        s[b / 8] = (s[b >>> 5] >>> (24 - b % 32)) & 0xFF;

                }

                m[i] ^= s[i % 16];

            }

        },

        _keysetup: function (k) {

            x[0] = k[0];
            x[2] = k[1];
            x[4] = k[2];
            x[6] = k[3];
            x[1] = (k[3] << 16) | (k[2] >>> 16);
            x[3] = (k[0] << 16) | (k[3] >>> 16);
            x[5] = (k[1] << 16) | (k[0] >>> 16);
            x[7] = (k[2] << 16) | (k[1] >>> 16);

            c[0] = util["" + "rotl" + ""](k[2], 16);
            c[2] = util["" + "rotl" + ""](k[3], 16);
            c[4] = util["" + "rotl" + ""](k[0], 16);
            c[6] = util["" + "rotl" + ""](k[1], 16);
            c[1] = (k[0] & 0xFFFF0000) | (k[1] & 0xFFFF);
            c[3] = (k[1] & 0xFFFF0000) | (k[2] & 0xFFFF);
            c[5] = (k[2] & 0xFFFF0000) | (k[3] & 0xFFFF);
            c[7] = (k[3] & 0xFFFF0000) | (k[0] & 0xFFFF);

            b = 0;

            for (var i = 0; i < 4; i++) Rabbit["" + "_nextstate" + ""]();

            for (var i = 0; i < 8; i++) c[i] ^= x[(i + 4) & 7];

        },

        _ivsetup: function (iv) {

            var i0 = util["" + "endian" + ""](iv[0]),
                i2 = util["" + "endian" + ""](iv[1]),
                i1 = (i0 >>> 16) | (i2 & 0xFFFF0000),
                i3 = (i2 << 16) | (i0 & 0x0000FFFF);

            c[0] ^= i0;
            c[1] ^= i1;
            c[2] ^= i2;
            c[3] ^= i3;
            c[4] ^= i0;
            c[5] ^= i1;
            c[6] ^= i2;
            c[7] ^= i3;

            for (var i = 0; i < 4; i++) Rabbit["" + "_nextstate" + ""]();

        },

        _nextstate: function () {

            for (var c_old = [], i = 0; i < 8; i++) c_old[i] = c[i];

            c[0] = (c[0] + 0x4D34D34D + b) >>> 0;
            c[1] = (c[1] + 0xD34D34D3 + ((c[0] >>> 0) < (c_old[0] >>> 0) ? 1 : 0)) >>> 0;
            c[2] = (c[2] + 0x34D34D34 + ((c[1] >>> 0) < (c_old[1] >>> 0) ? 1 : 0)) >>> 0;
            c[3] = (c[3] + 0x4D34D34D + ((c[2] >>> 0) < (c_old[2] >>> 0) ? 1 : 0)) >>> 0;
            c[4] = (c[4] + 0xD34D34D3 + ((c[3] >>> 0) < (c_old[3] >>> 0) ? 1 : 0)) >>> 0;
            c[5] = (c[5] + 0x34D34D34 + ((c[4] >>> 0) < (c_old[4] >>> 0) ? 1 : 0)) >>> 0;
            c[6] = (c[6] + 0x4D34D34D + ((c[5] >>> 0) < (c_old[5] >>> 0) ? 1 : 0)) >>> 0;
            c[7] = (c[7] + 0xD34D34D3 + ((c[6] >>> 0) < (c_old[6] >>> 0) ? 1 : 0)) >>> 0;
            b = (c[7] >>> 0) < (c_old[7] >>> 0) ? 1 : 0;

            for (var g = [], i = 0; i < 8; i++) {

                var gx = (x[i] + c[i]) >>> 0;

                var ga = gx & 0xFFFF,
                    gb = gx >>> 16;

                var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb,
                    gl = (((gx & 0xFFFF0000) * gx) >>> 0) + (((gx & 0x0000FFFF) * gx) >>> 0) >>> 0;

                g[i] = gh ^ gl;

            }

            x[0] = g[0] + ((g[7] << 16) | (g[7] >>> 16)) + ((g[6] << 16) | (g[6] >>> 16));
            x[1] = g[1] + ((g[0] << 8) | (g[0] >>> 24)) + g[7];
            x[2] = g[2] + ((g[1] << 16) | (g[1] >>> 16)) + ((g[0] << 16) | (g[0] >>> 16));
            x[3] = g[3] + ((g[2] << 8) | (g[2] >>> 24)) + g[1];
            x[4] = g[4] + ((g[3] << 16) | (g[3] >>> 16)) + ((g[2] << 16) | (g[2] >>> 16));
            x[5] = g[5] + ((g[4] << 8) | (g[4] >>> 24)) + g[3];
            x[6] = g[6] + ((g[5] << 16) | (g[5] >>> 16)) + ((g[4] << 16) | (g[4] >>> 16));
            x[7] = g[7] + ((g[6] << 8) | (g[6] >>> 24)) + g[5];

        }

    };

})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""],
        Binary = charenc["" + "Binary" + ""];

    var SHA1 = C["" + "SHA1" + ""] = function (message, options) {
        var digestbytes = util["" + "wordsToBytes" + ""](SHA1["" + "_sha1" + ""](message));
        return options && options["" + "asBytes" + ""] ? digestbytes :
            options && options["" + "asString" + ""] ? Binary["" + "bytesToString" + ""](digestbytes) :
                util["" + "bytesToHex" + ""](digestbytes);
    };

    SHA1["" + "_sha1" + ""] = function (message) {

        if (message["" + "constructor" + ""] == String) message = UTF8["" + "stringToBytes" + ""](message);
        /* else, assume byte array already */

        var m = util["" + "bytesToWords" + ""](message),
            l = message["" + "length" + ""] * 8,
            w = [],
            H0 = 1732584193,
            H1 = -271733879,
            H2 = -1732584194,
            H3 = 271733878,
            H4 = -1009589776;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >>> 9) << 4) + 15] = l;

        for (var i = 0; i < m["" + "length" + ""]; i += 16) {

            var a = H0,
                b = H1,
                c = H2,
                d = H3,
                e = H4;

            for (var j = 0; j < 80; j++) {

                if (j < 16) w[j] = m[i + j];
                else {
                    var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
                    w[j] = (n << 1) | (n >>> 31);
                }

                var t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
                    j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
                        j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
                            j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
                                (H1 ^ H2 ^ H3) - 899497514);

                H4 = H3;
                H3 = H2;
                H2 = (H1 << 30) | (H1 >>> 2);
                H1 = H0;
                H0 = t;

            }

            H0 += a;
            H1 += b;
            H2 += c;
            H3 += d;
            H4 += e;

        }

        return [H0, H1, H2, H3, H4];

    };

    SHA1["" + "_blocksize" + ""] = 16;

    SHA1["" + "_digestsize" + ""] = 20;

})();
(function () {

    var C = (typeof window === 'undefined') ? requireObj('./Crypto')["" + "Crypto" + ""] : window["" + "Crypto" + ""];

    var util = C["" + "util" + ""],
        charenc = C["" + "charenc" + ""],
        UTF8 = charenc["" + "UTF8" + ""],
        Binary = charenc["" + "Binary" + ""];

    var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
        0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
        0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
        0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
        0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
        0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
        0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
        0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
        0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
        0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
        0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
        0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
        0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
        0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
        0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
        0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];

    var SHA256 = C["" + "SHA256" + ""] = function (message, options) {
        var digestbytes = util["" + "wordsToBytes" + ""](SHA256["" + "_sha256" + ""](message));
        return options && options["" + "asBytes" + ""] ? digestbytes :
            options && options["" + "asString" + ""] ? Binary["" + "bytesToString" + ""](digestbytes) :
                util["" + "bytesToHex" + ""](digestbytes);
    };

    SHA256["" + "_sha256" + ""] = function (message) {

        if (message["" + "constructor" + ""] == String) message = UTF8["" + "stringToBytes" + ""](message);
        /* else, assume byte array already */

        var m = util["" + "bytesToWords" + ""](message),
            l = message["" + "length" + ""] * 8,
            H = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
                0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19],
            w = [],
            a, b, c, d, e, f, g, h, i, j,
            t1, t2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for (var i = 0; i < m["" + "length" + ""]; i += 16) {

            a = H[0];
            b = H[1];
            c = H[2];
            d = H[3];
            e = H[4];
            f = H[5];
            g = H[6];
            h = H[7];

            for (var j = 0; j < 64; j++) {

                if (j < 16) w[j] = m[j + i];
                else {

                    var gamma0x = w[j - 15],
                        gamma1x = w[j - 2],
                        gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^
                            ((gamma0x << 14) | (gamma0x >>> 18)) ^
                            (gamma0x >>> 3),
                        gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                            ((gamma1x << 13) | (gamma1x >>> 19)) ^
                            (gamma1x >>> 10);

                    w[j] = gamma0 + (w[j - 7] >>> 0) +
                        gamma1 + (w[j - 16] >>> 0);

                }

                var ch = e & f ^ ~e & g,
                    maj = a & b ^ a & c ^ b & c,
                    sigma0 = ((a << 30) | (a >>> 2)) ^
                        ((a << 19) | (a >>> 13)) ^
                        ((a << 10) | (a >>> 22)),
                    sigma1 = ((e << 26) | (e >>> 6)) ^
                        ((e << 21) | (e >>> 11)) ^
                        ((e << 7) | (e >>> 25));


                t1 = (h >>> 0) + sigma1 + ch + (K[j]) + (w[j] >>> 0);
                t2 = sigma0 + maj;

                h = g;
                g = f;
                f = e;
                e = (d + t1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (t1 + t2) >>> 0;

            }

            H[0] += a;
            H[1] += b;
            H[2] += c;
            H[3] += d;
            H[4] += e;
            H[5] += f;
            H[6] += g;
            H[7] += h;

        }

        return H;

    };

    SHA256["" + "_blocksize" + ""] = 16;

    SHA256["" + "_digestsize" + ""] = 32;

})();



function RdWXBizDataCrypt(appId, sessionKey) {
    this["" + "appId" + ""] = appId
    this["" + "sessionKey" + ""] = sessionKey
}

RdWXBizDataCrypt["" + "prototype" + ""]["" + "decryptData" + ""] = function (encryptedData, iv) {
    // base64 decode ：使用 CryptoJS 中 Crypto[""+"util"+""][""+"base64ToBytes"+""]()进行 base64解码
    var encryptedData = Crypto["" + "util" + ""]["" + "base64ToBytes" + ""](encryptedData)
    var key = Crypto["" + "util" + ""]["" + "base64ToBytes" + ""](this["" + "sessionKey" + ""]);
    var iv = Crypto["" + "util" + ""]["" + "base64ToBytes" + ""](iv);

    // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
    var mode = new Crypto["" + "mode" + ""]["" + "CBC" + ""](Crypto["" + "pad" + ""]["" + "pkcs7" + ""]);
    var decryptResult = {};
    try {
        // 解密
        var bytes = Crypto["" + "AES" + ""]["" + "decrypt" + ""](encryptedData, key, {
            asBpytes: true,
            iv: iv,
            mode: mode
        });
        console["" + "log" + ""](bytes);
        decryptResult = JSON["" + "parse" + ""](bytes);

    } catch (err) {
        console["" + "log" + ""](err)
    }
    // if (decryptResult[""+"watermark"+""][""+"appid"+""] !== this[""+"appId"+""]) {
    //   console[""+"log"+""](err)
    // }

    return decryptResult
}

module["" + "exports" + ""] = {
    RdWXBizDataCrypt: RdWXBizDataCrypt,
    Crypto: Crypto,
} 
