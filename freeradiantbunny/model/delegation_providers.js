/**
 * Module Delegation_Providers.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function DelegationProviders() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("delegation_providers instantiated", instanceCount);
    this.name = "delegation_providers";
    this.schema = ['id',
		   'delegations_id',
		   'providers_id',
		   'bips',
		   'call_date',
		   'tx_hash'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("delegation_providers idOrNoId =", idOrNoId);
	debug("delegation_providers classNameFilter =", classNameFilter);
        debug("delegation_providers paramSort =", paramSort);
        debug("delegation_providers specialFlag =", specialFlag);
        debug("delegation_providers queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id";
            debug("delegation_providers orderBy =", orderBy);
	    sql = "select z.id, z.delegations_id, z.providers_id, z.bips, z.call_date, concat('<a href=\"', z.scan_url, z.tx_hash, '\">', z.tx_hash, '</a>'), z.tx_fee from delegation_providers z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new DelegationProviders();

// end
