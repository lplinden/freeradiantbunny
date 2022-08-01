/**
 * Module CoinMarkets.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function CoinMarkets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coins instantiated", instanceCount);
    this.name = "coins";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("coins idOrNoId =", idOrNoId);
        debug("coins classNameFilter =", classNameFilter);
        debug("coins paramSort =", paramSort);
        debug("coins specialFlag =", specialFlag);
        debug("coins queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, coin_id, market_id from coin_markets z WHERE z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.id";
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