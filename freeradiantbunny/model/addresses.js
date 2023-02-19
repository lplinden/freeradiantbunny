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
		   'coins_symbol'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("addresses idOrNoId =",idOrNoId);
        debug("addresses classNameFilter =", classNameFilter);
        debug("addresses paramSort =", paramSort);
        debug("addresses specialFlag =", specialFlag);
        debug("addresses queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "order by z.coins_symbol";
            debug("addresses orderBy =", orderBy);
	    /**
	    // many
	    // replaced because it had too much information
            //sql = "select z.id, z.name, concat('<a href=\"', c.scan_url, z.address, '\">', z.address, '</a>'), concat('<a href=\"coins/', z.coins_symbol, '\">', c.name, '</a>') as coin from addresses z, coins c WHERE c.id = z.coins_symbol " + orderBy + ";";
	    // these fields in this order might represent the comceptual map better
            // sql = "select a.coins_symbol, concat('<a href=\"coins/', .coins_symbol, '\">', c.name, '</a>') as coin, a.id, a.name from addresses as a, coins as c where a.coins_symbol = c.id " + orderBy + ";";
	    */
            sql = "select z.coins_symbol, concat('<a href=\"coins/', c.id, '\">', c.name, '</a>') as coin, z.id, z.name from addresses as z, coins as c where z.coins_symbol = c.symbol " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Addresses();

// end
