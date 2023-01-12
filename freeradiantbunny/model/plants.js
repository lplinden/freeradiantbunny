/**
 * Module Plants.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var sqlgenerator = require('../lib/sqlgenerator.js');

function Plants() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("plants instantiated", instanceCount);
    this.name = "plants";
    this.schema = ['id',
		   'name',
		   'description',
		   'img_url',
		   'status',
		   'sort',
		   'botanical_name',
		   'plant_families_id'];
    this.inboundForeignKeyTables = ['varieties','yields'];
    this.getSql = function (idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("plants idOrNoId =", idOrNoId);
	debug("plants classNameFilter =", classNameFilter);
        debug("plants paramSort =", paramSort);
        debug("plants specialFlag =", specialFlag);
        debug("plants queryTerms =", queryTerms);
        var sql;
	if (typeof idOrNoId !== 'undefined' && idOrNoId !== "") {
	    sql = sqlgenerator.getStandardSingle(this.name, this.schema, idOrNoId, paramUpkIsValid);
	    // note that in sql the array enables subquery to string
	    // backup sql because it is so fine
	    //sql = "select u.id, concat('<i>', u.botanical_name, '</i>') as botanical_name, u.name, pc.name as plant_category, pf.name as plant_families, u.description, '' as plant_attributes, '' as plant_histories, '' as plant_aliases, '' as hyperlink_plants, array(select concat('<a href=../varieties/', v.id, '>', v.name, '</a>') from varieties v where v.plant_id = u.id AND u.id = " + idOrNoId + ") as varieties_count from plants u, plant_categories pc, plant_families pf where u.plant_category_id = pc.id AND u.plant_families_id = pf.id AND u.id = " + idOrNoId + ";";
	    // experimental sql
	    //sql = "select u.id, concat('<i>', u.botanical_name, '</i>') as botanical_name, u.name, pc.name as plant_category, pf.name as plant_families, u.description, array(select concat('<a href=../plant_attributes/plants/', u.id, '>', pa.id, '</a>') from plant_attributes pa where pa.plant_id = u.id AND u.id = " + idOrNoId + ") as plant_attributes, '' as plant_histories, '' as plant_aliases, '' as hyperlink_plants, array(select concat('<a href=../varieties/', v.id, '>', v.name, '</a>') from varieties v where v.plant_id = u.id AND u.id = " + idOrNoId + ") as varieties_count from plants u, plant_categories pc, plant_families pf where u.plant_category_id = pc.id AND u.plant_families_id = pf.id AND u.id = " + idOrNoId + ";";
	    // removed plant_category column
	    // refactor (this was the last known good)
	    //sql = "select u.id, concat('<i>', u.botanical_name, '</i>') as botanical_name, u.name, pf.name as plant_families, u.description, array(select concat('<a href=../plant_attributes/plants/', u.id, '>', pa.id, '</a>') from plant_attributes pa where pa.plant_id = u.id AND u.id = " + idOrNoId + ") as plant_attributes, '' as plant_histories, array(select pal.name from plant_aliases pal WHERE pal.plant_id = u.id) as plant_aliases, '' as hyperlink_plants, array(select concat('<a href=../varieties/', v.id, '>', v.name, '</a>') from varieties v where v.plant_id = u.id AND u.id = " + idOrNoId + ") as varieties_count, array(select concat('<a href=\"', pi.img_url, '\"><img src=\"', pi.img_url, '\" width=\"200\"/ alt=\"{{PD-US}}\" ><a/>') from plant_images pi where pi.plant_id = u.id) as plant_image from plants u, plant_families pf where u.plant_families_id = pf.id AND u.id = " + idOrNoId + ";";
        } else {
            var orderBy = "ORDER BY u.name, u.id";
            if (paramSort === "id") {
                orderBy = "ORDER BY u.id";
	    }
            if (paramSort === "name") {
                orderBy = "ORDER BY u.name, u.id";
	    }
            if (paramSort === "botanical_name") {
                orderBy = "ORDER BY u.botanical_name, u.name";
	    }
            if (paramSort === "plant_families") {
                orderBy = "ORDER BY pf.name, u.name";
	    }
            if (paramSort === "plant_category") {
                orderBy = "ORDER BY pc.name, u.name";
	    }
	    debug("plants orderBy =", orderBy);
            //sql = "SELECT u.id, u.name, u.botanical_name, count(b.id) as hyperlinkscount FROM plants u LEFT JOIN (SELECT b.id, b.plant_id FROM hyperlink_plants b) b ON (u.id = b.plant_id) GROUP BY u.id " + orderBy;
	    // old version
            //sql = "SELECT u.id, u.name, u.botanical_name, pf.name as plant_families, pc.name as plant_category FROM plants u, plant_categories pc, plant_families pf where u.plant_category_id = pc.id AND u.plant_families_id = pf.id " + orderBy;
	    // new version that gets all plants (even if not category)
            sql = "SELECT u.id, u.sort, u.name, u.botanical_name, pf.name as plant_families FROM plants u, plant_families pf WHERE u.plant_families_id = pf.id " + orderBy;
        }
        return sql;
    };
}

module.exports = new Plants();

// end
