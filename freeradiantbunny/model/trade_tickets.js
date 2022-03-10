/**
 * Module TradeTickets.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function TradeTickets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("trade_tickets instantiated", instanceCount);
    this.name = "trade_tickets";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("trade_tickets idOrNoId =", idOrNoId);
	debug("trade_tickets classNameFilter =", classNameFilter);
        debug("trade_tickets paramSort =", paramSort);
        debug("trade_tickets specialFlag =", specialFlag);
        debug("trade_tickets queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.alias, z.description, z.trade_state, z.coin_id, z.market_id from trade_tickets z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("trade_tickets orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.trade_state, z.coin_id, z.market_id from trade_tickets z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new TradeTickets();

// end
