/**
 * Module Modeller.
 * version 2.0.2
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

var database = require('./database.js');
var sqlmaker = require('./sqlmaker.js');

function Modeller() {
    instanceCount = instanceCount + 1;
    debug("modeller instantiated", instanceCount);
    // used by controller
    this.getDataSetPromise = function (className, classNameFilter, id, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms) {
        debug("modeller getDataSetPromise()");
        debug("modeller className =", className);
        debug("modeller classNameFilter =", classNameFilter);
        debug("modeller id =", id);
        debug("modeller paramSort =", paramSort);
	debug("modeller paramFilter =", paramFilter);
	debug("modeller specialFlag =", specialFlag);
        debug("modeller queryTerms =", queryTerms);
        // get baseUrl
        var freeradiantbunny = require("freeradiantbunny");
        var config = freeradiantbunny.getConfig();
        var suitcase = config.getSuitcase();
        var baseUrl = suitcase.baseUrl;
        // get aggregate or get single
        // default is to get all rows (no id is specified)
        var idOrNoId = "";
        if (id) {
            // send id to indicate only a single row
            idOrNoId = id;
        }
        // deal with sort
        if (paramSort) {
            debug(className + " paramSort =", paramSort);
        }
	// deal with filter
        if (paramFilter) {
            debug(className + " paramFilter =", paramFilter);
        }
        // menu
        var currentMenuSelections = [];
        // on hold
        //currentMenuSelections['view'] = paramView;
        currentMenuSelections.sort = paramSort;
        // solve for sql
        try {
            var sql = sqlmaker.getSql(idOrNoId, paramSort, paramFilter, paramUpkIsValid, className, classNameFilter, specialFlag, queryTerms);
            // returns a promise of a dataSet
            return database.queryDatabase(sql, className, baseUrl, currentMenuSelections, suitcase);
        } catch (error) {
            var why = "modeller failed getting sql from sqlmaker; " + error;
            throw why;
        }
    };
    // used by controller
    this.getNameGivenClassNameFilterAndIdPromise = function (tableNameFilter, id) {
	// debug
        debug("modeller getNameGivenClassNameFilterAndIdPromise()");
        debug("modeller given tableNameFitler =", tableNameFilter);

        // frb
        var freeradiantbunny = require("freeradiantbunny");

        // get baseUrl
        var config = freeradiantbunny.getConfig();
        var suitcase = config.getSuitcase();

        // solve for sql
        var sql = sqlmaker.getNameGivenClassNameFilterAndIdPromise(tableNameFilter, id);

        // returns a promise of updating
        return database.queryDatabaseSimple(sql, suitcase);
    };
    // used by controller
    this.updateTableMakeSortTodayPromise = function (className, id) {
        debug("updateTableMakeSortToday() id =", id);
        // set fieldName
        var fieldName = "sort";
        // get date
        var timekeeper = require("./timekeeper.js");
        var date = timekeeper.getTodayDateAsFirstYearStyle();
        // solve for sqlMakerObj
        var sql = sqlmaker.getSqlForUpdate(className, id, fieldName, date);
        // returns a promise
        return database.updateDatabase(sql);
    };
    // used by controller
    this.insertIntoTableTenperdaysPromise = function () {
	// despite the calling className, this is on behalf of tenperdays class
	// so over-riding className... this is a case of one class impacting another class
        debug("modeller insertIntoTableTenperdaysPromiseI()");
        // get date
        // solve for sqlMakerObj
        var sql = sqlmaker.getSqlToInsertIntoTenperdays();
        // returns a promise
        return database.updateDatabase(sql);
    };
    // used by controller
    this.updateTableTenperdaysCountPromise = function () {
	// despite the calling className, this is on behalf of tenperdays class
	// so over-riding className... this is a case of one class impacting another class
        debug("modeller updateTableTenperdaysCountPromise()");
        // get date
        // solve for sqlMakerObj
        var sql = sqlmaker.getSqlToUpdateTenperdaysCount();
        // returns a promise
        return database.updateDatabase(sql);
    };
    // used by controller
    this.updateTableHyperlinkAssociativePromise = function (tableName, associativeField, hyperlink_id, associativeFieldValue) {
        debug("modeller updateTableHyperlinkAssociativePromise() editTerms");
        // solve for sql
        var sql = sqlmaker.getSqlHyperlinkAssociative(tableName, associativeField, hyperlink_id, associativeFieldValue);
        // returns a promise
        return database.updateDatabase(sql);
    };
}

module.exports = new Modeller();

exports.getModelPath = function () {
    var path = require('path');
    return path.join(__dirname, '../model/');
};
