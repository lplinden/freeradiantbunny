/**
 * Module textfiles.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function GoalStatements() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("textfiles instantiated", instanceCount);
    this.name = "textfiles";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'domains_tli',
		   'path'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("textfiles idOrNoId =", idOrNoId);
	debug("textfiles classNameFilter =", classNameFilter);
	debug("textfiles paramSort =", paramSort);
	debug("textfiles specialFlag =", specialFlag);
	debug("textfiles queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	} else {
	    var orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    var limit = 100;
	    debug("textfiles orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name from textfiles z " + orderBy + " LIMIT " + limit + ";";
	}
	return sql;
    };
}

module.exports = new GoalStatements();

// end
