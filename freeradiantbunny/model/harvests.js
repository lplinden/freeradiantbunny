/**
 * Module Harvests.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Harvests() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("harvests instantiated", instanceCount);
    this.name = "harvests";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("harvests idOrNoId =", idOrNoId);
	debug("harvests classNameFilter =", classNameFilter);
        debug("harvests paramSort =", paramSort);
        debug("harvests specialFlag =", specialFlag);
        debug("harvests queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from harvests z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("harvests orderBy =", orderBy);
	    sql = "select z.id, z.name from harvests z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Harvests();

// end
