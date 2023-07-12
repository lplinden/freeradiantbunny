/**
 * Module Costs.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Costs() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("costs instantiated", instanceCount);
    this.name = "costs";
    this.schema = ['status',
		   'sort',
		   'id',
		   'name',
		   'description',
		   'img_url',
		   'scene_elements_id'];
    this.inboundForeignKeyTables = [''];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("costs idOrNoId =", idOrNoId);
        debug("costs classNameFilter =", classNameFilter);
        debug("costs paramSort =", paramSort);
        debug("costs specialFlag =", specialFlag);
        debug("costs queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.name";
            debug("costs orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, concat('<a href=\"http', d.ssl_cert, '://', d.domain_name, '\">', d.domain_name, '</a>') as tli, z.img_url as img, concat('<a href=\"https://', d.domain_name, z.path, '\">', 'https://', d.domain_name, z.path, '</a>') as pathhyperlink, z.name as title from costs z, domains d where d.tli = z.domains_tli  " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Costs();

// end
