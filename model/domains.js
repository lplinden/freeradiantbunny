// Domains

var debug = require('debug')('frb');

var instanceCount = 0;

function Domains() {
    'use strict';
    instanceCount = instanceCount + 1;
    console.log("domains instantiated", instanceCount);
    this.name = "domains";
    this.getSql = function (idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms) {
        debug("domains classNameFilter =", classNameFilter);
        debug("domains paramSort =", paramSort);
        debug("domains specialFlag =", specialFlag);
        debug("domains queryTerms =", queryTerms);
        var sql;
        var orderBy;
        if (idOrNoId) {
            // single
            debug("sqlmaker idOrNoId =", idOrNoId);
            sql = "select z.id, z.tli, z.img_url as img, z.domain_name, z.name, z.tagline, z.description, z.status, z.sort, concat('<a href=\"http', z.ssl_cert, '://', z.domain_name, '\">', z.domain_name, '</a>') as domain_name, z.ssl_cert, z.spotlight, z.registrar, z.hosting, z.crm, z.log, z.backups, z.design_id,concat('<a href=\"/webpages/domains/', z.id, '\">', count(w.id) , '</a>') as webpagescount from domains z, webpages w where z.tli = w.domain_tli and z.id = cast('" + idOrNoId + "' as integer) GROUP BY z.tli;";
        } else {
            orderBy = "ORDER BY z.sort DESC, z.domain_name";
            debug("sqlmaker paramSort =", paramSort);
            debug("sqlmaker orderBy =", orderBy);
            sql = "select z.status, z.sort, z.id, concat('<a href=\"/domains/', z.id, '\">', z.tli , '</a>') as tli, z.img_url as img, concat('<a href=\"http', z.ssl_cert, '://', z.domain_name, '\">', z.domain_name, '</a>') as domain_name from domains z " + orderBy;
        }
        return sql;
    };
}

module.exports = new Domains();

// end
