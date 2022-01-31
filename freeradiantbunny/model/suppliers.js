/**
 * Module Suppliers.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Suppliers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("suppliers instantiated", instanceCount);
    this.name = "suppliers";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("suppliers idOrNoId =",idOrNoId);
        debug("suppliers classNameFilter =", classNameFilter);
        debug("suppliers paramSort =", paramSort);
        debug("suppliers specialFlag =", specialFlag);
        debug("suppliers queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = "select s.id, s.name, s.city , s.state, s.url, s.bioregion, s.sort, s.status, s.sort, s.description, s.img_url from suppliers s where s.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY u.sort DESC, u.name, u.id";
            debug("suppliers orderBy =", orderBy);
	    // broken piece of sql: array(select count(sp.id) from seed_packets sp) as seed_packets_count
	    // many
            sql = "select u.status, u.sort, u.id, u.img_url as img, u.name, u.city, u.state, u.url, array(select count(x.id) from seed_packets x where x.supplier_id = u.id) as seed_packets_count from suppliers u " + orderBy;
        }
        return sql;
    };
}

module.exports = new Suppliers();

// end
