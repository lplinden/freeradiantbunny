/**
 * Module Stake_Providers.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Stake_Providers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stake_providers instantiated", instanceCount);
    this.name = "stake_providers";
    this.schema = ['id',
		   'name',
		   'stakes_id',
		   'providers_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("stake_providers idOrNoId =", idOrNoId);
	debug("stake_providers classNameFilter =", classNameFilter);
        debug("stake_providers paramSort =", paramSort);
        debug("stake_providers specialFlag =", specialFlag);
        debug("stake_providers queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);        } else {
            var orderBy = "ORDER BY z.id";
            debug("stake_providers orderBy =", orderBy);
	    sql = "select z.id from stake_providers z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Stake_Providers();

// end
