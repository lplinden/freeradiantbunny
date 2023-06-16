/**
 * Module Subsystems.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Subsystems() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("subsystems instantiated", instanceCount);
    this.name = "subsystems";
    this.schema = ['id', 
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'rules'];
    this.inboundForeignKeyTables = ['classes', 'modules'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("subsystems idOrNoId =", idOrNoId);
	debug("subsystems classNameFilter =", classNameFilter);
        debug("subsystems paramSort =", paramSort);
        debug("subsystems specialFlag =", specialFlag);
        debug("subsystems queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.status, z.sort DESC, z.name";
            debug("subsystems orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, count(c.id) as classes_count from subsystems z, classes c where z.id = c.subsystems_id group by z.status, z.sort, z.id, z.img_url, z.name, z.rules " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Subsystems();

// end
