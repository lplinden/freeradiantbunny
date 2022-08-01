/**
 * Module WebpageMaxonomies.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function WebpageMaxonomies() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("webpage_maxonomies instantiated", instanceCount);
    this.name = "wepage_maxonomies";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("webpage_maxonomies idOrNoId =", idOrNoId);
	debug("webpage_maxonomies classNameFilter =", classNameFilter);
        debug("webpage_maxonomies paramSort =", paramSort);
        debug("webpage_maxonomies specialFlag =", specialFlag);
        debug("webpage_maxonomies queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.webpage_id, z.maxonomy_id from webpage_maxonomies z WHERE z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY m.name";
            debug("webpage_maxonomies orderBy =", orderBy);
            sql = "select z.id, z.webpage_id, wp.name as webpage_name, z.maxonomy_id, m.name as maxonomy_name from webpage_maxonomies z, webpages wp, maxonomies m where z.webpage_id = wp.id AND z.maxonomy_id = m.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new WebpageMaxonomies();

// end
