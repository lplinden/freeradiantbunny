/**
 * Module Indiegoals.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Indiegoals() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("indiegoals instantiated", instanceCount);
    this.name = "indiegoals";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("indiegoals idOrNoId =",idOrNoId);
	debug("indiegoals classNameFilter =", classNameFilter);
        debug("indiegoals paramSort =", paramSort);
	debug("indiegoals specialFlag =", specialFlag);
        debug("indiegoals queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY a.status DESC, a.sort DESC, a.name, a.id";
            if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            }
            debug("indiegoals orderBy =", orderBy);
            // many
            sql = "select a.status, a.sort, a.id, a.name, a.url, a.yawp_agent_type as yawp_agent_type from indiegoals a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Indiegoals();

// end
