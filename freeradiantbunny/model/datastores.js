/**
 * Module Datastores.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Datastores() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tags instantiated", instanceCount);
    this.name = "datastores";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'machines_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("datastores idOrNoId =", idOrNoId);
	debug("datastores classNameFilter =", classNameFilter);
        debug("datastores paramSort =", paramSort);
        debug("datastores specialFlag =", specialFlag);
        debug("datastores queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("datastores orderBy =", orderBy);

	    sql = "select z.status, z.sort, array(select m.name from machines m where m.id = z.machines_id) as machines_name, z.id, z.img_url as img, z.name, z.description from datastores z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Datastores();

// end
