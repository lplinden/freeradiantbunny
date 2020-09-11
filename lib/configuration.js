/**
 * Module configuration.
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
    this.appDir = path.dirname(require.main.filename);
    this.baseUrl = '';
    this.databaseInfo = '';
    this.vhosts = '';
    this.validPageNames = '';
    this.specialPages = '';
    this.defaultStrings = '';
    // read config file and parse TOML format
    this.loadConfigFile = function () {
        debug("configuration loadConfigFile()");
        var fs = require('fs'),
            toml = require('toml'),
            config = toml.parse(fs.readFileSync(this.homeDir + '/.freeradiantbunny/config.toml', 'utf-8'));
        // store these configuration variables
        this.baseUrl = config.baseUrl;
        this.databaseInfo = config.databaseInfo;
        this.vhosts = config.vhosts;
        this.validPageNames = config.validPageNames;
        this.specialPages = config.specialPages;
        this.defaultStrings = config.defaultStrings;
        console.log("configuration baseUrl =", this.baseUrl);
        console.log("configuration databaseInfo =", this.databaseInfo);
        console.log("configuration vhosts =", this.vhosts);
        console.log("configuration validPageNames =", this.validPageNames);
        console.log("configuration specialPages =", this.specialPages);
        console.log("configuration defaultStrings =", this.defaultStrings);
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
                console.log("config isSpecialPage");
                return true;
            }
        }
        return false;
    };
    // used by server
    this.isValidPageName = function (filename, host) {
        var filenames = [
            "index.html"
        ];
        if (host === 'localhost:5001' ||
                host === 'permaculturewebsites.org' ||
                host === 'www.permaculturewebsites.org'
                ) {
            filenames = [
                "/index.html",
                "/about.html",
                "/robots.txt",
                "/site_map.html",
                "/aggregators.html",
                "/badge.html",
                "/what_qualifies_as_a_permaculture_website.html",
                "/suggestions.html",
                "/reasons.html",
                "/featured_sites.html",
                "/inquiring_systems.html",
                "/_images/index.html",
                "/testo/adserver.html",
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
        console.log("configuation className =", className);
        //manifest['headTitle'] = className + " - Permaculture Websites";
        //manifest['site-style'] = this.getBaseUrl() + "_styles/main.css";
        //manifest['home-href'] = this.getBaseUrl();
        //manifest['logo-src'] = this.getBaseUrl() + "_images/logo.png";
        //manifest['table-title'] = className.replace("_", " ");
        return this.defaultStrings;
    };
}

module.exports = new Configuration();
