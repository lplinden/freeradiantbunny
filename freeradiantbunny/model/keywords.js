/**
 * Module Keywords.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Keywords() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("keywords instantiated", instanceCount);
    this.name = "keywords";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'keywords',
		   'url'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("keywords idOrNoId =", idOrNoId);
	debug("keywords classNameFilter =", classNameFilter);
        debug("keywords paramSort =", paramSort);
        debug("keywords specialFlag =", specialFlag);
        debug("keywords queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("keywords orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.url from keywords z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Keywords();

// end
