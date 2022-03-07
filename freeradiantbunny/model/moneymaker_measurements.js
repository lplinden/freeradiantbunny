/**
 * Module MoneymakerMeasurements.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function MoneymakerMeasurements() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("moneymaker_measurements instantiated", instanceCount);
    this.name = "moneymaker_measurements";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("moneymaker_measurements idOrNoId =", idOrNoId);
        debug("moneymaker_measurements classNameFilter =", classNameFilter);
        debug("moneymaker_measurements paramSort =", paramSort);
	debug("moneymaker_measurements specialFlag =", specialFlag);
        debug("moneymaker_measurements queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.status, a.id, a.process_order, a.name, a.entity, a.cost, a.stock_or_flow, a.fee, a.has_key, a.attributes from moneymaker_measurements a where a.id = " + id + ";";
        } else {
            orderBy = "ORDER BY a.process_order, a.id";
            if (paramSort === "status") {
		orderBy = "ORDER BY a.status, a.process_order, a.id";
            } else if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name, a.id";
            } else if (paramSort === "status") {
                orderBy = "ORDER BY a.status, a.id";
            }
            debug("moneymaker_measurements orderBy =", orderBy);
            // many
            sql = "select a.status, a.id, a.process_order, a.name, a.entity, a.stock_or_flow, a.cost, a.fee from moneymaker_measurements a " + orderBy;
        }
        return sql;
    };
}

module.exports = new MoneymakerMeasurements();

// end
