/**
 * Module SceneElements.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function SceneElements() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("scene_elements instantiated", instanceCount);
    this.name = "scene_elements";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'processes_id',
		   'yield',
		   'sprite',
		   'database_string',
		   'class_name_string',
		   'class_primary_key_string'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("scene_elements idOrNoId =", idOrNoId);
	debug("scene_elements classNameFilter =", classNameFilter);
	debug("scene_elements paramSort =", paramSort);
	debug("scene_elements specialFlag =", specialFlag);
	debug("scene_elements queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    if (classNameFilter && classNameFilter == "projects") {
		// id refers to project_id
		var orderBy ="ORDER BY se.class_name_string, se.class_primary_key_string, se.id";
		sql = "select se.status, se.sort, se.id, se.img_url as image, se.name, concat('<a href=\"', '../../', se.class_name_string, '/', se.class_primary_key_string, '\">', se.class_name_string, '/', se.class_primary_key_string, '</a>') as class_name_string from scene_elements se, processes pr, business_plan_texts bpt, goal_statements gs where se.processes_id = pr.id AND pr.business_plan_texts_id = bpt.id AND bpt.goal_statements_id = gs.id AND gs.projects_id = " + idOrNoId + " " + orderBy + ";";
	    } else if (classNameFilter && classNameFilter == "processes") {
		// id refers to processes.id
		var orderBy ="ORDER BY se.sort DESC, se.class_name_string, se.class_primary_key_string, se.id";
		sql = "select se.class_name_string as class_name_string, se.status, se.sort, se.id, se.img_url as image, se.name, se.sprite, se.description from scene_elements se, processes pr where se.processes_id = pr.id AND pr.id = " + idOrNoId + " " + orderBy + ";";
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
		// refactor
		//sql = "select array(select concat('<a href=\"../processes/', pr.id, '\">', pr.name, '</a>') from processes pr where pr.id = se.processes_id) as processes_id, se.status, se.sort, se.id, se.img_url as image, se.name, se.description, se.yield, concat('<a href=\"../', se.class_name_string, '/', se.class_primary_key_string, '\">', se.class_name_string, '/', se.class_primary_key_string, '</a>') as class_primary_key_string from scene_elements se where se.id = " + idOrNoId + ";";
	    }
	} else {
	    // old
	    //var orderBy ="ORDER BY z.class_name_string, z.class_primary_key_string, z.sort DESC, z.name, z.id";
	    // new
	    var orderBy ="ORDER BY z.status DESC, z.processes_id, z.class_name_string, z.id";
            if (paramSort === "class_primary_key_string") {
		orderBy ="ORDER BY z.class_name_string, processes_id, z.sort DESC, z.class_primary_key_string, z.id";
	    }
	    debug("scene_elements orderBy =", orderBy);
	    sql = "select z.status, z.sort, array(select pr.name from processes pr where pr.id = z.processes_id) as processes_id, z.id, z.img_url as image, concat('<a href=\"../', z.class_name_string, '/', z.class_primary_key_string, '\">', z.class_name_string, '/', z.class_primary_key_string, '</a>') as class_primary_key_string, z.name from scene_elements z " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new SceneElements();

// end
