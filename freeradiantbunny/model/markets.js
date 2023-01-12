/**
 * Module Markets.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Markets() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("markets instantiated", instanceCount);
    this.name = "markets";
    this.schema = ['id',
		  'name'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("markets idOrNoId =", idOrNoId);	
        debug("markets classNameFilter =", classNameFilter);
        debug("markets paramSort =", paramSort);
        debug("markets specialFlag =", specialFlag);
        debug("markets queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            // single
            debug("markets idOrNoId =", idOrNoId);
            sql = "select z.id, z.name, z.img_url as img, z.description, z.status, z.sort, concat('<a href=\"', z.url, '\">', z.url, '</a>') as url z.api from markets as z where z.id = cast('" + idOrNoId + "' as integer);";
        } else {
            orderBy = "order by z.sort DESC, z.name";
            debug("markets orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as img, concat('<a href=\"', z.url, '\">', z.name, '</a>') as name, z.description, z.api from markets as z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Markets();

// end
