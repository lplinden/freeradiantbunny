/**
 * Module freeradiantbunny.
 *
 * @public
 */

'use strict';

/**
 * Define 404.html.
 */

var path = require('path');
var fileName404 = path.join(__dirname, '../public/404.html');

/**
 * Module dependencies.
 */

var bot = require('./bot.js');
var controller = require('./controller.js');
var realtime = require('./realtime.js');
var validator = require('./validator.js');

/**
 * Define functions.
 */

module.exports = {
    getBot: function () {
        return bot;
    },
    getConfig: function () {
	// test TOML config file
	const configuration = require('./configuration.js');
        return configuration;
    },
    getController: function () {
        return controller;
    },
    getRealtime: function () {
        return realtime;
    },
    getValidator: function () {
        return validator;
    },
    send404: function (res, why) {
        // send 404 error webpage
        var type = 'text/html';
        var fs = require('fs');
        fs.readFile(fileName404, function (error, data) {
            if (error) {
                console.log("server readFile error =", error);
                return;
            }
            res.writeHead(404, {'Content-Type': type});
            res.end(data);
            console.log("freeradiantbunny served 404 why =", why);
            console.log("freeradiantbunny served " + type + " =", fileName404);
        });
    }
};
