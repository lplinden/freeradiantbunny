/**
 * Module Rules.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Rules() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("rules instantiated", instanceCount);
    this.name = "rules";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("rules classNameFilter =", classNameFilter);
        debug("rules paramSort =", paramSort);
        debug("rules specialFlag =", specialFlag);
        debug("rules queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description, z.antecedent, z.consequent from rules z WHERE z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name";
            debug("rules orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description, z.antecedent, z.consequent from rules z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Rules();

// end
