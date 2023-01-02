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
        var sql = "SELECT " + this.getColumnNames(tablePrefix, tableName, schema, inboundForeignKeyTables, paramUpkIsValid) + " FROM " + tableName + " " + tablePrefix + " " + "WHERE a.id = " + id + ";";
        return sql;
    };
    this.getColumnNames = function (tablePrefix, tableName, schema, inboundForeignKeyTables, paramUpkIsValid) {
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
	    if (lastThreeChars == "_id") {
		// make fk_contraints into hyperlinks
		var hyperlinkSql = this.getHyperlinkSql(fkTableName, prefixedColumn);
		columnNames += hyperlinkSql;
		columnNames += " as ";
		columnNames += columnName;
		// older version
		//columnNames += tablePrefix + "." + columnKeys[i];
	    } else if (lastFourChars == "_tli") {
		// make fk_contraints into hyperlinks
		var hyperlinkSql = this.getHyperlinkSql(fkTableName, prefixedColumn);
		columnNames += hyperlinkSql;
		columnNames += " as ";
		columnNames += columnName;
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
		} else {
		    suffix = "id";
		}
		// make boolean a string (so that "false" does not appear"
		var paramUpkIsValidString = "";
		if (paramUpkIsValid) {
		    paramUpkIsValidString = paramUpkIsValid;
		} else {
		    paramUpkIsValidString = "";
		}
		var subquery = "array(select concat('<a href=\"../" + inboundFkTableName + "/', fk.id, '?" + paramUpkIsValidString + "\">', fk.name, '</a>') from " + inboundFkTableName + " fk where fk." + tableName + "_" + suffix + " = " + tablePrefix + "." + suffix + ")";
		columnNames += subquery + " as " + "\"associated " + inboundFkTableName + "\"";
	    }
	}
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
	}
	return foreignTableName;
    };
    this.getHyperlinkSql = function (fkTableName, prefixedColumn) {
	var hyperlinkSql= "";
	hyperlinkSql += "concat('<a href=\"../";
	hyperlinkSql += fkTableName;
	hyperlinkSql += "/', ";
	hyperlinkSql += prefixedColumn;
	hyperlinkSql += ", '\">";
	hyperlinkSql += fkTableName;
	hyperlinkSql += "/', ";
	hyperlinkSql += prefixedColumn;
	hyperlinkSql += ", '</a>')";
	return hyperlinkSql;
    };
}

module.exports = new Sqlgenerator();

// end
