/**
 * Module PlantUnits.
 * version 2.0.3


 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function PlantUnits() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_units instantiated", instanceCount);
    this.name = "plant_units";
    this.schema = ['id',
		   'plant_id',
		   'unit_id'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramUpkIsValid, specialFlag, queryTerms) {
        debug("plant_units idOrNoId =", idOrNoId);
	debug("plant_units classNameFilter =", classNameFilter);
        debug("plant_units paramSort =", paramSort);
        debug("plant_units specialFlag =", specialFlag);
        debug("plant_units queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id";
            debug("plant_units orderBy =", orderBy);
	    sql = "select z.id, z.plant_id, z.unit_id from plant_units z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new PlantUnits();

// end
