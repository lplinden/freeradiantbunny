/**
 * Module PlantHistories.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantHistories() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_histories instantiated", instanceCount);
    this.name = "plant_histories";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("plant_histories idOrNoId =", idOrNoId);
	debug("plant_histories classNameFilter =", classNameFilter);
        debug("plant_histories paramSort =", paramSort);
        debug("plant_histories specialFlag =", specialFlag);
        debug("plant_histories queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    if (classNameFilter == "plant_list_plants") {
		// special filter by plant_list_plant_id
		// save sql snippet:
		sql = "select ph.id, ph.plant_list_plant_id, pl.name as plant_list, p.id as plant_id, p.name as plant, array(select v.name from varieties v, seed_packets sp where v.id = sp.variety_id AND sp.id = ph.seed_packet_id) as variety_name, array(select count(ph.seed_packet_id) from plant_histories ph2 where ph2 = ph) as seed_packets_count from plant_histories ph, plant_list_plants plp, plant_lists pl, plants p WHERE plp.plant_id = p.id AND plp.plant_list_id = pl.id AND ph.plant_list_plant_id = plp.id AND plp.id = " + idOrNoId + " GROUP BY ph.id, pl.name, p.id;";
	    } else if (classNameFilter == "seed_packets") {
		// special filter by plant_list_plant_id
		//sql = "select ph.id, ph.plant_list_plant_id, pl.name as plant_list, p.id as plant_id, p.name as plant, count(ph.seed_packet_id) as seed_packets_count, concat('<a href=/plant_events/plant_histories/', ph.id, '>', count(pe.id), '</a>') as plant_events_count from plant_histories ph, plant_list_plants plp, plant_lists pl, plants p, plant_events pe WHERE pe.plant_history_id = ph.id AND plp.plant_id = p.id AND plp.plant_list_id = pl.id AND ph.plant_list_plant_id = plp.id AND plp.id = " + idOrNoId + " GROUP BY ph.id, ph.plant_list_plant_id, pl.name, p.id;";
		sql = "select ph.id, ph.plant_list_plant_id, ph.seed_packet_id, concat('<a href=/plant_events/plant_histories/', ph.id, '>', count(pe.id), '</a>') as plant_events_count from plant_histories ph, plant_events pe WHERE pe.plant_history_id = ph.id AND ph.seed_packet_id = " + idOrNoId + " GROUP BY ph.id;";
	    } else if (classNameFilter == "plant_lists") {
		orderBy = "ORDER BY p.name, ph.id";
		// backup
		sql = "select ph.id, ph.plant_list_plant_id, p.name as plant_name, v.name, array(select count(sp.id) from seed_packets sp, plant_histories ph2 where sp.id = ph2.seed_packet_id AND ph2.id = ph.id) as seed_packet_id from plant_histories ph, plant_lists pl, plant_list_plants plp, plants p, varieties v, seed_packets sp WHERE v.id = sp.variety_id AND sp.id = ph.seed_packet_id AND p.id = plp.plant_id AND ph.plant_list_plant_id = plp.id AND plp.plant_list_id = pl.id AND pl.id = " + idOrNoId + " " + orderBy + ";";
		// add full details of seed_packet_id
		sql = "select ph.id, ph.plant_list_plant_id, p.name as plant_name, v.name, array(select concat('sp_id=', sp.id, ', variety_id=', sp.variety_id, ',supplier=', su.name, ', contents=', sp.contents, ', sow_instructinos=', sp.sow_instructions, ', days_to_maturity=', sp.days_to_maturity) from seed_packets sp, plant_histories ph2, suppliers su where sp.supplier_id = su.id AND sp.id = ph2.seed_packet_id AND ph2.id = ph.id) as seed_packet_details from plant_histories ph, plant_lists pl, plant_list_plants plp, plants p, varieties v, seed_packets sp WHERE v.id = sp.variety_id AND sp.id = ph.seed_packet_id AND p.id = plp.plant_id AND ph.plant_list_plant_id = plp.id AND plp.plant_list_id = pl.id AND pl.id = " + idOrNoId + " " + orderBy + ";";
	    } else {
		sql = "select u.id, u.plant_list_plant_id, u.seed_packet_id from plant_histories u where u.id = " + idOrNoId + ";";
	    }
        } else {
            orderBy = "ORDER BY u.id";
            debug("plant_histories orderBy =", orderBy);
	    // the problem with the following sql is that:
	    // it only returns rows where the plant_events table is associated
            //sql = "select u.id, u.plant_list_plant_id, u.seed_packet_id, concat('<a href=/plant_events/plant_histories/', u.id, '>', count(pe.id), '</a>') as plant_events_count from plant_histories u, plant_events pe WHERE pe.plant_history_id = u.id GROUP BY u.id " + orderBy + "";
	    // this sql trys to solve the above issue by:
	    // using a select statement to get the data
	    // and letting the lib/moulder.js add the hypertext link
	    // sql does not return rows where there is no plant event
            // sql = "select u.id, u.plant_list_plant_id, u.seed_packet_id, array(select count(pe.id) from plant_events pe where pe.plant_history_id = u.id) as plant_events_count from plant_histories u, plant_events pe WHERE pe.plant_history_id = u.id GROUP BY u.id " + orderBy + "";
	    // try right join
	    orderBy = "ORDER BY u.plant_list_plant_id, u.seed_packet_id, u.id";
            sql = "select u.id, u.plant_list_plant_id, u.seed_packet_id, count(pe.id) as plant_events_count from plant_histories u LEFT JOIN plant_events pe on pe.plant_history_id = u.id GROUP BY u.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new PlantHistories();

// end
