/**
 * Module Coin_Emas.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Coin_Emas() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coin_emas instantiated", instanceCount);
    this.name = "coin_emas";
    this.schema = ['id',
		   'coins_symbol',
		   'last_updated',
		   'period',
		   'ema'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coin_emas idOrNoId =", idOrNoId);
        debug("coin_emas classNameFilter =", classNameFilter);
        debug("coin_emas paramSort =", paramSort);
        debug("coin_emas specialFlag =", specialFlag);
        debug("coin_emas queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);	    
        } else {
            var orderBy = "ORDER BY z.last_updated DESC, z.coins_symbol, z.period";
            debug("coin_emas orderBy =", orderBy);
	    sql = "SELECT z.id, z.coins_symbol, to_char(z.last_updated at time zone 'est', 'YYYY-MM-DD-HH24:MI') as last_updated, z.period, z.ema FROM coin_emas z WHERE z.last_updated = (select max(y.last_updated) from coin_emas y)" + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Coin_Emas();

// end
