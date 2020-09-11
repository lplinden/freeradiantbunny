// Zachmans

var debug = require('debug')('frb');

var instanceCount = 0;

function Zachmans() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("zachmans instantiated", instanceCount);
    this.name = "zachmans";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("zachmans classNameFilter =", classNameFilter);
        debug("zachmans paramSort =", paramSort);
        debug("zachmans specialFlag =", specialFlag);
        debug("zachmans queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.name, z.status, z.sort, z.img_url, z.description, count(c.id) as classes_associated from zachmans z, classes c where z.id = c.zachman_id AND z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name";
            debug("sqlmaker paramSort =", paramSort);
            if (paramSort === "sort") {
                orderBy = "ORDER BY z.sort DESC, z.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY z.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY z.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY z.status, z.subsystem, z.name";
            }
            debug("sqlmaker orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description from zachmans z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Zachmans();

// end
