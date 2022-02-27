/**
 * Module PlantEvents.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantEvents() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_events instantiated", instanceCount);
    this.name = "plant_events";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plant_events idOrNoId =", idOrNoId);
	debug("plant_events classNameFilter =", classNameFilter);
        debug("plant_events specialFlag =", specialFlag);
        debug("plant_events queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
            debug("plant_events idOrNoId =", idOrNoId);
            if (classNameFilter == "soil_areas") {
		orderBy = "ORDER BY pe.time, pe,task, pe.id";
		sql = "select pe.id, pe.name, concat('<a href=/plant_histories/', pe.plant_history_id, '>', pe.plant_history_id, '</a>') as plant_history_id, concat('<a href=/soil_areas/', pe.soil_area_id, '>', pe.soil_area_id, '</a>') as soil_area_id, pe.time, pe.task from plant_events pe, soil_areas sa WHERE pe.soil_area_id = sa.id AND sa.id = " + idOrNoId + " " + orderBy;
            } else if (classNameFilter == "plant_histories") {
		orderBy = "ORDER BY pe.time, pe.id";
		// archived working sql
		//sql = "select pe.id, pe.name, concat('<a href=/plant_histories/', pe.plant_history_id, '>', pe.plant_history_id, '</a>') as plant_history_id, concat('<a href=/soil_areas/', pe.soil_area_id, '>', pe.soil_area_id, '</a>') as soil_area_id, pe.time, pe.task from plant_events pe, soil_areas sa, plant_histories ph WHERE ph.id = pe.plant_history_id AND pe.soil_area_id = sa.id AND ph.id = " + idOrNoId + " " + orderBy;
		// experimental sql
		sql = "select pe.id, pe.name, pe.plant_history_id as plant_history_id, p.id as plant_id, p.name as plant_name, v.name as variety, b.name as bed_name, pe.soil_area_id as soil_area_id, sa.name as soil_area_name, pe.time, pe.task, pe.status as status from plant_events pe, soil_areas sa, plant_histories ph, plants p, varieties v, seed_packets sp, beds b WHERE sa.bed_id = b.id AND v.plant_id = p.id AND ph.seed_packet_id = sp.id AND sp.variety_id = v.id AND ph.id = pe.plant_history_id AND pe.soil_area_id = sa.id AND ph.id = " + idOrNoId + " " + orderBy;
	    } else {
		var id = idOrNoId;
		sql = "select pe.id, pe.name, pe.plant_history_id, pe.soil_area_id, pe.time, pe.task, pe.status from plant_events pe WHERE pe.id = " + id + ";";
	    }
        } else {
	    // default sort
            orderBy = "ORDER BY pe.time, pe, task";
            if (paramSort === "id") {
                orderBy = "ORDER BY pe.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY pe.name";
            }
            debug("plant_events orderBy =", orderBy);
            // many
            sql = "select pe.id, pe.name, pe.plant_history_id, pe.soil_area_id, pe.time, pe.task, pe.status from plant_events pe " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantEvents();

// end
