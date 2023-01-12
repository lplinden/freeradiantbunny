/**
 * Module Units.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Units() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("units instantiated", instanceCount);
    this.name = "units";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("units idOrNoId =", idOrNoId);
	debug("units classNameFilter =", classNameFilter);
        debug("units paramSort =", paramSort);
        debug("units specialFlag =", specialFlag);
        debug("units queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.name, z.id";
            debug("units orderBy =", orderBy);
	    sql = "select z.id, z.name from units z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Units();

// end
