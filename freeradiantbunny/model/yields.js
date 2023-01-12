/**
 * Module Yields.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Yields() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("yields instantiated", instanceCount);
    this.name = "yields";
    this.schema = ['id',
		   'plant2_id',
		   'estimated_yield',
		   'numerator_unit2_id',
		   'source',
		   'denominator_unit2_id',
		   'range'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("yields idOrNoId =", idOrNoId);
	debug("yields classNameFilter =", classNameFilter);
        debug("yields paramSort =", paramSort);
        debug("yields specialFlag =", specialFlag);
        debug("yields queryTerms =", queryTerms);
        var sql;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY u.id";
	    debug("yields orderBy =", orderBy);
            sql = "SELECT u.id, u.plants_id, u.estimated_yield FROM yields u " + orderBy;
        }
        return sql;
    };
}

module.exports = new Yields();

// end
