/**
 * Module PlantAttributes.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function PlantAttributes() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_attributes instantiated", instanceCount);
    this.name = "plant_attributes";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramUpkIsValid, specialFlag, queryTerms) {
        debug("plant_attributes classNameFilter =", classNameFilter);
        debug("plant_attributes paramSort =", paramSort);
        debug("plant_attributes specialFlag =", specialFlag);
        debug("plant_attributes queryTerms =", queryTerms);
        var sql;
        var orderBy;
        orderBy = "ORDER BY a.sort DESC, a.name";
        if (paramSort == "attribute_name") {
            orderBy = "ORDER BY pa.attribute_name, pa.plant_id";
	} else {
	    orderBy = "ORDER BY pa.plant_id, pa.attribute_name";
	}
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    if (classNameFilter == "plants") {
		sql = "select pa.id as id, pa.plant_id as plant_id, p.name as plant_name, pa.attribute_name as attribute_name, pa.attribute_value as attribute_value from plant_attributes pa, plants p where pa.plant_id = p.id AND p.id = " + idOrNoId + " " + orderBy + ";";
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
		// refactor
		//sql = "select pa.id, pa.plant_id, pa.attribute_name, pa.attribute_value from plant_attributes pa where pa.id = " + idOrNoId + ";";
	    }
        } else {
            debug("plant_attributes orderBy =", orderBy);
	    sql = "select pa.id, pa.plant_id, p.name as plant_name, pa.attribute_name as attribute_name, pa.attribute_value as attrobute_value from plant_attributes pa, plants p WHERE p.id = pa.plant_id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new PlantAttributes();

// end
