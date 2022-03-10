/**
 * Module Stages.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Stages() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stages instantiated", instanceCount);
    this.name = "stages";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("stages idOrNoId =", idOrNoId);
	debug("stages classNameFilter =", classNameFilter);
        debug("stages paramSort =", paramSort);
        debug("stages specialFlag =", specialFlag);
        debug("stages queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.name, z.pos from stages z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.pos";
            debug("stages orderBy =", orderBy);
	    sql = "select z.id, z.name, z.pos from stages z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Stages();

// end
