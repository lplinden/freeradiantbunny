/**
 * Module Postings.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Postings() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("postings instantiated", instanceCount);
    this.name = "postings";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("postings idOrNoId =", idOrNoId);
	debug("postings classNameFilter =", classNameFilter);
        debug("postings paramSort =", paramSort);
        debug("postings specialFlag =", specialFlag);
        debug("postings queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from postings z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("postings orderBy =", orderBy);
	    sql = "select z.id, z.name from postings z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Postings();

// end
