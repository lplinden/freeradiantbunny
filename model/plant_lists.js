// PlantLists

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantLists() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("plantLists instantiated", instanceCount);
    this.name = "plant_lists";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plant_lists classNameFilter =", classNameFilter);
        debug("plant_lists paramSort =", paramSort);
        debug("plant_lists specialFlag =", specialFlag);
        debug("plant_lists queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select pl.id, pl.name, concat('<a href=\"../plant_list_plants/plant_lists/', pl.id , '\">', count(plp.plant_id), '</a>') as plant_count from plant_lists pl, plant_list_plants plp where pl.id = plp.plant_list_id AND pl.id = " + idOrNoId + " GROUP BY pl.id, pl.name;";
        } else {
            orderBy = "ORDER BY u.name";
            debug("sqlmaker orderBy =", orderBy);
            sql = "select u.id, u.name from plant_lists u where status='2018' " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantLists();

// end
