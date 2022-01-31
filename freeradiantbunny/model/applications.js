/**
 * Module Applications.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Applications() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("applications instantiated", instanceCount);
    this.name = "applications";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("applications idOrNoId =", idOrNoId);
	debug("applications classNameFilter =", classNameFilter);
        debug("applications paramSort =", paramSort);
        debug("applications specialFlag =", specialFlag);
        debug("applications queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    orderBy = "order by z.id";
	    debug("applications orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name as name, z.description, z.source_code_url, z.development, z.url from applications z where z.id = cast('" + idOrNoId + "' as integer);";
        } else {
            orderBy = "order by z.sort DESC, z.status, z.name, z.id";
            debug("applications orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name as name, z.description, z.url from applications z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Applications();

// end
