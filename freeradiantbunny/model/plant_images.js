!/**
 * Module PlantImages.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function PlantImages() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plant_images instantiated", instanceCount);
    this.name = "plant_images";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plant_images idOrNoId =", idOrNoId;
	debug("plant_images classNameFilter =", classNameFilter);
        debug("plant_images paramSort =", paramSort);
        debug("plant_images specialFlag =", specialFlag);
        debug("plant_images queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select u.id, u.name from plant_images u where u.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY u.name";
            debug("plant_images orderBy =", orderBy);
            sql = "select u.id, u.name from plant_images u " + orderBy;
        }
        return sql;
    };
}

module.exports = new PlantImages();

// end
