/**
 * Module Images.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Images() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("images instantiated", instanceCount);
    this.name = "images";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("images classNameFilter =", classNameFilter);
        debug("images paramSort =", paramSort);
	debug("images specialFlag =", specialFlag);
        debug("images queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    if (classNameFilter == "domains") {
		// standard order
		orderBy = "ORDER BY z.sort DESC, z.name";
		// idOrNoId refers to domains table
		sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from images z, domains d where z.domain_tli = d.tli AND d.id = '" + idOrNoId + "' " + orderBy + ";";
	    } else {
		var id = idOrNoId;
		sql = "select a.id, a.name, a.description, a.img_url as img, a.sort, a.status, a.domain_tli from images a where a.id = " + id + ";";
	    }
        } else {
            orderBy = "ORDER BY a.status DESC, a.sort DESC, a.domain_tli, a.name, a.id";
            if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            }
            debug("images orderBy =", orderBy);
            // many
            sql = "select a.status, a.sort, a.domain_tli, a.id, a.img_url as img, a.name as alt, a.quality as q from images a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Images();

// end
