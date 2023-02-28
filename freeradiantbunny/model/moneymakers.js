/**
 * Module Moneymakers.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Moneymakers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("moneymakers instantiated", instanceCount);
    this.name = "moneymakers";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'dirt',
		   'ideal_client',
		   'demographics',
		   'url',
		   'questions'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("moneymakers idOrNoId =", idOrNoId);
	debug("moneymakers classNameFilter =", classNameFilter);
	debug("moneymakers paramSort =", paramSort);
	debug("moneymakers specialFlag =", specialFlag);
	debug("moneymakers queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	} else {
	    var orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("moneymakers orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name, z.url from moneymakers z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Moneymakers();

// end
