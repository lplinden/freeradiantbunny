/**
 * Module Varieties.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Varieties() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("varieties instantiated", instanceCount);
    this.name = "varieties";
    this.schema = [
];
    this.inboundForeignKeyTables = ['seed_packets'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("varieties idOrNoId =", idOrNoId);
        debug("varieties classNameFilter =", classNameFilter);
        debug("varieties paramSort =", paramSort);
        debug("varieties specialFlag =", specialFlag);
        debug("varieties queryTerms =", queryTerms);
        var sql;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    if (classNameFilter === 'plants') {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);
	    } else {
		sql = "select v.id, v.plants_id, p.name as plant, v.name, v.description, array(select concat('<a href=/seed_packets/', sp.id, '>', sp.id, '</a>') from seed_packets sp where sp.varieties_id = v.id) as seed_packets from varieties v, plants p where p.id = v.plants_id AND v.id = " + idOrNoId + ";";
	    }
        } else {
            var orderBy = "ORDER BY v.name";
            debug("varities orderBy =", orderBy);
            sql = "select v.id, v.plants_id, p.name as plant_name, v.name, array(select concat('<a href=seed_packets/', sp.id, '>', sp.id, '</a>') from seed_packets sp where sp.varieties_id = v.id) as seed_packets from varieties v, plants p WHERE p.id = v.plants_id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Varieties();

// end
