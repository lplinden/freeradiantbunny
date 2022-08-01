/**
 * Module Soil_Tests.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Soil_Tests() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("soil_tests instantiated", instanceCount);
    this.name = "soil_tests";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("soil_tests idOrNoId =", idOrNoId);
	debug("soil_tests classNameFilter =", classNameFilter);
        debug("soil_tests paramSort =", paramSort);
        debug("soil_tests specialFlag =", specialFlag);
        debug("soil_tests queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from soil_tests z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("soil_tests orderBy =", orderBy);
	    sql = "select z.id, z.name from soil_tests z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Soil_Tests();

// end
