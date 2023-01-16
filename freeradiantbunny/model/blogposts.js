/**
 * Module Blogposts.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Blogposts() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("blogposts instantiated", instanceCount);
    this.name = "blogposts";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'body',
		   'tags',
		   'url_alias',
		   'author',
		   'pubdate',
		   'webpages_id',
		   'database_string',
		   'class_name_string',
		   'class_primary_key_string'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("blogposts idOrNoId =", idOrNoId);
	debug("blogposts classNameFilter =", classNameFilter);
        debug("blogposts paramSort =", paramSort);
	debug("blogposts specialFlag =", specialFlag);
        debug("blogposts queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
            var id = idOrNoId;
            sql = "select a.sort, a.id, a.name, a.body, a.img_url, a.tags, a.url_alias, a.author, a.pubdate, a.webpage_id, a.database_string, a.class_name_string, a.class_primary_key_string, a.description, a.status from blogposts a where a.id = " + id + ";";
        } else {
            var orderBy = "ORDER BY a.id DESC";
            if (paramSort === "sort") {
                orderBy = "ORDER BY a.sort DESC, a.name";
            }
            debug("blogposts orderBy =", orderBy);
            // many
            sql = "select a.sort, a.id, a.name, a.body, a.img_url, a.tags, a.url_alias, a.author, a.pubdate, a.webpage_id, a.database_string, a.class_name_string, a.class_primary_key_string, a.description, a.status from blogposts a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Blogposts();

// end
