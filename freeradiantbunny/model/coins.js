/**
 * Module Coins.
 * version 2.0.2
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
        debug("coins idOrNoId =", idOrNoId);
        debug("coins classNameFilter =", classNameFilter);
        debug("coins paramSort =", paramSort);
        debug("coins specialFlag =", specialFlag);
        debug("coins queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select z.sort, z.id, z.img_url as img, z.ticker, z.name, z.type, z.platform, z.frb, z.ath, z.volume, z.watch, z.risk, z.stablecoin, z.frb, z.description, z.img_url as img, z.url, z.stage, z.signal_level, z.notes from coins z WHERE z.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY z.status, z.watch DESC, z.notes, z.sort DESC, z.stage, z.ticker";
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
	    if (paramSort === "signal_level") {
		orderBy = "ORDER BY z.signal_level, z.id";
	    }
	    if (paramSort === "change") {
		orderBy = "ORDER BY cast(z.change as DOUBLE PRECISION) DESC, z.ticker";
	    }
	    if (paramSort === "notes") {
		orderBy = "ORDER BY z.notes, z.sort DESC, z.ticker";
	    }
            debug("coins orderBy =", orderBy);
	    if (paramSort === "notes" ||
		paramSort === "change") {
		// sort=notes gets special sql
		sql = "select z.id, z.recent_rank as rank, z.notes, z.stage, z.sort, array(select count(cm.coin_id) as exchange_count from coin_markets cm where cm.coin_id = z.id) as ex_ct, z.signal_level as sig_lvl, z.recent as recent, z.change as change, z.img_url as img, z.ticker, z.name, concat('<a href=\"', z.url, '\">', z.url, '</a>') as url, z.type, z.platform, z.frb, array(select concat(' <a href=\"../tags/', s2.id, '\">', s2.name, '</a>') from tags s2, classes_tags cl where cl.class_name = 'coins' and cl.tag_id = s2.id and cl.id_of_given_class = z.id order by s2.name) as tags from coins z where watch='true' and status='2022' " + orderBy + ";";
	    } else {
		// backup sql
		// sql = "select z.id, z.ticker, concat('<a href=\"', z.url, '\">', z.name, '</a>') as name, z.type, z.platform, z.frb, z.watch, z.ath, z.risk, z.volume, z.stablecoin as stable, z.sort from coins z " + orderBy + ";";
		// adding tags column
		sql = "select z.id, z.status, z.sort, z.img_url as img, z.ticker, z.name, concat('<a href=\"', z.url, '\">', z.url, '</a>') as url, z.type, z.platform, z.frb, array(select concat(' <a href=\"../tags/', s2.id, '\">', s2.name, '</a>') from tags s2, classes_tags cl where cl.class_name = 'coins' and cl.tag_id = s2.id and cl.id_of_given_class = z.id order by s2.name) as tags from coins z " + orderBy + ";";
	    }
        }
        return sql;
    };
}

module.exports = new Coins();

// end
