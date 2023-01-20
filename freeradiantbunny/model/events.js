/**
 * Module Events.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Events() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("events instantiated", instanceCount);
    this.name = "events";
    this.schema = ['id',
		   'time_start',
		   'time_finish'];
    this.inboundForeignKeyTables = [];    
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("events idOrNoId =", idOrNoId);
	debug("events classNameFilter =", classNameFilter);
        debug("events paramSort =", paramSort);
        debug("events specialFlag =", specialFlag);
        debug("events queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id";
            debug("events orderBy =", orderBy);
	    sql = "select z.id, z.time_start, z.time_finish from events z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Events();

// end
