/**
 * Module Suppliers.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Suppliers() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("suppliers instantiated", instanceCount);
    this.name = "suppliers";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'city',
		   'state',
		   'url',
		   'bioregion',
		   'last_password_change',
		  'username'];
    this.inboundForeignKeyTables = ['seed_packets'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
	debug("suppliers idOrNoId =",idOrNoId);
        debug("suppliers classNameFilter =", classNameFilter);
        debug("suppliers paramSort =", paramSort);
        debug("suppliers specialFlag =", specialFlag);
        debug("suppliers queryTerms =", queryTerms);
        var sql;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
	    //sql = "select s.id, s.name, s.city , s.state, s.url, s.bioregion, s.sort, s.status, s.sort, s.description, s.img_url from suppliers s where s.id = " + idOrNoId + ";";
        } else {
            var orderBy = "ORDER BY u.sort DESC, u.name, u.id";
            debug("suppliers orderBy =", orderBy);
	    // many
	    // sql with seed_packets count
            //sql = "select u.status, u.sort, u.id, u.img_url as img, u.name, u.city, u.state, u.url, array(select count(x.id) from seed_packets x where x.supplier_id = u.id) as seed_packets_count from suppliers u " + orderBy;
	    sql = "select u.status, u.sort, u.id, u.img_url as img, u.name, u.url from suppliers u " + orderBy;
        }
        return sql;
    };
}

module.exports = new Suppliers();

// end
