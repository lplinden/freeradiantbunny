/**
 * Module moulder.
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var timekeeper = require('./timekeeper.js');

function Moulder() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("moulder instantiated", instanceCount);
    this.get = function(columnName, value, className, id, baseUrl, localBaseUrl, extends_class_id, idOrNotId, pageName, aId) {
        //debug("moulder className =", className);
        //debug("moulder columnName =", columnName);
        var styles = "";
        if (columnName === "id") {
            var chardata = this.getIdAsUrl(baseUrl, className, value, value);
            return this.getStyledData("", chardata, value, styles);
	    
        } else if (columnName === "statuscode") {
            var chardata = this.getIdAsUrl(baseUrl, className, value, value);
            return this.getStyledData("", chardata, value, styles);
	    
        } else if (columnName === "validhtml") {
            var chardata = this.getIdAsUrl(baseUrl, className, value, value)
            return this.getStyledData("", chardata, value, styles);
	    
        } else if (columnName === "linkcheck") {
            var chardata = this.getIdAsUrl(baseUrl, className, value, value)
            return this.getStyledData("", chardata, value, styles);
	    
        } else if (columnName === "password") {
            return this.getStyledData("", "[obscured]");
	    
        } else if (columnName === "zachmans") {
            var anotherClassName = "zachmans";
            var zachman_id = this.getZachmanIdGivenZachmanName(value);
            var chardata = this.getIdAsUrl(baseUrl, anotherClassName, zachman_id, value);
            return this.getStyledData("", chardata);

        } else if (columnName === "classes_associated") {
            var zachman_id = id;
            var classesList = this.getClassesListGivenZachmanId(zachman_id);
            var charadata = "total count = " + value + "<br />" + classesList;
            return this.getStyledData("", chardata);

        } else if (columnName === "sort") {
            var sortClass = "";
            var styles = this.getSortStyle(value);
            // sort data as hyperlink
            // note set url
            var sortNoPrefix = this.getSortNoPrefix(value);
            //debug("moulder sortNoPrefix", sortNoPrefix);
            var sort;
            if (timekeeper.isToday(sortNoPrefix)) {
                //debug("is today");
                // today, so no link
                sort = value;
                // this if else clause should not be here so un-hardcode this
            } else {
                //debug("not today");
                // not today, so link button
                // this if else clause should not be here so un-hardcode this
                // make url
		var url = baseUrl + className;
		if (id) {
                    url +=  + "/" + id;
		}
		url += "?" + "makesorttoday=" + aId;
                // note add parameters of this class
                // there might be other paramters
                sort = "<a href=\"" + url + "\" style=\"text-decoration: none;\">" + value + "</a>";
            }
	    var raw = "";
	    return this.getStyledData(sortClass, sort, raw, styles);

        } else if (columnName === "name") {
            var valueAsLink = this.getAsLink(value, baseUrl, className, id);
            //debug("moulder idOrNotId undefined? ", idOrNotId);
            //if (idOrNotId) {
            //    valueAsLink = this.makeStandOut(valueAsLink);
            //}
            var styledData = this.getStyledData("", valueAsLink);
            //debug("moulder styledData =", styledData);
            return styledData;

        } else if (columnName === "img") {
            //debug("moulder columnName =", columnName);
	    // special filter
	    // if baseUrl is offline, try localhost_baseurl
	    var filteredValue = this.filterToLocalBaseUrlIfNotOnline(value, localBaseUrl);
            if (pageName === "/search.html" ||
                className === "domains") {
                debug("moulder className =", className);
                var chardata = this.getImgUrlAsImageElementToSingle(baseUrl, className, filteredValue, aId);
                return this.getStyledData("", chardata);
            } else {
                var chardata = this.getImgUrlAsImageElement(baseUrl, className, filteredValue, id);
                return this.getStyledData("", chardata);
            }

        } else if (columnName === "aimg") {
            //debug("moulder columnName =", columnName);
            //debug("moulder value =", value);
            // the sql does it all (both a element and img element)
            var chardata = value;
	    var raw = "";
	    var styles = "";
	    //console.log("moulder styles =", styles);
	    return this.getStyledData("", chardata, raw, styles);
        } else if (columnName === "img_url") {
            // the field is for meta-purposes in the frb single data context
            // shorten field name for display purposes
            // save img_url field as img (see sql)
            // note that two values are concatenated below so showing more than one view withinn a view
            var chardata = this.getImgUrlAsImageElement(baseUrl, className, value, id) + "<br />" + value;
            return this.getStyledData("", chardata);
        } else if (columnName === "search") {
            return this.getStyledData("", value, value, styles);
	    
        } else if (columnName === "reasonscount" ||
                   columnName === "ptopicscount" ||
                   columnName === "categoriescount" ||
                   columnName === "tagscount" ||
                   columnName === "plantscount") {
            if (value > 0) {
                //debug("moulder ptopicscount value > 0");
                // green
                styles = "background-color: #CCFFCC;"
            } else {
                // red
                styles = "background-color: #CD5555;";
            }
            return this.getStyledData("", value, value, styles);

        } else if (columnName === "extends_class") {
            // shorten field name for display purposes
            // save img_url field as img (see sql)
            //debug("moulder extends_class =", extends_class_id);
            var extendsClass = this.getExtendsClassStyle(extends_class_id);
            //debug("moulder extendsClassStyle =", extendsClassStyle);
            var valueAsLink = this.getAsLink(value, baseUrl, className, extends_class_id);
            var styledData = this.getStyledData(extendsClass, valueAsLink);
            //debug("moulder styledData =", styledData);
            return styledData;
        }
        // else
        return this.getStyledData("", value);
    }
    this.filterToLocalBaseUrlIfNotOnline = function (value, localBaseUrl) {
	// need to debug
        //var callback = function convertBaseUrlToLocalBaseUrl(online_flag) {
	//    if (online_flag) {
	//	return baseUrl;
	//    }
	// else
	//var regex = /http:..mudia.com./;
	//var filteredValue = value.replace(regex, localBaseUrl);
	// hard-coded need to refactor to user config
	//regex = /http:..basecamp..blaireric.dev.domains.mud.mud_up.mud_v15.mud_base.mud_html.public_html./;
	//filteredValue = value.replace(regex, localBaseUrl);
	//return filteredValue;
	//};
	//checkInternet(callback);
	return value;
    }
/*
    this.function checkInternet(callback) {
        // hard-coded, refactor to user config
	//require('dns').lookup('freeradiantbunny.org',function(err) {
	//    if (err && err.code == "ENOTFOUND") {
		callback("");
	//    }
	//    callback("online");
	//});
    }
*/
    this.getZachmanIdGivenZachmanName = function (value) {
        // eventually build a lookup table in memory
        // one database serearch will servera ll classes rows
        switch(value) {
        case 'motivations':
            return 1;
            break;
        case 'process':
            return 2;
            break;
        case 'things':
            return 3;
            break;
        case 'locations':
            return 4;
            break;
        case 'people':
            return 5;
            break;
        case 'timing':
            return 6;
            break;
        default:
            // 'n/a' 
            return 7;
            break;
        }
    }
    this.getIdAsUrl = function (baseUrl, className, id, chardata) {
        return "<a href=\"" + baseUrl + className + "/" + id + "\">" + chardata + "</a>";
        //return "<a href=\"" + id + "\">" + id + "</a>";
    }
    this.makeStandOut = function (chardata) {
        //return "<a href=\"" + className + "/" + id + "\">" + id + "</a>";
        return "<h2>" + chardata + "</h2>";
    }
    this.getImgUrlAsImageElement = function (baseUrl, className, imgUrl, id) {
        // need to implement alt attribute and title attribute
        return "<a href=\"" + baseUrl + className + "/" + id + "\"><img src=\"" + imgUrl + "\" class=\"data-img\" alt=\"\" title=\"\" /></a>";
    }
    this.getImgUrlAsImageElementToSingle = function (baseUrl, className, imgUrl, id) {
        // need to implement alt attribute and title attribute
        //debug("moulder getImgUrlAsImageElementToSingle() =", imgUrl);
        return "<a href=\"" + baseUrl + className + "/" + id + "\"><img src=\"" + imgUrl + "\" class=\"data-img\" alt=\"\" title=\"\" /></a>";
    }
    this.getSortStyle = function(sort) {
        return "background: " + this.calculateCellColor(sort) + "; text-align: center; width: 140px;";
    }
    this.getSortAsLink = function(baseUrl, className, id, sort) {
        return markup;
    }
    this.getAsLink = function(chardata, baseUrl, className, id) {
        // note set url
        var url = "";
        var path = require('path');
        var url = baseUrl + className + "/" + id;
        return "<a href=\"" + url + "\" style=\"text-decoration: none;\">" + chardata + "</a>";
    }
    this.calculateCellColor = function (sort) {
        // color = "#0099CC";
        // define colors
        var color_error = "#CD0000"; // firebrick red;
        // set default color rainbow
        var color_1 = "#A6D785";
        var color_1b = "#84BE6A"; // green
        var color_2 = "#33811D"; // dark green
        var color_3 = "#3D77E4"; // blue
        var color_4 = "#7F49D0"; // purple
        var color_5 = "#E28D31"; // orange
        var color_5b = "#928e88"; // light deep purple
        var color_6 = "#CD5555"; // red
        var color_7 = "#3BF965"; // yellow-green
        // check date prefix to see if this is an old "Z" date
        // make the Y editable in the config
        //debug("mouldata sort =", sort);
        var sortLetter = "";
        if (sort !== null) {
            sortLetter = sort.substr(0, 1);
        }
        //debug("moulder sortLetter =", sortLetter);
        if (sortLetter === "Y") {
            //debug("moulder timekeeper =", timekeeper);
            // color according to the timespan
            var date = sort.substr(2);
            //debug("mouldata date =", date);
            var daysElapsed = timekeeper.getDaysElapsed(date);
            //debug("mouldata daysElapsed =", daysElapsed);
            var timespans = [10, 90, 180, 200, 365];
            var color;
            if (timekeeper.isToday(date)) {
                color = color_7;
            } else if (timekeeper.getDaysElapsed(date) <= timespans[0]) {
                color = color_1;
            } else if (timekeeper.getDaysElapsed(date) <= timespans[1]) {
                color = color_1b;
            } else if (timekeeper.getDaysElapsed(date) <= timespans[2]) {
                color = color_3; 
            } else if (timekeeper.getDaysElapsed(date) <= timespans[3]) {
                color = color_5;
            } else if (timekeeper.getDaysElapsed(date) <= timespans[4]) {
                color = color_4;
            } else {
                color = color_5b;
            }
        } else {
            // this does not match the prefix
            color = color_error;
        }
        //} else {
        // all other columns
        //color = "#CCFFCC";
        //}
        return color;
    }
    this.getExtendsClassStyle = function(extends_class_id) {
        // associate colors with class and store hash in system config
        // test benchmark time versus switch statement
        if (extends_class_id === "217") {
           return "background-color: green;";
        } else if (extends_class_id === "215") {
            return "background-color: orange;";
        } else if (extends_class_id === "142" ||
                   extends_class_id === "218" ||
                   extends_class_id === "163" ||
                   extends_class_id === "143" ||
                   extends_class_id === "220" ||
                   extends_class_id === "219" ||
                   extends_class_id === "187") {
            return "background-color: yellow;";
        } else if (extends_class_id === "144") {
            return "background-color: " + color_3 + ";";
        } else if (extends_class_id === "112") {
            return "background-color: #AA99FF; color: #EFEFEF;";
        } else if (extends_class_id === "215") {
            return "background-color: #3399EE; color: #000000;";
        }
        return "background-color: #CCCCCC;";
    }
    this.getSortNoPrefix = function(sort) {
        // assumes "Z " is at the beginning of string
        if (sort !== null) {
            return sort.substring(2, 12);
        }
        return "";
    }
    this.getStyledData = function (theClass, chardata, raw = "", styles = "") {
        var styledData = {
            class: theClass,
            style: styles,
            chardata: chardata,
            raw: raw
        }
        //debug("moulder getStyledData styledData =", styledData);
        return styledData;
    }
    this.getClassesListGivenZachmanId = function (zachman_id) {
        var classesList = [];
        // conslult database to get list of classes matching this zachmand_id
        // foreign key
        //debug("foreign key class list with zachman_id = " + zachman_id + "]");
        // Top Ten Promise() function
        // deal with a Promise() type
        //            try {
        //                var foreignKeyDataSetPromise = ""; //myFreeRadiantBunny.getFreeRadiantBunny().getForeignKeyDataSetPromise();
        //            } catch(error) {
        //            }
        var foreignKeyDataSetPromise = "";
        return foreignKeyDataSetPromise;
    }
};

module.exports = new Moulder();
