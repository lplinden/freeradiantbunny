// PlantListPlants

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantListPlants() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("plant_list_plants instantiated", instanceCount);
    this.name = "plant_list_plants";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plant_list_plants classNameFilter =", classNameFilter);
        debug("plant_list_plants paramSort =", paramSort);
        debug("plant_list_plants specialFlag =", specialFlag);
        debug("plant_list_plants queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            if (classNameFilter === "") {
                sql = "select plp.id as plant_list_plant_id from plant_list_plants plp where plp.id = " + idOrNoId + ";";
            } else {
                // plant_lists_plnats/plant_lists/id
                sql = "select plp.id as plant_list_plant_id, pl.id as plant_list_id, p.id as plant_id, p.botanical_name as botanical_name, p.name as name, '' as plant_histories_count from plant_list_plants plp, plant_lists pl, plants p where plp.plant_id = p.id AND plp.plant_list_id = pl.id AND pl.id = " + idOrNoId + ";";
            }
        } else {
            orderBy = "ORDER BY p.id";
            debug("sqlmaker orderBy =", orderBy);
            sql = "select plp.id as plant_list_plant_id, pl.id as plant_list_id, p.id as plant_id, p.botanical_name as botanical_name, p.name as name from plant_list_plants plp, plants.id p, plant_lists pl where plp.plant_id = p.id AND plp.plant_list_id = pl.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantListPlants();

// end
