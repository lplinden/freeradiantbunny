/**
 * Module Zachmans.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Zachmans() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("zachmans instantiated", instanceCount);
    this.name = "zachmans";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = ['classes','modules'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("zachmans idOrNoId =", idOrNoId);
	debug("zachmans classNameFilter =", classNameFilter);	
        debug("zachmans paramSort =", paramSort);
        debug("zachmans specialFlag =", specialFlag);
        debug("zachmans queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id";
            if (paramSort === "sort") {
                orderBy = "ORDER BY z.sort DESC, z.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY z.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY z.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY z.status, z.subsystem, z.name";
            }
            debug("zachmans orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description from zachmans z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Zachmans();

// end
