/**
 * Module markup.
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

var convertDataSet = function (dataSet, className, id, baseUrl, localBaseUrl, pageName) {
    var aDataSet = [];
    var moulder = require('./moulder.js');
    var i;
    for (i = 0; i < dataSet.length; i++) {
        var row = dataSet[i];
        var aRow = [];
        var extends_class_id = "";
        // get the id so that other columns can be processed
        var aId = "";
        var columnName;
        for(columnName in row) {
            if (columnName === "id") {
                aId = row[columnName];
                break;
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
                params = myMenu.getParams("sort", columnName, currentMenuSelections);
                columnNameAsLinkOrNot = columnName;
            }
            // data assigned
            aRow[columnNameAsLinkOrNot] = moulder.get(columnName, row[columnName], className, id, baseUrl, localBaseUrl, extends_class_id, id, pageName, aId);
            //debug("database aRow =", aRow[columnNameAsLinkOrNot]);
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
    this.getWebPage = function (res, suitcase, dataSetPromise, className, classNameFilter, id, paramSort, paramView, io, pageName, classNameFilterNamePromise, special) {
        debug("markup getWebPage()");
        debug("markup className =", className);
        debug("markup pageName =", pageName);

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
        if (!special && className === "webpages") {
            manifest.socketioFlag = "1";
        }

        // prepare url variable for menues
        var menu = require('./menu.js');
        var url = this.getUrl(baseUrl, className, classNameFilter);
        if (id !== "") {
            // url
            url += "/" + id;
            // hyperlink back to all rows in database
            manifest.linkToAllExists = "1";
            //manifest.linkToAll = "<a href=\"./\">Display all " + className + "</a>";
        }

        // create menu for view
        var currentMenuSelections = [];
        currentMenuSelections.view = paramView;
        currentMenuSelections.sort = paramSort;
        //var choicesViewMenu = ["html", "json", "stream", "postgres", "meta"];
        var choicesViewMenu = ["html", "stream"];
        var menuType = "view";

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

	// turned off menu
        //manifest.viewMenu = menu.getMenu(menuType, currentMenuSelections, choicesViewMenu, url);
        //var menuType = "sort";
        //var choicesSortMenu = ["id", "name", "sort", "status"];
        //manifest.sortMenu = menu.getMenu(menuType, currentMenuSelections, choicesSortMenu, url);
        // create menu for 
        //menuType = "sort";
        //choices = ["name", "sort", "status", "subsystem", "extends", "notes", "rank"];
        //manifest.sortMenu = menu.getMenu(menuType, currentMenuSelections, choices, url);

        // for output
        manifest.suit = suitcase;

        Promise.all([dataSetPromise, classNameFilterNamePromise]).then(function (results) {
            debug("markup Promise.all()");
            var dataSet = results[0];
            var aDataSet = convertDataSet(dataSet, className, id, baseUrl, localBaseUrl, pageName);
            // process the data some before sending to template
            // sort field assumes that the id field is before it in sql query
            // the dataSet variable is created
            var table_title = className;
            var table_title_name = results[1];
            if (classNameFilter) {
                table_title += " given " + classNameFilter + " = " + table_title_name;
                manifest['table-title'] = table_title;
                //debug("markup table_title =", table_title);
            }

            // dust
            // preprocess
            // put the id values into an array for the tag id
            var idArray = [];
            var z;
	    if (!special) {
	        for (z = 0; z < aDataSet.length; z++) {
                    if (aDataSet[z].id !== null) {
                        var theId = aDataSet[z].id.raw;
                        idArray.unshift(theId);
                        //debug("markup idArray.theId =", theId);
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

            // dust docs state to not compile on the server, too slow
            var fs = require('fs');
            var path = require('path');
            var file = path.join(__dirname, '../views/standard.dust');
            var src = fs.readFileSync(file, 'utf8');
            var compiled = dust.compile(src, 'standard');
            dust.loadSource(compiled);

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
                if (id && classNameFilter === "") {
                    // single template
                    manifest.singleFlag = "1";
		    dustFileName = '../views/table-single.dust';
		    dustFileCompiledName = 'table-single';
                } else {
	            // aggregate template
                    manifest.manyFlag = "1";
		    dustFileName = '../views/table-many.dust';
		    dustFileCompiledName = 'table-many';
                }
            }
            var file = path.join(__dirname, dustFileName);
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
                //debug("markup dust.render()")
                dust.render('standard', manifest, function (error, out) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(out);
                    if (error) {
                        var why = "markup dust.render() error =" + error;
                        throw why;
                    }
                });
            }
        }).catch(function (error) {
            var why = "markup markupDataSet(aDataSet) failed #1: error = " + error;
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
            manifest.linkToAllExists = "1";
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
                    var theId = dataSet[z].id.raw;
                    idArray.unshift(theId);
                    debug("markup idArray.theId =", theId);
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
