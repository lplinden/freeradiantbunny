/**
 * Module Deposits.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Deposits() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("deposits instantiated", instanceCount);
    this.name = "deposits";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("deposits idOrNoId =", idOrNoId);
	debug("deposits classNameFilter =", classNameFilter);
        debug("deposits paramSort =", paramSort);
        debug("deposits specialFlag =", specialFlag);
        debug("deposits queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.delegation_id, z.coin_id, z.amount, z.tx_hash, z.tx_fee, z.scan_url from deposits z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.id";
            debug("deposits orderBy =", orderBy);
	    sql = "select z.id, z.delegation_id, z.coin_id, z.amount, concat('<a href=\"', z.scan_url, z.tx_hash, '\">', z.tx_hash, '</a>'), z.tx_fee from deposits z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Deposits();

// end
