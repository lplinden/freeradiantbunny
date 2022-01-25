/**
 * Module Marketdatas.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Marketdatas() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("markets instantiated", instanceCount);
    this.name = "marketdatas";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("markets classNameFilter =", classNameFilter);
        debug("markets paramSort =", paramSort);
        debug("markets specialFlag =", specialFlag);
        debug("markets queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            if (classNameFilter) {
		orderBy = "order by z.id";
		debug("marketdatas orderBy =", orderBy);
		var prefix;
		if (classNameFilter === "coins") {
		    prefix = "c";
		}
		sql = "select z.status, z.sort, z.id, z.name as symbol, z.description, z.circulating_supply, z.ma10, z.ma30, z.price, z.market_cap, z.volume, z.market_count, z.stage, z.rank, z.date_of_record, z.exchange from marketdatas as z where z.id = cast('" + idOrNoId + "' as integer)" + orderBy;
	    } else {
              // single
		debug("marketdatas idOrNoId =", idOrNoId);
		sql = "select z.sort, z.id, z.nam, z.exchange from marketdatas as z where z.id = cast('" + idOrNoId + "' as integer);";
	    }
        } else {
            orderBy = "order by z.id";
            debug("marketdatas orderBy =", orderBy);
            sql = "select z.status, z.sort, z.date_of_record, z.exchange, z.id, z.name as symbol, z.description, z.price, z.ma10, z.ma12, z.ma26, z.ma30, z.volume, z.stage, z.rank, 'signal' as signal, z.circulating_supply, z.market_cap, z.market_count from marketdatas as z " + orderBy + ";";
	}
        return sql;
    };
}

module.exports = new Marketdatas();

// end
