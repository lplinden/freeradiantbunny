/**
 * Module KernelTheories.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function KernelTheories() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("kernel_theories instantiated", instanceCount);
    this.name = "kernel_theories";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("kernel_theories idOrNoId =", idOrNoId);
	debug("kernel_theories classNameFilter =", classNameFilter);
	debug("kernel_theories paramSort =", paramSort);
	debug("kernel_theories specialFlag =", specialFlag);
	debug("kernel_theories queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	} else {
	    var orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("kernel_theories orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name from kernel_theories z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new KernelTheories();

// end
