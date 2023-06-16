/**
 * Module Filenames.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Filenames() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("filenames instantiated", instanceCount);
    this.name = "filenames";
    this.schema = ['id',
		   'status',
		   'sort',
		   'datastores_id',
		   'name',
		   'extension',
		   'fullpath_filename',
		   'md5sum',
		   'size',
		   'monetize'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramUpkIsValid, specialFlag, queryTerms) {
        debug("filenames idOrNoId =", idOrNoId);
	debug("filenames classNameFilter =", classNameFilter);
        debug("filenames paramSort =", paramSort);
        debug("filenames specialFlag =", specialFlag);
        debug("filenames queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "order by id";
            debug("filenames orderBy =", orderBy);
	    sql = "select id, name, extension from filenames " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Filenames();

// end
