/**
 * Module CoinSignals.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function CoinSignals() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coin_signals instantiated", instanceCount);
    this.name = "coin_signals";
    this.schema = ['id',
		   'coins_symbol',
		   'coin_evaluations_id',
		   'last_updated_buy',
		   'price_buy',
		   'units',
		   'last_updated_sell',
		   'price_sell',
		   'duration',
		   'profit_or_loss',
		   'trade_completed'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coin_signals idOrNoId =", idOrNoId);
        debug("coin_signals classNameFilter =", classNameFilter);
        debug("coin_signals paramSort =", paramSort);
        debug("coin_signals specialFlag =", specialFlag);
        debug("coin_signals queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);	    
        } else {
            var orderBy = "ORDER BY z.last_updated_buy DESC, z.coins_symbol";
            debug("coin_signals orderBy =", orderBy);
	    sql = "SELECT z.id, z.coins_symbol as symbol, concat('<a href=\"../coin_evaluations/', z.coin_evaluations_id,";
	    if (typeof paramUpkIsValid != "undefined") {
		sql += " '?" + paramUpkIsValid + "', ";
	    }
	    sql += "'\">', z.coin_evaluations_id, '</a>') as eval_id, to_char(z.last_updated_buy at time zone 'est', 'YYYY-MM-DD-HH24:MI') as last_updated_buy, z.price_buy, z.units, to_char(z.last_updated_sell at time zone 'est', 'YYYY-MM-DD-HH24:MI') as last_updated_sell, z.price_sell, z.duration, z.profit_or_loss, z.trade_completed FROM coin_signals z " + orderBy + " LIMIT 100;";
	}
	return sql;
    };
}

module.exports = new CoinSignals();

// end
