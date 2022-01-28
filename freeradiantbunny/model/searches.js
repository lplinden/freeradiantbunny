/**
 * Module Searches.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Searches() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("searches instantiated", instanceCount);
    this.name = "searches";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("searches classNameFilter =", classNameFilter);
        debug("searches paramSort =", paramSort);
        debug("searches specialFlag =", specialFlag);
        debug("searches queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    // to following makes it easy to turn off the code
            if (true) {
		// the following is a deviation from the norm because it searches in other tables
		// find this z.name in other tables
		// the following sql gets a list of all the tables
		// SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'domains,
		//blogposts,
		//domain_measurements,
		//lands,
		//maxonomies,
		//classes,
		//hyperlinks,
		//categories,
		//permaculture_topics,
		//suppliers,
		//zachmans,
		//coins,
		//moneymaker_measurement_instances,
		//moneymaker_measurements,
		//indiegoals,
		//images,
		sql = "select z.id, z.name, array(select concat('<br /><a href=../domains/', d.id, '>', d.name, '</a>') from domains d, searches s where d.name ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as domains_name_results, array(select concat('<br /><a href=../applications/', d.id, '>', d.name, '</a>') from applications d, searches s where d.name ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as applications_name_results, array(select concat('<br /><a href=../webpages/', d.id, '>', d.name, '</a>') from webpages d, searches s where d.name ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as webpages_name_results, array(select concat('<a href=', d.url, '>', d.url, '</a><br />') from images d, searches s where d.url ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as images_url_results, array(select concat('<a href=../tags/', d.id, '>', d.name, '</a><br />') from tags d, searches s where d.name ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as tags_name_results from searches z WHERE z.id = " + idOrNoId + ";";
	    } else {
		// default sql (very standard versino) [what you would expect]
		sql = "select z.id, z.name from searches z WHERE z.id = " + idOrNoId + ";";
	    }
	} else {
	    orderBy = "ORDER BY z.id";
	    // use this sql statement to not show linkcheck
	    sql = "select z.id, z.name from searches z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Searches();

// end