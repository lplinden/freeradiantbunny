/**
 * Module database.
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
            // get database info
            var freeradiantbunny = require("freeradiantbunny");
            var config = freeradiantbunny.getConfig();
            var databaseInfo = config.getDatabaseInfo();
            const { Pool } = require('pg')
            const pool = new Pool(databaseInfo)
            await pool.query(sql, function (error, result){
                if (error) {
                    debug("database db query " + error);
                    return reject(error);
                }
		console.log("database className =", className);
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
    this.updateDatabase = function (sql) {
        debug("database updateDatabase()");
        debug("database sql =", sql);
        // get connection string
        //var connectionString = this.getConnectionString();
	//console.log("database connectionString 1 =", connectionString);
        // use postgresql database
        var promise = new Promise(async function (resolve, reject) {
/*
            var pg = require('pg');
            // heroku insisted on this
            pg.defaults.ssl = true;
            client = new pg.Client(connectionString); 
            try {
                client.connect();
            } catch(error) {
                debug("database client.connect() error", error);
            };
            await client.query(sql, function (error, result){
                if (error) {
                    debug("database db query " + error);
                    return reject(error);
                }
            });
        });
*/
            // get database info
            var freeradiantbunny = require("freeradiantbunny");
            var config = freeradiantbunny.getConfig();
            var databaseInfo = config.getDatabaseInfo();
            const { Pool } = require('pg')
            const pool = new Pool(databaseInfo)
            await pool.query(sql, function (error, result){
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
        var name = "name-not-found";
        debug("database queryDatabaseSimple()");
        // get connection string
        var connectionString = this.getConnectionString();
        // use postgresql database
        var promise = new Promise(async function (resolve, reject) {
            const { Pool } = require('pg');
            // get database info
            var freeradiantbunny = require("freeradiantbunny");
            var config = freeradiantbunny.getConfig();
            var databaseInfo = config.getDatabaseInfo();
            const pool = new Pool(databaseInfo);
            await pool.query(sql, (err, result) => {
                result.rows.forEach(row=>{
                    for(var columnName in row) {
                        debug("database queryDatabaseSimple columnName =", columnName);
                        if (columnName == "name") {
                            debug("database queryDatabaseSimple value =", row[columnName]);
                            resolve(row[columnName]);
                        }
                    }
                });
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
	console.log("database connectionString 2 =" . connectionString);
        return connectionString;
    };
    /*
      this.xqueryDatabase = function(connectionString, sql) {
      return Promise.resolve(
      [{
      "id": {
      "style": "background-color: #FFFFFF;",
      "chardata": "1"
      },
      "name": {
      "style": "background-color: #FFFFFF;",
      "chardata": "projects"
      },
      "sort": {
      "style": "background-color: #0099CC;",
      "chardata": "Y 2017-12-5"
      },
      "status": {
      "style": "background-color: #FFFFFF;",
      "chardata": "zoneline"
      },
      "img_url": {
      "style": "background-color: #FFFFFF;",
      "chardata": "http://mudia.com/_images/logo.png"
      },
      "description": {
      "style": "background-color: #FFFFFF;",
      "chardata": "contains an initiative."
      }
      }, {
      "id": {
      "style": "background-color: #FFFFFF;",
      "chardata": "2"
      },
      "name": {
      "style": "background-color: #FFFFFF;",
      "chardata": "goal_statements"
      },
      "sort": {
      "style": "background-color: #FFFFFF;",
      "chardata": "Y 2017-12-6"
      },
      "status": {
      "style": "background-color: #FFFFFF;",
      "chardata": "zoneline"
      },
      "img_url": {
      "style": "background-color: #FFFFFF;",
      "chardata": "http://mudia.com/_images/logo.png"
      },
      "description": {
      "style": "background-color: #FFFFFF;",
      "chardata": "written goal."
      }
      }]
      )
      }
    */
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
