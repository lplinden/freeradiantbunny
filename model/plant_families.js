// PlantFamilies

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantFamilies() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("plant_families instantiated", instanceCount);
    this.name = "plant_families";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plant_families classNameFilter =", classNameFilter);
        debug("plant_families paramSort =", paramSort);
        debug("plant_families specialFlag =", specialFlag);
        debug("plant_families queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select u.id, u.name from plant_families u where u.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY u.name";
            debug("sqlmaker orderBy =", orderBy);
            sql = "select u.id, u.name from plant_families u " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantFamilies();

// end
