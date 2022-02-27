/**
 * Module Tags.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Tags() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tags instantiated", instanceCount);
    this.name = "tags";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("tags idOrNoId =", idOrNoId);
	debug("tags classNameFilter =", classNameFilter);
        debug("tags paramSort =", paramSort);
        debug("tags specialFlag =", specialFlag);
        debug("tags queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.alias, z.description, z.url, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount, z.permaculture_topic_id as ptopic from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) WHERE z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("tags orderBy =", orderBy);
            // sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) GROUP BY z.id " + orderBy + ";";
	    // add column
	    // backup
            //sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount, array(select s2.name from suppliers s2, classes_tags cl where cl.tag_id = z.id and cl.id_of_given_class = s2.id order by s2.name) as suppliers_name from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) GROUP BY z.id " + orderBy + ";";
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.alias, z.url, concat('<a href=\"../hyperlinks/tags/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount, array(select concat(' <a href=\"../suppliers/', s2.id, '\">', s2.name, '</a>') from suppliers s2, classes_tags cl where cl.class_name = 'suppliers' and cl.tag_id = z.id and cl.id_of_given_class = s2.id order by s2.name) as suppliers_name, array(select concat(' <a href=\"../coins/', c2.id, '\">', c2.ticker, '</a>') from coins c2, classes_tags cl where cl.class_name = 'coins' and cl.tag_id = z.id and cl.id_of_given_class = c2.id order by c2.ticker) as coin_ticker, z.permaculture_topic_id as ptopic  from tags z LEFT JOIN (SELECT b.id, b.tag_id FROM hyperlink_tags b) b ON (z.id = b.tag_id) GROUP BY z.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Tags();

// end
