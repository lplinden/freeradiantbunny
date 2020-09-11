// Webpages

var debug = require('debug')('frb');

var instanceCount = 0;

function Webpages() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("webpages instantiated", instanceCount);
    this.name = "webpages";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("webpages classNameFilter =", classNameFilter);
        debug("webpages paramSort =", paramSort);
        debug("webpages specialFlag =", specialFlag);
        debug("webpages queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    if (classNameFilter) {
		// use this sql statement to not show linkcheck
		orderBy = "ORDER BY z.sort DESC, z.path";
		// idOrNoId refers to domains table
		sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathurl, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml from webpages z, domains d where d.tli = z.domain_tli AND d.id = " + idOrNoId + " " + orderBy + ";";
	    } else {
		sql = "select z.id, z.domain_tli, z.status, z.sort, z.img_url as img, z.name, z.path, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathurl, z.description from webpages z, domains d where d.tli = z.domain_tli AND z.id = " + idOrNoId + ";";
	    }
        } else {
            orderBy = "ORDER BY z.sort DESC, z.path";
            debug("sqlmaker paramSort =", paramSort);
            debug("sqlmaker orderBy =", orderBy);
	    // set statement to using the considtional in the line below
	    if (false) {
		// use this sql statement to show linkcheck
		sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathurl, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml, concat('https://', d.domain_name, z.path) as linkcheck from webpages z, domains d where d.tli = z.domain_tli " + orderBy + ";";
	    } else {
		// use this sql statement to not show linkcheck
		sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathurl, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml from webpages z, domains d where d.tli = z.domain_tli " + orderBy + ";";
	    }
        }
        return sql;
    };
}

module.exports = new Webpages();

// end
