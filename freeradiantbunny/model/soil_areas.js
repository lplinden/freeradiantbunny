/**
 * Module SoilAreas.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function SoilAreas() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("soil_areas instantiated", instanceCount);
    this.name = "soil_areas";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("soil_areas classNameFilter =", classNameFilter);
        debug("soil_areas specialFlag =", specialFlag);
        debug("soil_areas queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
            if (classNameFilter == "beds") {
		debug("soil_areas idOrNoId =", idOrNoId);
                orderBy = "ORDER BY sa.name";
		sql = "select sa.id as id, sa.name as name, sa.sort as sort, concat('<a href=/plant_events/soil_areas/', sa.id, '>', count(pe.id), '</a>') as plant_events_count from soil_areas sa, beds b, plant_events pe where pe.soil_area_id = sa.id AND b.id = " + idOrNoId + " AND b.id = sa.bed_id GROUP BY sa.id " + orderBy + ";";
	    } else {
		var id = idOrNoId;
		sql = "select sa.id as id, sa.name as name, b.id as bed_id, b.name as bed_name, sa.status, sa.description, concat('<a href=/plant_events/soil_areas/', sa.id, '>', count(pe.id), '</a>') as plant_events_count from soil_areas sa, beds b, plant_events pe where pe.soil_area_id = sa.id AND b.id = sa.bed_id AND sa.id = " + id + " GROUP BY sa.id, b.id;";
	    }
        } else {
            //orderBy = "ORDER BY sa.sort DESC, sa.name";
            orderBy = "ORDER BY l.name, b.name, sa.name, sa.id";
            if (paramSort === "id") {
                orderBy = "ORDER BY sa.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY sa.name";
            }
            debug("soil_areas orderBy =", orderBy);
            // many
            //sql = "select l.id, l.name, b.id, b.name, sa.id, sa.name, sa.sort from soil_areas sa, beds b, lands l WHERE b.id = sa.bed_id AND l.id = b.land_id " + orderBy;
            sql = "select l.id as land_id, l.name as land_name, b.id as bed_id, b.name as bed_name, sa.id as id, sa.name as name, sa.dimensions, array(select concat('<a href=../plant_events/', pe.id, '>', pe.name, '</a>') from plant_events pe where pe.soil_area_id = sa.id) as plant_events from soil_areas sa, beds b, lands l WHERE sa.bed_id = b.id AND b.land_id = l.id  " + orderBy;
        }
        return sql;
    };
}

module.exports = new SoilAreas();

// end
