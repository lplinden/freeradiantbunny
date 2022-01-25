/**
 * Module Projects.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Projects() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("projects instantiated", instanceCount);
    this.name = "projects";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("projects classNameFilter =", classNameFilter);
	debug("projects paramSort =", paramSort);
	debug("projects specialFlag =", specialFlag);
	debug("projects queryTerms =", queryTerms);
	var sql;
	var orderBy;
	
	if (idOrNoId) {
	    sql = "select p.status, p.sort, p.id, p.img_url as image, p.name, p.description, array(select concat('<br /><a href=\"../goal_statements/', gs.id, '\">', gs.name, '</a>') from goal_statements gs, projects p where p.id = gs.project_id AND p.id = " + idOrNoId + " and p.publish = 'true') as goal_statements from projects p where p.id = " + idOrNoId + " and p.publish = 'true';";
	} else {
	    orderBy ="ORDER BY z.status DESC, z.sort DESC, z.id DESC";
	    debug("projects orderBy =", orderBy);
	    // this has a special field to keep things on another level of private
	    // data is in the database but given if the field is null then it cannot be selected
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name, array(select concat('<br /><a href=\"../goal_statements/projects/', z.id, '\">', count(gs.id), '</a>') from goal_statements gs where gs.project_id = z.id) as gs_counts, array(select concat('<br /><a href=\"../business_plan_texts/projects/', z.id, '\">', count(bpt.id), '</a>') from business_plan_texts bpt, goal_statements gs where bpt.goal_statement_id = gs.id AND gs.project_id = z.id) as bpt_counts, array(select concat('<br /><a href=\"../processes/projects/', z.id, '\">', count(bpt.id), '</a>') from processes pr, business_plan_texts bpt, goal_statements gs where pr.business_plan_text_id = bpt.id AND bpt.goal_statement_id = gs.id AND gs.project_id = z.id) as pr_counts, array(select concat('<br /><a href=\"../scene_elements/projects/', z.id, '\">', count(se.id), '</a>') from scene_elements se, processes pr, business_plan_texts bpt, goal_statements gs where se.process_id = pr.id AND pr.business_plan_text_id = bpt.id AND bpt.goal_statement_id = gs.id AND gs.project_id = z.id) as se_counts from projects z where publish = 'true' " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Projects();

// end
