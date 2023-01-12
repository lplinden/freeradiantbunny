/**
 * Module Stakes.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Stakes() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stakes instantiated", instanceCount);
    this.name = "stakes";
    this.schema = ['id',
		   'name',
		   'address'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("stakes idOrNoId =", idOrNoId);
	debug("stakes classNameFilter =", classNameFilter);
        debug("stakes paramSort =", paramSort);
        debug("stakes specialFlag =", specialFlag);
        debug("stakes queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.id";
            debug("stakes orderBy =", orderBy);
	    sql = "select z.id, z.name, z.address from stakes z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Stakes();

// end
