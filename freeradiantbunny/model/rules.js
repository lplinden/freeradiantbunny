/**
 * Module Rules.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Rules() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("rules instantiated", instanceCount);
    this.name = "rules";
    this.schema = ['id',
		   'name'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("rules idOrNoId =",idOrNoId);
        debug("rules classNameFilter =", classNameFilter);
        debug("rules paramSort =", paramSort);
        debug("rules specialFlag =", specialFlag);
        debug("rules queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "order by z.name, z.id";
            debug("rules orderBy =", orderBy);
	    // many
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description, z.antecedent, z.consequent from rules z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Rules();

// end
