/**
 * Module Markup.
 * version 2.0.2
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;
var columnCount = 0;
var columnNum = 1;

var convertDataSet = function (dataSet, className, id, baseUrl, localBaseUrl, pageName, paramUpkIsValid, paramFilter) {
    debug("markup convertDataSet()");
    var aDataSet = [];
    var moulder = require('./moulder.js');
    // reset
    columnCount = 0;
    columnNum = 1;
    var i;
    for (i = 0; i < dataSet.length; i++) {
        var row = dataSet[i];
	debug("markup convertDataSet() i =", i);
	debug("markup convertDataSet() row =", row);
        var aRow = [];
        var extends_class_id = "";
        // get the id so that other columns can be processed
        var aId = "";
        var columnName;
	for(columnName in row) {
	    columnCount++;
            if (columnName === "id") {
                aId = row[columnName];
		debug("markup convertDataSet() columnName, aId =", columnName + ", " + aId);
                //break;
            }
        }
        var columnNameAsLinkOrNot;
        var url;
        var params;
        for(columnName in row) {
            //debug('markup %s column "%s" has a value of "%j"', i, columnName, row[columnName]);
            if (columnName === "extends_class_id") {
                extends_class_id = row[columnName];
                continue;
            }
            // make link for sort function
            // sort functionality should be grouped with order by in own class
            columnNameAsLinkOrNot = columnName;
            if (!id && className === "classes" && (columnName === "status" || columnName === "sort" || columnName === "id" || columnName === "name" || columnName === "subsystem" || columnName === "extends_class" || columnName === "zachmans")) {
                url = baseUrl + className + "/";
                // might be able to refactor next 3 lines
		// LPL 2019-12 need to fix myMenu is not defined error
		// this code might just perhaps deal with the columns of the table (move to colhead class)
		//if (typeof myMenu !== 'undefined') {
                //    params = myMenu.getParams("sort", columnName, currentMenuSelections);
		//} else {
		//    // default
		//    params = myMenu.getParams("sort", "id", "id");
		//}
                columnNameAsLinkOrNot = columnName;
            }
            // data assigned
	    // debug
            debug("markup columnName =", columnName);
	    debug("markup row[columnName] =", row[columnName]);
	    debug("markup className =", className);
	    debug("markup id =", id);
	    debug("markup baseUrl =", baseUrl);
	    debug("markup localBaseUrl =", localBaseUrl);
	    debug("markup extends_class_id =", extends_class_id);
	    debug("markup pageName =", pageName);
	    debug("markup aId =", aId);
	    debug("markup paramFilter =", paramFilter);
	    var dataToUse = row[columnNameAsLinkOrNot];
	    // store in array
            aRow[columnNameAsLinkOrNot] = moulder.get(columnName, dataToUse, className, id, baseUrl, localBaseUrl, extends_class_id, id, pageName, aId, paramUpkIsValid, paramFilter);
            debug("markup database aRow =", aRow[columnNameAsLinkOrNot]);
        }
        aDataSet.push(aRow);
    }
    return aDataSet;
};

function Markup() {
    'use strict';
    instanceCount = instanceCount + 1;
    debug("markup instantiated", instanceCount);
    // associate classes to add knowledge
    this.associate = function (associateClassName) {
        var tagsFile = "./standards/" + associateClassName + ".js";
        var tags = require(tagsFile);
    };
    var myTags = this.associate('tags');
    var myEntitiesObj = this.associate('entities');
    this.getPage = function (res, suitcase, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName, classNameFilterNamePromise, special, paramUpkIsValid, paramFilter) {
        debug("markup getPage()");
        debug("markup className =", className);
        debug("markup pageName =", pageName);
        debug("markup paramView =", paramView);
	debug("markup paramFilter =", paramFilter);

        var freeradiantbunny = require("freeradiantbunny");
        var config = freeradiantbunny.getConfig();
        var baseUrl = config.getBaseUrl();
        var localBaseUrl = config.getLocalBaseUrl();
        // refactor manifest below
        var manifest = config.getManifest(className);
        var classNameNoUnderscore = className.replace("_", " ");
        // no title on special webpage
        if (special) {
            manifest['table-title'] = null;
        }
        // should search form be displayed
        if (!special && className === "hyperlinks") {
            manifest.searchFormFlag = "1";
        }
        if (pageName === "/search.html") {
            manifest.searchFormFlag = "1";
        }
        // should socket.io be used
        if ((!special && className === "webpages") ||
            (!special && className === "moneymaker_measurement_instances")) {
            manifest.socketioFlag = "1";
        }
        // prepare url variable for menues
        var menu = require('./menu.js');
        var url = this.getUrl(baseUrl, className, classNameFilter);
        if (id !== "") {
            // url
            url += "/" + id;
            // hyperlink back to all rows in database
	    // turn off
            //manifest.linkToAllExists = "1";
            manifest.linkToAllExists = "";
            //manifest.linkToAll = "<a href=\"./\">Display all " + className + "</a>";
        }
        // create menu for view
        var currentMenuSelections = [];
	// view is on hold because it is under constructino
        //currentMenuSelections.view = paramView;
        currentMenuSelections.sort = paramSort;
        //var choicesViewMenu = ["html", "json", "stream", "postgres", "meta"];
	// view is on hold because it is under constructino
        //var choicesViewMenu = ["html", "stream"];
	// adding special menu that varies depending upon subsystems context
	// manifest the menu
	// default
        var menuType = "view";
	// view is on hold because it is under construction
        //manifest.viewMenu = menu.getMenu(menuType, currentMenuSelections, choicesViewMenu, url, paramUpkIsValid);
	// check if sub menu is applicable
	var choicesSubsMenu;
	if (className == "plants" ||
	    className == "plant_lists" ||
	    className == "plant_list_plants" ||
	    className == "plant_histories" ||
	    className == "plant_events" ||
	    className == "plant_families" ||
	    className == "plant_categories" ||
	    className == "plant_attributes" ||
	    className == "varieties" ||
	    className == "seed_packets" ||
	    className == "lands" ||
	    className == "beds" ||
	    className == "soil_areas") {
            currentMenuSelections.subs = className;
            choicesSubsMenu = ["plants", "plant_lists", "plant_list_plants", "plant_histories", "plant_events", "varieties", "seed_packets", "soil_areas", "beds", "lands", "plant_families", "plant_categories", "plant_attributes"];
	    menuType = "subs";
	    // view is on hold because it is under constructino
            manifest.subsMenu = menu.getMenu(menuType, currentMenuSelections, choicesSubsMenu, url, baseUrl, paramUpkIsValid);
	    menuType = "subs";
            manifest.subsMenu = menu.getMenu(menuType, currentMenuSelections, choicesSubsMenu, url, baseUrl, paramUpkIsValid);
	} else if (className == "domains" ||
	    className == "webpages" ||
	    className == "tenperdays" ||
	    className == "webpage_maxonomies" ||
	    className == "maxonomies") {
            currentMenuSelections.subs = className;
            choicesSubsMenu = ["domains", "webpages", "tenperdays", "webpage_maxonomies", "maxonomies"];
	    menuType = "subs";
            manifest.subsMenu = menu.getMenu(menuType, currentMenuSelections, choicesSubsMenu, url, baseUrl, paramUpkIsValid);
	} else if (className == "coins" ||
	    className == "tags") {
            currentMenuSelections.subs = className;
            choicesSubsMenu = ["coins", "tags"];
	    menuType = "subs";
            manifest.subsMenu = menu.getMenu(menuType, currentMenuSelections, choicesSubsMenu, url, baseUrl, paramUpkIsValid);
	} else if (className == "coin_prices" ||
		   className == "coin_indicators" ||
		   className == "coin_emas" ||
		   className == "coin_evaluations" ||
		   className == "coin_markets" ||
		   className == "coin_macds" ||
		   className == "coin_signals") {
            currentMenuSelections.subs = className;
            choicesSubsMenu = ["coins", "coin_prices", "coin_emas", "coin_indicators", "coin_evaluations", "coin_macds", "coin_signals", "coin_markets"];
	    menuType = "subs";
            manifest.subsMenu = menu.getMenu(menuType, currentMenuSelections, choicesSubsMenu, url, baseUrl, paramUpkIsValid);
	} else if (className == "addresses" ||
		   className == "delegations" ||
		   className == "providers" ||
		   className == "delegation_provders" ||
		   className == "stake_providers" ||
		   className == "deposits" ||
		   className == "stakes") {
            currentMenuSelections.subs = className;
            choicesSubsMenu = ["addresses", "delegations", "delegation_providers", "providers", "stakes", "stake_providers", "deposits"];
	    menuType = "subs";
            manifest.subsMenu = menu.getMenu(menuType, currentMenuSelections, choicesSubsMenu, url, baseUrl, paramUpkIsValid);
	}
	
        // strip first slash
        var pageNameSimple = pageName.substr(1);
        // strip file extention
        var shortLength = pageNameSimple.length - 5;
        var pageNameSimple = pageNameSimple.substr(0, shortLength);
        //debug("markup pageNameSimple =", pageNameSimple);
        if (pageNameSimple == "index") {
            pageNameSimple = "homepage";
        }
        // get headTitle
        if (special) {
            manifest.headTitle = this.getHeadTitle(pageNameSimple, manifest['site-name']);
        } else {
            var siteName = manifest['site-name'];
            manifest.headTitle = this.getHeadTitle(className, id, siteName);
	}
	// set up
        manifest['frb-home-href'] = manifest['home-href'] + "classes";
	// looks like a duplicate
        //var menuType = "sort";
        //var choicesSortMenu = ["id", "name", "sort", "status"];
        //manifest.sortMenu = menu.getMenu(menuType, currentMenuSelections, choicesSortMenu, url, paramUpkIsValid);
	// ON HOLD because it was showing up on every page (need only plants)
        // manifest the menu
        //menuType = "sort";
        //var choices = ["id", "name", "sort", "status", "subsystem", "extends", "notes", "rank", "botanical_name", "plant_family", "plant_category", "attribute_name"];
        //manifest.sortMenu = menu.getMenu(menuType, currentMenuSelections, choices, url, paramUpkIsValid);
	// deal with table-title and make into hyperlink
	//// only if on single page
	//if (typeof id !== 'undefined' && id !== "") {
	// each time
	var table_title = className;
	var table_title_as_url = this.getUrl(baseUrl, table_title);
	var table_title_as_hyperlink = "<a href=\"" + table_title_as_url + "\" class=\"table-title\">" + className + "</a>";
	if (paramView == "html") {
            manifest['table-title'] = table_title_as_hyperlink;
	} else if (paramView == "json") {
            manifest['table-title'] = table_title;
	}
	//}
        // for output
        manifest.suit = suitcase;
        Promise.all([dataSetPromise, classNameFilterNamePromise]).then(function (results) {
            debug("markup Promise.all()");
            var dataSet = results[0];
	    // test if empty
	    debug("markup Promise.all results[0] =", results[0]);
	    debug("markup Promise.all results[1] =", results[1]);
            var aDataSet = convertDataSet(dataSet, className, id, baseUrl, localBaseUrl, pageName, paramUpkIsValid, paramFilter);
            // process the data some before sending to template
            // sort field assumes that the id field is before it in sql query
            // the dataSet variable is created
            var table_title = className;
            var idOfclassNameFilter = id;
	    // comment out the following block due to problems with classNameFilter variable not being defined
            //if (classNameFilter) {
            //    table_title += " given " + classNameFilter + " = " + idOfclassNameFilter;
            //    manifest['table-title'] = table_title;
            //    //debug("markup table_title =", table_title);
            //}
            // dust
            // preprocess
            // put the id values into an array for the tag id
            var idArray = [];
            var z;
	    if (!special) {
	        for (z = 0; z < aDataSet.length; z++) {
                    if (aDataSet[z].id !== null) {
			// force to be one, hey, maybe the loop is not needed
			if (className == "plant_list_plants") {
			    debug("markup aDataSet[z].plant_list_plant_id =", aDataSet[z].plant_list_plant_id.chardata);
                            var theId = aDataSet[z].plant_list_plant_id.chardata;
                            idArray.unshift(theId);
                            debug("markup idArray.theId =", theId);
			} else {
			    // worked ok before
			    var theId = "";
			    if (typeof aDataSet[z].id !== 'undefined') {
				theId = aDataSet[z].id.raw;
			    }
			    // temporary replace of above
			    //var theId = aDataSet[z].id;
			    idArray.unshift(theId);
			    debug("markup idArray.theId =", theId);
			}
                    }
                }
            }
            //debug("markup idArray.length =", idArray.length);
            // dust
            var dust = require('dustjs-helpers');
            dust.config.whitespace = true;
            // define dust.helpers to be used during view loops
            if (!special) {
                var i = 0;
                var last_i = "";
                var last_j = "";
                dust.helpers.iterateNum = function (chunk, context, bodies, params) {
                    var num = params['on'];
                    var k = "zap";
                    i++;
                    last_j = "";
                    chunk = chunk.render(bodies.block, context.push({key: k, value: i}));
                    return chunk;
                }
                dust.helpers.iterateId = function (chunk, context, bodies, params) {
                    var num = params['on'];
                    var k = "id";
                    var j;
                    if (last_j === "") {
                        j = idArray.pop();
                        last_j = j;
                    } else {
                        j = last_j;
                    }
                    chunk = chunk.render(bodies.block, context.push({key: k, value: j}));
                    return chunk;
                }
            }
            dust.helpers.iterate = function (chunk, context, bodies, params) {
                params = params || {};
                var obj = params['on'] || context.current();
                for (var k in obj) {
                    chunk = chunk.render(bodies.block, context.push({key: k, value: obj[k]}));
                }
                return chunk;
            }
            dust.helpers.last = function (chunk, context, bodies) {
		var lastIndex = columnCount - 1;
		debug("markup helper lastIndex =", lastIndex);
		var thisIndex = columnNum - 1;
		columnNum++;
		debug("markup helper thisIndex =", thisIndex);
		if (thisIndex == lastIndex) {
		    // reset
		    thisIndex = 0;
		    return bodies.block(chunk, context);
		} else {
		    return bodies.else(chunk, context);
		}
            }
	    // more
            //debug("markup aDataSet prototype:", Object.getPrototypeOf(aDataSet));
            //debug('markup attempting markupDataSet(aDataSet)...');
            var aDataSetLength = aDataSet.length;
            debug("markup markupDataSet() aDataSet.length:", aDataSetLength);
            // num variables is used to number the rows of data
            manifest.num = aDataSetLength;
            // toggle value for the template logic so it shows data
            if (aDataSetLength) {
                // template logic solves conditional based on if key exists
                // data exists, so display a table (else a not-found message)
                manifest.dataExistsFlag = "1";
            }
	    // compile template
	    var dustFileName = "";
	    var dustFileCompiledName = "";
            if (special) {
                // special template
                manifest.specialFlag = "1";
		dustFileName = '../views/table-many.dust';
		if (pageName === "/search.html") {
                    dustFileName = '../views/table-special-search.dust';
                } else {
                    dustFileName = '../views/table-special.dust';
                }
		dustFileCompiledName = 'table-special';
            } else {
                if (id && (typeof classNameFilter === "undefined" || classNameFilter === "")) {
		    if (paramView == "html") {
			// single template
			manifest.singleFlag = "1";
			dustFileName = '../views/table-single.dust';
			dustFileCompiledName = 'table-single';
		    } else if (paramView == "json") {
			// single template
			manifest.singleFlag = "1";
			dustFileName = '../views/json-single.dust';
			dustFileCompiledName = 'json-single';
		    }
                } else {
		    if (paramView == "html") {
			// aggregate template
			manifest.manyFlag = "1";
			dustFileName = '../views/table-many.dust';
			dustFileCompiledName = 'table-many';
		    } else if (paramView == "json") {
			// aggregate template
			manifest.manyFlag = "1";
			dustFileName = '../views/json-many.dust';
			dustFileCompiledName = 'json-many';
		    }
                }
            }
	    var path = require('path');
            var file = path.join(__dirname, dustFileName);
	    var fs = require('fs');
            var srcTable = fs.readFileSync(file, 'utf8');
            var compiledTable = dust.compile(srcTable, dustFileCompiledName);
            dust.loadSource(compiledTable);
            // try to keep from assigning data to another variable
            manifest.data = aDataSet;
            // add styles to the base context
            // baseContext.push(styleContext);
            // ready to render
            if (res.headersSent) {
                debug('markup headers have been sent');
            } else {
                // all clear
		if (paramView == "html") {
		    // dust docs state to not compile on the server, too slow
		    var fs = require('fs');
		    var path = require('path');
		    var file = path.join(__dirname, '../views/standard.dust');
		    var src = fs.readFileSync(file, 'utf8');
		    var compiled = dust.compile(src, 'standard');
		    dust.loadSource(compiled);
		    // render
                    //debug("markup dust.render()")
                    dust.render('standard', manifest, function (error, out) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(out);
			if (error) {
                            var why = "markup dust.render() error =" + error;
                            throw why;
			}
                    });
		} else if (paramView == "json") {
                    debug("markup dust.render()")
                    debug("markup dust.render() paraView =", paramView)
		    // dust docs state to not compile on the server, too slow
		    var fs = require('fs');
		    var path = require('path');
		    var file = path.join(__dirname, '../views/standard-json.dust');
		    var src = fs.readFileSync(file, 'utf8');
		    var compiled = dust.compile(src, 'standard-json');
		    dust.loadSource(compiled);
		    // render
                    dust.render('standard-json', manifest, function (error, out) {
			res.writeHead(200, {'Content-Type': 'text/json'});
			res.end(out);
			if (error) {
                            var why = "markup dust.render() error =" + error;
                            throw why;
			}
                    });
		} else {
		    debug("markup error paramView not known.");
		}
            }
        }).catch(function (error) {
            var why = "markup markupDataSet(aDataSet) failed #1: error = " + error.stack;
            var freeradiantbunny = require("freeradiantbunny");
            freeradiantbunny.send404(res, why);
        })
    };
    // get url
    this.getUrl = function (baseUrl, className, classNameFilter) {
        var slash = '\\';
        var url = baseUrl + className;
        if (classNameFilter) {
          url += slash + classNameFilter;
        }
        return url;
    }
    // get title that is in html head
    this.getHeadTitle = function (stringOne, stringTwo = "", stringThree = "") {
        var headTitle = "";
        if (stringOne) {
            headTitle += stringOne;
            headTitle += " ";
        }
        if (stringTwo) {
            headTitle += stringTwo;
            headTitle += " ";
        }
        if (stringThree) {
            headTitle += stringThree;
        }
        return headTitle;
    }
    // get edit
    this.getWebPageEdit = function (res, suitcase, dataSetPromise, className, id) {
        debug("markup getWebPageEdit()");
        debug("markup className =", className);
        debug("markup id =", id);
        // data for webpage
        var freeradiantbunny = require("freeradiantbunny");
        var config = freeradiantbunny.getConfig();
        var manifest = config.getManifest(className);
        manifest['table-title'] = className.replace("_", " ");
        // should search form be displayed
        if (className === "hyperlinks") {
            manifest.searchFormFlag = "1";
        }
        // uncomment to show config on webpage
        //manifest.configFlag = "1";
        // prepare url variable for menues
        var menu = require('./menu.js');
        var url = this.getUrl(suitcase, className);
        if (id !== "") {
            // url
            url += "/" + id;
            // hyperlink back to all rows in database
	    // turn off
            //manifest.linkToAllExists = "1";
            manifest.linkToAllExists = "";
            //manifest.linkToAll = "<a href=\"./\">Display all " + className + "</a>";
        }
        // background the database so that all is ready to be markedup
        dataSetPromise.then(function (dataSet) {
            // dust
            // preprocess
            // put the id values into an array for the tag id
            var idArray = [];
            for (var z = 0; z < dataSet.length; z++) {
                if (dataSet[z].id !== null) {
		    if (typeof aDataSet[z].id.raw !== 'undefined') {
			var theId = dataSet[z].id.raw;
			idArray.unshift(theId);
			debug("markup idArray.theId =", theId);
		    } else {
			debug("markup error with raw property");
		    }
                }
            }
            debug("markup idArray.length =", idArray.length);
            var dust = require('dustjs-helpers');
            dust.config.whitespace = true;
            // define dust.helpers to be used during view loops
            var i = 0;
            var last_i = "";
            var last_j = "";
            dust.helpers.iterateNum = function (chunk, context, bodies, params) {
                var num = params['on'];
                var k = "zap";
                  i++;
                last_j = "";
                  chunk = chunk.render(bodies.block, context.push({key: k, value: i}));
                return chunk;
            }
            dust.helpers.iterateId = function (chunk, context, bodies, params) {
                var num = params['on'];
                var k = "id";
                if (last_j === "") {
                        j = idArray.pop();
                    last_j = j;
                } else {
                    j = last_j;
                }
                //debug("markup j =", j);
                  chunk = chunk.render(bodies.block, context.push({key: k, value: j}));
                return chunk;
            }
            dust.helpers.iterate = function (chunk, context, bodies, params) {
                params = params || {};
                var obj = params['on'] || context.current();
                for (var k in obj) {
                    chunk = chunk.render(bodies.block, context.push({key: k, value: obj[k]}));
                }
                return chunk;
            }
            // dust docs state to not compile on the server, too slow
            var fs = require('fs');
            var path = require('path');
            var file = path.join(__dirname, '../views/standard.dust');
            var src = fs.readFileSync(file, 'utf8');
            var compiled = dust.compile(src, 'standard');
            dust.loadSource(compiled);
            // more
            debug("markup dataSet prototype:", Object.getPrototypeOf(aDataSet));
            debug('markup attempting markupDataSet(aDataSet)...');
            var dataSetLength = aDataSet.length;
            suitcase['dataSetLength'] = aDataSet.length;
            debug("markup markupDataSet() aDataSet.length:", aDataSet.length);
            // num variables is used to number the rows of data
            manifest.num = dataSetLength;
            // toggle value for the template logic so it shows data
            if (dataSetLength) {
                // template logic solves conditional based on if key exists
                // data exists, so display a table (else a not-found message)
                manifest.dataExistsFlag = "1";
                debug("markup #4 dataExistsFlag =", manifest.dataExistsFlag);
            }
            // single template
            // template logic solves conditional based on if key exists
            // compile template
            manifest.tableSingleEditFlag = "1";
	    var file = path.join(__dirname, '../views/table-single-edit.dust');
	    var srcTable = fs.readFileSync(file, 'utf8');
	    var compiledTable = dust.compile(srcTable, 'table-single-edit');
	    dust.loadSource(compiledTable);
	    debug('markup table-single-edit');

            // request with id maps to table for single else table for many
            // try to keep from assigning data to another variable
            manifest.data = aDataSet;

            // add styles to the base context
            //baseContext.push(styleContext);

            // ready to render
            if (res.headersSent) {
                debug('markup headers have been sent');
            } else {
                // all clear
                dust.render('standard', manifest, function (err, out) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(out);
                });
            }
        }).catch(function (error) {
            var why = "markup markupDataSet(dataSet) failed #4: error = " + error;
            var freeradiantbunny = require("freeradiantbunny");
            freeradiantbunny.send404(res, why);

        })
    };
};

module.exports = new Markup();
