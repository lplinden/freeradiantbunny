/**
 * Module realtime.
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var connections = [];
var statusCodeAttempted = [];
var validHtmlAttempted = [];
var linkCheckAttempted = [];

function Realtime() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("controller instantiated", instanceCount);
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
		    console.log("realtime updateStatusCheck() url already checked");
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
                    debug("realtime updateStatusCodes()", foundStatusCode);
                    debug("realtime botPromise =", foundStatusCode);
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
                    io.sockets.emit('refreshStatusCode', {msg1: id, msg2: data.statusCode, msg3: backgroundColor});
		}).catch(function (error) {
                    debug("realtime bot error =", error);
		});
            }
	});
	socket.on('updateValidHtml', function (id, url, className) {
            if (className === "webpages") {
                if (validHtmlAttempted.indexOf(id) > -1) {
		    // only check once
		    console.log("realtime validHtmlCheck() url already checked");
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
		    console.log("realtime updateLinkCheck() url already checked");
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
    };
}

emitInProgressMessage = function (io, id) {
    var backgroundColor = '#cce6ff';
    var foundResult = "in progress";
    io.sockets.emit('refreshLinkCheck', {msg1: id, msg2: foundResult, msg3: backgroundColor});
}

module.exports = new Realtime();
