/**
 * Module search_indexes.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function SearchIndexes() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("search_indexes instantiated", instanceCount);
    this.name = "search_indexes";
    this.schema = ['id',
		   'name',
		   'class_name_string',
		   'class_primary_key_string'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("search_indexes idOrNoId =", idOrNoId);
	debug("search_indexes classNameFilter =", classNameFilter);
        debug("search_indexes paramSort =", paramSort);
        debug("search_indexes specialFlag =", specialFlag);
        debug("search_indexes queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
	    // to following makes it easy to turn off the code
            //if (true) {
		// the following is a deviation from the norm because it search_indexes in other tables
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
		//sql = "select z.id, z.name, array(select concat('<br /><a href=../domains/', d.id, '>', d.name, '</a>') from domains d, search_indexes s where d.name ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as domains_name_results, array(select concat('<br /><a href=../applications/', d.id, '>', d.name, '</a>') from applications d, search_indexes s where d.name ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as applications_name_results, array(select concat('<br /><a href=../webpages/', d.id, '>', d.name, '</a>') from webpages d, search_indexes s where d.name ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as webpages_name_results, array(select concat('<a href=', d.url, '>', d.url, '</a><br />') from images d, search_indexes s where d.url ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as images_url_results, array(select concat('<a href=../tags/', d.id, '>', d.name, '</a><br />') from tags d, search_indexes s where d.name ilike concat('%', s.name, '%') AND s.id = " + idOrNoId + ") as tags_name_results from search_indexes z WHERE z.id = " + idOrNoId + ";";
	    //} else {
		// default sql (very standard versino) [what you would expect]
		//sql = "select z.id, z.name from search_indexes z WHERE z.id = " + idOrNoId + ";";
	    //}
	} else {
	    var orderBy = "ORDER BY z.id";
	    // use this sql statement to not show linkcheck
	    sql = "select z.id, z.name from search_indexes z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new SearchIndexes();

// end
