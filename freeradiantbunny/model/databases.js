/**
 * Module Databases.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Databases() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("databases instantiated", instanceCount);
    this.name = "databases";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'management_system',
		   'date_last_backup',
		   'schema_version'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("databases idOrNoId =", idOrNoId);
        debug("databases classNameFilter =", classNameFilter);
        debug("databases paramSort =", paramSort);
        debug("databases specialFlag =", specialFlag);
        debug("databases queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name as name, z.description from databases z where z.id = cast('" + idOrNoId + "' as integer);";
        } else {
            var orderBy = "order by z.sort DESC, z.name, z.id";
            debug("databases orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, z.img_url as image, z.name as name, z.description from databases z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Databases();

// end
