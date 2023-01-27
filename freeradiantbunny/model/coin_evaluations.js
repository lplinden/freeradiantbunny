/**
 * Module Coin_Evaluations.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Coin_Evaluations() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coin_evaluations instantiated", instanceCount);
    this.name = "coin_evaluations";
    this.schema = ['id',
		   'coins_symbol',
		   'last_updated',
		   'price',
		   'reasons',
		   'conclusion'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coin_evaluations idOrNoId =", idOrNoId);
        debug("coin_evaluations classNameFilter =", classNameFilter);
        debug("coin_evaluations paramSort =", paramSort);
	debug("coin_evaluations paramFilter =", paramFilter);
        debug("coin_evaluations specialFlag =", specialFlag);
        debug("coin_evaluations queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);	    
        } else {
            var orderBy = "ORDER BY z.last_updated DESC, z.conclusion DESC, z.coins_symbol";
            debug("coin_evaluations orderBy =", orderBy);
	    sql = "select z.id, to_char(z.last_updated at time zone 'est', 'YYYY-MM-DD HH24:MI') as last_updated, c.img_url as img, z.coins_symbol, z.price, z.reasons, z.conclusion from coin_evaluations z, coins c where z.coins_symbol = c.symbol AND z.last_updated = (select MAX(y.last_updated) from coin_evaluations y) " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Coin_Evaluations();

// end
