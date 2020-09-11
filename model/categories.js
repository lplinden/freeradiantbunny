// Categories

var debug = require('debug')('frb');

var instanceCount = 0;

function Categories() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("categories instantiated", instanceCount);
    this.name = "categories";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("categories classNameFilter =", classNameFilter);
        debug("categories paramSort =", paramSort);
        debug("categories specialFlag =", specialFlag);
        debug("categories queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.img_url as img, z.name, z.description, concat('<a href=\"../hyperlinks/categories/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from categories z LEFT JOIN (SELECT b.id, b.category_id FROM hyperlink_categories b) b ON (z.id = b.category_id) WHERE z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            orderBy = "ORDER BY z.name";
            debug("sqlmaker paramSort =", paramSort);
            debug("sqlmaker orderBy =", orderBy);
            sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/categories/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from categories z LEFT JOIN (SELECT b.id, b.category_id FROM hyperlink_categories b) b ON (z.id = b.category_id) GROUP BY z.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Categories();

// end
