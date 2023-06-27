/**
 * Module budget_accoiunts.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function BudgetAccounts() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("domains instantiated", instanceCount);
    this.name = "domains";
    this.schema = ['id',
		   'budgets_id',
		   'accounts_id'];
    this.inboundForeignKeyTables = [''];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("budget_accounts idOrNoId =", idOrNoId);
	debug("budget_accounts classNameFilter =", classNameFilter);
	debug("budget_accounts paramSort =", paramSort);
	debug("budget_accounts specialFlag =", specialFlag);
	debug("budget_accounts queryTerms =", queryTerms);
	var sql;
	var orderBy;
	if (idOrNoId) {
	    // sql might have stopped be good
	    sql = "select z.status, z.sort, z.id, z.img_url, z.name from budget_accounts z where z.id = " + idOrNoId + " AND z.publish ='true';";
	} else {
	    orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("budget_accounts orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url, z.name from budget_accounts z where publish ='true' " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new BudgetAccounts();

// end
