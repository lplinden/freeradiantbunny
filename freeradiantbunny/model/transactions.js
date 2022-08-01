/**
 * Module Transactions.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Transactions() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("transactions instantiated", instanceCount);
    this.name = "transactions";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("transactions idOrNoId =",idOrNoId);
        debug("transactions classNameFilter =", classNameFilter);
        debug("transactions paramSort =", paramSort);
        debug("transactions specialFlag =", specialFlag);
        debug("transactions queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.id, z.date, z.broker_debit, z.unit_debit, z.amount_debit, z.broker_credit, z.unit_credit, z.amount_credit, z.tnx_ref, z.audit from transactions as z where z.id = cast('" + idOrNoId + "' as integer);";
        } else {
            orderBy = "order by z.id";
            debug("transactions orderBy =", orderBy);
	    // many
            sql = "select z.id, z.date, z.broker_debit, z.amount_debit, z.unit_debit, z.broker_credit, z.amount_credit, z.unit_credit, z.tnx_ref, z.audit from transactions as z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Transactions();

// end
