/**
 * Module Realtime.
* version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var connections = [];
var statusCodeAttempted = [];
var validHtmlAttempted = [];
var linkCheckAttempted = [];
var measureAttempted = [];

function Realtime() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("realtime instantiated", instanceCount);
    this.engineOn = function (io, socket) {
	// connection
	connections.push(socket);
	debug('realtime connection: %s socket connections', connections.length);
	debug('realtime socket id', socket.id);
	socket.on('disconnect', function () {
            // disconnect
            connections.splice(connections.indexOf(socket), 1);
            debug('realtime disconnected: %s socket connections', connections.length);
	});
	socket.on('send message', function (data) {
            io.sockets.emit('new message', {msg: data});
            debug("realtime send message", data);
	});
	socket.on('updateStatusCodes', function (id, url, className) {
            if (className === "webpages") {
                if (statusCodeAttempted.indexOf(url) > -1) {
		    // only check once
		    debug("realtime updateStatusCheck() url already checked");
		    return;
		} else {
		    // store this url
		    statusCodeAttempted.push(url);
		    emitInProgressMessage(io, id);
		}
		// set up bot
		var freeradiantbunny = require("freeradiantbunny");
		var bot = freeradiantbunny.getBot();
		var botPromise = bot.getStatusCode(url);
		botPromise.then(function (data) {
                    var foundStatusCode = data.statusCode;
                    debug("realtime updateStatusCodes() foundStatusCode =", foundStatusCode);
                    var backgroundColor;
                    if (foundStatusCode.toString() === "200") {
			// green
			backgroundColor = '#84BE6A';
                    } else if (foundStatusCode.toString() === "404") {
			// red
			backgroundColor = '#CD5555';
                    } else {
			backgroundColor = '#CCCCCC';
                    }
                    socket.emit('refreshStatusCode', {msg1: id, msg2: data.statusCode, msg3: backgroundColor});
		}).catch(function (error) {
                    debug("realtime bot error =", error);
		});
            }
	});
	socket.on('updateValidHtml', function (id, url, className) {
            if (className === "webpages") {
                if (validHtmlAttempted.indexOf(id) > -1) {
		    // only check once
		    debug("realtime validHtmlCheck() url already checked");
		    return;
		} else {
		    // store this url
		    validHtmlAttempted.push(id);
		    emitInProgressMessage(io, id);
		}
		// set up validator
		var freeradiantbunny = require("freeradiantbunny");
		var validator = freeradiantbunny.getValidator();
		var validatorPromise = validator.getValidHtml(url);
		validatorPromise.then(function (data) {
                    //debug("realtime validatorPromise =", data);
                    var foundResult, backgroundColor;
                    if (data.match(/document validates according/)) {
			foundResult = "valid";
                    } else {
			foundResult = data;
                    }
                    if (foundResult === "valid") {
			backgroundColor = '#84BE6A';
                    } else {
			backgroundColor = '#CD5555';
                    }
                    debug("realtime updateValidHtml ", foundResult);
                    io.sockets.emit('refreshValidHtml', {msg1: id, msg2: foundResult, msg3: backgroundColor});
		}).catch(function (error) {
                    debug("realtime validator error =", error);
		});
            }
	});
	socket.on('updateLinkCheck', function (id, url, className) {
            if (className === "webpages") {
                if (linkCheckAttempted.indexOf(url) > -1) {
		    // only check once
		   debug("realtime updateLinkCheck() url already checked");
		    return;
		} else {
		    // store this url
		    linkCheckAttempted.push(url);
		    emitInProgressMessage(io, id);
		}
		var freeradiantbunny = require("freeradiantbunny");
		var validator = freeradiantbunny.getValidator();
		var validatorPromise = validator.getLinkCheck(url);
		validatorPromise.then(function (data) {
                    //debug("realtime validatorPromise =", data);
                    var foundResult, backgroundColor;
		    var foundResult = data;
                    if (data.match(/ok$/)) {
			backgroundColor = '#84BE6A';
                    } else {
			backgroundColor = '#CD5555';
                    }
                    debug("realtime updateLinkCheck ", foundResult);
                    io.sockets.emit('refreshLinkCheck', {msg1: id, msg2: foundResult, msg3: backgroundColor});
		}).catch(function (error) {
                    debug("realtime validator error =", error);
		});
            }
	});
	socket.on('measure', function (id, className) {
            debug("realtime measure()", id + " " + className);
	    // execute only once per page load
            if (measureAttempted.indexOf(id) > -1) {
		// already done, so skip
		// but first remove from attempted array, so it can be redone
		const indexToRemove = measureAttempted.indexOf(id);
		measureAttempted.splice(indexToRemove, 1);
	    } else {
		// store to show that this has been tallied
		measureAttempted.push(id);
		// communicate with user
		emitInProgressMessage(io, id);
		// ok, so process
		var urlString = "http://localhost:5002/bot/" + className + "/" + id;
		var params = {
		    host: '127.0.0.1',
		    port: 5002,
		    method: 'GET',
		    path: urlString
		};
		httpRequest(params).then(function(body) {
		    debug("realtime given body");
		    var backgroundColor = '#84BE6A';
		    debug("realtime measure() id =", id);
		    debug("realtime measure() className =", className);
		    debug("realtime measure() backgroundColor =", backgroundColor);
		    // move line below
		    io.sockets.emit('refreshMeasure', {msg1: id, msg2: className, msg3: body, msg4: backgroundColor});
		});		
	    }
	});
    };
}

emitInProgressMessage = function (io, id) {
    var backgroundColor = '#cce6ff';
    var foundResult = "in progress";
    io.sockets.emit('refreshLinkCheck', {msg1: id, msg2: foundResult, msg3: backgroundColor});
}

function httpRequest(params, postData) {
    return new Promise(function(resolve, reject) {
	var http = require('http');
        var req = http.request(params, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = Buffer.concat(body).toString();
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}

module.exports = new Realtime();
