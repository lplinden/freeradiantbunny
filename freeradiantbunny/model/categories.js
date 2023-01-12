/**
 * Module Categories.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Categories() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("categories instantiated", instanceCount);
    this.name = "categories";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'parent_categories_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("categories idOrNoId =", idOrNoId);
	debug("categories classNameFilter =", classNameFilter);
        debug("categories paramSort =", paramSort);
        debug("categories specialFlag =", specialFlag);
        debug("categories queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
            //sql = "select z.id, z.img_url as img, z.name, z.description, concat('<a href=\"../hyperlinks/categories/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from categories z LEFT JOIN (SELECT b.id, b.category_id FROM hyperlink_categories b) b ON (z.id = b.category_id) WHERE z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            var orderBy = "ORDER BY z.name";
            debug("categories orderBy =", orderBy);
            sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/categories/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from categories z LEFT JOIN (SELECT b.id, b.category_id FROM hyperlink_categories b) b ON (z.id = b.category_id) GROUP BY z.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Categories();

// end
