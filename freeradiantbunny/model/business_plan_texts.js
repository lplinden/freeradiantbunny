/**
 * Module BusinessPlanTexts.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function BusinessPlanTexts() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("business_plan_texts instantiated", instanceCount);
    this.name = "business_plan_texts";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("business_plan_texts classNameFilter =", classNameFilter);
	debug("business_plan_texts paramSort =", paramSort);
	debug("business_plan_texts specialFlag =", specialFlag);
	debug("business_plan_texts queryTerms =", queryTerms);
	var sql;
	var orderBy;
	if (idOrNoId) {
	    if (classNameFilter) {
  		if (classNameFilter == "projects") {
		    // id refers to project_id
		    sql = "select bpt.status, bpt.sort, bpt.id, bpt.img_url as image, bpt.name from business_plan_texts bpt, goal_statements gs where bpt.goal_statement_id = gs.id AND gs.project_id = " + idOrNoId + " AND bpt.publish = 'true';";
		} else {
		    // id refers to process_id
		    sql = "select bpt.status, bpt.sort, bpt.id, bpt.img_url as image, bpt.name from business_plan_texts bpt, goal_statements gs where bpt.goal_statement_id = gs.id AND gs.id = " + idOrNoId + " AND bpt.publish = 'true';";
		}
	    } else {
		sql = "select array(select concat('<a href=\"../goal_statements/', gs.id, '\">', gs.name, '</a>') from goal_statements gs where gs.id = bpt.goal_statement_id) as goal_statement_id, bpt.status, bpt.sort, bpt.id, bpt.img_url as image, bpt.name, bpt.description, array(select concat('<a href=\"../processes/business_plan_texts/', bpt.id, '\">', count(pr.id), '</a>') from processes pr where bpt.id = pr.business_plan_text_id AND bpt.id = " + idOrNoId + " and pr.publish = 'true') as processes_count, array(select concat('<br /><a href=\"../processes/', pr.id, '\">', pr.name, '</a>') from processes pr where bpt.id = pr.business_plan_text_id AND bpt.id = " + idOrNoId + " and pr.publish = 'true') as processes from business_plan_texts bpt where bpt.id = " + idOrNoId + " AND bpt.publish = 'true';";
	    }
	} else {
	    orderBy ="ORDER BY z.sort DESC, z.goal_statement_id, z.name, z.id";
	    debug("business_plan_texts orderBy =", orderBy);
	    // this has a special field to keep things on another level of private
	    // data is in the database but given if the field is null then it cannot be selected
	    sql = "select z.status, z.sort, array(select concat('<a href=\"../goal_statements/', gs.id, '\">', gs.name, '</a>') from goal_statements gs where z.goal_statement_id = gs.id) as goal_statement, z.id, z.img_url as image, z.name, array(select concat('<a href=\"../processes/business_plan_texts/', z.id, '\">', count(pr.id), '</a>') from processes pr where z.id = pr.business_plan_text_id) as processes_count from business_plan_texts z where publish ='true' " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new BusinessPlanTexts();

// end