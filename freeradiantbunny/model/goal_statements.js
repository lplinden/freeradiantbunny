/**
 * Module goal_statements.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function GoalStatements() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("goal_statements instantiated", instanceCount);
    this.name = "goal_statements";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("goal_statements classNameFilter =", classNameFilter);
	debug("goal_statements paramSort =", paramSort);
	debug("goal_statements specialFlag =", specialFlag);
	debug("goal_statements queryTerms =", queryTerms);
	var sql;
	var orderBy;
	if (idOrNoId) {
	    if (classNameFilter) {
		// id refers to process_id
		// bug in the sql below the ../../ assumes the classNameFilter context (make more dynamic)
		sql = "select gs.status, gs.sort, gs.id, gs.img_url as image, gs.name, array(select concat('<br /><a href=\"../../business_plan_texts/', bpt.id, '\">', bpt.name, '</a>') from business_plan_texts bpt where gs.id = bpt.goal_statement_id and gs.publish = 'true') as business_plan_texts from goal_statements gs, projects p where p.id = " + idOrNoId + " AND p.id = gs.project_id AND gs.publish = 'true';";
	    } else {
		sql = "select array(select concat('<a href=\"../projects/', p.id, '\">', p.name, '</a>') from projects p where p.id = gs.project_id) as project_id, gs.status, gs.sort, gs.id, gs.img_url as image, gs.name, gs.description, array(select concat('<br /><a href=\"../business_plan_texts/', bpt.id, '\">', bpt.name, '</a>') from business_plan_texts bpt, goal_statements gs where gs.id = bpt.goal_statement_id AND gs.id = " + idOrNoId + " and gs.publish = 'true') as business_plan_texts from goal_statements gs where gs.id = " + idOrNoId + " and gs.publish = 'true';";
	    }
	} else {
	    orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("goal_statements orderBy =", orderBy);
	    // this has a special field to keep things on another level of private
	    // data is in the database but given if the field is null then it cannot be selected
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name, array(select concat('<a href=\"../business_plan_texts/goal_statements/', z.id , '\">', count(id), '</a>') from business_plan_texts bpt where z.id = bpt.goal_statement_id) as business_plan_texts from goal_statements z where publish ='true' " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new GoalStatements();

// end
