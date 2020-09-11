// Plants

var debug = require('debug')('frb');

var instanceCount = 0;

function Plants() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("plants instantiated", instanceCount);
    this.name = "plants";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("plants classNameFilter =", classNameFilter);
        debug("plants paramSort =", paramSort);
        debug("plants specialFlag =", specialFlag);
        debug("plants queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select u.id, concat('<i>', u.botanical_name, '</i>') as botanical_name, u.name, pc.name as plant_category, pf.name as plant_family from plants u, plant_categories pc, plant_families pf where u.plant_category_id = pc.id AND u.plant_family_id = pf.id AND u.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY u.name";
            debug("sqlmaker orderBy =", orderBy);
            sql = "SELECT u.id, u.img_url as img, u.name, count(b.id) as hyperlinkscount FROM plants u LEFT JOIN (SELECT b.id, b.plant_id FROM hyperlink_plants b) b ON (u.id = b.plant_id) GROUP BY u.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new Plants();

// end
