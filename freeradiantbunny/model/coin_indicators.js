/**
 * Module Coin_Indicators.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Coin_Indicators() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coin_indicators instantiated", instanceCount);
    this.name = "coin_indicators";
    this.schema = ['id',
		   'coins_symbol',
		   'last_updated',
		   'measurement'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coin_indicators idOrNoId =", idOrNoId);
        debug("coin_indicators classNameFilter =", classNameFilter);
        debug("coin_indicators paramSort =", paramSort);
        debug("coin_indicators specialFlag =", specialFlag);
        debug("coin_indicators queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);	    
        } else {
            var orderBy = "ORDER BY z.last_updated DESC, z.coins_symbol";
	    var limit = 100;
            debug("coin_indicators orderBy =", orderBy);
	    // query nested with query so that only the max timestamp of a coin shows
	    // kludge to get started (uses UNION)
	    sql = "SELECT z.id, z.coins_symbol, to_char(z.last_updated at time zone 'est', 'YYYY-MM-DD-HH24:MI'), z.measurement FROM coin_indicators z WHERE (select max(y.last_updated) from coin_indicators y) = z.last_updated " + orderBy + " LIMIT " + limit + ";";
	}
	return sql;
    };
}

module.exports = new Coin_Indicators();

// end
