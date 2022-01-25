/**
 * Module Reasons.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Reasons() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("Reasons instantiated", instanceCount);
    this.name = "reasons";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("reasons classNameFilter =", classNameFilter);
        debug("reasons paramSort =", paramSort);
        debug("reasons specialFlag =", specialFlag);
        debug("reasons queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.img_url as img, z.name, z.description, concat('<a href=\"../hyperlinks/reasons/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from reasons z LEFT JOIN (SELECT b.id, b.reason_id FROM hyperlink_reasons b) b ON (z.id = b.reason_id) WHERE z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            orderBy = "ORDER BY z.orderby";
            debug("reasons orderBy =", orderBy);
            sql = "SELECT z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/reasons/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount FROM reasons z LEFT JOIN (SELECT b.id, b.reason_id FROM hyperlink_reasons b) b ON (z.id = b.reason_id) GROUP BY z.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new Reasons();

// end
