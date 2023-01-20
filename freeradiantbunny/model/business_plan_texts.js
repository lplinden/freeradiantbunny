/**
 * Module BusinessPlanTexts.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function BusinessPlanTexts() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("business_plan_texts instantiated", instanceCount);
    this.name = "business_plan_texts";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'order_by',
		   'goal_statements_id'];
    this.inboundForeignKeyTables = ['processes'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFitler, paramUpkIsValid, specialFlag, queryTerms) {
	debug("business_plan_texts idOrNoId =", idOrNoId);
	debug("business_plan_texts classNameFilter =", classNameFilter);	
	debug("business_plan_texts paramSort =", paramSort);
	debug("business_plan_texts specialFlag =", specialFlag);
	debug("business_plan_texts queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    if (classNameFilter && classNameFilter == "projects") {
		// id refers to projects_id
		sql = "select bpt.status, bpt.sort, bpt.id, bpt.img_url as image, bpt.name from business_plan_texts bpt, goal_statements gs where bpt.goal_statements_id = gs.id AND gs.projects_id = " + idOrNoId + ";";
	    } else if (classNameFilter && classNameFitler == "goal_statements") {
		// id refers to goal_statements.id
		sql = "select bpt.status, bpt.sort, bpt.id, bpt.img_url as image, bpt.name from business_plan_texts bpt, goal_statements gs where bpt.goal_statements_id = gs.id AND gs.id = " + idOrNoId + ";";
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
		// refactor
		//sql = "select array(select concat('<a href=\"../goal_statements/', gs.id, '\">', gs.name, '</a>') from goal_statements gs where gs.id = bpt.goal_statements_id) as goal_statements_id, bpt.status, bpt.sort, bpt.id, bpt.img_url as image, bpt.name, bpt.description, array(select concat('<a href=\"../processes/business_plan_texts/', bpt.id, '\">', count(pr.id), '</a>') from processes pr where bpt.id = pr.business_plan_texts_id AND bpt.id = " + idOrNoId + ") as processes_count, array(select concat('<br /><a href=\"../processes/', pr.id, '\">', pr.name, '</a>') from processes pr where bpt.id = pr.business_plan_texts_id AND bpt.id = " + idOrNoId + ") as processes from business_plan_texts bpt where bpt.id = " + idOrNoId + ";";
	    }
	} else {
	    // old way (standard way. what you would expect.)
	    //var orderBy ="ORDER BY z.sort DESC, z.goal_statements_id, z.name, z.id";
	    // new way (user-defined in table field oder_by7
	    var orderBy ="ORDER BY z.order_by";
	    debug("business_plan_texts orderBy =", orderBy);
	    // this has a special field to keep things on another level of private
	    // data is in the database but given if the field is null then it cannot be selected
	    sql = "select z.status, z.sort, array(select concat('<a href=\"../goal_statements/', gs.id, '\">', gs.name, '</a>') from goal_statements gs where z.goal_statements_id = gs.id) as goal_statement, z.id, z.img_url as image, z.name, array(select concat('<a href=\"../processes/business_plan_texts/', z.id, '\">', count(pr.id), '</a>') from processes pr where z.id = pr.business_plan_texts_id) as processes_count from business_plan_texts z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new BusinessPlanTexts();

// end
