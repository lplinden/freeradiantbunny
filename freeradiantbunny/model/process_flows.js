/**
 * Module ProcessFlows.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function ProcessFlows() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("process_flows instantiated", instanceCount);
    this.name = "process_flows";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'parent_processes_id',
		   'child_processes_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("process_flows idOrNoId =", idOrNoId);
	debug("process_flows classNameFilter =", classNameFilter);
	debug("process_flows paramSort =", paramSort);
	debug("process_flows specialFlag =", specialFlag);
	debug("process_flows queryTerms =", queryTerms);
	var sql;
	if (idOrNoId) {
	    if (classNameFilter) {
		// id refers to processes_id
		// bug in the sql below the ../../ assumes the classNameFilter context (make more dynamic)
		// use the following as a template, it is from processes.js file
		//sql = "select pr.status, pr.sort, pr.id, pr.img_url as image, pr.name, array(select concat('<a href=\"../../scene_elements/process_flows/', pr.id , '\">', count(se.id), '</a>') from scene_elements se where pr.id = se.processes_id AND bpt.id = pr.business_plan_texts_id AND bpt.id = " + idOrNoId + ") as scene_elements_count from process_flows pr, business_plan_texts bpt  where bpt.id = pr.business_plan_texts_id AND bpt.id = " + idOrNoId + "";
		// meanwhile use this simple version
		// todo and this made me realize that this classNameFilter should always check the name of the relation in database
		// todo because this style of sql programming is hard-coding the table names of the second parameter
		// todo and that assumption may fail, so fix this soon please
		sql = "select z.status, z.sort, z.id, z.name, p.name, c.name from process_flows z, processes p, processes c where z.id = " + idOrNoId + " and z.parent_processes_id = z.parent_processes_id AND z.child_processes_id = c.id;";
	    } else {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
		// refactor
		//sql = "select z.status, z.sort, z.id, z.name, p.name as parent_process, c.name as child_process from process_flows z, processes p, processes c where z.id = " + idOrNoId + " and z.parent_processes_id = p.id AND z.child_processes_id = c.id;";
	    }
	} else {
	    var orderBy ="ORDER BY z.parent_processes_id, z.child_processes_id, z.sort DESC, z.name, z.id";
	    debug("process_flows orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.name, z.parent_processes_id, z.child_processes_id from process_flows zx " + orderBy + ";";
	}
	return sql;
    };
}

module.exports = new ProcessFlows();

// end
