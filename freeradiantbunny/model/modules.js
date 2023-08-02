/**
 * Module Modules.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Modules() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("modules instantiated", instanceCount);
    this.name = "modules";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'dev'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("modules idOrNoId", idOrNoId);
        debug("modules classNameFilter =", classNameFilter);
	debug("modules paramSort=", paramSort);
	debug("modules specialFlag =", specialFlag);
        debug("modules queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY a.id, a.sort DESC, a.name";
            if (paramSort === "sort") {
                orderBy = "ORDER BY a.sort DESC, a.name";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY a.status, a.name";
            }
            debug("modules orderBy =", orderBy);
            // many
	    // temp
	    // old version
            //sql = "select a.status, a.sort, a.id, a.name, array(select concat('<a href=\"../subsystems/', s.id, '\" style=\"text-decoration: none;\">', s.name, '</a>') from subsystems s where a.subsystems_id = s.id) as subsystem, array(select concat('<a href=\"../zachmans/', z.id, '\" style=\"text-decoration: none;\">', z.name, '</a>') from zachmans z where a.zachmans_id = z.id) as zachman, a.dev, a.fk_constraints from modules a " + orderBy;
	    // after changing schema
	    sql = "select a.status, a.sort, a.id, a.name, a.dev from modules a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Modules();

// end
