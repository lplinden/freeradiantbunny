/**
 * Module Maxonomies.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Maxonomies() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("maxonomies instantiated", instanceCount);
    this.name = "maxonomies";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("maxonomies classNameFilter =", classNameFilter);
        debug("maxonomies paramSort =", paramSort);
        debug("maxonomies specialFlag =", specialFlag);
        debug("maxonomies queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.name, z.img_url as image, z.status, z.sort, z.description, z.categorization, z.how_to_measure, z.ocm as reference, order_by from maxonomies z WHERE z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name";
            debug("maxonomies orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as image, z.name, z.ocm as reference from maxonomies z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Maxonomies();

// end
