/**
 * Module Songs.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Songs() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("songs instantiated", instanceCount);
    this.name = "songs";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'albums_id'];
    this.inboundForeignKeyTables = [];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("songs idOrNoId =", idOrNoId);
	debug("songs classNameFilter =", classNameFilter);
        debug("songs paramSort =", paramSort);
	debug("songs specialFlag =", specialFlag);
        debug("songs queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
		sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
	    // refactor
            var id = idOrNoId;
            sql = "select a.name as album_name, s.album_id as album_id, a.cover_front_url as front_cover, s.id, s.name, s.alphabetical, s.img_url as image, s.status, s.sort, s.description as description, s.url as url, concat('<a href=\"', s.lyrics_url , '\">', s.lyrics_url, '</a>') as lyrics, concat('<a href=\"', s.mp3_url, '\">', s.mp3_url, '</a>') as mp3, s.album_sort from songs s, albums a where a.id = s.album_id AND s.id = " + id + ";";
        } else {
            var orderBy = "ORDER BY z.alphabetical, z.sort DESC, z.name";
            if (paramSort === "id") {
                orderBy = "ORDER BY a.id";
            } else if (paramSort === "name") {
                orderBy = "ORDER BY a.name";
            }
            debug("songs orderBy =", orderBy);
            // many
            sql = "select a.cover_front_url as front_cover, z.id, z.name from songs z, albums a where a.id = z.album_id " + orderBy;
        }
        return sql;
    };
}

module.exports = new Songs();

// end
