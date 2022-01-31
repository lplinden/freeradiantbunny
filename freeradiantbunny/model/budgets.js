/**
 * Module Budgets.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Budgets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("budgets instantiated", instanceCount);
    this.name = "budgets";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("budgets idOrNoId =", idOrNoId);
	debug("budgets classNameFilter =", classNameFilter);
	debug("budgets paramSort =", paramSort);
	debug("budgets specialFlag =", specialFlag);
	debug("budgets queryTerms =", queryTerms);
	var sql;
	var orderBy;
	if (idOrNoId) {
	    sql = "select b.status, b.sort, b.id, b.img_url, b.name, b.description, array(select concat('<a href=\"../accounts/budgets/', b.id, '\">', count(a.id), '</a>') from accounts a, budget_accounts ba where a.id = ba.account_id AND ba.budget_id = b.id) as account_count, array(select concat('<br />', a.ledger_type, '&nbsp;', a.id, '<a href=\"../accounts/', a.id, '\">', a.name, '</a>', a.status, a.sort) from accounts a, budget_accounts ba where a.id = ba.account_id AND ba.budget_id = b.id order by a.status, a.sort DESC, a.name) as accounts from budgets b where b.id = " + idOrNoId + " and b.publish = 'true';";
	} else {
	    orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("budgets orderBy =", orderBy);
	    // this has a special field named publish that helps to keep things private
	    // data in the database is only given if the field is true
	    sql = "select z.status, z.sort, z.id, z.img_url, z.name from budgets z where publish ='true' " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Budgets();

// end
