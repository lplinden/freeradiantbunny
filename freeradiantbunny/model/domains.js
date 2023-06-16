/**
 * Module domains.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Domains() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("domains instantiated", instanceCount);
    this.name = "domains";
    this.schema = ['id',
		   'tli',
		   'domain_name',
		   'tagline',
		   'img_url',
		   'registrar',
		   'hosting',
		   'status',
		   'crm',
		   'name',
		   'backups',
		   'log',
		   'description',
		   'inquiring_system',
		   'sort',
		   'ssl_cert',
		   'username'];
    this.inboundForeignKeyTables = ['webpages'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("domains idOrNoId =", idOrNoId);
	debug("domains classNameFilter =", classNameFilter);
        debug("domains paramSort =", paramSort);
        debug("domains specialFlag =", specialFlag);
        debug("domains queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);	    
	    // refactor
            //sql = "select z.id, z.tli, z.img_url as img, z.domain_name, z.name, z.tagline, z.description, z.status, z.sort, concat('<a href=\"http', z.ssl_cert, '://', z.domain_name, '\">', z.domain_name, '</a>') as domain_name, z.ssl_cert, z.registrar, z.hosting, z.inquiring_system, z.crm, z.log, z.backups, z.design_id, concat('<a href=\"/webpages/domains/', z.id, '\">', count(w.id) , '</a>') as webpagescount from domains z, webpages w where z.tli = w.domains_tli and z.id = cast('" + idOrNoId + "' as integer) GROUP BY z.tli;";
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.domain_name";
            debug("domains orderBy =", orderBy);
	    // working sql that contains scene_elements reference
            //sql = "select z.status, z.sort, z.id, concat('<a href=\"/domains/', z.id, '\">', z.tli , '</a>') as tli, z.img_url as img, concat('<a href=\"http', z.ssl_cert, '://', z.domain_name, '\">', z.domain_name, '</a>') as domain_name, z.name, z.description as description, concat('<a href=\"/webpages/domains/', z.id, '\">', count(w.id) , '</a>') as webpagescount, array(select count(id) from scene_elements se where se.class_name_string = 'domains' and se.class_primary_key_string = cast(z.id as TEXT)) as se_count from domains z, webpages w where z.tli = w.domains_tli GROUP BY z.tli " + orderBy;
	    sql = "select z.status, z.sort, z.id, concat('<a href=\"/domains/', z.id, '\">', z.tli , '</a>') as tli, z.img_url as img, concat('<a href=\"http', z.ssl_cert, '://', z.domain_name, '\">', z.domain_name, '</a>') as domain_name, concat('<a href=\"/webpages/domains/', z.id,";
	    if (paramUpkIsValid) {
		sql += " '?" + paramUpkIsValid + "',";
	    }
	    sql += "'\">', count(w.id) , '</a>') as webpagescount from domains z, webpages w where z.tli = w.domains_tli GROUP BY z.status, z.sort, z.id, z.tli " + orderBy;
        }
        return sql;
    };
}

module.exports = new Domains();

// end
