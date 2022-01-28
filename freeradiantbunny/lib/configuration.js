/**
 * Module Configuration.
* version 2.0.2
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

var path = require('path');

function Configuration() {
    instanceCount = instanceCount + 1;
    debug("configuration instantiated", instanceCount);
    this.loadConfigFile();
    // initialize variables for config variables
    this.homeDir = process.env[(process.plantform === 'win32') ? 'USERPROFILE' : 'HOME'];
    debug("configuration homeDir =", homeDir);
    this.appDir = path.dirname(require.main.filename);
    debug("configuration appDir =", appDir);
    this.baseUrl = '';
    this.databaseInfo = '';
    this.vhosts = '';
    this.validPageNames = '';
    this.specialPages = '';
    this.defaultStrings = '';
    // read config file and parse TOML format
    this.loadConfigFile = function () {
        debug("configuration loadConfigFile()");
	var full_path_config_toml_file = this.homeDir + '/.freeradiantbunny/config.toml';
	debug("configuration toml config-toml =", full_path_config_toml_file);
        var fs = require('fs'),
            toml = require('toml'),
            config = toml.parse(fs.readFileSync(this.homeDir + '/.freeradiantbunny/config.toml', 'utf-8'));
        // store configuration variables
        this.baseUrl = config.baseUrl;
        debug("configuration baseUrl =", this.baseUrl);
        this.databaseInfo = config.databaseInfo;
        debug("configuration databaseInfo =", this.databaseInfo);
	this.vhosts = config.vhosts;
        debug("configuration vhosts =", this.vhosts);
        this.validPageNames = config.validPageNames;
        debug("configuration validPageNames =", this.validPageNames);
        this.specialPages = config.specialPages;
        debug("configuration specialPages =", this.specialPages);
	this.defaultStrings = config.defaultStrings;
        ("configuration defaultStrings =", this.defaultStrings);
    };
    // base URL
    this.getBaseUrl = function () {
        return this.baseUrl;
    };
    // localBase URL
    this.getLocalBaseUrl = function () {
        return this.localBaseUrl;
    };
    // used by modeller
    this.getDatabaseInfo = function () {
        var databaseInfo = {
            host: this.databaseInfo.host,
            user: this.databaseInfo.user,
            password: this.databaseInfo.password,
            database: this.databaseInfo.database,
            postgresqlPort: this.databaseInfo.postgresqlPort,
        };
        return databaseInfo;
    };
    // used by server
    this.isHostValidVhost = function (givenHost) {
	debug("configuration isHostValidVhost()");
        var i;
        var key;
        for (i = 0; i < this.vhosts.length; i++) {
            key = this.vhosts[i][0];
            if (givenHost === key) {
                return true;
            }
        }
        return false;
    };
    // used by server
    this.getVhostHost = function (givenHost) {
	debug("configuration getValidHost()");
        var i;
        var key;
        var value;
        for (i = 0; i < this.vhosts.length; i++) {
            key = this.vhosts[i][0];
            if (givenHost === key) {
                value = this.vhosts[i][1];
                return value;
            }
        }
    };
    // used by server
    this.isSpecialPage = function (pageName) {
        // a special page overrides static webpage with dynamically-constructed webpage
        var i;
        for (i = 0; i < this.specialPages.length; i++) {
            if (pageName === this.specialPages[i]) {
                debug("configuration isSpecialPage");
                return true;
            }
        }
        return false;
    };
    // used by server
    // todo might not be used, see configuration file
    this.isValidPageName = function (filename, host) {
        var filenames = [
            "index.html"
        ];
        if (host === 'localhost:5001'
           ) {
            filenames = [
                "/index.html",
                "/about.html",
                "/robots.txt",
                "/site_map.html",
                "/_images/index.html",
            ];
        }
        if (filenames.indexOf(filename) > -1) {
            // found
            return true;
        }
        // not found
        return false;
    };
    // used by markup
    this.getDefaultStrings = function (className) {
        debug("configuation className =", className);
	// todo set up configuration switches for the following
        //manifest['headTitle'] = className + " - FreeRadiantBunny website";
        //manifest['site-style'] = this.getBaseUrl() + "_styles/main.css";
        //manifest['home-href'] = this.getBaseUrl();
        //manifest['logo-src'] = this.getBaseUrl() + "_images/logo.png";
        //manifest['table-title'] = className.replace("_", " ");
        return this.defaultStrings;
    };
}

module.exports = new Configuration();
