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
    this.getTableNameFromFKConstraint = function (columnName) {
	// remove "_id" from end of string
	var length = columnName.length;
	var indexEnd = length - 3;
	var foreignTableName = columnName.slice(0, indexEnd);
	// change name of table if special constraint name
	if (foreignTableName == "parent_process" ||
	    foreignTableName == "child_process") {
	    foreignTableName = "process";
	}
	// make plural
	if (foreignTableName == "process") {
	    foreignTableName += "es";
	} else if (foreignTableName == "plant_family") {
	    foreignTableName = "plant_families";
	} else {
	    foreignTableName += "s";
	}
	return foreignTableName;
    };
    this.getHyperlinkSql = function (foreignKeyTableName, prefixedColumn) {
	var hyperlinkSql= "";
	hyperlinkSql += "concat('<a href=\"../";
	hyperlinkSql += foreignKeyTableName;
	hyperlinkSql += "/', ";
	hyperlinkSql += prefixedColumn;
	hyperlinkSql += ", '\">";
	hyperlinkSql += foreignKeyTableName;
	hyperlinkSql += "/', ";
	hyperlinkSql += prefixedColumn;
	hyperlinkSql += ", '</a>')";
	return hyperlinkSql;
    };
    this.getColumnNames = function (tablePrefix, tableNameSingular, schema, inboundForeignKeyTables) {
	// note: schema = columnKeys
	var columnNames = "";
	for (let i = 0; i < schema.length; i++) {
	    var columnName = schema[i];
	    var prefixedColumn = tablePrefix + "." + columnName;
	    var lastThreeChars = columnName.slice(-3);
	    if (lastThreeChars == "_id") {
		// make fk_contraints into hyperlinks
		var foreignKeyTableName = this.getTableNameFromFKConstraint(columnName);
		var hyperlinkSql = this.getHyperlinkSql(foreignKeyTableName, prefixedColumn);
		columnNames += hyperlinkSql;
		columnNames += " as ";
		columnNames += columnName;
		// older version
		//columnNames += tablePrefix + "." + columnKeys[i];
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
                var fkTable = inboundForeignKeyTables[k];
		// temp
		var subquery = "array(select concat('&nbsp;<a href=\"../" + fkTable + "/', fk.id, '\">', fk.name, '</a>') from " + fkTable + " fk where fk." + tableNameSingular + "_id = " + tablePrefix + ".id)";
		columnNames += subquery + " as " + "\"associated " + fkTable + "\"";
	    }
	}
	return columnNames;
    };
    this.getStandardSingle = function (tableName, schema, id, inboundForeignKeyTables) {
        // create sql
	var tablePrefix = "a";
	var tableNameSingular;
	if (tableName == "processes") {
	    tableNameSingular = tableName.slice(0, -2);
	} else {
	    tableNameSingular = tableName.slice(0, -1);
	}
        var sql = "SELECT " + this.getColumnNames(tablePrefix, tableNameSingular, schema, inboundForeignKeyTables) + " FROM " + tableName + " " + tablePrefix + " " + "WHERE a.id = " + id + ";";
        return sql;
    };
}

module.exports = new Sqlgenerator();

// end
