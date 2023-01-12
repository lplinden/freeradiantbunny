/**
 * Module SeedPackets.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function SeedPackets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("seed_packets instantiated", instanceCount);
    this.name = "seed_packets";
    this.schema = ['id',
		   'packed_for_year',
		   'contents',
		   'sow_instructions',
		   'days_to_maturity',
		   'days_to_germination',
		   'notes',
		   'product_details',
		   'status',
		   'url',
		   'varieties_id',
		   'suppliers_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("seed_packets idOrNoId =", idOrNoId);
	debug("seed_packets classNameFilter =", classNameFilter);
        debug("seed_packets paramSort =", paramSort);
        debug("seed_packets specialFlag =", specialFlag);
        debug("seed_packets queryTerms =", queryTerms);
        var sql;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    if (classNameFilter == "plant_histories") {
		sql = "select u.id, u.variety_id, v.name as variety_name, u.supplier_id, s.name as supplier_name, u.url, contents, days_to_maturity as days, sow_instructions, concat('<a href=/plant_events/plant_histories/', ph.id, '>', count(pe.id), '</a>') as plant_events_count from seed_packets u, varieties v, suppliers s, plant_histories ph, plant_events pe where ph.seed_packet_id = u.id AND ph.id = pe.plant_history_id AND u.variety_id = v.id AND u.supplier_id = s.id AND ph.seed_packet_id = u.id AND ph.id = " + idOrNoId + " GROUP BY u.id, v.name, s.name, ph.id;";
	    } else if (classNameFilter == "suppliers") {
		// with plant name (need to test) unsure if this is accurate
		//sql = "select sp.id, array(select p.name from plants p, varieties v2 where p.id = v2.id AND sp.variety_id = v2.id) as plant_name, sp.variety_id, v.name as variety_name, sp.supplier_id, s.name as supplier_name, sp.url, sp.contents, sp.days_to_maturity as days, sp.sow_instructions from seed_packets sp, varieties v, suppliers s where sp.variety_id = v.id AND sp.supplier_id = s.id AND s.id = " + idOrNoId + " " + orderBy + ";";
		// baackup
		var orderBy = "ORDER BY sp.id";
		sql = "select sp.id, sp.variety_id, v.name as variety_name, sp.supplier_id, s.name as supplier_name, sp.url, sp.contents, sp.days_to_maturity as days, sp.sow_instructions from seed_packets sp, varieties v, suppliers s where sp.variety_id = v.id AND sp.supplier_id = s.id AND s.id = " + idOrNoId + " " + orderBy + ";";
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);		
		// refactor
		//sql = "select u.id, variety_id, v.name as variety_name, u.supplier_id, s.name as supplier_name, product_details, contents, sow_instructions, notes, days_to_maturity, concat('<a href=/plant_histories/seed_packets/', u.id, '>', count(ph.id), '</a>') as plant_history_count, u.url from seed_packets u, varieties v, suppliers s, plant_histories ph where ph.seed_packet_id = u.id AND u.variety_id = v.id AND u.supplier_id = s.id AND u.id = " + idOrNoId + " GROUP BY u.id, v.name, s.name, ph.id;";
	    }
        } else {
	    // too complex
            //orderBy = "ORDER BY sp.supplier_id, variety_id, sp.id";
	    // simpler
            var orderBy = "ORDER BY sp.id";
            debug("seed_packets orderBy =", orderBy);
	    // not working sql
	    // array(select count(ph.id) from plant_histories ph, seed_packets sp where sp.id = ph.seed_packet_id) as plant_histories_count 
            sql = "select sp.id, sp.varieties_id, sp.suppliers_id, sp.url, sp.contents, sp.sow_instructions, sp.days_to_maturity, array(select count(ph.id) from plant_histories ph where sp.id = ph.seed_packets_id) as plant_histories_count from seed_packets sp " + orderBy;
        }
        return sql;
    };
}

module.exports = new SeedPackets();

// end
