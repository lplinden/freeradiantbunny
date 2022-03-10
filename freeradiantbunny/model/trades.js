/**
 * Module Trades.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Trades() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("trades instantiated", instanceCount);
    this.name = "trades";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("trades idOrNoId =", idOrNoId);
        debug("trades classNameFilter =", classNameFilter);
        debug("trades paramSort =", paramSort);
        debug("trades specialFlag =", specialFlag);
        debug("trades queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            if (classNameFilter) {
		orderBy = "order by z.id";
		debug("trades orderBy =", orderBy);
		var prefix;
		if (classNameFilter === "markets") {
		    prefix = "m";
		}
		if (classNameFilter === "coins") {
		    prefix = "c";
		}
		sql = "select z.sample_num, z.sort, z.id, z.img_url as img, z.name as name, c.symbol, c.img_url as img2, z.size, z.price, z.targets, z.entrance, z.stoploss, concat('<a href=\"markets/', m.id, '\">', m.name, '</a>') as market, m.img_url as img3, 'transaction_count' as transaction_count from trades as z, markets as m, coins as c where z.market_id = m.id AND z.coin_id = c.id AND " + prefix + ".id = cast('" + idOrNoId + "' as integer)" + orderBy;
	    } else {
		// single
		debug("trades idOrNoId =", idOrNoId);
		sql = "select z.id, z.name, z.img_url as img, z.description, z.status, z.sort, z.sample_num, z.size, z.market_id, z.coin_id, z.targets, z.entrance, z.stoploss from trades as z where z.id = cast('" + idOrNoId + "' as integer);";
	    }
        } else {
            orderBy = "order by z.id";
            debug("trades orderBy =", orderBy);
            sql = "select z.sample_num, z.sort, z.id, z.img_url as img, z.name as name, c.ticker, c.img_url as img2, z.size, 'size_tally' as size_tally, z.price, 'marketdata' as marketdata, z.entrance, z.stoploss, z.targets, round((cast(z.targets as numeric) - cast(z.entrance as numeric)) / (cast(z.entrance as numeric) - cast(z.stoploss as numeric)), 1) as rr_ratio, concat('<a href=\"markets/', m.id, '\">', m.name, '</a>') as market, m.img_url as img3, 'transaction_count' as transaction_count, coin_id from trades as z, markets as m, coins as c where z.market_id = m.id AND z.coin_id = c.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new Trades();

// end
