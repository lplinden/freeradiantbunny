/**
 * Module Coins.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Coins() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("coins instantiated", instanceCount);
    this.name = "coins";
    this.schema = ['id',
		   'name',
		   'volume',
		   'watch',
		   'sort',
		   'stablecoin',
		   'ath',
		   'type',
		   'risk',
		   'platform',
		   'url',
		   'frb',
		   'img_url',
		   'description',
		   'status',
		   'stage',
		   'signal_level',
		   'uuid',
		   'notes',
		   'recent',
		   'change',
		   'recent_rank',
		   'change_previous',
		   'acceleration',
		   'acceleration_previous',
		   'acceleration_change',
		   'change_all',
		   'scan_url',
		   'trigger',
		   'trigger_state',
		   'recent_previous',
		   'updated',
		   'acceleration_change_note',
		   'symbol'];
    // todo fix below because the data would be too numerous, add code to count instead
    this.inboundForeignKeyTables = ['coin_indicators','coin_prices','coin_emas','coin_evaluations'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("coins idOrNoId =", idOrNoId);
        debug("coins classNameFilter =", classNameFilter);
        debug("coins paramSort =", paramSort);
        debug("coins specialFlag =", specialFlag);
        debug("coins queryTerms =", queryTerms);
        var sql;
        if (idOrNoId) {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, this.inboundForeignKeyTables, paramUpkIsValid);
        } else {
            var orderBy = "ORDER BY z.sort DESC, z.symbol";
            if (paramSort === "id") {
                orderBy = "ORDER BY z.id";
	    }
            if (paramSort === "name") {
                orderBy = "ORDER BY z.name, z.id";
	    }
            if (paramSort === "watch") {
                orderBy = "ORDER BY z.watch DESC, z.sort DESC, z.symbol";
	    }
            if (paramSort === "sort") {
                orderBy = "ORDER BY z.sort DESC, z.symbol";
	    }
            if (paramSort === "symbol") {
                orderBy = "ORDER BY z.symbol, z.id";
	    }
	    if (paramSort === "signal_level") {
		orderBy = "ORDER BY z.signal_level, z.id";
	    }
	    if (paramSort === "change") {
		orderBy = "ORDER BY cast(z.acceleration as DOUBLE PRECISION) DESC, z.symbol";
	    }
	    if (paramSort === "notes") {
		orderBy = "ORDER BY z.notes, z.sort DESC, z.symbol";
	    }
            debug("coins orderBy =", orderBy);
	    if (paramSort === "change") {
		// sort=notes gets special sql
		// temp sql statement to get something output
		sql = "select z.id, z.img_url as img, concat('<a href=\"', z.url, '\">', z.symbol, '</a>') as coin_symbols, z.type, z.platform, z.frb, z.signal_level as sig_lvl, z.recent_previous, z.recent, z.trigger, z.trigger_state, z.change_previous as chg_prev_percent, z.change as change_percent, z.acceleration_previous as acc_prev, z.acceleration as acc, z.acceleration_change as acc_chg, z.acceleration_change_note as acc_chg_note, z.change_all, z.updated from coins z where z.watch ='true' " + orderBy + ";";
		// somethings was undefine, so replaced with simple
		//sql = "select z.id, z.recent_rank as rank, z.notes, z.stage, z.sort, array(select count(cm.coin_id) as exchange_count from coin_markets cm where cm.coin_id = z.id) as ex_ct, z.signal_level as sig_lvl, z.recent as recent, z.change_previous as ch_0, z.change as ch, z.acceleration_previous as acc_0, z.acceleration as acc, acceleration_change as acc_ch, z.img_url as img, z.symbol, z.name, z.change_all from coins z where watch='true' and status='2022' " + orderBy + ";";
	    } else {
		// backup sql
		// sql = "select z.id, z.symbol, concat('<a href=\"', z.url, '\">', z.name, '</a>') as name, z.type, z.platform, z.frb, z.watch, z.ath, z.risk, z.volume, z.stablecoin as stable, z.sort from coins z " + orderBy + ";";
		// adding tags column
		var limit = 100;
		// # old hold had error unknown
		// # sql = "select z.id, z.status, z.sort, z.img_url as img, z.symbol, z.name, concat('<a href=\"', z.url, '\">', z.url, '</a>') as url, z.type, z.platform, z.frb, array(select concat(' <a href=\"../tags/', s2.id, '\">', s2.name, '</a>') from tags s2, class_tags cl where cl.class_name = 'coins' and cl.tag_id = s2.id and cl.id_of_given_class = z.id order by s2.name) as tags from coins z " + orderBy + " LIMIT " + limit + ";";
		// # keep simple
		sql = "select z.id, z.status, z.sort, z.img_url as img, z.symbol, z.name from coins z order by sort DESC;";
	    }
        }
        return sql;
    };
}

module.exports = new Coins();

// end
