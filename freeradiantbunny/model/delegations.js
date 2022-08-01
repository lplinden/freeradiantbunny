/**
 * Module Delegations.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Delegations() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("delegations instantiated", instanceCount);
    this.name = "delegations";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("delegations idOrNoId =", idOrNoId);
	debug("delegations classNameFilter =", classNameFilter);
        debug("delegations paramSort =", paramSort);
        debug("delegations specialFlag =", specialFlag);
        debug("delegations queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name, z.address from delegations z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("delegations orderBy =", orderBy);
	    sql = "select z.id, z.name, z.address from delegations z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Delegations();

// end
