/**
 * Module Database.
 * version 2.0.2
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Database() {
    instanceCount = instanceCount + 1;
    debug("database instantiated", instanceCount);
    this.client;
    // used by modeller
    this.queryDatabase = function (sql, className, baseUrl, currentMenuSelections, suitcase) {
        debug("database queryDatabase()");
        debug("database className =", className);
        // use postgresql database
        var promise = new Promise(async function (resolve, reject) {
	    debug("database new Promise()");
            // get database info
            var freeradiantbunny = require("freeradiantbunny");
            var config = freeradiantbunny.getConfig();
            var databaseInfo = config.getDatabaseInfo();
            const { Pool } = require('pg')
            const pool = new Pool(databaseInfo);
	    pool.connect((error, client, result) => {
		if (error) {
		    debug("database pool.connect() error =", error.stack);
		    reject(error);
		}
		debug("database connection made");
		// todo
		// await pool.query(sql, function (error, result) {
		client.query(sql, function (error, result) {
		    // unknown function commented out
		    //release();
                    if (error) {
			debug("database query() error =" + error);
			return reject(error);
                    }
                    var dataSet = [];
                    result.rows.forEach(row=>{
			dataSet.push(row);
                    });
                    resolve(dataSet);
		    // todo
                    pool.end().then(
			() => debug("database pool.end()")
		    );
		});
	    });
        });
        return promise;
    }
    // used by modeller
    this.updateDatabase = function (sql) {
        debug("database updateDatabase()");
        debug("database sql =", sql);
        // get connection string
        var connectionString = this.getConnectionString();
	debug("database connectionString-1 =", connectionString);
        // use postgresql database
        var promise = new Promise(async function (resolve, reject) {
            debug("database new Promise()");
            // todo heroku insisted on this next line of code
            // pg.defaults.ssl = true;
            // get database info
            var freeradiantbunny = require("freeradiantbunny");
            var config = freeradiantbunny.getConfig();
            var databaseInfo = config.getDatabaseInfo();
            const { Pool } = require('pg')
            const pool = new Pool(databaseInfo)
            await pool.query(sql, function (error, result){
		debug("database pool.query");
                if (error) {
                    debug("database db query " + error);
                    return reject(error);
                }
                var dataSet = [];
                result.rows.forEach(row=>{
                    dataSet.push(row);
                });
                resolve(dataSet);
                pool.end()
            });
        });
        return promise;
    }
    // used by modeller
    this.queryDatabaseSimple = function (sql, suitcase) {
	debug("database simple sql =", sql);
        var name = "name-not-found";
        debug("database queryDatabaseSimple()");
        // get connection string
        var connectionString = this.getConnectionString();
        // use postgresql database
        var promise = new Promise(async function (resolve, reject) {
	    debug("database new Promise");
            const { Pool } = require('pg');
            // get database info
            var freeradiantbunny = require("freeradiantbunny");
            var config = freeradiantbunny.getConfig();
            var databaseInfo = config.getDatabaseInfo();
            const pool = new Pool(databaseInfo);
            await pool.query(sql, (err, result) => {
		// check if there are rows
		if (result.rows) {
                    result.rows.forEach(row=>{
			for(var columnName in row) {
                            debug("database queryDatabaseSimple columnName =", columnName);
                            if (columnName == "name") {
				debug("database queryDatabaseSimple value =", row[columnName]);
				resolve(row[columnName]);
                            }
			}
                    });
		} else {
		    debug('database.js database result.rows variable is mnot defined.');
		    // todo send a message to user so that the whole webpage does not fail
		};
                pool.end();
            });
        });
        return promise;
    }
    this.getConnectionString = function() {
        // solve for connectionString
        // postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
        // get database info
	// get database info
        var freeradiantbunny = require("freeradiantbunny");
        var config = freeradiantbunny.getConfig();
        var databaseInfo = config.getDatabaseInfo();
        const connectionString = 'postgresql://' + databaseInfo.user + ':' + databaseInfo.password + '@' + databaseInfo.host + ":" + databaseInfo.postgresqlPort + "/" + databaseInfo.database;
	debug("database connectionString-2 =" . connectionString);
        return connectionString;
    };
};

var cleanUp = async (client) => {
    // clean up
    await client.end().then(function() {
        debug("database client.end() success");
    }).catch(error => {
        debug("database db clean up error " + error);
    });
}

module.exports = new Database();
