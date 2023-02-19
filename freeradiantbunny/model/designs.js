/**
 * Module designs.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Designs() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("designs instantiated", instanceCount);
    this.name = "designs";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'domains_tli'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("designs classNameFilter =", classNameFilter);
        debug("designs paramSort =", paramSort);
        debug("designs specialFlag =", specialFlag);
	debug("designs queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY a.sort DESC, a.name";
            if (paramSort === "sort") {
                orderBy = "ORDER BY a.sort DESC, a.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY a.status, a.subsystem, a.name";
            }
            debug("designs orderBy =", orderBy);
            // many
            sql = "select a.status, a.sort, a.id, a.img_url as img, a.name as name from designs a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Designs();

// end
