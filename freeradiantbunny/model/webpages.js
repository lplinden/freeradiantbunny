/**
 * Module Webpages.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Webpages() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("webpages instantiated", instanceCount);
    this.name = "webpages";
    this.schema = ['status',
		   'sort',
		   'id',
		   'domains_tli',
		   'name',
		   'description',
		   'img_url',
		   'path',
		   'template'];
    this.inboundForeignKeyTables = ['blogposts'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("webpages idOrNoId =", idOrNoId);
        debug("webpages classNameFilter =", classNameFilter);
        debug("webpages paramSort =", paramSort);
        debug("webpages specialFlag =", specialFlag);
        debug("webpages queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    if (classNameFilter && classNameFilter == "domains") {
		var orderBy = "ORDER BY z.sort DESC, z.path, z.id";
		sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, concat('<a href=\"http', d.ssl_cert, '://', d.domain_name, z.path, '\">', z.path, '</a>') as path, array(select concat('<a href=../../maxonomies/', m.id, '>', m.name, '</a>') from maxonomies m, webpage_maxonomies wm, webpages w, domains d where wm.maxonomies_id = m.id AND w.id = wm.webpages_id AND z.id = w.id AND w.domains_tli = d.tli AND d.id = " + idOrNoId + ") as maxonomies, template from webpages z, domains d where d.tli = z.domains_tli AND d.id = " + idOrNoId + " " + orderBy + ";";
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
		// refactor
		//sql = "select z.id, concat('<a href=\"../domains/', d.id, '\">', d.tli,'</a>') as domains_tli, z.status, z.sort, z.img_url as img, z.name, z.path, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathhyperlink, z.description from webpages z, domains d where d.tli = z.domains_tli AND z.id = " + idOrNoId + ";";
	    }
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.domains_tli, z.name";
            if (paramSort === "random") {
		orderBy = "ORDER BY id=random()";
	    }
            debug("webpages orderBy =", orderBy);
	    // set statement to using the considtional in the line below
	    // use this sql statement to show linkcheck
	    //sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathhyperlink, array(select concat('<a href=../maxonomies/', m.id, '>', m.name, '</a>') from  m maxonomies, wm webpage_maxonomies where wm.maxonomies_id = m.id AND wm.webpage_id = " + idOrNoId + ") as maxonomies, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml, concat('https://', d.domain_name, z.path) as linkcheck from webpages z, domains d where d.tli = z.domains_tli " + orderBy + ";";
	    // use this sql statement to show linkcheck
	    // many default
	    // had to edit out the tag field because it was producing duplicate rows
	    // array(select t.name from tags t, webpage_tags wt where wt.tag_id = t.id AND wt.webpage_id = z.id) as tags,
	    // old perfectly good sql
	    //sql = "select z.status, z.sort, z.id, z.domains_tli as tli, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathhyperlink, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml from webpages z, domains d, tags t where wt.webpage_id = z.id AND wt.tag_id = t.id AND d.tli = z.domains_tli GROUP BY z.status, z.sort, z.id, z.domains_tli, z.img_url, z.name, d.domain_name, z.path " + orderBy + " LIMIT 100;";
            if (paramSort === "statuscode") {
		// shows the statuscode that uses socket.io to test 200 or 404
		sql = "select z.status, z.sort, z.id, z.domains_tli as tli, z.img_url as img, z.name, concat('<a href=\"https://', d.domain_name, z.path, '\">', z.path, '</a>') as pathhyperlink, concat('https://', d.domain_name, z.path) as statuscode, concat('https://', d.domain_name, z.path) as validhtml from webpages z, domains d, tags t where wt.webpage_id = z.id AND wt.tag_id = t.id AND d.tli = z.domains_tli GROUP BY z.status, z.sort, z.id, z.domains_tli, z.img_url, z.name, d.domain_name, z.path " + orderBy + ";";
	    } else {
		sql = "select z.status, z.sort, z.id, z.img_url as img, concat('<a href=\"https://', d.domain_name, z.path, '\">', 'https://', d.domain_name, z.path, '</a>') as pathhyperlink, z.name as title from webpages z, domains d where d.tli = z.domains_tli  " + orderBy + ";";
	    }
        }
        return sql;
    };
}

module.exports = new Webpages();

// end
