/**
 * Module Timecards.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Timecards() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("timecards instantiated", instanceCount);
    this.name = "timecards";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("timecards idOrNoId =", idOrNoId);
	debug("timecards classNameFilter =", classNameFilter);
        debug("timecards paramSort =", paramSort);
        debug("timecards specialFlag =", specialFlag);
        debug("timecards queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.description, z.date_in, z.time_in, z.date_out, z.time_out from timecards z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.id";
            debug("timecards orderBy =", orderBy);
	    sql = "select z.id, z.description, z.date_in, z.time_in, z.date_out, z.time_out from timecards z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Timecards();

// end
