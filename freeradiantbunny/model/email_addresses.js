/**
 * Module EmailAddresses.
 * version 2.0.2
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function EmailAddresses() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("email_addresses instantiated", instanceCount);
    this.name = "email_addresses";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
	debug("email_addresses idOrNoId =",idOrNoId);
        debug("email_addresses classNameFilter =", classNameFilter);
        debug("email_addresses paramSort =", paramSort);
        debug("email_addresses specialFlag =", specialFlag);
        debug("email_addresses queryTerms =", queryTerms);
        var sql;
        var orderBy;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = "select s.id, s.name, s.sort, s.status, s.sort, s.description, s.img_url from email_addresses s where s.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY u.sort DESC, u.name, u.id";
            debug("email_addresses orderBy =", orderBy);
	    // many
            sql = "select u.status, u.sort, u.id, u.img_url as img, u.name from email_addresses u " + orderBy;
        }
        return sql;
    };
}

module.exports = new EmailAddresses();

// end
