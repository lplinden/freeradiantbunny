/**
 * Module Classes.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Classes() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("classes instantiated", instanceCount);
    this.name = "classes";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("classes idOrNoId", idOrNoId);
        debug("classes classNameFilter =", classNameFilter);
	debug("classes paramSort=", paramSort);
	debug("classes specialFlag =", specialFlag);
        debug("classes queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.id, a.name, a.status, a.sort, a.img_url, a.description, a.subsystem_id, a.notes, a.zachman_id, a.dev, a.lookup from classes a where a.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY a.sort DESC, a.dev, a.subsystem_id, a.name";
            if (paramSort === "sort") {
                orderBy = "ORDER BY a.sort DESC, a.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY a.status, a.subsystem_id, a.name";
            } else if (paramSort === "subsystem_id") {
                orderBy = "ORDER BY a.subsystem_id, a.name";
            } else if (paramSort === "extends_class") {
                orderBy = "ORDER BY b.id, a.name";
            } else if (paramSort === "zachman_id") {
                orderBy = "ORDER BY a.zachman_id";
	    } else if (paramSort === "lookup") {
		orderBy = "ORDER BY a.lookup, a.name";
            }
            debug("classes orderBy =", orderBy);
            // many
            sql = "select a.status, a.sort, array(select z.name from zachmans z where a.zachman_id = z.id) as zachman, array(select s.name from subsystems s where a.subsystem_id = s.id) as subsystem, a.id, a.img_url as img, a.name as name, a.dev as dev, a.lookup as lookup from classes a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Classes();

// end
