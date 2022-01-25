/**
 * Module Machines.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Machines() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("machines instantiated", instanceCount);
    this.name = "machines";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("machines classNameFilter =", classNameFilter);
        debug("machines paramSort =", paramSort);
        debug("machines specialFlag =", specialFlag);
        debug("machines queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
	    orderBy = "order by z.id";
	    debug("machines orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description, z.location, z.details, z.networks, z.backups from machines z where z.id = cast('" + idOrNoId + "' as integer);";
        } else {
            orderBy = "order by z.sort DESC, z.location, z.status, z.name, z.id";
            debug("machines orderBy =", orderBy);
            sql = "select z.location, z.sort, z.status, z.id, z.img_url as img, z.name, z.description, z.model, z.cpu, z.ram, z.filesystems, z.details, z.networks, z.backups from machines z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Machines();

// end
