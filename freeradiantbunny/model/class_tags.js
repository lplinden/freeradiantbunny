/**
 * Module ClassTags.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function ClassTags() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("class_tags instantiated", instanceCount);
    this.name = "class_tags";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("class_tags idOrNoId =",idOrNoId);
        debug("class_tags classNameFilter =", classNameFilter);
        debug("class_tags paramSort =", paramSort);
        debug("class_tags specialFlag =", specialFlag);
        debug("class_tags queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = "select s.id, s.class_name, s.id_of_given_class, s.tag_id from class_tags s where s.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY u.id";
            debug("class_tags orderBy =", orderBy);
	    // many
	    sql = "select u.id, u.class_name, u.id_of_given_class, u.tag_id from class_tags u " + orderBy;
        }
        return sql;
    };
}

module.exports = new ClassTags();

// end
