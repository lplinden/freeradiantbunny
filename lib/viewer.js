/**
 * Module viewer.
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
    this.getOutput = function (res, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, classNameFilterNamePromise) {
        debug("viewer className =", className);
        var markup = require('./markup.js');
	var pageName = "";
        // note that when view is a null string, use html
        if (paramView  === undefined || paramView === "html" || paramView === "default") {
            debug("viewer getWebPage()");
	    var special = false;
            markup.getWebPage(res, this.suitcase, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName, classNameFilterNamePromise, special);
        } else {
            var why = "viewer: view is not known \"" + paramView + "\"";
            throw why;
        }
    };
    // used by controller
    this.getOutputSpecial = function (res, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName) {
        debug("viewer getOutputSpecial()");
        debug("viewer paramView =", paramView);
        debug("viewer className =", className);
        debug("viewer pageName =", pageName);
	var classNameFilterNamePromise = "";
        var markup = require('./markup.js');
	var special = true;
        markup.getWebPage(res, this.suitcase, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName, classNameFilterNamePromise, special);
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
