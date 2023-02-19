/**
 * Module Tenperdays.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Tenperdays() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tenperdays instantiated", instanceCount);
    this.name = "tenperdays";
    this.schema = ['id',
		   'count',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("tenperdays idOrNoId =", idOrNoId);
	debug("tenperdays classNameFilter =", classNameFilter);
        debug("tenperdays paramSort =", paramSort);
        debug("tenperdays specialFlag =", specialFlag);
        debug("tenperdays queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.count, z.id";
            debug("tenperdays orderBy =", orderBy);
	    // used for testing
	    //var today = '2020-12-31';
	    // following was an experiment
	    //var sql_insert = "insert into tenperdays (sort,count) values ('Y " + today + "','1');";
	    //var sql_update = "update tenperdays set count=3 where sort = 'Y " + today + "'; ";
            //sql = "select z.id, z.sort, z.count, select count(wp.id) from webpages wp where wp.sort = 'Y " + today + "' as webpages_today_count from tenperdays z " + orderBy + ";";
            sql = "select z.sort, z.id, z.count from tenperdays z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Tenperdays();

// end
