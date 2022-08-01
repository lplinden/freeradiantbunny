/**
 * Module Providers.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Providers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("providers instantiated", instanceCount);
    this.name = "providers";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("providers idOrNoId =", idOrNoId);
	debug("providers classNameFilter =", classNameFilter);
        debug("providers paramSort =", paramSort);
        debug("providers specialFlag =", specialFlag);
        debug("providers queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name, z.address, z.url from providers z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("providers orderBy =", orderBy);
	    sql = "select z.id, z.name, z.address, z.url from providers z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Providers();

// end
