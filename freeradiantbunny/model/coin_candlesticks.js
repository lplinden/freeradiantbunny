/**
 * Module Coin_Candlesticks.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Coin_Candlesticks() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coin_candlesticks instantiated", instanceCount);
    this.name = "coin_candlesticks";
    this.schema = ['id',
		   'coins_symbol',
		   'timestamptz',
		   'period',
		   'open',
		   'high',
		   'low',
		   'close',
		   'volume',
		   'name'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coin_candlesticks idOrNoId =", idOrNoId);
        debug("coin_candlesticks classNameFilter =", classNameFilter);
        debug("coin_candlesticks paramSort =", paramSort);
        debug("coin_candlesticks specialFlag =", specialFlag);
        debug("coin_candlesticks queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);	    
        } else {
            var orderBy = "ORDER BY z.timestamptz, z.id";
            debug("coin_candlesticks orderBy =", orderBy);
	    // query nested with query so that only the max timestamp of a coin shows
	    // kludge to get started (uses UNION)
	    sql = "SELECT z.id, z.coins_symbol, z.timestamptz, z.period, z.open, z.high, z.low, z.close, z.name FROM coin_candlesticks z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Coin_Candlesticks();

// end
