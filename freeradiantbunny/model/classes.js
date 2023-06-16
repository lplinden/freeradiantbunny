/**
 * Module Classes.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Classes() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("classes instantiated", instanceCount);
    this.name = "classes";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'scrubber_flag',
		   'increment_id_flag',
		   'specialized_fields',
		   'fk_constraints',
		   'privileged_owner',
		   'make_index_flag',
		   'make_unique',
		   'zachmans_id',
		   'subsystems_id',
		   'dev',
		   'lookup',
		   'notes'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("classes idOrNoId", idOrNoId);
        debug("classes classNameFilter =", classNameFilter);
	debug("classes paramSort=", paramSort);
	debug("classes specialFlag =", specialFlag);
        debug("classes queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY a.sort DESC, a.subsystems_id, a.zachmans_id, a.name";
            if (paramSort === "sort") {
                orderBy = "ORDER BY a.sort DESC, a.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY a.status, a.subsystems_id, a.name";
            } else if (paramSort === "subsystems_id") {
                orderBy = "ORDER BY a.subsystems_id, a.name";
            } else if (paramSort === "extends_class") {
                orderBy = "ORDER BY b.id, a.name";
            } else if (paramSort === "zachmans_id") {
                orderBy = "ORDER BY a.zachmans_id";
	    } else if (paramSort === "lookup") {
		orderBy = "ORDER BY a.lookup, a.name";
            }
            debug("classes orderBy =", orderBy);
            // many
	    // temp
            sql = "select a.status, a.sort, a.id, a.name, array(select concat('<a href=\"../subsystems/', s.id, '\" style=\"text-decoration: none;\">', s.name, '</a>') from subsystems s where a.subsystems_id = s.id) as subsystem, array(select concat('<a href=\"../zachmans/', z.id, '\" style=\"text-decoration: none;\">', z.name, '</a>') from zachmans z where a.zachmans_id = z.id) as zachman, a.dev from classes a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Classes();

// end
