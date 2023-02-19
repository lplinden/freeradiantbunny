/**
 * Module TradeTickets.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function TradeTickets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("trade_tickets instantiated", instanceCount);
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'generated_ts',
		   'coins_symbol',
		   'base_coins_symbol',
		   'trading_pair',
		   'markets_id',
		   'trade_state',
		   'signal_buy_stories',
		   'entry_setup_price',
		   'target_price',
		   'stoploss_price',
		   'risk_ratio',
		   'amount',
		   'enter_transactions_id',
		   'exit_transactions_id',
		   'partial_trade_tickets_id',
		   'trade_ts',
		   'entry_actual_price',
		   'signal_sell_stories',
		   'stoploss_triggered_ts',
		   'exit_price',
		   'exit_amount',
		   'partial_amount',
		   'performance_measures',
		   'tnx_ref'];
    this.inboundForeignKeyTables = [];
    this.name = "trade_tickets";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("trade_tickets idOrNoId =", idOrNoId);
	debug("trade_tickets classNameFilter =", classNameFilter);
        debug("trade_tickets paramSort =", paramSort);
        debug("trade_tickets specialFlag =", specialFlag);
        debug("trade_tickets queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("trade_tickets orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.trade_state, z.coins_symbol, z.markets_id from trade_tickets z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new TradeTickets();

// end
