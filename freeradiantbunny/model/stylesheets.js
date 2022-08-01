/**
 * Module Stylesheets.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Stylesheets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stylesheets instantiated", instanceCount);
    this.name = "stylesheets";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("stylesheets idOrNoId =", idOrNoId);
	debug("stylesheets classNameFilter =", classNameFilter);
        debug("stylesheets paramSort =", paramSort);
        debug("stylesheets specialFlag =", specialFlag);
        debug("stylesheets queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from stylesheets z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("stylesheets orderBy =", orderBy);
	    sql = "select z.id, z.name from stylesheets z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Stylesheets();

// end
