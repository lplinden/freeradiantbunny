/**
 * Module Lands.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Lands() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("lands instantiated", instanceCount);
    this.name = "lands";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("lands idOrNoId =", idOrNoId);
	debug("lands classNameFilter =", classNameFilter);
        debug("lands paramSort =", paramSort);
	debug("lands specialFlag =", specialFlag);
        debug("lands queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
	    // too complicated, does not always work because assciations may not yet exist
            //sql = "select a.id, a.name, a.sort, count(b.id) as beds_count from lands a, beds b where a.id = b.land_id AND a.id = " + id + " GROUP BY a.id;";
	    // simple versino
            sql = "select a.status, a.sort, a.id, a.name, a.description from lands a where a.id = " + id + ";";
        } else {
            orderBy = "ORDER BY a.sort DESC, a.name";
            if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            }
            debug("lands orderBy =", orderBy);
            // manya
            sql = "select a.id, a.name from lands a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Lands();

// end
