/**
 * Module Stylesheets.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Stylesheets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("stylesheets instantiated", instanceCount);
    this.name = "stylesheets";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'domains_tli',
		   'url'];    
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("stylesheets idOrNoId =", idOrNoId);
	debug("stylesheets classNameFilter =", classNameFilter);
        debug("stylesheets paramSort =", paramSort);
        debug("stylesheets specialFlag =", specialFlag);
        debug("stylesheets queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    // simple sql
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.name, z.id";
            debug("stylesheets orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.img_url as image, z.id, z.name, z.domains_tli, z.url from stylesheets z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Stylesheets();

// end
