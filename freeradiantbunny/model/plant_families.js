/**
 * Module PlantFamilies.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function PlantFamilies() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_families instantiated", instanceCount);
    this.name = "plant_families";
    this.schema = ['id',
		   'name'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("plant_families idOrNoId =", idOrNoId);
	debug("plant_families classNameFilter =", classNameFilter);
        debug("plant_families paramSort =", paramSort);
        debug("plant_families specialFlag =", specialFlag);
        debug("plant_families queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
	    // refactor
            //sql = "select u.id, u.name from plant_categories u where u.id = " + idOrNoId + ";";
	    // older
            //sql = "select u.id, u.name, array(select concat(' <a href=../plants/', p.id, '>', p.name, '</a>') from plants p, plant_families pf2 where p.plant_family_id = pf2.id AND pf2.id = u.id ORDER BY p.name) as plants_of_this_family from plant_families u where u.id = " + idOrNoId + ";";
        } else {
            var orderBy = "ORDER BY u.name";
            debug("plant_families orderBy =", orderBy);
            sql = "select u.id, u.name from plant_families u " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantFamilies();

// end
