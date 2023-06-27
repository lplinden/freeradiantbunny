 /**
 * Module Journals.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Journals() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("journals instantiated", instanceCount);
    this.name = "journals";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("journals idOrNoId =", idOrNoId);
	debug("journals classNameFilter =", classNameFilter);
	debug("journals paramSort =", paramSort);
	debug("journals specialFlag =", specialFlag);
	debug("journals queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    // on hold
	    //if (classNameFilter) {
  		//if (classNameFilter == "budgets") {
		    //var orderBy = "ORDER BY a.sort DESC, a.name";
		    //sql = "select a.status, a.sort, a.id, a.img_url as image, a.name, a.description from journals a, budget_journals ba where ba.account_id = a.id AND ba.budget_id = " + idOrNoId + " " + orderBy + ";";
		//} else {
		    // has dropped fields
		    //sql = "select a.status, a.sort, a.id, a.img_url, a.name, a.description, a.database_string, a.class_name_string as class_name_string, concat('<a href=\"../', a.class_name_string, '/', a.class_primary_key_string,'\">', a.class_primary_key_string, '</a>') as class_primary_key_string from journals a where a.id = " + idOrNoId + ";";
		    //sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from journals z;";
		//}
	    //} else {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
		// refactor
		// has dropped fields
		//sql = "select a.status, a.sort, a.id, a.img_url, a.name, a.description, a.database_string, a.class_name_string as class_name_string, concat('<a href=\"../', a.class_name_string, '/', a.class_primary_key_string,'\">', a.class_primary_key_string, '</a>') as class_primary_key_string from journals a where a.id = " + idOrNoId + ";";
		//sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from journals z;";
	    //}
	} else {
	    var orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("journals orderBy =", orderBy);
	    // this has a special field to keep things on another level of private
	    // data is in the database but given if the field is null then it cannot be selected
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from journals z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Journals();

// end
