/**
 * Module Courses.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Courses() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("courses instantiated", instanceCount);
    this.name = "courses";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("courses idOrNoId =", idOrNoId);
	debug("courses classNameFilter =", classNameFilter);
        debug("courses paramSort =", paramSort);
        debug("courses specialFlag =", specialFlag);
        debug("courses queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from courses z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("courses orderBy =", orderBy);
	    sql = "select z.id, z.name from courses z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Courses();

// end
