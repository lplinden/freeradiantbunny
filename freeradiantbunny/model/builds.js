/**
 * Module Builds.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Builds() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("builds instantiated", instanceCount);
    this.name = "builds";
    this.schema = ['status',
		   'sort',
		   'id',
		   'name',
		   'description',
		   'img_url',
		   'projects_id',
		   'suppliers_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("builds idOrNoId =", idOrNoId);
        debug("builds classNameFilter =", classNameFilter);
        debug("builds paramSort =", paramSort);
        debug("builds specialFlag =", specialFlag);
        debug("builds queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.name";
            if (paramSort === "random") {
		orderBy = "ORDER BY id=random()";
	    }
            debug("builds orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.name from builds z " + orderBy + ";";
	    }
        }
        return sql;
    };
}

module.exports = new Builds();

// end
