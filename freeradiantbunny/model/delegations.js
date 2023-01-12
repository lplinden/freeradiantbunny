/**
 * Module Delegations.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Delegations() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("delegations instantiated", instanceCount);
    this.name = "delegations";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'projects_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("delegations idOrNoId =", idOrNoId);
	debug("delegations classNameFilter =", classNameFilter);
        debug("delegations paramSort =", paramSort);
        debug("delegations specialFlag =", specialFlag);
        debug("delegations queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.name, z.id";
            debug("delegations orderBy =", orderBy);
	    sql = "select z.id, z.name, z.address from delegations z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Delegations();

// end
