/**
 * Module GoalStatements.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function GoalStatements() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("goal_statements instantiated", instanceCount);
    this.name = "goal_statements";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'projects_id'];
    this.inboundForeignKeyTables = ['business_plan_texts'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("goal_statements idOrNoId =", idOrNoId);
	debug("goal_statements classNameFilter =", classNameFilter);
	debug("goal_statements paramSort =", paramSort);
	debug("goal_statements specialFlag =", specialFlag);
	debug("goal_statements queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    if (classNameFilter && classNameFilter == "projects") {
		// id refers to process_id
		// bug in the sql below the ../../ assumes the classNameFilter context (make more dynamic)
		sql = "select gs.status, gs.sort, gs.id, gs.img_url as image, gs.name, array(select concat('<br /><a href=\"../../business_plan_texts/', bpt.id, '\">', bpt.name, '</a>') from business_plan_texts bpt where gs.id = bpt.goal_statements_id order by bpt.order_by) as business_plan_texts from goal_statements gs, projects p where p.id = " + idOrNoId + " AND p.id = gs.projects_id;";
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
		// refactor
		//sql = "select array(select concat('<a href=\"../projects/', p.id, '\">', p.name, '</a>') from projects p where p.id = gs.projects_id) as projects_id, gs.status, gs.sort, gs.id, gs.img_url as image, gs.name, gs.description, array(select concat('<br /><a href=\"../business_plan_texts/', bpt.id, '\">', bpt.name, '</a>') from business_plan_texts bpt, goal_statements gs where gs.id = bpt.goal_statements_id AND gs.id = " + idOrNoId + ") as business_plan_texts from goal_statements gs where gs.id = " + idOrNoId + ";";
	    }
	} else {
	    var orderBy ="ORDER BY z.sort DESC, z.name, z.id";
	    debug("goal_statements orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name, array(select concat('<a href=\"../business_plan_texts/goal_statements/', z.id , '\">', count(id), '</a>') from business_plan_texts bpt where z.id = bpt.goal_statements_id) as business_plan_texts from goal_statements z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new GoalStatements();

// end
