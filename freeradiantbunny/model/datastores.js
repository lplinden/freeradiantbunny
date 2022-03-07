/**
 * Module Datastores.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Datastores() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("tags instantiated", instanceCount);
    this.name = "datastpres";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("datastores idOrNoId =", idOrNoId);
	debug("datastores classNameFilter =", classNameFilter);
        debug("datastores paramSort =", paramSort);
        debug("datastores specialFlag =", specialFlag);
        debug("datastores queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description, z.machine_id from datastores z WHERE z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("datastores orderBy =", orderBy);

	    sql = "select z.status, z.sort, array(select m.name from machines m where m.id = z.machine_id) as machine_name, z.id, z.img_url as img, z.name, z.description from datastores z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Datastores();

// end
