/**
 * Module Providers.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Providers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("providers instantiated", instanceCount);
    this.name = "providers";
    this.schema = ['id',
		   'name',
		   'address',
		   'url'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("providers idOrNoId =", idOrNoId);
	debug("providers classNameFilter =", classNameFilter);
        debug("providers paramSort =", paramSort);
        debug("providers specialFlag =", specialFlag);
        debug("providers queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.name, z.id";
            debug("providers orderBy =", orderBy);
	    sql = "select z.id, z.name, z.address, z.url from providers z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Providers();

// end
