/**
 * Module Hyperlink_Permaculture_Topics.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Hyperlink_Permaculture_Topics() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("hyperlink_permaculture_topics instantiated", instanceCount);
    this.name = "hyperlink_permaculture_topics";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("hyperlink_permaculture_topics idOrNoId =", idOrNoId);
	debug("hyperlink_permaculture_topics classNameFilter =", classNameFilter);
        debug("hyperlink_permaculture_topics paramSort =", paramSort);
        debug("hyperlink_permaculture_topics specialFlag =", specialFlag);
        debug("hyperlink_permaculture_topics queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from hyperlink_permaculture_topics z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("hyperlink_permaculture_topics orderBy =", orderBy);
	    sql = "select z.id, z.name from hyperlink_permaculture_topics z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Hyperlink_Permaculture_Topics();

// end
