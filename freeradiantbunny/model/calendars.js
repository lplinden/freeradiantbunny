/**
 * Module Calendars.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Calendars() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("calendars instantiated", instanceCount);
    this.name = "calendars";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("calendars idOrNoId =", idOrNoId);
	debug("calendars classNameFilter =", classNameFilter);
        debug("calendars paramSort =", paramSort);
        debug("calendars specialFlag =", specialFlag);
        debug("calendars queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from calendars z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("calendars orderBy =", orderBy);
	    sql = "select z.id, z.name from calendars z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Calendars();

// end
