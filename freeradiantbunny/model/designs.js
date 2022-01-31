/**
 * Module designs.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Designs() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("designs instantiated", instanceCount);
    this.name = "designs";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("designs classNameFilter =", classNameFilter);
        debug("designs paramSort =", paramSort);
        debug("designs specialFlag =", specialFlag);
	debug("designs queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.id, a.name, a.status, a.sort, a.img_url, a.description from designs a where a.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY a.sort DESC, a.name";
            if (paramSort === "sort") {
                orderBy = "ORDER BY a.sort DESC, a.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY a.status, a.subsystem, a.name";
            }
            debug("designs orderBy =", orderBy);
            // many
            sql = "select a.status, a.sort, a.id, a.img_url as img, a.name as name from designs a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Designs();

// end
