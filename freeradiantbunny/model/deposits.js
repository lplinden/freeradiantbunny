/**
 * Module Deposits.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Deposits() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("deposits instantiated", instanceCount);
    this.name = "deposits";
    this.schema = ['id',
		   'coins_symbol',
		   'delegations_id',
		   'name',
		   'amount',
		   'tx_hash',
		   'tx_fee',
		   'scan_url'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("deposits idOrNoId =", idOrNoId);
	debug("deposits classNameFilter =", classNameFilter);
        debug("deposits paramSort =", paramSort);
        debug("deposits specialFlag =", specialFlag);
        debug("deposits queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id";
            debug("deposits orderBy =", orderBy);
	    sql = "select z.id, z.delegations_id, z.coins_symbol, z.amount, concat('<a href=\"', z.scan_url, z.tx_hash, '\">', z.tx_hash, '</a>'), z.tx_fee from deposits z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Deposits();

// end
