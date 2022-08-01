/**
 * Module Units.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Units() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("units instantiated", instanceCount);
    this.name = "units";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("units idOrNoId =", idOrNoId);
	debug("units classNameFilter =", classNameFilter);
        debug("units paramSort =", paramSort);
        debug("units specialFlag =", specialFlag);
        debug("units queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from units z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("units orderBy =", orderBy);
	    sql = "select z.id, z.name from units z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Units();

// end
