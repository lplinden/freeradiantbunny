/**
 * Module Albums.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Albums() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("albums instantiated", instanceCount);
    this.name = "albums";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'year',
		   'cover_front_url',
		   'cover_back_url',
		   'notes',
		   'album_url'];
    this.inboundForeignKeyTables = ['songs'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("albums idOrNoId =", idOrNoId);
	debug("albums classNameFilter =", classNameFilter);
        debug("albums paramSort =", paramSort);
	debug("albums specialFlag =", specialFlag);
        debug("albums queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
            var id = idOrNoId;
            sql = "select a.status, a.sort, a.id, a.name, a.year, a.cover_front_url as front_cover, a.cover_back_url, a.notes, a.album_url as img, a.description from albums a where a.id = " + id + ";";
        } else {
            var orderBy = "ORDER BY a.name";
            if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            }
            debug("albums orderBy =", orderBy);
            // many
            sql = "select a.id, a.cover_front_url as front_cover, a.name from albums a " + orderBy;
        }
        return sql;
    };
}

module.exports = new Albums();

// end
