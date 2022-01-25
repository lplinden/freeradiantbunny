/**
 * Module Beds.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Beds() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("beds instantiated", instanceCount);
    this.name = "beds";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("beds classNameFilter =", classNameFilter);
	debug("beds paramSort =", paramSort);
	debug("beds specialFlag =", specialFlag);
        debug("beds queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
            if (classNameFilter == "lands") {
		debug("beds idOrNoId =", idOrNoId);
		orderBy = "ORDER BY b.name";
		sql = "select b.id, b.name, b.sort, count(sa.id) as soil_areas_count from beds b, soil_areas sa, lands l where sa.bed_id = b.id AND l.id = " + idOrNoId + " AND l.id = b.land_id GROUP BY b.id " +  orderBy + ";";
	    } else {
		var id = idOrNoId;
		sql = "select a.id, a.name, a.sort, count(sa.id) as soil_areas_count from beds a, soil_areas sa where a.id = sa.bed_id AND a.id = " + id + " GROUP BY a.id;";
	    }
        } else {
            orderBy = "ORDER BY b.sort DESC, b.name";
            if (paramSort === "id") {
                orderBy = "ORDER BY b.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY b.name";
            }
            debug("beds orderBy =", orderBy);
            // many
            sql = "select l.id as land_id, l.name as land_name, b.id as id, b.name as name, array(select sa2.name from soil_areas sa2 where sa2.bed_id = b.id) as soil_areas, count(sa.id) as soil_areas_count from beds b, lands l, soil_areas sa where b.land_id = l.id AND b.id = sa.bed_id GROUP BY l.id, b.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new Beds();

// end
