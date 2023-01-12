/**
 * Module PlantListPlants.
 * version 2.0.3
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function PlantListPlants() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_list_plants instantiated", instanceCount);
    this.name = "plant_list_plants";
    this.schema = ['id',
		   'plants_id',
		   'plant_lists_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("plant_list_plants idOrNoId =", idOrNoId);
	debug("plant_list_plants classNameFilter =", classNameFilter);
        debug("plant_list_plants paramSort =", paramSort);
        debug("plant_list_plants specialFlag =", specialFlag);
        debug("plant_list_plants queryTerms =", queryTerms);
        var sql;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
            if (classNameFilter === "plant_lists") {
                // plant_lists_plants/plant_lists/id
		// orderBy = "ORDER BY pf.name, p.botanical_name";
		var orderBy = "ORDER BY p.name, p.id";
		// archive of the sql
                // sql = "select plp.id as plant_list_plants_id, p.id as plants_id, pf.name as plant_family_name, p.botanical_name as botanical_name, p.name as name, (select count(id) from plant_histories where plant_histories.plant_list_plants_id = plp.id) as plant_histories_count from plant_list_plants plp, plant_lists pl, plants p, plant_families pf where pf.id = p.plant_families_id AND plp.plants_id = p.id AND plp.plant_lists_id = pl.id AND pl.id = " + idOrNoId + " " + orderBy + ";";
		// sql of the amazing kindness
                // sql = "select plp.id as plant_list_plants_id, p.id as plants_id, pf.name as plant_family_name, p.botanical_name as botanical_name, p.name as name, (select count(id) from plant_histories where plant_histories.plant_list_plants_id = plp.id) as plant_histories_count, '' as seed_packets_count, '' as plant_events_count from plant_list_plants plp, plant_lists pl, plants p, plant_families pf where pf.id = p.plant_families_id AND plp.plants_id = p.id AND plp.plant_lists_id = pl.id AND pl.id = " + idOrNoId + " " + orderBy + ";";
		// working backup sql
                // sql = "select plp.id as plant_list_plants_id, p.id as plants_id, pf.name as plant_family_name, p.botanical_name as botanical_name, p.name as name, (select count(id) from plant_histories where plant_histories.plant_list_plants_id = plp.id) as plant_histories_count, count(ph.seed_packets_id) as seed_packets_count from plant_list_plants plp, plant_lists pl, plants p, plant_families pf, plant_histories ph WHERE pf.id = p.plant_families_id AND plp.plants_id = p.id AND ph.plant_list_plants_id = plp.id AND plp.plant_lists_id = pl.id AND pl.id = " + idOrNoId + " GROUP BY plp.id, p.id, pf.name " + orderBy + ";";
		// experimental
		// too complicated sql: array(select count(plant_histories.id) from plant_histories left join plant_list_plants on plant_histories.plant_list_plants_id = plp.id)
		// temp version with 3 columns removed
		if (0) {
		    var orderBy = "ORDER BY pf.name, p.name, p.id";
                    sql = "select plp.id as plant_list_plants_id, pf.name as plant_family, p.id as plants_id, p.name as name, p.botanical_name as botanical_name from plants p, plant_list_plants plp, plant_lists pl, plant_families pf WHERE pf.id = p.plant_families_id AND p.id = plp.plants_id AND plp.plant_lists_id = pl.id AND pl.id = " + idOrNoId + " " + orderBy + ";";
		}
				// perfect online
		// (just the next is for transfer to another site)
                sql = "select plp.id as plant_list_plants_id, p.id as plants_id, pf.name as plant_family_name, p.botanical_name as botanical_name, p.name as name, array(select count(ph.id) from plant_histories ph, plant_list_plants plp2 where ph.plant_list_plants_id = plp2.id AND plp2.id = plp.id) as plant_histories_count, array(select count(sp.id) from seed_packets sp, plant_histories ph, plant_list_plants plp2 where sp.id = ph.seed_packets_id AND ph.plant_list_plants_id = plp2.id AND plp2.id = plp.id) as seed_packets_count from plant_list_plants plp, plant_lists pl, plants p, plant_families pf WHERE pf.id = p.plant_families_id AND plp.plants_id = p.id AND plp.plant_lists_id = pl.id AND pl.id = " + idOrNoId + " " + orderBy + ";";
            } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);		
		// refactor
                //sql = "select plp.id as plant_list_plants_id, pl.id as plant_lists_id, pl.name as plant_list_name, p.id as plants_id, p.botanical_name as botanical_name, p.name as name, '' as plant_histories_count from plant_list_plants plp, plant_lists pl, plants p where plp.plants_id = p.id AND plp.plant_lists_id = pl.id AND plp.id = " + idOrNoId + ";";
            }
        } else {
            var orderBy = "ORDER BY p.id";
            debug("plant_list_plants orderBy =", orderBy);
            sql = "select plp.id as plant_list_plants_id, pl.id as plant_lists_id, p.id as plants_id, p.botanical_name as botanical_name, p.name as name from plant_list_plants plp, plants p, plant_lists pl where plp.plants_id = p.id AND plp.plant_lists_id = pl.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantListPlants();

// end
