/**
 * Module Customers.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Customers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("customers instantiated", instanceCount);
    this.name = "customers";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("customers idOrNoId =", idOrNoId);
	debug("customers classNameFilter =", classNameFilter);
        debug("customers paramSort =", paramSort);
        debug("customers specialFlag =", specialFlag);
        debug("customers queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // simple sql
            sql = "select z.id, z.name from customers z where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.name, z.id";
            debug("customers orderBy =", orderBy);
	    sql = "select z.id, z.name from customers z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Customers();

// end
