/**
 * Module Indiegoals.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Indiegoals() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("indiegoals instantiated", instanceCount);
    this.name = "indiegoals";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("indiegoals classNameFilter =", classNameFilter);
        debug("indiegoals paramSort =", paramSort);
	debug("indiegoals specialFlag =", specialFlag);
        debug("indiegoals queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.id, a.name, a.sort, a.status, a.url from indiegoals a where a.id = " + id + ";";
        } else {
            orderBy = "ORDER BY a.status DESC, a.sort DESC, a.name, a.id";
            if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            }
            debug("indiegoals orderBy =", orderBy);
            // many
            sql = "select a.status, a.sort, a.id, a.name, a.url, a.yawp_agent_type as yawp_agent_type from indiegoals a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Indiegoals();

// end
