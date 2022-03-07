/**
 * Module Filenames.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Filenames() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("filenames instantiated", instanceCount);
    this.name = "filenames";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("filenames idOrNoId =", idOrNoId);
	debug("filenames classNameFilter =", classNameFilter);
        debug("filenames paramSort =", paramSort);
        debug("filenames specialFlag =", specialFlag);
        debug("filenames queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select id from filenames where id = " + idOrNoId + ";";
        } else {
            orderBy = "order by id";
            debug("filenames orderBy =", orderBy);
	    sql = "select id from filenames " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Filenames();

// end
