/**
 * Module Observations.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Observations() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("observations instantiated", instanceCount);
    this.name = "observations";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("observations idOrNoId =", idOrNoId);
	debug("observations classNameFilter =", classNameFilter);
        debug("observations paramSort =", paramSort);
        debug("observations specialFlag =", specialFlag);
        debug("observations queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from observations z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("observations orderBy =", orderBy);
	    sql = "select z.id, z.name from observations z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Observations();

// end
