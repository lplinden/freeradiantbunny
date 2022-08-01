/**
 * Module Stakes.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Stakes() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stakes instantiated", instanceCount);
    this.name = "stakes";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("stakes idOrNoId =", idOrNoId);
	debug("stakes classNameFilter =", classNameFilter);
        debug("stakes paramSort =", paramSort);
        debug("stakes specialFlag =", specialFlag);
        debug("stakes queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id from stakes z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.id";
            debug("stakes orderBy =", orderBy);
	    sql = "select z.id  from stakes z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Stakes();

// end
