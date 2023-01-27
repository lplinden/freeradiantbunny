/**
 * Module Viewer.
* version 2.0.2
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Viewer() {
    instanceCount = instanceCount + 1;
    debug("viewer instantiated", instanceCount);
    // used by controller
    // older version (appears to have unused parameters)
    this.getOutput = function (res, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, classNameFilterNamePromise, paramUpkIsValid, paramFilter) {
        debug("viewer className =", className);
	debug("viewer paramView =", paramView);
	debug("viewer paramView =", paramFilter);
        var markup = require('./markup.js');
	var pageName = "";
        // note that when view is a null string, use html
        if (paramView  === undefined || paramView === "html" || paramView === "json" || paramView === "stream" || paramView === "default") {
            debug("viewer getPage()");
	    var special = false;
	    markup.getPage(res, this.suitcase, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName, classNameFilterNamePromise, special, paramUpkIsValid, paramFilter);
        } else {
            var why = "viewer: view is not known \"" + paramView + "\"";
            throw why;
        }
    };
    // used by controller
    this.getOutputSpecial = function (res, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName, paramUpkIsValid, paramFilter) {
        debug("viewer getOutputSpecial()");
        debug("viewer paramView =", paramView);
        debug("viewer className =", className);
        debug("viewer pageName =", pageName);
	debug("viewer paramFilter =", paramFilter);
	var classNameFilterNamePromise = "";
        var markup = require('./markup.js');
	var special = true;
        markup.getPage(res, this.suitcase, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName, classNameFilterNamePromise, special, paramUpkIsValid, paramFilter);
    };
    // used by controller
    this.getOutputEdit = function (res, dataSetPromise, className, id) {
        debug("viewer getOuputEdit()");
        debug("viewer className =", className);
        debug("viewer id =", id);
        var markup = require('./markup.js');
        debug("viewer getWebPageEdit()");
        markup.getWebPageEdit(res, this.suitcase, dataSetPromise, className, id);
    };
}

module.exports = new Viewer();
