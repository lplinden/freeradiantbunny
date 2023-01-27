/**
 * Module Sqlgenerator.
 * version 2.0.3
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

function Sqlgenerator() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("classes instantiated", instanceCount);
    this.getStandardSingle = function (tableName, schema, id, inboundForeignKeyTables, paramUpkIsValid) {
        // create sql
	var tablePrefix = "a";
	// todo refactor that "a" alias below
        var sql = "SELECT " + this.getColumnNames(tablePrefix, tableName, schema, id, inboundForeignKeyTables, paramUpkIsValid) + " FROM " + tableName + " " + tablePrefix + " " + "WHERE " + tablePrefix + ".id = " + id + ";";
        return sql;
    };
    this.getColumnNames = function (tablePrefix, tableName, schema, id, inboundForeignKeyTables, paramUpkIsValid) {
	// debug only
	//debug("sqlgenerator paramUpkIsValid =", paramUpkIsValid);
	// note: schema = columnKeys
	var columnNames = "";
	for (let i = 0; i < schema.length; i++) {
	    var columnName = schema[i];
	    var fkTableName = this.getTableNameFromFKConstraint(columnName);
	    var prefixedColumn = tablePrefix + "." + columnName;
	    var lastThreeChars = columnName.slice(-3);
	    var lastFourChars = columnName.slice(-4);
	    var lastSevenChars = columnName.slice(-7);
	    if (lastThreeChars == "_id" ||
		lastFourChars == "_tli" ||
		lastSevenChars == "_symbol") {
		// make fk_contraints into hyperlinks
		var hyperlinkSql = this.getHyperlinkSql(fkTableName, prefixedColumn, tablePrefix, columnName, id);
		columnNames += hyperlinkSql;
		columnNames += " as ";
		columnNames += columnName;
	    } else if (columnName == "class_primary_key_string") {
		// make class_primary_key_string into hyperlink
		var paramUpkIsValidString = "";
		if (typeof paramUpkIsValid === "undefined") {
		    // skip
		} else {
		    paramUpkIsValidString = "?" + paramUpkIsValid;
		}
		columnNames += "concat('<a href=\"../', " + tablePrefix + ".class_name_string, '/', " + tablePrefix + ".class_primary_key_string, '" + paramUpkIsValidString+ "\">', " + tablePrefix + ".class_primary_key_string, '</a>') as " + columnName;
	    } else {
		columnNames += prefixedColumn;
	    }
	    // add comma after all except the last element in array
	    var j = i + 1;
	    if (j < schema.length) {
		columnNames += ", ";
	    }
	}
	// add columns to query if this table has inbound foreign keys
	if (typeof inboundForeignKeyTables !== 'undefined' && inboundForeignKeyTables.length > 0) {
	    for (let k = 0; k < inboundForeignKeyTables.length; k++) {
		// add comma
		columnNames += ", ";
		var inboundFkTableName = inboundForeignKeyTables[k];
		var suffix;
		if (inboundFkTableName == "webpages" && tableName == "domains") {
		    suffix = "tli";
		} else if (tableName == "coins" && (inboundFkTableName == "coin_indicators" || inboundFkTableName == "coin_emas" || inboundFkTableName == "coin_prices" || inboundFkTableName == "coin_evaluations" || inboundFkTableName == "addresses")) {
		    suffix = "symbol";
		} else {
		    suffix = "id";
		}
		// make boolean a string (so that "false" does not appear"
		var paramUpkIsValidString = "";
		if (paramUpkIsValid) {
		    paramUpkIsValidString = "?" + paramUpkIsValid;
		} else {
		    paramUpkIsValidString = "";
		}
		// also lists the status
		if (tableName === "coins") {
		    // coins associated tables does not have columns for status or name
		    var subquery = "ARRAY(SELECT CONCAT('<a href=\"../" + inboundFkTableName + "/', fk.id, '" + paramUpkIsValidString + "\">', fk.id, '</a>') FROM " + inboundFkTableName + " fk WHERE fk." + tableName + "_" + suffix + " = " + tablePrefix + "." + suffix + " ORDER BY fk.id)";
		} else {
		    var subquery = "ARRAY(SELECT CONCAT(fk.status, ' ', '<a href=\"../" + inboundFkTableName + "/', fk.id, '" + paramUpkIsValidString + "\">', fk.name, '</a>') FROM " + inboundFkTableName + " fk WHERE fk." + tableName + "_" + suffix + " = " + tablePrefix + "." + suffix + " ORDER BY fk.name)";
		}
		columnNames += subquery + " AS " + "\"associated " + inboundFkTableName + "\"";
	    }
	}
	// perhaps add columns to query
	if (tableName == "scene_elements") {
	    // the SQL requires dynamic SQL, so there is a function
	    // gets the name the scene_elements' polymophic element
	    columnNames += ", ";
	    columnNames += "concat('<a href=\"../', " + tablePrefix + ".class_name_string, '/', " + tablePrefix + ".class_primary_key_string, '" + paramUpkIsValidString+ "\">', get_polymorphic_name(" + id + "), '</a>')";
	    columnNames += " AS \"associated polymorphic\"";
	}
	// ok, heavy ho, send it forward in to the cyberspaces
	return columnNames;
    };
    this.getTableNameFromFKConstraint = function (columnName) {
	var foreignTableName;
	if (columnName.slice(-3) == "_id") {
	    // remove "_id" from end of string
	    var length = columnName.length;
	    var indexEnd = length - 3;
	    foreignTableName = columnName.slice(0, indexEnd);
	    // change name of table if special constraint name
	    if (foreignTableName == "parent_processes" ||
		foreignTableName == "child_processes") {
		foreignTableName == "processes";
	    }
	    if (foreignTableName == "denominator_units" ||
		foreignTableName == "numerator_units") {
		foreignTableName == "units";
	    }
	} else if (columnName.slice(-4) == "_tli") {
	    // remove "_tli" from end of string
	    var length = columnName.length;
	    var indexEnd = length - 4;
	    foreignTableName = columnName.slice(0, indexEnd);
	} else if (columnName.slice(-7) == "_symbol") {
	    // remove "_tli" from end of string
	    var length = columnName.length;
	    var indexEnd = length - 7;
	    foreignTableName = columnName.slice(0, indexEnd);
	}
	return foreignTableName;
    };
    this.getHyperlinkSql = function (fkTableName, prefixedColumn, tablePrefix, columnName, id) {
	var hyperlinkSql= "";
	hyperlinkSql += "concat('<a href=\"../";
	hyperlinkSql += fkTableName;
	hyperlinkSql += "/', ";
	if (fkTableName == "coins") {
	    // swap out the id for the symbol
	    hyperlinkSql += "(select w.id from coins w where w.symbol = a.coins_symbol)";
	} else {
	    hyperlinkSql += prefixedColumn;
	}
	hyperlinkSql += ", '\">";
	hyperlinkSql += fkTableName;
	hyperlinkSql += "/', ";
	hyperlinkSql += prefixedColumn;
	hyperlinkSql += ", '</a>'";
	// add name of object
	//  not working so place on hold
	//hyperlinkSql += ", array(select fkt.name from fkTableName fkt where fkt.id = " + tablePrefix + "." + columnName + ")";
	// complete
	hyperlinkSql += ")";
	return hyperlinkSql;
    };
}

module.exports = new Sqlgenerator();

// end
