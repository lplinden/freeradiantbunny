/**
 * Module Stacks.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Stacks() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stacks instantiated", instanceCount);
    this.name = "stacks";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'application_id',
		   'priority'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("stacks idOrNoId =", idOrNoId);
	debug("stacks classNameFilter =", classNameFilter);
	debug("stacks paramSort =", paramSort);
	debug("stacks specialFlag =", specialFlag);
	debug("stacks queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
	} else {
	    var orderBy ="ORDER BY z.name, z.priority";
	    debug("stacks orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name, z.application_id, z.priority from stacks z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Stacks();

// end
