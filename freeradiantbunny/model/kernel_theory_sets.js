/**
 * Module KernelTheorySets.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function KernelTheorySets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("kernel_theory_sets instantiated", instanceCount);
    this.name = "kernel_theory_sets";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("kernel_theory_sets idOrNoId =", idOrNoId);
	debug("kernel_theory_sets classNameFilter =", classNameFilter);
	debug("kernel_theory_sets paramSort =", paramSort);
	debug("kernel_theory_sets specialFlag =", specialFlag);
	debug("kernel_theory_sets queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	} else {
	    var orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("kernel_theory_sets orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name from kernel_theory_sets z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new KernelTheorySets();

// end
