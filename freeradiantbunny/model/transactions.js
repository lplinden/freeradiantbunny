/**
 * Module Transactions.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Transactions() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("transactions instantiated", instanceCount);
    this.name = "transactions";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("transactions idOrNoId =",idOrNoId);
        debug("transactions classNameFilter =", classNameFilter);
        debug("transactions paramSort =", paramSort);
        debug("transactions specialFlag =", specialFlag);
        debug("transactions queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "order by z.id";
            debug("transactions orderBy =", orderBy);
	    // many
            sql = "select z.id, z.date, z.broker_debit, z.amount_debit, z.unit_debit, z.broker_credit, z.amount_credit, z.unit_credit, z.tnx_ref, z.audit from transactions as z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Transactions();

// end
