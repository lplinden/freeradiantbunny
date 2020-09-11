// Tags

var debug = require('debug')('frb');

var instanceCount = 0;

function Tags() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("gags instantiated", instanceCount);
    this.name = "tags";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("tags classNameFilter =", classNameFilter);
        debug("tags paramSort =", paramSort);
        debug("tags specialFlag =", specialFlag);
        debug("tags queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.img_url as img, z.name, z.description, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) WHERE z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            orderBy = "ORDER BY z.name";
            debug("sqlmaker paramSort =", paramSort);
            debug("sqlmaker orderBy =", orderBy);
            sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) GROUP BY z.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Tags();

// end
