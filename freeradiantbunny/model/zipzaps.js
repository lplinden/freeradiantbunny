/**
 * Module Zipzaps.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Zipzaps() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("zipzaps instantiated", instanceCount);
    this.name = "zipzaps";
    this.schema = ['id',
		   'name',
		   'sort',
                   'details',
		   'igname'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("zipzaps idOrNoId =", idOrNoId);
	debug("zipzaps classNameFilter =", classNameFilter);
        debug("zipzaps paramSort =", paramSort);
        debug("zipzaps specialFlag =", specialFlag);
        debug("zipzaps queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.name, z.id";
            debug("zipzaps orderBy =", orderBy);
	    sql = "select z.sort, z.id, z.name from zipzaps z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Zipzaps();

// end
