/**
 * Module PlantUnits.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantUnits() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_units instantiated", instanceCount);
    this.name = "plant_units";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plant_units idOrNoId =", idOrNoId);
	debug("plant_units classNameFilter =", classNameFilter);
        debug("plant_units paramSort =", paramSort);
        debug("plant_units specialFlag =", specialFlag);
        debug("plant_units queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.plant_id, z.unit_id from plant_units z WHERE z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.id";
            debug("plant_units orderBy =", orderBy);
	    sql = "select z.id, z.plant_id, z.unit_id from plant_units z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new PlantUnits();

// end
