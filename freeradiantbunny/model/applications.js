/**
 * Module Applications.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Applications() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("applications instantiated", instanceCount);
    this.name = "applications";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'url',
		   'source_code_url'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("applications idOrNoId =", idOrNoId);
	debug("applications classNameFilter =", classNameFilter);
        debug("applications paramSort =", paramSort);
        debug("applications specialFlag =", specialFlag);
        debug("applications queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
        } else {
            var orderBy = "order by z.sort DESC, z.id";
            debug("applications orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as image, z.name from applications z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Applications();

// end
