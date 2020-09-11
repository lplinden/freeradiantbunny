/**
 * Module sqlmaker.
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Sqlmaker() {
    instanceCount = instanceCount + 1;
    debug("sqlmaker instantiated ", instanceCount);
    this.getSql = function (idOrNoId, paramSort, className, classNameFilter, specialFlag, queryTerms) {
        debug("sqlmaker classNameFilter =", classNameFilter);
        debug("sqlmaker specialFlag =", specialFlag);
        debug("sqlmaker queryTerms =", queryTerms);
        // get sql from model
        var path = require('path');
        var modelName = '../model/' + className + '.js';
        var fileName = path.join(__dirname, modelName);
        debug("sqlmaker fileName =", fileName);
        var model;
        try {
            model = require(fileName);
        } catch (error) {
            var why = "sqlmaker unable able to find fileName = " + fileName + "; " + error;
            throw why;
        }
        var sql = model.getSql(idOrNoId, classNameFilter, paramSort, specialFlag, queryTerms);
        debug("sqlmaker sql =", sql);
        return sql;
    };
    this.getSqlForUpdate = function (className, id, fieldName, value) {
        var sql = "UPDATE " + className + " SET " + fieldName + "='" + value + "' WHERE id = " + id + ";";
        debug("sqlmaker sql =", sql);
        return sql;
    };
    this.getSqlHyperlinkAssociative = function (tableName, associativeField, hyperlink_id, associativeFieldValue) {
        var sql = "INSERT INTO " + tableName + " (hyperlink_id, " + associativeField + ") VALUES (" + hyperlink_id + ", " + associativeFieldValue + ");";
        debug("sqlmaker sql =", sql);
        return sql;
    };
    this.getNameGivenClassNameFilterAndIdPromise = function (tableNameFilter, id) {
        // create sql
        var sql = "SELECT name FROM " + tableNameFilter + " WHERE id = " + id + ";";
        debug("sqlmaker sql =", sql);
        return sql;
    };
}

module.exports = new Sqlmaker();
