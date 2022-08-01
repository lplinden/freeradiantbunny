/**
 * Module Stake_Providers.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Stake_Providers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stake_providers instantiated", instanceCount);
    this.name = "stake_providers";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("stake_providers idOrNoId =", idOrNoId);
	debug("stake_providers classNameFilter =", classNameFilter);
        debug("stake_providers paramSort =", paramSort);
        debug("stake_providers specialFlag =", specialFlag);
        debug("stake_providers queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id from stake_providers z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.id";
            debug("stake_providers orderBy =", orderBy);
	    sql = "select z.id from stake_providers z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Stake_Providers();

// end
