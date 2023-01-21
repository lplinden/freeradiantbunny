/**
 * Module Stages.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Stages() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stages instantiated", instanceCount);
    this.name = "stages";
    this.schema = ['id',
		   'name',
		   'pos'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramUpkIsValid, specialFlag, queryTerms) {
        debug("stages idOrNoId =", idOrNoId);
	debug("stages classNameFilter =", classNameFilter);
        debug("stages paramSort =", paramSort);
        debug("stages specialFlag =", specialFlag);
        debug("stages queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.pos";
            debug("stages orderBy =", orderBy);
	    sql = "select z.id, z.name, z.pos from stages z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Stages();

// end
