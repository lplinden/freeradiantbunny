// PermacultureTopics

var debug = require('debug')('frb');

var instanceCount = 0;

function PermacultureTopics() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("permacultureTopics instantiated", instanceCount);
    this.name = "permaculture_topics";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("permaculture_topics classNameFilter =", classNameFilter);
        debug("permaculture_topics paramSort =", paramSort);
        debug("permaculture_topics specialFlag =", specialFlag);
        debug("permaculture_topics queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.img_url as img, z.name, z.description, concat('<a href=\"../hyperlinks/permaculture_topics/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from permaculture_topics z LEFT JOIN (SELECT b.id, b.permaculture_topic_id FROM hyperlink_permaculture_topics b) b ON (z.id = b.permaculture_topic_id) WHERE z.id = " + idOrNoId + " GROUP BY z.id;";
        } else {
            orderBy = "ORDER BY z.id";
            debug("sqlmaker paramSort =", paramSort);
            debug("sqlmaker orderBy =", orderBy);
            sql = "select z.id, z.img_url as img, z.name, concat('<a href=\"../hyperlinks/permaculture_topics/', z.id, '\">', count(b.id), '</a>') as hyperlinkscount from permaculture_topics z LEFT JOIN (SELECT b.id, b.permaculture_topic_id FROM hyperlink_permaculture_topics b) b ON (z.id = b.permaculture_topic_id) GROUP BY z.id " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new PermacultureTopics();

// end
