/**
 * Module Hosts.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Hosts() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("hosts instantiated", instanceCount);
    this.name = "hosts";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("hosts classNameFilter =", classNameFilter);
        debug("hosts paramSort =", paramSort);
        debug("hosts specialFlag =", specialFlag);
        debug("hosts queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    orderBy = "order by z.id;";
	    debug("hosts orderBy =", orderBy);
	    sql = "select * from hosts z where cast(z.parent_class_primary_key_string as integer) = cast('" + idOrNoId + "' as integer);";
        } else {
            orderBy = "order by z.parent_class_name_string;";
            debug("hosts orderBy =", orderBy);
            sql = "select z.id, z.parent_class_name_string, z.parent_class_primary_key_string, concat('<a href=\"../', z.parent_class_name_string, '/', z.parent_class_primary_key_string, '\">', z.parent_class_primary_key_string, '</a>') as parent, z.child_class_name_string, z.child_class_primary_key_string, concat('<a href=\"../', z.child_class_name_string, '/', z.child_class_primary_key_string, '\">', z.child_class_primary_key_string, '</a>') as child from hosts z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Hosts();

// end
