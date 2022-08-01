/**
 * Module Land_Width_Lengths.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Land_Width_Lengths() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("land_width_lengths instantiated", instanceCount);
    this.name = "land_width_lengths";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("land_width_lengths idOrNoId =", idOrNoId);
	debug("land_width_lengths classNameFilter =", classNameFilter);
        debug("land_width_lengths paramSort =", paramSort);
        debug("land_width_lengths specialFlag =", specialFlag);
        debug("land_width_lengths queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from land_width_lengths z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("land_width_lengths orderBy =", orderBy);
	    sql = "select z.id, z.name from land_width_lengths z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Land_Width_Lengths();

// end
