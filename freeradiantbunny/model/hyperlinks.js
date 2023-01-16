/**
 * Module Hyperlinks.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Hyperlinks() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("hyperlinks instantiated", instanceCount);
    this.name = "hyperlinks";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("hyperlinks idOrNoId =", idOrNoId);
	debug("hyperlinks classNameFilter =", classNameFilter);
        debug("hyperlinks paramSort =", paramSort);
	debug("hyperlinks specialFlag =", specialFlag);
        debug("hyperlinks queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
            if (classNameFilter) {
                if (classNameFilter === "reasons") {
                    var reason_id = idOrNoId;
                    sql = "select u.id, u.img_url as img, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, concat('<a href=\"', u.url, '\">', u.url, '</a>') as urlurl, u.description from hyperlinks u, hyperlink_reasons hr where u.id = hr.hyperlink_id AND hr.reason_id=" + reason_id + ";";
                } else if (classNameFilter === "categories") {
                    var category_id = idOrNoId;
                    sql = "select u.id, u.img_url as img, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, concat('<a href=\"', u.url, '\">', u.url, '</a>') as urlurl, u.description from hyperlinks u, hyperlink_categories hr where u.id = hr.hyperlink_id AND hr.category_id=" + category_id + ";";
                } else if (classNameFilter === "tags") {
                    var tag_id = idOrNoId;
                    sql = "select u.id, u.img_url as img, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, concat('<a href=\"', u.url, '\">', u.url, '</a>') as urlurl, u.description from hyperlinks u, hyperlink_tags hr where u.id = hr.hyperlink_id AND hr.tag_id=" + tag_id + ";";
                } else if (classNameFilter === "permaculture_topics") {
                    var permaculture_topic_id = idOrNoId;
                    sql = "select u.id, u.img_url as img, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, concat('<a href=\"', u.url, '\">', u.url, '</a>') as urlurl, u.description from hyperlinks u, hyperlink_permaculture_topics hr where u.id = hr.hyperlink_id AND hr.permaculture_topic_id=" + permaculture_topic_id + ";";
                } else if (classNameFilter === "plans") {
                    var plant_id = idOrNoId;
                    sql = "select u.id, u.img_url as img, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, concat('<a href=\"', u.url, '\">', u.url, '</a>') as urlurl, u.description from hyperlinks u, hyperlink_plants hr where u.id = hr.hyperlink_id AND hr.plant_id=" + plant_id + ";";
                } else {
                    debug("hyperlinks error classNameFilter is not known",  classNameFilter);
                }
            } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);		
		// refactor
                sql = "select u.id, u.img_url as img, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, concat('<a href=\"', u.url, '\">', u.url, '</a>') as urlurl, u.description, count(r.id) as reasonscount, count(b.id) as ptopicscount, count(c.id) as categoriescount, count(t.id) as tagscount , count(p.id) as plantscount from hyperlinks u LEFT JOIN hyperlink_permaculture_topics b ON u.id = b.hyperlink_id LEFT JOIN hyperlink_reasons r ON u.id = r.hyperlink_id LEFT JOIN hyperlink_categories c ON u.id = c.hyperlink_id LEFT JOIN hyperlink_tags t ON u.id = t.hyperlink_id LEFT JOIN hyperlink_plants p ON u.id = p.hyperlink_id where u.id = " + idOrNoId + " GROUP BY u.id";
            }
        } else {
            if (specialFlag) {
                if (queryTerms.length > 0) {
                    // search
                    var orderBy = "ORDER BY u.id";
                    debug("hyperlinks orderBy =", orderBy);
                    sql = "SELECT * FROM search('" + queryTerms + "');";
                } else {
		    // note that the following can go away and was a poor idea or misplaced idea
                    // hyperlinks special page
                    var orderBy = "ORDER BY random()";
                    debug("hyperlinks orderBy =", orderBy);
                    sql = "select u.id, concat('<a href=\"', u.url, '\"><img src=\"', u.img_url, '\" alt=\"\" style=\"width: 44px; height: 44px; border-radius:12%;\"/></a>') as aimg, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, u.description from hyperlinks u " + orderBy + " LIMIT 8;";
                }
            } else {
                var orderBy = "ORDER BY u.name";
                debug("hyperlinks orderBy =", orderBy);
		// complicated, too complicated
                //sql = "select u.id, u.img_url as img, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, concat('<a href=\"', u.url, '\">', u.url, '</a>') as urlurl, count(r.id) as reasonscount, count(b.id) as ptopicscount, count(c.id) as categoriescount, count(t.id) as tagscount , count(p.id) as plantscount from hyperlinks u LEFT JOIN hyperlink_permaculture_topics b ON u.id = b.hyperlink_id LEFT JOIN hyperlink_reasons r ON u.id = r.hyperlink_id LEFT JOIN hyperlink_categories c ON u.id = c.hyperlink_id LEFT JOIN hyperlink_tags t ON u.id = t.hyperlink_id LEFT JOIN hyperlink_plants p ON u.id = p.hyperlink_id GROUP BY u.id " + orderBy;
		// simple
		// todo fix this so that it paginates (find all of the LIMITs)
		var limit = 100;
		sql = "select u.id, u.img_url as img, concat('<a href=\"', u.url, '\">', u.name, '</a>') as nameurl, concat('<a href=\"', u.url, '\">', u.url, '</a>') as urlurl from hyperlinks u " + orderBy + " LIMIT " + limit + ";";
            }
        }
        return sql;
    };
}

module.exports = new Hyperlinks();
