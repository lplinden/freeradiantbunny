/**
 * Module SceneElements.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function SceneElements() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("scene_elements instantiated", instanceCount);
    this.name = "scene_elements";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("scene_elements idOrNoId =", idOrNoId);
	debug("scene_elements classNameFilter =", classNameFilter);
	debug("scene_elements paramSort =", paramSort);
	debug("scene_elements specialFlag =", specialFlag);
	debug("scene_elements queryTerms =", queryTerms);
	var sql;
	var orderBy ="ORDER BY se.process_id, se.class_name_string, se.sort DESC, se.class_primary_key_string, se.id";
	if (idOrNoId) {
	    if (classNameFilter) {
  		if (classNameFilter == "projects") {
		    orderBy ="ORDER BY se.account_id, se.supplier_id, se.class_name_string, se.class_primary_key_string, se.id";
		    // id refers to project_id
		    sql = "select se.status, se.sort, se.id, se.img_url as image, se.name, se.description, concat('<a href=\"', '../../', se.class_name_string, '\">', se.class_name_string, '</a>') as class_name_string, concat('<a href=\"../../accounts/', se.account_id, '\">', se.account_id, '</a>') as account_id, se.supplier_id as supplier_id from scene_elements se, processes pr, business_plan_texts bpt, goal_statements gs where se.process_id = pr.id AND pr.business_plan_text_id = bpt.id AND bpt.goal_statement_id = gs.id AND gs.project_id = " + idOrNoId + " and se.publish = 'true' and pr.publish = 'true'" + orderBy + ";";
		} else {
		    orderBy ="ORDER BY se.sort DESC, se.class_name_string, se.class_primary_key_string, se.id";
		    // id refers to process_id
		    sql = "select se.class_name_string as class_name_string, se.status, se.sort, se.id, se.img_url as image, se.name, se.description from scene_elements se, processes pr where se.process_id = pr.id AND pr.id = " + idOrNoId + " and se.publish = 'true' and pr.publish = 'true'" + orderBy + ";";
		}
	    } else {
		sql = "select array(select concat('<a href=\"../processes/', pr.id, '\">', pr.name, '</a>') from processes pr where pr.id = se.process_id) as process_id, se.status, se.sort, se.id, se.img_url as image, se.name, se.description, se.yield, concat('<a href=\"../', se.class_name_string, '/', se.class_primary_key_string, '\">', se.class_name_string, '/', se.class_primary_key_string, '</a>') as class_primary_key_string from scene_elements se where se.id = " + idOrNoId + " and se.publish = 'true';";
	    }
	} else {
	    // old
	    // orderBy ="ORDER BY z.class_name_string, z.class_primary_key_string, z.sort DESC, z.name, z.id";
	    // new
	    orderBy ="ORDER BY z.status DESC, z.process_id, z.class_name_string, z.id";
            if (paramSort === "class_primary_key_string") {
		orderBy ="ORDER BY z.class_name_string, process_id, z.sort DESC, z.class_primary_key_string, z.id";
	    }
	    debug("scene_elements orderBy =", orderBy);
	    // this has a special field to keep things on another level of private
	    // data is in the database but given if the field is null then it cannot be selected
	    sql = "select z.status, array(select pr.name from processes pr where pr.id = z.process_id) as process_id, z.id, z.img_url as image, concat('<a href=\"../', z.class_name_string, '/', z.class_primary_key_string, '\">', z.class_name_string, '/', z.class_primary_key_string, '</a>') as class_primary_key_string, z.sort, z.name, concat('<a href=\"../accounts/', account_id, '\">', account_id, '</a>') as account_id from scene_elements z where publish ='true' " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new SceneElements();

// end
