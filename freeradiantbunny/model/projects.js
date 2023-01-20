/**
 * Module Projects.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Projects() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("projects instantiated", instanceCount);
    this.name = "projects";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = ['goal_statements'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("projects idOrNoId =", idOrNoId);
	debug("projects classNameFilter =", classNameFilter);
	debug("projects paramSort =", paramSort);
	debug("projects specialFlag =", specialFlag);
	debug("projects queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
	    //sql = "select p.status, p.sort, p.id, p.img_url as image, p.name, p.description, array(select concat('<br /><a href=\"../goal_statements/', gs.id, '\">', gs.name, '</a>') from goal_statements gs, projects p where p.id = gs.projects_id AND p.id = " + idOrNoId + ") as goal_statements from projects p where p.id = " + idOrNoId + ";";
	} else {
	    var orderBy ="ORDER BY z.status DESC, z.sort DESC, z.id DESC";
	    debug("projects orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as image, z.name, array(select concat('<br /><a href=\"../goal_statements/projects/', z.id, '?" + paramUpkIsValid + "\">', count(gs.id), '</a>') from goal_statements gs where gs.projects_id = z.id) as gs_counts, array(select concat('<br /><a href=\"../business_plan_texts/projects/', z.id, '\">', count(bpt.id), '</a>') from business_plan_texts bpt, goal_statements gs where bpt.goal_statements_id = gs.id AND gs.projects_id = z.id) as bpt_counts, array(select concat('<br /><a href=\"../processes/projects/', z.id, '\">', count(bpt.id), '</a>') from processes pr, business_plan_texts bpt, goal_statements gs where pr.business_plan_texts_id = bpt.id AND bpt.goal_statements_id = gs.id AND gs.projects_id = z.id) as pr_counts, array(select concat('<br /><a href=\"../scene_elements/projects/', z.id, '\">', count(se.id), '</a>') from scene_elements se, processes pr, business_plan_texts bpt, goal_statements gs where se.processes_id = pr.id AND pr.business_plan_texts_id = bpt.id AND bpt.goal_statements_id = gs.id AND gs.projects_id = z.id) as se_counts from projects z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Projects();

// end
