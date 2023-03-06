/**
 * Module Tickets.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Tickets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tickets instantiated", instanceCount);
    this.name = "tickets";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'processes_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("tickets idOrNoId =", idOrNoId);
	debug("tickets classNameFilter =", classNameFilter);
        debug("tickets paramSort =", paramSort);
        debug("tickets specialFlag =", specialFlag);
        debug("tickets queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("tickets orderBy =", orderBy);
	    sql = "select z.id, z.name from tickets z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Tickets();

// end
