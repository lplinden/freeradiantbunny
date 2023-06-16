/**
 * Module Images.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Images() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("images instantiated", instanceCount);
    this.name = "images";
    this.schema = ['id',
		   'name',
		   'img_url',
		   'caption',
		   'description',
		   'photographer',
		   'license',
		   'sort',
		   'url',
		   'status',
		   'quality',
		   'domains_tli'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("images classNameFilter =", classNameFilter);
        debug("images paramSort =", paramSort);
	debug("images specialFlag =", specialFlag);
        debug("images queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    if (classNameFilter == "domains") {
		// refactor
		// standard order
		var orderBy = "ORDER BY z.sort DESC, z.name";
		// idOrNoId refers to domains table
		sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from images z, domains d where z.domains_tli = d.tli AND d.id = '" + idOrNoId + "' " + orderBy + ";";
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
		// refactor
		//sql = "select a.id, a.name, a.description, a.img_url as img, a.sort, a.status, a.domains_tli from images a where a.id = " + idOrNoId + ";";
	    }
        } else {
            var orderBy = "ORDER BY a.quality DESC, a.sort, a.domains_tli, a.name, a.id";
            if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            }
            debug("images orderBy =", orderBy);
            // many
	    var limit = 100;
            sql = "select a.status, a.sort, a.id, a.domains_tli, a.quality as q, a.url as url from images a " + orderBy + " LIMIT " + limit + ";";
        }
        return sql;
    };
}

module.exports = new Images();

// end
