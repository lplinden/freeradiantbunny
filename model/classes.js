// Classes

var debug = require('debug')('frb');

var instanceCount = 0;

function Classes() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("classes instantiated", instanceCount);
    this.name = "classes";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("classes classNameFilter =", classNameFilter);
        debug("classes specialFlag =", specialFlag);
        debug("classes queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.id, a.name, a.status, a.sort, a.img_url, a.description, a.subsystem, a.notes, z.name as zachman, a.extends_class_id, b.name as extends_class from classes a, classes b, zachmans z where a.extends_class_id = b.id AND a.id = " + id + " AND a.zachman_id = z.id;";
        } else {
            orderBy = "ORDER BY a.sort DESC, a.name";
            debug("sqlmaker paramSort =", paramSort);
            if (paramSort === "sort") {
                orderBy = "ORDER BY a.sort DESC, a.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY a.status, a.subsystem, a.name";
            } else if (paramSort === "subsystem") {
                orderBy = "ORDER BY a.subsystem, a.name";
            } else if (paramSort === "extends_class") {
                orderBy = "ORDER BY b.id, a.name";
            } else if (paramSort === "zachmans") {
                orderBy = "ORDER BY z.name, a.name";
            }
            debug("sqlmaker orderBy =", orderBy);
            // many
            sql = "select a.status, a.sort, a.subsystem, a.id, a.img_url as img, a.name from classes a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Classes();

// end
