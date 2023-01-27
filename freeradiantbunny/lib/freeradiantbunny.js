/**
 * Module freeradiantbunny.
 * version 2.0.2
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

/**
 * Define 404.html.
 */

var path = require('path');
var fileName404 = path.join(__dirname, '../public/404.html');
var fileName200 = path.join(__dirname, '../public/200.html');

/**
 * Module dependencies.
 */

var bot = require('./bot.js');
var controller = require('./controller.js');
//var realtime = require('./realtime.js');
var validator = require('./validator.js');

/**
 * Define functions.
 */

module.exports = {
    getBot: function () {
        return bot;
    },
    getConfig: function () {
	debug("freeradiantbunny getConfig()");
	// current version
        var homeDir = process.env[(process.plantform === 'win32') ? 'USERPROFILE' : 'HOME'];
        var fileName = homeDir + '/.freeradiantbunny/config.js';
        var config = require(fileName);
        return config;
    },
    getConfiguration: function () {
	debug("freeradiantbunny getConfiguration()");
	// test TOML config file
	const configuration = require('./configuration.js');
	configuration.loadConfigFile();
        return configuration;
    },
    getController: function () {
	debug("freeradiantbunny getController()");
        return controller;
    },
    //getRealtime: function () {
	//debug("freeradiantbunny getRealtime()");
        //return realtime;
    //},
    getValidator: function () {
	debug("freeradiantbunny getValidator()");
        return validator;
    },
    send404: function (res, why) {
	debug("freeradiantbunny send404()");
        // send 404 error webpage
        var type = 'text/html';
        var fs = require('fs');
        fs.readFile(fileName404, function (error, data) {
            if (error) {
                debug("server readFile error =", error);
                return;
            }
            res.writeHead(404, {'Content-Type': type});
            res.end(data);
            debug("freeradiantbunny served 404 why =", why);
            debug("freeradiantbunny served " + type + " =", fileName404);
        });
    },
    send200: function (res, why) {
	debug("freeradiantbunny send200()");
        // send 200 with message
        var type = 'text/html';
        var fs = require('fs');
        fs.readFile(fileName200, function (error, data) {
            if (error) {
                debug("server readFile error =", error);
                return;
            }
            res.writeHead(200, {'Content-Type': type});
            res.end(data);
            debug("freeradiantbunny served 200 why =", why);
            debug("freeradiantbunny served " + type + " =", fileName200);
        });
    }
};
