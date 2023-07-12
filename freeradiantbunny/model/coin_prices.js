/**
 * Module Coin_Prices.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Coin_Prices() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coin_prices instantiated", instanceCount);
    this.name = "coin_prices";
    this.schema = ['id',
		   'coins_symbol',
		   'cmc_rank',
		   'last_updated',
		   'quote_denominator',
		   'price',
		   'volume_24h',
		   'percent_change_1h',
		   'percent_change_24h',
		   'percent_change_7d',
		   'volume_change_24h',
		   'source_url',
		   'cmc_coin_id',
		   'baseline'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coin_prices idOrNoId =", idOrNoId);
        debug("coin_prices classNameFilter =", classNameFilter);
        debug("coin_prices paramSort =", paramSort);
	debug("coin_prices paramFilter =", paramFilter);
        debug("coin_prices specialFlag =", specialFlag);
        debug("coin_prices queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);	    
        } else {
            var orderBy = "ORDER BY z.last_updated DESC, z.percent_change_1h DESC, z.id";
            debug("coin_prices orderBy =", orderBy);
	    // query nested with query
	    // so that only the max timestamp of a coin shows
	    // the trick is the use the IN keyword for subqueries...
	    // that return multiple columns
	    // last working
	    if (paramFilter == "XRP") {
		// try this
		sql = "select z.id, to_char(z.last_updated at time zone 'est', 'YYYY-MM-DD HH24:MI') as last_updated, c.img_url as img, z.coins_symbol, z.quote_denominator as den, z.baseline, z.price, z.percent_change_1h, z.percent_change_24h, z.percent_change_7d, z.volume_24h, z.volume_change_24h, z.source_url from coin_prices z, coins c WHERE c.symbol = z.coins_symbol AND z.quote_denominator='XRP' AND z.last_updated = (select max(y.last_updated) from coin_prices y WHERE y.quote_denominator = 'XRP') " + orderBy + ";";
		// not working
		//sql = "select z.id, to_char(z.last_updated at time zone 'est', 'YYYY-MM-DD HH24:MI') as last_updated, y.img_url as img, z.coins_symbol, z.quote_denominator as den, z.baseline, z.price, z.percent_change_1h, z.percent_change_24h, z.percent_change_7d, z.volume_24h, z.volume_change_24h, z.source_url from coin_prices z, coins c WHERE c.symbol = z.coins_symbol AND z.last_updated = (select max(y.last_updated) from coin_prices y WHERE z.quote_denominator = 'XRP' AND y.coins_symbol IN (select d.symbol from coins d where d.watch='true')) AND z.coins_symbol IN (select c.symbol from coins c where c.watch='true') " + orderBy + ";";
	    } else {
		// on hold
		//sql = "select z.id, z.cmc_rank, to_char(z.last_updated at time zone 'est', 'YYYY-MM-DD HH24:MI') as last_updated, y.img_url as img, z.coins_symbol, z.quote_denominator as den, z.price, z.percent_change_1h, z.percent_change_24h, z.percent_change_7d, z.volume_24h, z.volume_change_24h, z.source_url from coin_prices z, coins y WHERE y.symbol = z.coins_symbol AND z.last_updated = (select max(y.last_updated) from coin_prices y WHERE z.quote_denominator = 'USD' AND y.coins_symbol IN (select d.symbol from coins d where d.watch='true')) AND z.coins_symbol IN (select c.symbol from coins c where c.watch='true') " + orderBy + ";";
		// simple
		sql = "select z.id, z.coins_symbol as symbol, z.price, z.run_count as run, z.big as big, z.vlf as vlf, z.run_slice as slice, z.was as was, z.target, z.chg as chg, z.chg_trades, z.trades_balance, z.trades_comp, z.now as now, z.percent_change_1h as perc_ch_1h, z.percent_change_24h as perc_ch_24h, z.volume_change_24h as vol_ch_24h, z.percent_change_7d as perc_ch_7d, z.last_updated from coin_prices z where z.last_updated = (select y.last_updated from coin_prices y order by y.last_updated DESC limit 1)" + orderBy + ";";
	    }
	}
	return sql;
    };
}

module.exports = new Coin_Prices();

// end
