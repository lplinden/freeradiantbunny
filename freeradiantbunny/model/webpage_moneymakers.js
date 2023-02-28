/**
 * Module WebpageMoneymakers.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function WebpageMoneymakers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("webpage_moneymakers instantiated", instanceCount);
    this.name = "webpage_moneymakers";
    this.schema = ['id',
		   'webpages_id',
		   'moneymakers_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("webpage_moneymakers idOrNoId =", idOrNoId);
        debug("webpage_moneymakers classNameFilter =", classNameFilter);
        debug("webpage_moneymakers paramSort =", paramSort);
        debug("webpage_moneymakers specialFlag =", specialFlag);
        debug("webpage_moneymakers queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id, z.webpages_id, z.moneymakers_id";
            debug("webpage_moneymakers orderBy =", orderBy);
	    sql = "select z.id, z.webpages_id as webpages_id, w.name as webpages_name, z.moneymakers_id as moneymakers_id, m.name as moneymakers_name from webpage_moneymakers z, moneymakers m, webpages w where z.moneymakers_id = m.id AND z.webpages_id = w.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new WebpageMoneymakers();

// end
