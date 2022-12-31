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
		   'sort'];
    this.inboundForeignKeyTables = ['classes'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramUpkIsValid, specialFlag, queryTerms) {
        debug("subsystems idOrNoId =", idOrNoId);
	debug("subsystems classNameFilter =", classNameFilter);
        debug("subsystems paramSort =", paramSort);
        debug("subsystems specialFlag =", specialFlag);
        debug("subsystems queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.name";
            debug("subsystems orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from subsystems z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Subsystems();

// end
