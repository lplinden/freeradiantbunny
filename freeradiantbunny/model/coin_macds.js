/**
 * Module CoinsMacds.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function CoinMacds() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coin_macds instantiated", instanceCount);
    this.name = "coin_macds";
    this.schema = ['id',
		   'coins_symbol',
		   'last_updated',
		   'previous_macd'
		   'macd'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coin_macds idOrNoId =", idOrNoId);
        debug("coin_macds classNameFilter =", classNameFilter);
        debug("coin_macds paramSort =", paramSort);
        debug("coin_macds specialFlag =", specialFlag);
        debug("coin_macds queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);	    
        } else {
            var orderBy = "ORDER BY z.last_updated DESC, z.coins_symbol";
	    var limit = 100;
            debug("coin_macds orderBy =", orderBy);
	    // query nested with query so that only the max timestamp of a coin shows
	    // kludge to get started (uses UNION)
	    sql = "SELECT z.id, z.coins_symbol, to_char(z.last_updated at time zone 'est', 'YYYY-MM-DD-HH24:MI') as last_updated, z.previous_macd, z.macd FROM coin_macds z WHERE (select max(y.last_updated) from coin_macds y) = z.last_updated " + orderBy + " LIMIT " + limit + ";";
	}
	return sql;
    };
}

module.exports = new CoinMacds();

// end
