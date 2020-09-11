// Usernames

var debug = require('debug')('frb');

var instanceCount = 0;

function usernames() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("usernames instantiated", instanceCount);
    this.name = "usernames";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("usernames classNameFilter =", classNameFilter);
        debug("usernames paramSort =", paramSort);
        debug("usernames specialFlag =", specialFlag);
        debug("usernames queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            sql = "select u.id, u.username, u.email_address_id from usernames u where u.id = " + idOrNoId + ";";
        } else {
            orderBy = "ORDER BY u.username";
            debug("sqlmaker orderBy =", orderBy);
            sql = "select u.id, u.username, u.email_address_id from usernames u " + orderBy;
        }
        return sql;
    };
}

module.exports = new usernames();

// end
