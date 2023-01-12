/**
 * Module Sqlmaker.
 * version 2.0.2
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Sqlmaker() {
    instanceCount = instanceCount + 1;
    debug("sqlmaker instantiated", instanceCount);
    this.getSql = function (idOrNoId, paramSort, paramFilter, paramUpkIsValid, className, classNameFilter, specialFlag, queryTerms) {
        debug("sqlmaker idOrNoId =", idOrNoId);
        debug("sqlmaker paramSort =", paramSort);
	debug("sqlmaker paramFilter =", paramFilter);
	debug("sqlmaker paramUpkIsValid =", paramUpkIsValid);
        debug("sqlmaker className =", className);
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
        var sql = model.getSql(idOrNoId, classNameFilter, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms);
        debug("sqlmaker sql =", sql);
        return sql;
    };
    this.getSqlForUpdate = function (className, id, fieldName, value) {
        var sql = "UPDATE " + className + " SET " + fieldName + "='" + value + "' WHERE id = " + id + ";";
        debug("sqlmaker getSqlForUpdate() sql =", sql);
        return sql;
    };
    this.getSqlHyperlinkAssociative = function (tableName, associativeField, hyperlink_id, associativeFieldValue) {
        var sql = "INSERT INTO " + tableName + " (hyperlink_id, " + associativeField + ") VALUES (" + hyperlink_id + ", " + associativeFieldValue + ");";
        debug("sqlmaker getSqlHyperlinkAssociative sql =", sql);
        return sql;
    };
    this.getSqlToInsertIntoTenperdays = function () {
	var tableName = "tenperdays";
        var timekeeper = require("./timekeeper.js");
        var date = timekeeper.getTodayDateAsFirstYearStyle();
        var sql = "INSERT INTO " + tableName + " (sort, count) VALUES ('" +  date + "', array(select count(id) from webpages where sort = '" + date + "'));";
        debug("sqlmaker getSqlToInsertIntoTenperdays sql =", sql);
        return sql;
    };
    this.getSqlToUpdateTenperdaysCount = function () {
	var tableName = "tenperdays";
        var timekeeper = require("./timekeeper.js");
        var date = timekeeper.getTodayDateAsFirstYearStyle();
        var sql = "UPDATE " + tableName + " SET count = array(select count(id) from webpages where sort = '" + date + "') WHERE sort = '" + date + "';";
        debug("sqlmaker getSqlToUpdateTenperdaysCount sql =", sql);
        return sql;
    };
    this.getNameGivenClassNameFilterAndIdPromise = function (tableNameFilter, id) {
        // create sql
        var sql = "SELECT name FROM " + tableNameFilter + " WHERE id = " + id + ";";
        debug("sqlmaker getNameGivenClassNameFilterAndIdPromoise sql =", sql);
        return sql;
    };
}

module.exports = new Sqlmaker();
