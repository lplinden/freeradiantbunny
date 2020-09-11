/**
 * Module menu.
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Menu() {
    instanceCount = instanceCount + 1;
    debug("menu instantiated", instanceCount);
    this.getMenu = function (menuType, currentMenuSelections, choices, url) {
        // consider currentMenuSelection
        var currentMenuSelected = "";
        var choice;
        if (menuType === "view") {
            currentMenuSelected = currentMenuSelections.view;
            choice = currentMenuSelections.view;
        } else if (menuType === "sort") {
            currentMenuSelected = currentMenuSelections.sort;
            choice = currentMenuSelections.sort;
        }
        debug("menu currentSelected =", currentMenuSelected);
        // change default to actual name of the selection
        if (currentMenuSelected === "") {
            if (menuType === "view") {
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
                var params = this.getParams(menuType, choices[i], currentMenuSelections);
                menu += "<a href=\"" + url + params + "\">" + choices[i] + "</a>";
            }
            // delimeter for all but the last
            if (i < (choices.length - 1)) {
                menu += " |\n";
            } else {
                menu += "\n";
            }
        }
        menu += "<br />\n";
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
            if (currentMenuSelections['sort'] !== "undefined") {
                if (currentMenuSelections['sort'] !== "") {
                    flagFoundSort++;
                    paramSort += "sort=" + currentMenuSelections['sort'];
                }
            }
        }
        if (menuType === "sort") {
            //paramView += "view=" + currentMenuSelections['sort'];
            // only if defined
            if (currentMenuSelections['view'] !== "undefined") {
                if (currentMenuSelections['view'] !== "") {
                    flagFoundView++;
                    paramView += "view=" + currentMenuSelections['view'];
                }
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
        //debug("menu getParams() creaed params =", params);
        return params;
    }
};

module.exports = new Menu();
