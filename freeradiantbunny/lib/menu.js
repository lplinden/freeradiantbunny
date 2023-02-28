/**
 * Module Menu.
 * version 2.0
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Menu() {
    instanceCount = instanceCount + 1;
    debug("menu instantiated", instanceCount);
    this.getMenu = function (menuType, currentMenuSelections, choices, url, baseUrl = "x", paramUpkIsValid) {
        var currentMenuSelected = "";
        var choice;
        if (menuType === "subs") {
            currentMenuSelected = currentMenuSelections.subs;
            choice = currentMenuSelections.subs;
        } else if (menuType === "view") {
            currentMenuSelected = currentMenuSelections.view;
            choice = currentMenuSelections.view;
        } else if (menuType === "sort") {
            currentMenuSelected = currentMenuSelections.sort;
            choice = currentMenuSelections.sort;
        }
        debug("menu currentSelected =", currentMenuSelected);
        // change default to actual name of the selection
        if (currentMenuSelected === "") {
            if (menuType === "subs") {
                choice = "plant_lists";
            } else if (menuType === "view") {
                choice = "html";
            } else if (menuType === "sort") {
                choice = "sort";
            }
        }
        // output menu html
        var menu = "<strong>" + menuType + "</strong>:\n";
        var i;
        for (i = 0; i < choices.length; i++) {
            if (choice === choices[i]) {
                // no hyperlink
                menu += choice;
            } else {
		if (menuType === "subs") {
		    var subsUrl = baseUrl + choices[i];
		    menu += "<a href=\"" + subsUrl;
		    if (paramUpkIsValid) {
			menu += "?" + paramUpkIsValid;
		    }
		    menu += "\">" + choices[i] + "</a>";
		} else {
                    var params = this.getParams(menuType, choices[i], currentMenuSelections);
                    menu += "<a href=\"" + url + params + "\">" + choices[i] + "</a>";
		}
            }
            // delimeter for all but the last
            if (i < (choices.length - 1)) {
                menu += " |\n";
            } else {
                menu += "\n";
            }
        }
        menu += "<br>\n";
        return menu;
    }
    this.getParams = function (menuType, theMenuItem, currentMenuSelections) {
        // only add only if param exists and is not the default
        // add parameters to url
        var params = "";
        //var paramsKeys = ["view", "sort"];
        var flagFoundView = 0;
        var flagFoundSort = 0;
        var paramView = "";
        var paramSort = "";
        //debug("menu view currentMenuSelected", currentMenuSelections['view']);
        //debug("menu sort currentMenuSelected", currentMenuSelections['sort']);
        // get view params
        var paramsView = "";
        if (menuType === "view") {
            //paramView += "view=" + currentMenuSelections['view'];
            flagFoundView++;
            paramView += "view=" + theMenuItem;
            if (typeof currentMenuSelections['sort'] !== "undefined") {
                if (currentMenuSelections['sort'] !== "") {
                    if (currentMenuSelections['sort'] !== "undefined") {
			flagFoundSort++;
			paramSort += "sort=" + currentMenuSelections['sort'];
		    } else {
			// set default sort
			flagFoundSort++;
			var default_sort = "id";
			paramSort += "sort=" + default_sort;
		    }
                } else {
		    // set default sort
                    flagFoundSort++;
		    var default_sort = "id";
                    paramSort += "sort=" + default_sort;
		}
            } else {
		// set default sort
                flagFoundSort++;
		var default_sort = "id";
                paramSort += "sort=" + default_sort;
	    }
        }
        if (menuType === "sort") {
            //paramView += "view=" + currentMenuSelections['sort'];
            // only if defined
            if (typeof currentMenuSelections['view'] !== "undefined") {
                if (currentMenuSelections['view'] !== "") {
		    if (currentMenuSelections['view'] !== "undefined") {
			flagFoundView++;
			var default_view = "html";
			paramView += "view=" + default_view;
		    } else {
			flagFoundView++;
			paramView += "view=" + currentMenuSelections['view'];
		    }
                } else {
		    flagFoundView++;
		    var default_view = "html";
                    paramView += "view=" + default_view;
		}
            } else {
		// set default view
                flagFoundView++;
		var default_view = "html";
                paramView += "view=" + default_view;
	    }
            flagFoundSort++;
            paramSort += "sort=" + theMenuItem;
        }
        if (flagFoundView || flagFoundSort) {
            params += "?";
        }
        if (flagFoundView) {
            params += paramView;
        }
        if (flagFoundView && flagFoundSort) {
            params += "&";
        }
        if (flagFoundSort) {
            params += paramSort;
        }
        debug("menu getParams() created params =", params);
        return params;
    }
};

module.exports = new Menu();
