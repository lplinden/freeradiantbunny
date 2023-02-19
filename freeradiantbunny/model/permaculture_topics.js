/**
 * Module PermacultureTopics.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function PermacultureTopics() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("permacultureTopics instantiated", instanceCount);
    this.name = "permaculture_topics";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("permaculture_topics idOrNoId =", idOrNoId);
	debug("permaculture_topics classNameFilter =", classNameFilter);
        debug("permaculture_topics paramSort =", paramSort);
        debug("permaculture_topics specialFlag =", specialFlag);
        debug("permaculture_topics queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables,  paramUpkIsValid);
	    // refactor
            //sql = "select z.id, z.img_url as img, z.name, z.description, concat('<a href=\"../hyperlinks/permaculture_topics/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from permaculture_topics z LEFT JOIN (SELECT b.id, b.permaculture_topic_id FROM hyperlink_permaculture_topics b) b ON (z.id = b.permaculture_topic_id) WHERE z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            var orderBy = "ORDER BY z.id";
            debug("permaculture_topics orderBy =", orderBy);
            sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/permaculture_topics/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from permaculture_topics z LEFT JOIN (SELECT b.id, b.permaculture_topic_id FROM hyperlink_permaculture_topics b) b ON (z.id = b.permaculture_topic_id) GROUP BY z.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new PermacultureTopics();

// end
