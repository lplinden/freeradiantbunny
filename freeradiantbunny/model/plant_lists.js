/**
 * Module PlantLists.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function PlantLists() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_lists instantiated", instanceCount);
    this.name = "plant_lists";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];    
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("plant_lists idOrNoId =", idOrNoId);
	debug("plant_lists classNameFilter =", classNameFilter);
        debug("plant_lists paramSort =", paramSort);
        debug("plant_lists specialFlag =", specialFlag);
        debug("plant_lists queryTerms =", queryTerms);
        var sql;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
	    // refactor
            //sql = "select u.id, u.name, concat('<a href=\"../plant_list_plants/plant_lists/', u.id, '\">', count(plp.id), '</a>') as plants_count from plant_lists u, plant_list_plants plp WHERE u.id = plp.plant_list_id AND status = '2020' AND u.id = " + idOrNoId + " GROUP BY u.id, u.name;";
        } else {
            var orderBy = "ORDER BY u.name";
            debug("plant_lists orderBy =", orderBy);
	    // old because the sql did not return all rows
            // sql = "select u.id, u.name, concat('<a href=\"../plant_list_plants/plant_lists/', u.id , '\">', count(plp.id), '</a>') as plant_count from plant_lists u, plant_list_plants plp WHERE u.id = plp.plant_list_id AND status = '2020' GROUP BY u.id, u.name " + orderBy;
	    // new left join style
	    // retired because it has the raw issue
            //sql = "select u.id, u.name, count(plp.plant_id) as plants_count from plant_lists u LEFT JOIN plant_list_plants plp ON u.id = plp.plant_list_id GROUP BY u.id " + orderBy;
	    sql = 'select z.name, y.name from plant_list_plants w, plants z, plant_lists y  where w.plants_id = z.id AND w.plant_lists_id = y.id;;';
        }
        return sql;
    };
}

module.exports = new PlantLists();

// end
