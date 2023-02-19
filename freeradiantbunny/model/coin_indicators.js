/**
 * Module CoinIndicators.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function CoinIndicators() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coin_indicators instantiated", instanceCount);
    this.name = "coin_indicators";
    this.schema = ['id',
		   'coins_symbol',
		   'last_updated',
		   'signal_line',
		   'measurement',
		  'measurement_change'];
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
            debug("coin_indicators orderBy =", orderBy);
	    // query nested with query so that only the max timestamp of a coin shows
	    // kludge to get started (uses UNION)
	    sql = "SELECT z.id, z.coins_symbol, to_char(z.last_updated at time zone 'est', 'YYYY-MM-DD-HH24:MI') as last_updated, m.macd as macd, z.signal_line, (m.macd - cast(z.signal_line as DOUBLE PRECISION)) as diff, z.measurement, z.measurement_change FROM coin_indicators z, coin_macds m WHERE m.coins_symbol = z.coins_symbol AND m.last_updated = z.last_updated AND (select max(y.last_updated) from coin_indicators y) = z.last_updated " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new CoinIndicators();

// end
