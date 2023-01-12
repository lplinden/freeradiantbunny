/**
 * Module Columns.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Columns() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("columns instantiated", instanceCount);
    this.name = "columns";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("columns idOrNoId =", idOrNoId);
	debug("columns classNameFilter =", classNameFilter);
        debug("columns paramSort =", paramSort);
        debug("columns specialFlag =", specialFlag);
        debug("columns queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
        } else {
            var orderBy = "order by z.sort DESC, z.status, z.name, z.id";
            debug("columns orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name as name, z.description from columns z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Columns();

// end
