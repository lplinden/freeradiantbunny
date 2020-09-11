// PlantCategories

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantCategories() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("plant_categories instantiated", instanceCount);
    this.name = "plant_categories";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plant_categories classNameFilter =", classNameFilter);
        debug("plant_categories paramSort =", paramSort);
        debug("plant_categories specialFlag =", specialFlag);
        debug("plant_categories queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select u.id, u.name from plant_categories u where u.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY u.name";
            debug("sqlmaker orderBy =", orderBy);
            sql = "select u.id, u.name from plant_categories u " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantCategories();

// end
