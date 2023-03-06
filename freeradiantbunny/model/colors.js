/**
 * Module Colors.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Colors() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("colors instantiated", instanceCount);
    this.name = "colors";
    this.schema = ['id',
		   'tla',
		   'name',
		   'hex_code',
		   'full_name'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("colors idOrNoId =", idOrNoId);
	debug("colors classNameFilter =", classNameFilter);
	debug("colors paramSort =", paramSort);
	debug("colors specialFlag =", specialFlag);
	debug("colors queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	} else {
	    var orderBy ="ORDER BY z.name, z.id";
	    debug("colors orderBy =", orderBy);
	    sql = "select z.id, z.name, z.hex_code, z.full_name from colors z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Colors();

// end
