/**
 * Module Documentations.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Documentations() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("documentations instantiated", instanceCount);
    this.name = "documentations";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("documentations idOrNoId =", idOrNoId);
	debug("documentations classNameFilter =", classNameFilter);
	debug("documentations paramSort =", paramSort);
	debug("documentations specialFlag =", specialFlag);
	debug("documentations queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	} else {
	    var orderBy ="ORDER BY z.status DESC, z.sort DESC, z.id DESC";
	    debug("documentations orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name from documentations z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Documentations();

// end
