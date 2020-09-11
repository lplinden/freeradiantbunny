/**
 * Module bot.
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Bot() {
    instanceCount = instanceCount + 1;
    debug("bot instantiated", instanceCount);
    this.getStatusCode = function (givenUrl) {
        debug("bot url =", givenUrl);
        var promise = new Promise(function (resolve, reject) {
            var url = require('url');
            var myUrl = new URL(givenUrl);
            var hoststring = myUrl.host;
            var stringLength = "https://".length + hoststring.length;
            debug("bot stringlength =", stringLength);
            var pathstring = givenUrl.toString().substring(stringLength);
            debug("bot host =", hoststring);
            debug("bot path =", pathstring);
            var https = require('https');
            var options = {
                host: hoststring,
                port: 443,
                path: pathstring,
                method: 'GET'
            };
            // be slow
            debug("bot setTimeout()");
            setTimeout( function () {
                var req = https.get(options);
                req.on('response', (res) => {
                    //var statusCode = res.statusCode;
                    resolve(res);
                });
                req.on('error', (error) => {
                    debug("bot getStatusCode() error ", error);
                    reject(error);
                });
            }, 500);
        });
        return promise;
    };
};

module.exports = new Bot();
