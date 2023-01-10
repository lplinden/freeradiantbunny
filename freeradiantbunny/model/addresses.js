/**
 * Module Addresses.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Addresses() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("addresses instantiated", instanceCount);
    this.name = "addresses";
    this.schema = ['id',
		   'name',
		   'address',
		   'coin_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramUpkIsValid, specialFlag, queryTerms) {
        debug("addresses idOrNoId =",idOrNoId);
        debug("addresses classNameFilter =", classNameFilter);
        debug("addresses paramSort =", paramSort);
        debug("addresses specialFlag =", specialFlag);
        debug("addresses queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "order by a.coin_id, a.name";
            debug("addresses orderBy =", orderBy);
	    /**
	    // many
	    // replaced because it had too much information
            //sql = "select z.id, z.name, concat('<a href=\"', c.scan_url, z.address, '\">', z.address, '</a>'), concat('<a href=\"coins/', z.coin_id, '\">', c.name, '</a>') as coin from addresses z, coins c WHERE c.id = z.coin_id " + orderBy + ";";
	    // these fields in this order might represent the comceptual map better
            // sql = "select a.coin_id, concat('<a href=\"coins/', .coin_id, '\">', c.name, '</a>') as coin, a.id, a.name from addresses as a, coins as c where a.coin_id = c.id " + orderBy + ";";
	    */
            sql = "select a.coin_id, concat('<a href=\"coins/', a.coin_id, '\">', c.name, '</a>') as coin, a.id, a.name from addresses as a, coins as c where a.coin_id = c.id " + orderBy + ";";
	    
        }
        return sql;
    };
}

module.exports = new Addresses();

// end
