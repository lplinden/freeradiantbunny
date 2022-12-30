/**
 * Module Processes.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Processes() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("processes instantiated", instanceCount);
    this.name = "processes";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'publish',
		   'priority',
		   'time_rules',
		   'responsibility',
		   'yield',
		   'publish',
		   'business_plan_text_id'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("processes idOrNoId =",idOrNoId);
	debug("processes classNameFilter =", classNameFilter);
	debug("processes paramSort =", paramSort);
	debug("processes specialFlag =", specialFlag);
	debug("processes queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    if (classNameFilter) {
  		if (classNameFilter == "projects") {
		    var orderBy ="ORDER BY pr.priority, pr.sort DESC, pr.name";
		    // id refers to project_id
		    // bug in the sql below the ../../ assumes the classNameFilter context (make more dynamic)
		    sql = "select pr.priority, pr.status, pr.sort, pr.id, pr.img_url as image, pr.name, array(select concat('<a href=\"../../scene_elements/processes/', pr.id , '\">', count(se.id), '</a>') from scene_elements se where pr.id = se.process_id AND bpt.id = pr.business_plan_text_id AND se.publish = 'true') as scene_elements_count from processes pr, business_plan_texts bpt, goal_statements gs where bpt.id = pr.business_plan_text_id AND bpt.goal_statement_id = gs.id AND gs.project_id = " + idOrNoId + " and pr.publish = 'true' " + orderBy + ";";
		} else {
		    // id refers to process_id
		    // bug in the sql below the ../../ assumes the classNameFilter context (make more dynamic)
		    sql = "select pr.status, pr.sort, pr.id, pr.img_url as image, pr.name, array(select concat('<a href=\"../../scene_elements/processes/', pr.id , '\">', count(se.id), '</a>') from scene_elements se where pr.id = se.process_id AND bpt.id = pr.business_plan_text_id AND bpt.id = " + idOrNoId + " AND se.publish = 'true') as scene_elements_count from processes pr, business_plan_texts bpt  where bpt.id = pr.business_plan_text_id AND bpt.id = " + idOrNoId + " and pr.publish = 'true'";
		}
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId);
		// refactor
		//sql = "select array(select concat('<a href=\"../business_plan_texts/', bpt.id, '\">', bpt.name, '</a>') from business_plan_texts bpt where bpt.id = pr.business_plan_text_id) as business_plan_text_id, pr.status, pr.sort, pr.id, pr.img_url as image, pr.name, pr.description, array(select concat('<br /><a href=\"../scene_elements/', se.id, '\">', se.name, '</a>') from scene_elements se, processes pr where pr.id = se.process_id AND pr.id = " + idOrNoId + " AND pr.publish = 'true') as scene_elements from processes pr where pr.id = " + idOrNoId + " and pr.publish = 'true';";
	    }
	} else {
	    // old way (standard way. what you would expect)
	    //orderBy ="ORDER BY z.sort DESC, goal_statements, z.business_plan_text_id, z.name, z.id";
	    // new way this allows user to specify using table field priority
	    var orderBy ="ORDER BY z.priority";
	    debug("processes orderBy =", orderBy);
	    sql = "select z.priority, z.status, z.sort, array(select gs.name from goal_statements gs, business_plan_texts bpt where gs.id = bpt.goal_statement_id AND bpt.id = z.business_plan_text_id) as goal_statements, array(select bpt.name from business_plan_texts bpt where bpt.id = z.business_plan_text_id) as business_plan_texts, z.id, z.img_url as image, z.name, array(select concat('<a href=\"../scene_elements/processes/', z.id , '\">', count(se.id), '</a>') from scene_elements se where se.process_id = z.id AND z.publish = 'true') as se_count from processes z where z.publish ='true' " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new Processes();

// end
