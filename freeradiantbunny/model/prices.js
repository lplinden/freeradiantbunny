/**
 * Module Prices.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Prices() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("prices instantiated", instanceCount);
    this.name = "prices";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("prices idOrNoId =", idOrNoId);
	debug("prices classNameFilter =", classNameFilter);
        debug("prices paramSort =", paramSort);
        debug("prices specialFlag =", specialFlag);
        debug("prices queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from prices z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("prices orderBy =", orderBy);
	    sql = "select z.id, z.name from prices z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Prices();

// end
