 /**
 * Module Accounts.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Accounts() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("accounts instantiated", instanceCount);
    this.name = "accounts";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("accounts idOrNoId =", idOrNoId);
	debug("accounts classNameFilter =", classNameFilter);
	debug("accounts paramSort =", paramSort);
	debug("accounts specialFlag =", specialFlag);
	debug("accounts queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    // on hold
	    //if (classNameFilter) {
  		//if (classNameFilter == "budgets") {
		    //var orderBy = "ORDER BY a.sort DESC, a.name";
		    //sql = "select a.status, a.sort, a.id, a.img_url as image, a.name, a.description from accounts a, budget_accounts ba where ba.account_id = a.id AND ba.budget_id = " + idOrNoId + " " + orderBy + ";";
		//} else {
		    // has dropped fields
		    //sql = "select a.status, a.sort, a.id, a.img_url, a.name, a.description, a.database_string, a.class_name_string as class_name_string, concat('<a href=\"../', a.class_name_string, '/', a.class_primary_key_string,'\">', a.class_primary_key_string, '</a>') as class_primary_key_string from accounts a where a.id = " + idOrNoId + ";";
		    //sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from accounts z;";
		//}
	    //} else {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
		// refactor
		// has dropped fields
		//sql = "select a.status, a.sort, a.id, a.img_url, a.name, a.description, a.database_string, a.class_name_string as class_name_string, concat('<a href=\"../', a.class_name_string, '/', a.class_primary_key_string,'\">', a.class_primary_key_string, '</a>') as class_primary_key_string from accounts a where a.id = " + idOrNoId + ";";
		//sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from accounts z;";
	    //}
	} else {
	    var orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("accounts orderBy =", orderBy);
	    // this has a special field to keep things on another level of private
	    // data is in the database but given if the field is null then it cannot be selected
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from accounts z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Accounts();

// end
