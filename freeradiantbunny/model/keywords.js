/**
 * Module Keywords.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Keywords() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("keywords instantiated", instanceCount);
    this.name = "keywords";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("keywords idOrNoId =", idOrNoId);
	debug("keywords classNameFilter =", classNameFilter);
        debug("keywords paramSort =", paramSort);
        debug("keywords specialFlag =", specialFlag);
        debug("keywords queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("keywords orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from keywords z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Keywords();

// end
