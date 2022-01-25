/**
 * Module MoneymakerMeasurementInstances.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function MoneymakerMeasurementInstances() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("moneymaker_measurement_instances instantiated", instanceCount);
    this.name = "moneymaker_measurement_instances";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("moneymaker_measurement_instances classNameFilter =", classNameFilter);
        debug("moneymaker_measurement_instances paramSort =", paramSort);
	debug("moneymaker_measurement_instances specialFlag =", specialFlag);
        debug("moneymaker_measurement_instances queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            var id = idOrNoId;
            sql = "select a.project_name, a.id, a.name, b.id as moneymaker_measurement_id, b.name as moneymaker_measurement_name, a.status, a.measure, a.sort, a.address, a.fee, a.txn_hash, a.ts, a.input, a.output from moneymaker_measurement_instances a, moneymaker_measurements b where a.moneymaker_measurement_id = b.id AND a.id = " + id + ";";
        } else {
            orderBy = "ORDER BY a.project_name, b.process_order, a.id";
            //if (paramSort === "sort") {
            //    orderBy = "ORDER BY a.sort DESC, a.name";
            //} else if (paramSort === "id") {
            //    orderBy = "ORDER BY a.id";
            //} else if (paramSort === "name") {
            //    orderBy = "ORDER BY a.name";
            //} else if (paramSort === "status") {
            //    orderBy = "ORDER BY a.status, a.id";
            //}
            debug("moneymaker_measurement_instances orderBy =", orderBy);
            // many
            sql = "select a.project_name as project, a.id, a.id as id_url, b.process_order as po, b.entity as entity, b.name as measurement, a.input, b.stock_or_flow as stock_or_flow, a.status, a.measure, a.address, a.fee, a.txn_hash, a.output, ts as timestamp from moneymaker_measurement_instances a, moneymaker_measurements b where b.id = a.moneymaker_measurement_id " + orderBy;
        }
        return sql;
    };
}

module.exports = new MoneymakerMeasurementInstances();

// end
