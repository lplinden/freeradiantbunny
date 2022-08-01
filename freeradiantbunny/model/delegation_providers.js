/**
 * Module Delegation_Providers.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Delegation_Providers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("delegation_providers instantiated", instanceCount);
    this.name = "delegation_providers";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("delegation_providers idOrNoId =", idOrNoId);
	debug("delegation_providers classNameFilter =", classNameFilter);
        debug("delegation_providers paramSort =", paramSort);
        debug("delegation_providers specialFlag =", specialFlag);
        debug("delegation_providers queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.delegation_id, z.provider_id, z.bips, z.call_date, z.tx_hash, z.tx_fee, z.scan_url from delegation_providers z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.id";
            debug("delegation_providers orderBy =", orderBy);
	    sql = "select z.id, z.delegation_id, z.provider_id, z.bips, z.call_date, concat('<a href=\"', z.scan_url, z.tx_hash, '\">', z.tx_hash, '</a>'), z.tx_fee from delegation_providers z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Delegation_Providers();

// end
