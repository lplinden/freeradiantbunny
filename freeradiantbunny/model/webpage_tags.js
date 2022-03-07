/**
 * Module WebpageTags.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function WebpageTags() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("webpage_tags instantiated", instanceCount);
    this.name = "webpage_tags";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("webpage_tags idOrNoId =", idOrNoId);
	debug("webpage_tags classNameFilter =", classNameFilter);
        debug("webpage_tags paramSort =", paramSort);
        debug("webpage_tags specialFlag =", specialFlag);
        debug("webpage_tags queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.webpage_id, z.tag_id from webpage_tags z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY t.name, w.name, w.id";
            debug("webpage_tags orderBy =", orderBy);
            sql = "select wt.id, wt.webpage_id, w.name as webpage_name, wt.tag_id, t.name as tag_name from webpage_tags wt, webpages w, tags t where w.id = wt.webpage_id AND t.id = wt.tag_id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new WebpageTags();

// end
