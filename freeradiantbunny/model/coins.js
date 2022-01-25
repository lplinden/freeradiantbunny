/**
 * Module Coins.
 * version 2.0
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Coins() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coins instantiated", instanceCount);
    this.name = "coins";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("coins classNameFilter =", classNameFilter);
        debug("coins paramSort =", paramSort);
        debug("coins specialFlag =", specialFlag);
        debug("coins queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.sort, z.id, z.img_url as img, z.ticker, z.name, z.type, z.platform, z.frb, z.ath, z.volume, z.watch, z.risk, z.stablecoin, z.frb, z.description, z.img_url as img, z.url, z.stage from coins z WHERE z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.status DESC, z.stablecoin DESC, z.sort DESC, z.watch DESC, z.stage DESC, z.id";
            if (paramSort === "id") {
                orderBy = "ORDER BY z.id";
	    }
            if (paramSort === "name") {
                orderBy = "ORDER BY z.name, z.id";
	    }
            if (paramSort === "watch") {
                orderBy = "ORDER BY z.watch DESC, z.sort DESC, z.ticker";
	    }
            if (paramSort === "sort") {
                orderBy = "ORDER BY z.sort DESC, z.ticker";
	    }
            if (paramSort === "ticker") {
                orderBy = "ORDER BY z.ticker, z.id";
	    }
            debug("coins orderBy =", orderBy);
	    // backup sql
            // sql = "select z.id, z.ticker, concat('<a href=\"', z.url, '\">', z.name, '</a>') as name, z.type, z.platform, z.frb, z.watch, z.ath, z.risk, z.volume, z.stablecoin as stable, z.sort from coins z " + orderBy + ";";
	    // adding tags column
            sql = "select z.status, z.sort, z.id, z.img_url as img, z.ticker, concat('<a href=\"', z.url, '\">', z.name, '</a>') as name, z.type, z.platform, z.frb, array(select concat(' <a href=\"../tags/', s2.id, '\">', s2.name, '</a>') from tags s2, classes_tags cl where cl.class_name = 'coins' and cl.tag_id = s2.id and cl.id_of_given_class = z.id order by s2.name) as tags, z.watch, z.stage from coins z " + orderBy + ";";
        }
        return sql;
    };
}

module.exports = new Coins();

// end
