/**
 * Module Varieties.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Varieties() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("varieties instantiated", instanceCount);
    this.name = "varieties";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("varieties idOrNoId =", idOrNoId);
        debug("varieties classNameFilter =", classNameFilter);
        debug("varieties paramSort =", paramSort);
        debug("varieties specialFlag =", specialFlag);
        debug("varieties queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    if (classNameFilter === 'plants') {
		sql = "select v.id, v.plant_id, p.name as plant, v.name, v.description from varieties v, plants p where p.id = v.plant_id AND p.id = " + idOrNoId + ";";
	    } else {
		sql = "select v.id, v.plant_id, p.name as plant, v.name, v.description, array(select concat('<a href=/seed_packets/', sp.id, '>', sp.id, '</a>') from seed_packets sp where sp.variety_id = v.id) as seed_packets from varieties v, plants p where p.id = v.plant_id AND v.id = " + idOrNoId + ";";
	    }
        } else {
            orderBy = "ORDER BY v.name";
            debug("varities orderBy =", orderBy);
            sql = "select v.id, v.plant_id, p.name as plant_name, v.name, array(select concat('<a href=seed_packets/', sp.id, '>', sp.id, '</a>') from seed_packets sp where sp.variety_id = v.id) as seed_packets from varieties v, plants p WHERE p.id = v.plant_id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Varieties();

// end
