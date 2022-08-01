/**
 * Module Tickets.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Tickets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tickets instantiated", instanceCount);
    this.name = "tickets";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("tickets idOrNoId =", idOrNoId);
	debug("tickets classNameFilter =", classNameFilter);
        debug("tickets paramSort =", paramSort);
        debug("tickets specialFlag =", specialFlag);
        debug("tickets queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from tickets z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("tickets orderBy =", orderBy);
	    sql = "select z.id, z.name from tickets z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Tickets();

// end
