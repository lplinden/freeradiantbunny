/**
 * Module Tools.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Tools() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tools instantiated", instanceCount);
    this.name = "tools";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("tools idOrNoId =", idOrNoId);
	debug("tools classNameFilter =", classNameFilter);
        debug("tools paramSort =", paramSort);
        debug("tools specialFlag =", specialFlag);
        debug("tools queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description from tools z WHERE z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("tools orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from tools z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Tools();

// end
