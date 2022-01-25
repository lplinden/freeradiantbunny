/**
 * Module Databases.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Databases() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("databases instantiated", instanceCount);
    this.name = "databases";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("databases classNameFilter =", classNameFilter);
        debug("databases paramSort =", paramSort);
        debug("databases specialFlag =", specialFlag);
        debug("databases queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    orderBy = "order by z.id";
	    debug("databases orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name as name, z.description from databases z where z.id = cast('" + idOrNoId + "' as integer);";
        } else {
            orderBy = "order by z.sort DESC, z.name, z.id";
            debug("databases orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as image, z.name as name, z.description from databases z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Databases();

// end
