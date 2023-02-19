/**
 * Module TagInstances.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function TagInstances() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tag_instances instantiated", instanceCount);
    this.name = "tag_instances";
    this.schema = ['id',
		   'tag_id',
		   'class_name_string',
		   'class_primary_key_string'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramUpIsValid, specialFlag, queryTerms) {
	debug("tag_instances idOrNoId =",idOrNoId);
        debug("tag_instances classNameFilter =", classNameFilter);
        debug("tag_instances paramSort =", paramSort);
        debug("tag_instances specialFlag =", specialFlag);
        debug("tag_instances queryTerms =", queryTerms);
        var sql;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY u.id";
            debug("tag_instances orderBy =", orderBy);
	    // many
	    sql = "select u.id, u.class_name_string, u.class_primary_key_string, u.tag_id, concat('<a href=\"', '../tags/', t.id, '\">', t.name, '</a>') as tag, t.name from tag_instances u, tags t WHERE u.tag_id = t.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new TagInstances();

// end
