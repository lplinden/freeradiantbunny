/**
 * Module Classes_Tags.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Classes_Tags() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("classes_tags instantiated", instanceCount);
    this.name = "classes_tags";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("classes_tags idOrNoId =", idOrNoId);
	debug("classes_tags classNameFilter =", classNameFilter);
        debug("classes_tags paramSort =", paramSort);
        debug("classes_tags specialFlag =", specialFlag);
        debug("classes_tags queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from classes_tags z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("classes_tags orderBy =", orderBy);
	    sql = "select z.id, z.name from classes_tags z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Classes_Tags();

// end
