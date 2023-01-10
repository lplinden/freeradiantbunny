/**
 * Module CoinMarkets.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function CoinMarkets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coins instantiated", instanceCount);
    this.name = "coin_markets";
    this.schema = ['id',
		   'markets_id',
		   'coins_symbol'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coins idOrNoId =", idOrNoId);
        debug("coins classNameFilter =", classNameFilter);
        debug("coins paramSort =", paramSort);
        debug("coins specialFlag =", specialFlag);
        debug("coins queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id";
            if (paramSort === "coin_id") {
                orderBy = "ORDER BY z.coin_id, z..id";
	    }
            if (paramSort === "market_id") {
                orderBy = "ORDER BY z.market_id, z.id";
	    }
            debug("coins orderBy =", orderBy);
            sql = "select z.id, z.coin_id, c.ticker as coin, z.market_id, m.name as market from coin_markets z, coins c, markets m where z.coin_id = c.id AND z.market_id = m.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new CoinMarkets();

// end
