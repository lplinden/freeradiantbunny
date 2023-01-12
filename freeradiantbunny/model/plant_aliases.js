/**
 * Module PlantAliases.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function PlantAliases() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_aliases instantiated", instanceCount);
    this.name = "plant_aliases";
    this.schema = ['id',
		   'plants_id',
		   'name'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("plant_aliases idOrNoId =", idOrNoId);
	debug("plant_aliases classNameFilter =", classNameFilter);
        debug("plant_aliases paramSort =", paramSort);
        debug("plant_aliases specialFlag =", specialFlag);
        debug("plant_aliases queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
        } else {
            orderBy = "ORDER BY u.name";
	    debug("plant_aliases orderBy =", orderBy);
            sql = "SELECT u.id, u.plants_id, u.name FROM plant_aliases u " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantAliases();

// end
