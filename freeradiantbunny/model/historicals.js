/**
 * Module Historicals.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Historicals() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("historicals instantiated", instanceCount);
    this.name = "historicals";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("historicals idOrNoId =", idOrNoId);
	debug("historicals classNameFilter =", classNameFilter);
        debug("historicals paramSort =", paramSort);
        debug("historicals specialFlag =", specialFlag);
        debug("historicals queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id from historicals z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.id";
            debug("historicals orderBy =", orderBy);
	    sql = "select z.id from historicals z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Historicals();

// end
