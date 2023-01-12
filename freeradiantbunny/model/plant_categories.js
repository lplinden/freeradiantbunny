/**
 * Module PlantCategories.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function PlantCategories() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_categories instantiated", instanceCount);
    this.name = "plant_categories";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("plant_categories idOrNoId =", idOrNoId);
	debug("plant_categories classNameFilter =", classNameFilter);
        debug("plant_categories paramSort =", paramSort);
        debug("plant_categories specialFlag =", specialFlag);
        debug("plant_categories queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY u.name";
            debug("plant_categories orderBy =", orderBy);
            sql = "select u.id, u.name from plant_categories u " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantCategories();

// end
