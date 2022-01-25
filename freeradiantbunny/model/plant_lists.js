/**
 * Module PlantLists.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantLists() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plantLists instantiated", instanceCount);
    this.name = "plant_lists";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plant_lists classNameFilter =", classNameFilter);
        debug("plant_lists paramSort =", paramSort);
        debug("plant_lists specialFlag =", specialFlag);
        debug("plant_lists queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
            sql = "select u.id, u.name, concat('<a href=\"../plant_list_plants/plant_lists/', u.id, '\">', count(plp.id), '</a>') as plants_count from plant_lists u, plant_list_plants plp WHERE u.id = plp.plant_list_id AND status = '2020' AND u.id = " + idOrNoId + " GROUP BY u.id, u.name;";
        } else {
            orderBy = "ORDER BY u.name";
            debug("plant_lists orderBy =", orderBy);
	    // old because the sql did not return all rows
            // sql = "select u.id, u.name, concat('<a href=\"../plant_list_plants/plant_lists/', u.id , '\">', count(plp.id), '</a>') as plant_count from plant_lists u, plant_list_plants plp WHERE u.id = plp.plant_list_id AND status = '2020' GROUP BY u.id, u.name " + orderBy;
	    // new left join style
            sql = "select u.id, u.name, count(plp.plant_id) as plants_count from plant_lists u LEFT JOIN plant_list_plants plp ON u.id = plp.plant_list_id GROUP BY u.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantLists();

// end
