/**
 * Module Bot.
 * version 2.0.2
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
        debug("bot getStatusCode() given url =", givenUrl);
        var promise = new Promise(function (resolve, reject) {
            var url = require('url');
            var myUrl = new URL(givenUrl);
            var hoststring = myUrl.host;
            debug("bot url host =", hoststring);
	    var hoststringLength = hoststring.length;
            debug("bot found hoststringLength =", hoststringLength);
	    var protocolstring = "https://";
            debug("bot protocolstring =", protocolstring);
	    var protocolstringLength = protocolstring.length;
            debug("bot found protocolstringLength =", protocolstringLength);
	    // total string length
	    var stringLength = protocolstringLength + hostingstringLength;
            debug("bot found stringlength =", stringLength);	    Q
            var pathstring = givenUrl.toString().substring(stringLength);
            debug("bot url path =", pathstring);
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
		    debug("bot getStatusCode() res.statusCode =", res.statusCode);
                    resolve(res);
                });
                req.on('error', (error) => {
                    debug("bot getStatusCode() error =", error);
                    reject(error);
                });
            }, 500);
        });
        return promise;
    };
};

module.exports = new Bot();
