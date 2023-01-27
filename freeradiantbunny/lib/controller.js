/**
 * Module Controller.
 * version 2.0.2
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

var modeller = require('./modeller.js');
var viewer = require('./viewer.js');

function Controller() {
    instanceCount = instanceCount + 1;
    debug("controller instantiated", instanceCount);
    // used by server
    this.serveUpWebPage = function (reqQuery, res, className, pageName, io, queryTerms) {
        debug("controller serveUpWebPage()");
        debug("controller className =", className);
        debug("controller pageName =", pageName);
        debug("controller queryTerms =", queryTerms);
        var classNameFilter = "";
        var id = "";
	// set default
        var paramView = "html";
        var paramSort = "";
	var paramFilter = "USD";
        var specialFlag = pageName;
        var editTerms = [];
	// deal with paramView
        if (reqQuery.view) {
            var freeradiantbunny = require("freeradiantbunny");
            var validator = freeradiantbunny.getValidator();
	    paramView = validator.validateView(reqQuery.view);
            debug("controller paramView =", paramView);
        }
        // see if db edits in order to do db changes
        if (editTerms instanceof Array && Object.keys(editTerms).length > 0) {
            debug("controller editTerms is Array =", editTerms instanceof Array);
            // update db table 
            var tableName = "hyperlink_permaculture_topics";
            var associativeField = "permaculture_topic_id";
            var hyperlink_id = editTerms.hyperlink_id;
            var associativeFieldValue = editTerms.permaculture_topic_id;
            modeller.updateTableHyperlinkAssociativePromise(tableName, associativeField, hyperlink_id, associativeFieldValue);
        }
	// validate UserPassKey
	var paramUpkIsValid = false;
        if (reqQuery.upk) {
	    var config = freeradiantbunny.getConfig();
            paramUpkIsValid = validator.isValidUserPassKey(reqQuery.upk, config);
        }
        // get data
        var dataSetPromise;
        try {
            dataSetPromise = modeller.getDataSetPromise(className, classNameFilter, id, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms);
        } catch (error) {
            var why = "controller failed getting dataSetPromise from modeller; " + error;
            var freeradiantbunny = require("freeradiantbunny");
            freeradiantbunny.send404(res, why);
            return;
        }
        // view
        if (editTerms.hyperlink_id) {
            // this displays a page with forms that allows the editing of the data
            debug("controller back to command=edit");
            // markup dataSet
            viewer.getOutputEdit(res, dataSetPromise, className, id);
        } else {
	    // check for Upk-protected pages
	    // if className is blocked, then Upk must be valid
	    if (validator.isBlockedClassName(className)) {
		// className blocked
		if (! paramUpkIsValid) {
		    // Upk failed
		    // todo send standard message
		    var why = "Thank You.";
		    freeradiantbunny.send200(res, why);
		}
	    }
            viewer.getOutputSpecial(res, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName);
        }
    };
    // used by server
    this.serveUpWebPageWithId = function (reqQuery, res, className, classNameFilter, id, io) {
        debug("controller serveUpWebPageWithId()");
        debug("controller serveUpWebPageWithId() className =", className);
        debug("controller serveUpWebPageWithId() classNameFilter =", classNameFilter);
        debug("controller serveUpWebPageWithId() id =", id);
        // frb
        var freeradiantbunny = require("freeradiantbunny");
        var validator = freeradiantbunny.getValidator();
        // extract parameters from request
	// set default
        var paramView = "html";
        var paramSort;
	var paramFilter;
        var paramCommand;
        var paramMakeSortToday;
        if (reqQuery.view) {
            paramView = validator.validateView(reqQuery.view);
            debug("controller paramView =", paramView);
        }
        if (reqQuery.sort) {
            paramSort = validator.validateSort(reqQuery.sort);
            debug("controller paramSort =", paramSort);
        }
	if (reqQuery.filter) {
            paramFilter = validator.validateFilter(reqQuery.filter);
            debug("controller paramFilter =", paramFilter);
	}
        if (reqQuery.command) {
            paramCommand = validator.validateCommand(reqQuery.command);
            debug("controller paramCommand =", paramCommand);
        }
        if (reqQuery.makesorttoday) {
            paramMakeSortToday = validator.validateId(reqQuery.makesorttoday);
            debug("controller paramMakeSortToday =", paramMakeSortToday);
        }
	var paramUpkIsValid = false;
        if (reqQuery.upk) {
	    var config = freeradiantbunny.getConfig();
            paramUpkIsValid = validator.isValidUserPassKey(reqQuery.upk, config);
        }
        // aside pre start
        // before the action, deal with user requests (if any)
        if (paramMakeSortToday) {
            debug("controller paramMakeSortToday =", paramMakeSortToday);
	    // quick fix to keep spiders from using URLs that use this function
	    // only process if param command=add
	    if (paramCommand === "add") {
		// update table sort field
		modeller.updateTableMakeSortTodayPromise(className, paramMakeSortToday);
	    }
	    // tenperdays table (make sure it has a sort of today with updated count
            if (className === "webpages") {
		modeller.insertIntoTableTenperdaysPromise();
	    }
        }
        // get data for table-title
        var classNameFilterNamePromise = Promise.resolve("");
        if (className === "hyperlinks") {
            if (classNameFilter === "reasons" ||
                classNameFilter === "categories" ||
                classNameFilter === "tags" ||
                classNameFilter === "permaculture_topics" ||
                classNameFilter === "plant_lists" ||
                classNameFilter === "plants") {
                // special for associative-table
                classNameFilterNamePromise = modeller.getNameGivenClassNameFilterAndIdPromise(classNameFilter, id);
            }
        }
        if (className === "plant_list_plants") {
            if (classNameFilter === "plant_lists") {
                // special for associative-table
                classNameFilterNamePromise = modeller.getNameGivenClassNameFilterAndIdPromise(classNameFilter, id);
            }
        }
        // aside pre end
        // deal with command edit
        var specialFlag = "";
        var queryTerms = {};
        var dataSetPromise;
        if (paramCommand === "edit" && id !== "") {
            // this displays a page with forms that allows the editing of the data
            debug("controller paramCommand =", paramCommand);
            // get data
            dataSetPromise = modeller.getDataSetPromise(className, classNameFilter, id, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms);
            // markup data
            viewer.getOutputEdit(res, dataSetPromise, className, id);
        } else {
            // get data
            debug("controller get data");
            try {
                dataSetPromise = modeller.getDataSetPromise(className, classNameFilter, id, paramSort, paramFilter, paramUpkIsValid, specialFlag, queryTerms);
            } catch (error) {
                var why = "controller failed getting dataSetPromise from modeller; " + error;
		debug("controller catch error why =", why);
                freeradiantbunny.send404(res, why);
                return;
            }
	    // check for Upk-protected pages
	    // if className is blocked, then Upk must be valid
	    if (validator.isBlockedClassName(className)) {
		// className blocked
		if (! paramUpkIsValid) {
		    // Upk failed
		    // todo send standard message
		    var why = "Thank You.";
		    freeradiantbunny.send200(res, why);
		}
	    }
            // markup data
	    viewer.getOutput(res, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, classNameFilterNamePromise, paramUpkIsValid, paramFilter);
        }
	// aside post
        // after the action, deal with user requests (if any)
        if (paramMakeSortToday) {
            debug("controller paramMakeSortToday =", paramMakeSortToday);
            if (className === "webpages") {
		modeller.updateTableTenperdaysCountPromise();
            }
	}
    };
}

module.exports = new Controller();
