/**
 * Module Courses.
 * version 2.0.4
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Courses() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("courses instantiated", instanceCount);
    this.name = "courses";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("courses idOrNoId =", idOrNoId);
	debug("courses classNameFilter =", classNameFilter);
        debug("courses paramSort =", paramSort);
        debug("courses specialFlag =", specialFlag);
        debug("courses queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("courses orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, img_url as image, z.name from courses z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Courses();

// end
