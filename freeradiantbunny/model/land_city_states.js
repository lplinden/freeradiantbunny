/**
 * Module Land_City_States.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Land_City_States() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("land_city_states instantiated", instanceCount);
    this.name = "land_city_states";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("land_city_states idOrNoId =", idOrNoId);
	debug("land_city_states classNameFilter =", classNameFilter);
        debug("land_city_states paramSort =", paramSort);
        debug("land_city_states specialFlag =", specialFlag);
        debug("land_city_states queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from land_city_states z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("land_city_states orderBy =", orderBy);
	    sql = "select z.id, z.name from land_city_states z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Land_City_States();

// end
