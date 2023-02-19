/**
 * Module Tags.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Tags() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tags instantiated", instanceCount);
    this.name = "tags";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'permaculture_topics_id',
		   'alias',
		   'url'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("tags idOrNoId =", idOrNoId);
	debug("tags classNameFilter =", classNameFilter);
        debug("tags paramSort =", paramSort);
        debug("tags specialFlag =", specialFlag);
        debug("tags queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
	    // needs work on GROUP BY
            //sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.alias, z.description, z.url, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount, z.permaculture_topics_id as ptopic from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) WHERE z.id = " + idOrNoId + ";";
	    // simple sql
            //sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.alias, z.description, z.url from tags z where z.id = " + idOrNoId + ";";
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("tags orderBy =", orderBy);
            // sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) GROUP BY z.id " + orderBy + ";";
	    // add column
	    // backup
            //sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount, array(select s2.name from suppliers s2, classes_tags cl where cl.tag_id = z.id and cl.id_of_given_class = s2.id order by s2.name) as suppliers_name from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) GROUP BY z.id " + orderBy + ";";
	    // depents upon another table
            // sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.alias, z.url, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount, array(select concat(' <a href=\"../suppliers/', s2.id, '\">', s2.name, '</a>') from suppliers s2, classes_tags cl where cl.class_name = 'suppliers' and cl.tag_id = z.id and cl.id_of_given_class = s2.id order by s2.name) as suppliers_name, array(select concat(' <a href=\"../coins/', c2.id, '\">', c2.ticker, '</a>') from coins c2, classes_tags cl where cl.class_name = 'coins' and cl.tag_id = z.id and cl.id_of_given_class = c2.id order by c2.ticker) as coin_ticker, z.permaculture_topics_id as ptopic  from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) GROUP BY z.id " + orderBy + ";";
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, array(select count(ti.id) from tags ta, tag_instances ti where ta.id = ti.tag_id AND ta.id = z.id) as count, z.alias, z.url from tags z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Tags();

// end
