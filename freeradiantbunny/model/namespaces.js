/**
 * Module Namespaces.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Namespaces() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("namespaces instantiated", instanceCount);
    this.name = "namespaces";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("namespaces idOrNoId =", idOrNoId);
	debug("namespaces classNameFilter =", classNameFilter);
        debug("namespaces paramSort =", paramSort);
	debug("namespaces specialFlag =", specialFlag);
        debug("namespaces queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.id, a.name, a.status, a.sort, a.volume, a.top_class_name, a.top_id, a.ig_name, a.description, a.img_url, a.order_by, a.alias from namespaces a where a.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY a.sort DESC, a.name";
            debug("namespaces orderBy =", orderBy);
            // many
            sql = "select a.status, a.sort, a.id, a.name, array(select concat(a.top_class_name, ':', '<a href=\"../', a.top_class_name, '/', a.top_id, '\">', p.name, '</a>') from projects p where p.id = a.top_id::int) as top, a.ig_name as ig_name from namespaces a where a.status = '2022' " + orderBy;
        }
        return sql;
    };
}

module.exports = new Namespaces();

// end
