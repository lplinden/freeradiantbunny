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
		   'zachman_id',
		   'subsystem_id',
		   'dev',
		   'lookup',
		   'notes'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("classes idOrNoId", idOrNoId);
        debug("classes classNameFilter =", classNameFilter);
	debug("classes paramSort=", paramSort);
	debug("classes specialFlag =", specialFlag);
        debug("classes queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId);
        } else {
            var orderBy = "ORDER BY a.sort DESC, a.name";
            if (paramSort === "sort") {
                orderBy = "ORDER BY a.sort DESC, a.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY a.status, a.subsystem_id, a.name";
            } else if (paramSort === "subsystem_id") {
                orderBy = "ORDER BY a.subsystem_id, a.name";
            } else if (paramSort === "extends_class") {
                orderBy = "ORDER BY b.id, a.name";
            } else if (paramSort === "zachman_id") {
                orderBy = "ORDER BY a.zachman_id";
	    } else if (paramSort === "lookup") {
		orderBy = "ORDER BY a.lookup, a.name";
            }
            debug("classes orderBy =", orderBy);
            // many
	    // temp
            sql = "select a.status, a.sort, a.id, a.name, array(select z.name from zachmans z where a.zachman_id = z.id) as zachman, array(select s.name from subsystems s where a.subsystem_id = s.id) as subsystem, a.dev from classes a " + orderBy;
	    // has select within a select, so refactor
	    //sql = "select a.status, a.sort, array(select z.name from zachmans z where a.zachman_id = z.id) as zachman, array(select s.name from subsystems s where a.subsystem_id = s.id) as subsystem, a.id, a.img_url as img, a.name as name, a.dev as dev, a.lookup as lookup from classes a " + orderBy;
	    
        }
        return sql;
    };
}

module.exports = new Classes();

// end
