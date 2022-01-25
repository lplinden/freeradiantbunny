/**
 * Module Albums.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Albums() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("albums instantiated", instanceCount);
    this.name = "albums";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("albums classNameFilter =", classNameFilter);
        debug("albums paramSort =", paramSort);
	debug("albums specialFlag =", specialFlag);
        debug("albums queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.status, a.sort, a.id, a.name, a.year, a.cover_front_url as front_cover, a.cover_back_url, a.notes, a.album_url as img, a.description from albums a where a.id = " + id + ";";
        } else {
            orderBy = "ORDER BY a.name";
            if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            }
            debug("albums orderBy =", orderBy);
            // many
            sql = "select a.id, a.cover_front_url as front_cover, a.name from albums a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Albums();

// end
