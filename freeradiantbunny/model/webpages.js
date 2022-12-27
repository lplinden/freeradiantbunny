/**
 * Module Webpages.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Webpages() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("webpages instantiated", instanceCount);
    this.name = "webpages";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("webpages idOrNoId =", idOrNoId);
        debug("webpages classNameFilter =", classNameFilter);
        debug("webpages paramSort =", paramSort);
        debug("webpages specialFlag =", specialFlag);
        debug("webpages queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    if (classNameFilter) {
		// use this sql statement to not show linkcheck
		// useful order, set up a parameter that can call it
		//orderBy = "ORDER BY z.path, z.sort DESC";
		// standard order
		orderBy = "ORDER BY z.sort DESC, z.name";
		// idOrNoId refers to domains table
		sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, concat('<a href=\"http', d.ssl_cert, '://', d.domain_name, z.path, '\">', z.path, '</a>') as pathyperlink, array(select concat('<a href=../../maxonomies/', m.id, '>', m.name, '</a>') from maxonomies m, webpage_maxonomies wm, webpages w, domains d where wm.maxonomy_id = m.id AND w.id = wm.webpage_id AND z.id = w.id AND w.domain_tli = d.tli AND d.id = " + idOrNoId + ") as maxonomies, array(select concat('<a href=../../tags/', t.id, '>', t.name, '</a>') from tags t, webpage_tags wt, webpages w, domains d where t.id = wt.tag_id AND wt.webpage_id = w.id AND w.domain_tli = d.tli AND d.id = " + idOrNoId + " AND z.id = w.id) as tags from webpages z, domains d where d.tli = z.domain_tli AND d.id = " + idOrNoId + " " + orderBy + ";";
	    } else {
		sql = "select z.id, concat('<a href=\"../domains/', d.id, '\">', d.tli,'</a>') as domain_tli, z.status, z.sort, z.img_url as img, z.name, z.path, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathhyperlink, z.description from webpages z, domains d where d.tli = z.domain_tli AND z.id = " + idOrNoId + ";";
	    }
        } else {
            orderBy = "ORDER BY z.sort DESC, z.domain_tli, z.name";
            if (paramSort === "random") {
		orderBy = "ORDER BY id=random()";
	    }
            debug("webpages orderBy =", orderBy);
	    // set statement to using the considtional in the line below
	    // use this sql statement to show linkcheck
	    //sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathhyperlink, array(select concat('<a href=../maxonomies/', m.id, '>', m.name, '</a>') from  m maxonomies, wm webpage_maxonomies where wm.maxonomies_id = m.id AND wm.webpage_id = " + idOrNoId + ") as maxonomies, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml, concat('https://', d.domain_name, z.path) as linkcheck from webpages z, domains d where d.tli = z.domain_tli " + orderBy + ";";
	    // use this sql statement to show linkcheck
	    // many default
	    // had to edit out the tag field because it was producing duplicate rows
	    // array(select t.name from tags t, webpage_tags wt where wt.tag_id = t.id AND wt.webpage_id = z.id) as tags,
	    // old perfectly good sql
	    //sql = "select z.status, z.sort, z.id, z.domain_tli as tli, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathhyperlink, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml from webpages z, domains d, webpage_tags wt, tags t where wt.webpage_id = z.id AND wt.tag_id = t.id AND d.tli = z.domain_tli GROUP BY z.status, z.sort, z.id, z.domain_tli, z.img_url, z.name, d.domain_name, z.path " + orderBy + " LIMIT 100;";
            if (paramSort === "statuscode") {
		// shows the statuscode that uses socket.io to test 200 or 404
		sql = "select z.status, z.sort, z.id, z.domain_tli as tli, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathhyperlink, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml from webpages z, domains d, webpage_tags wt, tags t where wt.webpage_id = z.id AND wt.tag_id = t.id AND d.tli = z.domain_tli GROUP BY z.status, z.sort, z.id, z.domain_tli, z.img_url, z.name, d.domain_name, z.path " + orderBy + ";";
	    } else {
		sql = "select z.status, z.sort, z.id, concat('<a href=\"http', d.ssl_cert, '://', d.domain_name, '\">', d.domain_name, '</a>') as tli, z.img_url as img, concat('<a href=\"https://', d.domain_name, z.path, '\">', 'https://', d.domain_name, z.path, '</a>') as pathhyperlink, z.quality as q, z.name as title from webpages z, domains d where d.tli = z.domain_tli  " + orderBy + ";";
	    }
        }
        return sql;
    };
}

module.exports = new Webpages();

// end
