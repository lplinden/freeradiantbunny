/**
 * Module Subsystems.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Subsystems() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("subsystems instantiated", instanceCount);
    this.name = "subsystems";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("subsystems idOrNoId =", idOrNoId);
	debug("subsystems classNameFilter =", classNameFilter);
        debug("subsystems paramSort =", paramSort);
        debug("subsystems specialFlag =", specialFlag);
        debug("subsystems queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.name, z.description from subsystems where z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.name, z.id";
            debug("subsystems orderBy =", orderBy);
	    sql = "select z.status, z.sort, z.id, z.img_url as img, z.name from subsystems z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Subsystems();

// end
