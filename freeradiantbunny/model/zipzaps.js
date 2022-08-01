/**
 * Module Zipzaps.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Zipzaps() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("zipzaps instantiated", instanceCount);
    this.name = "zipzaps";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("zipzaps idOrNoId =", idOrNoId);
	debug("zipzaps classNameFilter =", classNameFilter);
        debug("zipzaps paramSort =", paramSort);
        debug("zipzaps specialFlag =", specialFlag);
        debug("zipzaps queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from zipzaps z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("zipzaps orderBy =", orderBy);
	    sql = "select z.id, z.name from zipzaps z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Zipzaps();

// end
