/**
 * Module Blogposts.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Blogposts() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("blogposts instantiated", instanceCount);
    this.name = "blogposts";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("blogposts idOrNoId =", idOrNoId);
	debug("blogposts classNameFilter =", classNameFilter);
        debug("blogposts paramSort =", paramSort);
	debug("blogposts specialFlag =", specialFlag);
        debug("blogposts queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.sort, a.id, a.name, a.body, a.img_url, a.tags, a.url_alias, a.author, a.pubdate, a.webpage_id, a.database_string, a.class_name_string, a.class_primary_key_string, a.description, a.status from blogposts a where a.id = " + id + ";";
        } else {
            orderBy = "ORDER BY a.id DESC";
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
