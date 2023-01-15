/**
 * Module Modules.
 * version 2.0.3
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Modules() {
    instanceCount = instanceCount + 1;
    debug("modules instantiated", instanceCount);
    this.name = "goal_statements";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   ''];
    this.inboundForeignKeyTables = [];
    this.getStatusCode = function (givenUrl) {
        debug("modules getStatusCode() given url =", givenUrl);
        var promise = new Promise(function (resolve, reject) {
            var url = require('url');
            var myUrl = new URL(givenUrl);
            var hoststring = myUrl.host;
            debug("modules url host =", hoststring);
	    var hoststringLength = hoststring.length;
            debug("modules found hoststringLength =", hoststringLength);
	    var protocolstring = "https://";
            debug("modules protocolstring =", protocolstring);
	    var protocolstringLength = protocolstring.length;
            debug("modules found protocolstringLength =", protocolstringLength);
	    // total string length
	    var stringLength = protocolstringLength + hostingstringLength;
            debug("modules found stringlength =", stringLength);	    Q
            var pathstring = givenUrl.toString().substring(stringLength);
            debug("modules url path =", pathstring);
            var https = require('https');
            var options = {
                host: hoststring,
                port: 443,
                path: pathstring,
                method: 'GET'
            };
            // be slow
            debug("modules setTimeout()");
            setTimeout( function () {
                var req = https.get(options);
                req.on('response', (res) => {
		    debug("modules getStatusCode() res.statusCode =", res.statusCode);
                    resolve(res);
                });
                req.on('error', (error) => {
                    debug("modules getStatusCode() error =", error);
                    reject(error);
                });
            }, 500);
        });
        return promise;
    };
};

module.exports = new Modules();
