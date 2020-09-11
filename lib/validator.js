/**
 * Module validator.
 *
 * @public
 */

var debug = require('debug')('frb');

var instanceCount = 0;

var maxStringLength = 40;
var linkChecksCount = 0;

function Validator() {
    instanceCount = instanceCount + 1;
    console.log("validator instantiated", instanceCount);
    // used by server
    this.validateRequestPathName = function (userString) {
        // remove non-alphanumerical
        // in the regex below, the g means global for substituting all matches
        var validateString = userString.replace(/[^a-zA-Z0-9._\/\-]/g,'');
        if (validateString != userString) {
            console.log("validator input rejected, contains unwelcome characters");
            return "";
        }
        // do not allow .. (dotdot used in directory paths)
        var validateString = userString.replace(/[.][.]/g,'');
        if (validateString != userString) {
            console.log("validator input rejected, contains dotdot");
            return "";
        }
        // make sure it is not too long
        if (userString.length > this.maxStringLength) {
            console.log("validator input rejected, string too long", userString.length);
            return "";
        }
        return userString;
    }
    this.validate = function (userString) {
        // remove non-alphanumerical
        var validateString = userString.replace(/\W/g,'');
        if (validateString != userString) {
            return "";
        }
        // make sure it is not too long
        if (userString.length > this.maxStringLength) {
            console.log("validator input rejected because it is too long", userString.length);
            return "";
        }
        return userString;
    }
    // used by server
    this.isValidClassName = function (userString) {
        var validClassNames = ["albums",
                               "blogposts",
                               "books",
                               "categories",
                               "domains",
                               "hyperlinks",
                               "permaculture_topics",
                               "plant_categories",
                               "plant_families",
                               "plant_list_plants",
                               "plant_lists",
                               "plants",
                               "reasons",
                               "searches",
                               "songs",
                               "tags",
                               "usernames",
                               "webpages",
                               "zachmans"];
        if (validClassNames.includes(userString)) {
            debug("validator found valid className =", userString);
            return true;
        }
        return false;
    }
    this.validatePathName = function (userString) {
        // remove non-alphanumerical
        var result = userString.match(/^[\w\.]*$/);
        copsole("validator validatePathName() result =", result);
        if (result == null) {
            return "";
        }
        // make sure it is not too long
        if (userString.length > 18) {
            console.log("validator input rejected because it is too long");
            return "";
        }
        return userString;
    }
    // used by server
    this.validateId = function (userString) {
        // id should be a positive integer
        // here it check for just digits
        if (/^\d+$/.test(userString)) {
            return userString;
        } 
        return "";
    }
    this.OFFLINE_sanitize_user_input_as_keyword = function (user_input) {
        var x = "";
        user_input = strip_tags(user_input);
        user_input = stripcslashes(user_input);
        length = strlen(user_input);
        if (length < 50) {
            if (user_input == "alphabetical" ||
                user_input == "random") {
                x = user_input;
            }
        }
        return x;
    }
    this.OFFLINE_is_username_type = function (user_input) {
        var x = "";
        if (ctype_alpha(user_input)) {
            length = strlen(user_input);
            if (length < 20) {
                x = user_input;
            }
        }
        return x;
    }
    this.OFFLINE_sanitize_user_input_as_html = function (user_input) {
        // todo fix this function so that it is not offline
        var x = "";
        // todo read security books on sql injection
        // todo fix the regex so that it matches html
        //user_input = strip_tags(user_input);
        //user_input = stripcslashes(user_input);
        //user_input = preg_replace("/[^a-zA-Z0-9\.\/:_\- ]/", "", user_input);
        //length = strlen(user_input);
        //if (length < 400) {
        x = user_input;
        //}
        return x;
    }
    this.OFFLINE_is_short_alphanumeric = function (user_input) {
        var x = "";
        // note: the following is like a double-negative
        if (! preg_match("/[^a-zA-Z0-9_]/", user_input)) {
            length = strlen(user_input);
            if (length <= 50) {
                x = user_input;
            }
        }
        return x;
    }
    this.OFFLINE_sanitize_input_as_integer = function (user_input) {
        var x = ''; // default
        if (is_numeric(user_input)) {
            x = user_input;
        } else {
            this.get_db_dash().print_error("FRB error: not an integer.");
        }
        return x;
    }
    this.OFFLINE_is_tli = function (user_input) {
        // note variable name is set
        variable_name = "tli";
        // check if an tli (three letter identifier)
        // todo check from database
        if (strlen(user_input) == 3) {
            // debug
            //print "debug validator output is 3 char in length<br />\n";
            if (preg_match("/^[a-z]+/", user_input)) {
                // debug
                //print "debug validator output only alpha chars<br />\n";
                // ok
                return user_input;
            }
        }
        //markup += this.outputError("FRB error: parameter <strong>" + variable_name + "</strong> is not a valid three letter identifier.");
        return 0;
    }
    this.validateSort = function (userInput) {
        markup = "";
        var validSorts = [
            "date",
            "sort",
            "domain_name",
            "hosting",
            "drupal",
            "domain",
            "tli",
            "album",
            "name",
            "plant",
        ];
        // if valid, returns null string
        // set the valid values for sort
        for (var i = 0; i < validSorts.length; i++) {
            if (validSorts[i] == userInput) {
                return validSorts[i];
            }
        }
        markup += this.outputError("FRB error: sort parameter is not valid.");

        return markup;
    }
    this.validateCommand = function (userInput) {
        markup = "";
        var validCommands = [
            "edit"
        ];
        // if valid, returns null string
        // set the valid values
        for (var i = 0; i < validCommands.length; i++) {
            if (validCommands[i] == userInput) {
                return validCommands[i];
            }
        }
        markup += this.outputError("FRB error: command parameter is not valid.");

        return markup;
    }
    this.validateView = function (userInput) {
        markup = "";
        var validViews = [
            "html",
            "stream",
            "json",
        ];
        // if valid, returns null string
        // set the valid values for view
        for (var i = 0; i < validViews.length; i++) {
            if (validViews[i] == userInput) {
                return validViews[i];
            }
        }
        markup += this.outputError("FRB error: view parameter is not valid.");

        return markup;
    }
    this.OFFLINE_validate_as_domain_tli = function (user_input, variable_name) {
        markup = "";
        length = strlen(user_input);
        if (length == 3) {
            // valid
        } else {
            markup += this.outputError("FRB error: domain_tli <strong>" + variable_name + "</strong> is not valid.");
        }
        return markup;
    }
    this.OFFLINE_sanitize_linkmaster_input = function (user_input) {
        var x = "";
        user_input = strip_tags(user_input);
        user_input = stripcslashes(user_input);
        user_input = preg_replace("/[^a-zA-Z0-9s\.\/:_ \-\(\)\'\=\?&@%;#,~]/", "", user_input);
        // todo fix single quotes for sql statement
        user_input = preg_replace("/\'/", "\\\'", user_input);
        user_input = preg_replace("/\%/", "\\\%", user_input);
        length = strlen(user_input);
        if (length < 200) {
            x = user_input;
        }
        return x;
    }
    this.outputError = function (message, debug = "") {
        markup = "";
        // todo note there is a duplicate of this function in databasedashboard
        // todo this function should probably be moved to /lib/errors.php
        if (debug != null && debug == "off") {
            return markup;
        }
        markup += "<p class=\"error\">" + message + "</p>\n";
        return markup;
    }
    this.OFFLINE_validate_form_field = function (given_parameter, given_validation_type = "") {
        error_message = "";
        //print "debug validator validating " + given_validation_type + " " + _POST[given_parameter] + "<br />";
        // todo add validation code here
        if (given_validation_type == "") {
            // default is text
        } else if (given_validation_type == "date") {
            // string should be like this YYYY-MM-DD
            pattern = '/^[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/';
            match_count = preg_match(pattern, _POST[given_parameter], matches, PREG_OFFSET_CAPTURE);
            if (match_count == 0) {
                error_message = "Not a valid date. Please, use this format: YYYY-MM-DD.";
            }
        } else if (given_validation_type == "time_am_pm") {
            // string should be like this HH:MM mm
            pattern = '/^[0-1][0-9]:[0-5][0-9]\s[ap][m]/';
            match_count = preg_match(pattern, _POST[given_parameter], matches, PREG_OFFSET_CAPTURE);
            if (match_count == 0) {
                error_message = "Not a valid time. Here is an example of a valid date: 06:00 pm.";
            }
        } else if (given_validation_type == "text_not_null") {
            if (! _POST[given_parameter]) {
                error_message = "Not valid because the field has no text. Please, add text.";
            }
            sanitized = this.sanitize_user_input(_POST[given_parameter]);
            // see if they are different
            if (_POST[given_parameter] != sanitized) {
                error_message = "Not valid because the text is not valid. Please, add alphanumeric text.";
            }
        } else if (given_validation_type == "text") {
            sanitized = this.sanitize_user_input(_POST[given_parameter]);
            // see if they are different
            if (_POST[given_parameter] != sanitized) {
                error_message = "Not valid because the text is not valid. Please, add alphanumeric text.";
            }
        } else if (given_validation_type == "html") {
            sanitized = this.sanitize_user_input_as_html(_POST[given_parameter]);
            // see if they are different
            if (_POST[given_parameter] != sanitized) {
                error_message = "Not valid because the text is not valid. Please, add alphanumeric text.";
            }
        } else if (given_validation_type == "id") {
            if (! is_numeric(_POST[given_parameter])) {
                error_message = "Not valid because the field has no text. Please, add text.";
            }
            sanitized = this.validate_user_input_alphanumeric(_POST[given_parameter]);
            // see if they are different
            if (_POST[given_parameter] != sanitized) {
                error_message = "Not valid because it is not an integer. Please, add an integer.";
            }
        } else if (given_validation_type == "currency") {
            if (! is_numeric(_POST[given_parameter])) {
                error_message = "Not valid because the field is not a number. Please, input a number to represent the price.";
            }
        } else if (given_validation_type == "number") {
            if (! is_numeric(_POST[given_parameter])) {
                error_message = "Not valid because it is not a number. Please, input a number.";
            }
        } else if (given_validation_type == "url") {
            // string should be like this HH:MM mm
            pattern = '/^http/';
            match_count = preg_match(pattern, _POST[given_parameter], matches, PREG_OFFSET_CAPTURE);
            if (match_count == 0) {
                error_message = "Not valid because this is not a URL. Please, add an URL.";
            }
            sanitized = this.sanitize_user_input(_POST[given_parameter]);
            // see if they are different
            if (_POST[given_parameter] != sanitized) {
                error_message = "Not valid because the text is not a URL. Please, input a URL. Starts with http://.";
            }
        } else {
            error_message = "FRB error: validating-type is not known. given_validation_type";
        }
        return error_message;
    }
    this.OFFLINE_extract_class_name = function (config) {
        // bail
        // if the user inputs something that is not valid, the system bails
        // when the system bails, it skips over processes
        // determine user's intensions
        // start by figuring out which class_name the user is using
        // so, determine if there is a class defined
        // this can be done by checking the parameters
        // note that the .htaccess file changes REST urls to url parameters
        // class_name
        class_name = "";
        // did the user supply a class_name?
        if (isset(_GET['class_name'])) {
            // filter 1 
            if (config.get_debug()) {
                // debug
                //print "debug validator _GET class_name is set<br />\n";
            }
            if (this.is_short_alphanumeric(_GET['class_name'])) {
                // filter 2
                if (config.get_debug()) {
                    // debug
                    //print "debug validator _GET class_name is_short_alphanumerica<br />\n";
                }
                if (this.is_known_class(_GET['class_name'], config)) {
                    // ok
                    class_name = this.is_known_class(_GET['class_name'], config);
                    if (config.get_debug()) {
                        // debug
                        //print "debug validator class_name = " + class_name + "<br />\n";
                    }
                    return class_name;
                } else {
                    // error
                    ////print "FRB validator error: not a known class_name: " + _GET['class_name'] + "<br />\n";
                    // because the user's input is not valid the system should bail
                    return 0;
                }
            } else {
                // error
                //print "FRB error: not a valid class_name.<br />\n";
                // because the user's input is not valid the system should bail
                return 0;
            }
        }
    }
    this.OFFLINE_output_freeradiantbunny = function (config, class_name) {
        // debug
        if (config.get_debug()) {
            //print "debug validator output_freeradiantbunny()<br />\n";
        }
        if (! class_name) {
            // todo should the message be sent?
            // frb message
            //print "<p>FRB message: class_name is unknown.</p>";
            // todo is this the correct place to output metadata
            if (config) {
                // todo add the url function to the href below
                // frb message
                //print "<p>FRB message: config says that default_database_name is <a href=\"\">" + config.get_default_database_name() + "</a>.</p>";
            }
            return "";
        }
        // request_url
        request_uri = _SERVER['REQUEST_URI'];
        // factory object
        include_once("factory.php");
        factory = new Factory(config);
        obj = factory.get_object_given_class_name(class_name, request_uri);
        if (! obj) {
            //print "FRB error: no obj based on class_name.";
            return "";
        }
        bail = 0;
        // specifier
        specifier = "";
        // determine user's intensions
        // figure out if the user has specifier and which one it is
        // what a specifier does is to create a subclass of the class_name
        // so, determine if there is a specifier defined
        // this can be done by checking the parameters
        // note that the .htaccess file changes REST urls to url parameters
        // is the specifier set
        if (isset(_GET['specifier'])) {
            // filter 1
            if (this.is_short_alphanumeric(_GET['specifier'])){
                // filter 2
                if (this.is_known_specifier(_GET['specifier'], config) || (class_name == "usernames" && this.is_username_type(_GET['specifier'], config))) {
                    // ok
                    specifier = _GET['specifier'];
                    if (config.get_debug()) {
                        // debug
                        //print "debug validator specifier = " + specifier + "<br />\n";
                    } 
                } else {
                    // debug
                    //print "debug validator: specifier = " + _GET['specifier'] + "<br />\n";
                    // debug
                    //print "debug validator: user input a specifier that was not known<br />\n";
                    // because the user's input is not valid the system should bail
                    bail = true;
                }
            } else {
                // debug
                //print "debug validator user input a specifier that was not valid<br />\n";
                // because the user's input is not valid the system should bail
                bail = true;
            }
        }
        // third_seat
        third_seat = "";
        if (! bail && specifier) {
            // only check for third_seat if there is a specifier (aka second_seat)
            // about the third_seat
            // the third_seat is the specifier of the specifier
            // for example ...
            // ... the class_name goal_statements has a subset of project
            // ... the third_seat specifies which projcet id of the subset is
            // is the third_seat set?
            if (isset(_GET['third_seat'])) {
                // filter 1
                if (this.is_short_alphanumeric(_GET['third_seat'])) {
                    // filter 2
                    if (this.is_known_third_seat(_GET['third_seat'], config)) {
                        // so, assign the third_seat
                        third_seat = this.is_known_third_seat(_GET['third_seat'], config);
                        if (config.get_debug()) {
                            // debug
                            //print "debug validator third_seat = " + third_seat + "<br />\n";
                        }
                    } else {
                        // debug
                        //print "debug validator user input a third_seat that was not known<br />\n";
                        // because the user's input is not valid the system should bail
                        bail = true;
                    }
                } else {
                    // debug
                    //print "debug validator user input a third_seat that was not valid<br />\n";
                    // because the user's input is not valid the system should bail
                    bail = true;
                }
            }
        }
        // output markup
        if (! bail) {
            // deal with specifier
            obj.set_given_variables(class_name, specifier, third_seat, this);
            // markup
            //print obj.get_markup();
        } else {
            if (config.get_debug()) {
                // debug
                //print "debug validator bailing before output<br />\n";
            }
        }
    }
    this.OFFLINE_is_known_specifier = function (untrusted_string, config) {
        specifier = "";
        // check if specifier is an interger
        if (is_numeric(untrusted_string)) {
            // ok
            specifier = untrusted_string;
            if (config.get_debug()) {
                // debug
                //print "debug validator specifier type is numeric = " + specifier + "<br />\n";
            }
        } else if (this.is_known_class(untrusted_string, config)) {
            // ok
            specifier = this.is_known_class(untrusted_string, config);
            if (config.get_debug()) {
                // debug
                //print "debug validator specifier resolved as scoping_class_name = " + specifier + "<br />\n";
            }
        } else if (this.is_tli(untrusted_string, config)) {
            // ok
            specifier = this.is_tli(untrusted_string, config);
            // specifier have 3 letters
            if (config.get_debug()) {
                // debug
                //print "debug validator specifier resolved as tli = " + specifier + "<br />\n";
            }
        }
        return specifier;
    }
    this.OFFLINE_is_known_third_seat = function (untrusted_string, config) {
        if (is_numeric(untrusted_string)) {
            third_seat = untrusted_string;
            // debug
            if (config.get_debug()) {
                //print "debug validator third_seat is numeric.<br />\n";
            }
            return third_seat;
        } else {
            // third_seat still not resolved, so keep trying
            // does the third_seat have 3 letters
            variable_name = "tli";
            if (! this.validate_id(untrusted_string, variable_name)) {
                obj.set_given_domain_tli(third_seat);
                debug = 0;
                if (debug) {
                    // debug
                    //print "debug validator third_seat resolved as given_domain_tli = " + obj.get_given_domain_tli() + "<br />\n";
                }
            } else {
                debug = 0;
                if (debug) {
                    // debug
                    //print "debug validator third_seat not valiated tli = " + third_seat. "<br />\n";
                }
            }
        }
    }
    this.OFFLINE_output_id_and_name = function (config, class_name) {
        markup = "";
        // get speicifier
        // note that this does not figure out all of the URL
        specifier = "";
        // is the specifier set
        if (isset(_GET['specifier'])) {
            // filter 1
            if (this.is_short_alphanumeric(_GET['specifier'])){
                // filter 2
                if (this.is_known_specifier(_GET['specifier'], config) || (class_name == "usernames" && this.is_username_type(_GET['specifier'], config))) {
                    // ok
                    specifier = _GET['specifier'];
                    if (config.get_debug()) {
                        // debug
                        //print "debug validator specifier = " + specifier + "<br />\n";
                    } 
                }
            }
        }
        // output
        if (specifier) {
            markup += specifier;
        } else {
            // debug
            ////print "debug validator: missing specifier = " + specifier + "<br />\n";
        }
        // todo code this so that it gets the name of the obj
        return markup;
    }
    // used by realtime
    this.getValidHtml = function (givenUrl) {
        console.log("validator getValidHtml() url =", givenUrl);
        var promise = new Promise(function(resolve, reject) {
            var url = require('url');
            var myUrl;
            try {
                myUrl = new URL(givenUrl);
            } catch (error) {
                var why = "validator error URL() givenUrl = " + givenUrl;
                console.log("", why);
                reject(why);
		return "";
            }
            var hoststring = myUrl.host;
            var pathstring = givenUrl.toString().substring(32);
            console.log("validator host =", hoststring);
            console.log("validator path =", pathstring);        
            const htmlValidator = require('html-validator');
            // be slow
            console.log("validator setTimeout()");
            var options = {
                url: givenUrl,
                format: 'text'
            };
            setTimeout( function() {
                htmlValidator(options)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.log("validator getValidhtml() error ", error);
                    });
            }, 2000);
        });
        return promise;
    }
    // used by realtime
    this.getLinkCheck = function (givenUrl) {
        console.log("validator getLinkCheck() url =", givenUrl);
        var promise = new Promise(function(resolve, reject) {
	    var linkChecksNum = linkChecksCount + 1;
	    linkChecksCount = linkChecksNum;
	    var linkCount = 0;
	    var brokenLinkCount = 0;
	    var brokenLinks = [];
            var url = require('url');
            var myUrl = new URL(givenUrl);
            var href = myUrl.href;
            //console.log("validator href =", href);
            var blc;
            blc = require('broken-link-checker');
            // be slow
            //console.log("validator setTimeout()");
            setTimeout( function() {
	        var options = {
                    rateLimit: 3000,
		    filterLevel: 0,
		    userAgent: 'broken-link-checker/0.7.0 (OS X El Capitan; x64)'
		};
		// scans the HTML content at each queued URL to find broken links.
		var htmlUrlChecker = new blc.HtmlUrlChecker(options, {
		    html: function(tree, robots, response, pageUrl, customData){
			//console.log("link tree =", tree);
			console.log("link pageUrl =", pageUrl);
			//console.log("link response =", response);
		    },
		    junk: function(result, customData){
			console.log("junk result");
			if (result.excluded) {
			    console.log("junk() result.excluded =", result.excluded);
			}
		    },
		    link: function(result, customData){
			linkCount = linkCount + 1;
		    	if (result.broken) {
			    brokenLinkCount = brokenLinkCount + 1;
			    console.log("link() " + linkChecksNum + "-" + linkCount + " broken " + result.brokenReason + " " + result.url.resolved);
			    brokenLinks.push(result.url.resolved);
			} else {
			    console.log("link() " + linkChecksNum + "-" + linkCount + " ok " + result.url.resolved);
			}
		    },
		    page: function(error, pageUrl, customData){
			//console.log("page() error =", error);
			//console.log("page() pageUrl =", pageUrl);
		    },
		    end: function(){
			console.log("end()");
			if (brokenLinkCount === 0) {
			    if (linkCount !== 0) {
				if (linkCount === 1) {
				    resolve(linkCount + " link found: all ok");
				} else {
				    resolve(linkCount + " links found: all ok");
				}
			    } else {
				resolve("no links found");
                            }
			} else {
			    var brokenLinksString = "";
			    var i;
			    for (i = 0; i < brokenLinks.length; i++) {
				brokenLinksString = brokenLinksString + brokenLinks[i] + ", ";
			    }
			    resolve("brokenLinkCount=" + brokenLinkCount + " " + brokenLinksString);
			}
		    }
		});
		htmlUrlChecker.enqueue(href);
            }, 1000);
        });
        return promise;
    }
    // used by server
    this.validateQueryTerm = function (userString) {
        //console.log("validator userString =", userString);
        // remove non-alphanumerical but not spaces
        var validateString = userString.replace(/[^a-zA-Z0-9 ]/g,'');
        //console.log("validator validateString =", validateString);
        if (validateString != userString) {
            return "";
        }
        // make sure it is not too long
        if (userString.length > 22) {
            console.log("validator input rejected because it is too long", userString.length);
            return "";
        }
        // remove stop words
        userString = this.filterOutStopWords(userString);
        return userString;
    }
    this.filterOutStopWords = function (givenString) {
        var givenStringArray = givenString.split(" ");
        // filter for stop terms
        var stopWords = ["a","about","after","again","all","almost","already","also","although","always","am","among","amongst","amoungst","an","and","any","anyhow","anyone","anything","anyway","anywhere","are","as","at","be","became","become","becomes","becoming","been","being","beside","besides","between","beyond","bill","both","bottom","but","by","call","can","cannot","cant","co","con","could","couldnt","de","do","done","due","during","each","eg","either","else","elsewhere","enough","etc","even","ever","every","everyone","everything","everywhere","except","few","fify","for","from","full","further","get","give","go","had","has","hasnt","have","he","hence","her","here","hereafter","hereby","herein","hereupon","hers","herself","him","himself","his","how","however","ie","if","in","inc","indeed","interest","into","is","it","its","itself","keep","last","latter","latterly","least","less","ltd","made","many","may","me","meanwhile","might","mill","mine","more","moreover","most","mostly","move","much","must","my","myself","namely","neither","never","nevertheless","next","no","nobody","none","noone","nor","not","nothing","now","nowhere","of","off","often","on","once","one","only","onto","or","other","others","otherwise","our","ours","ourselves","out","over","own","part","per","perhaps","please","put","rather","re","same","see","seem","seemed","seeming","seems","serious","several","she","should","show","since","sincere","so","some","somehow","someone","something","sometime","sometimes","somewhere","still","such","take","than","that","the","their","them","themselves","then","thence","there","thereafter","thereby","therefore","therein","thereupon","these","they","thin","third","this","those","though","three","through","throughout","thru","thus","to","together","too","top","toward","towards","un","under","until","up","upon","us","very","via","was","we","well","were","what","whatever","when","whence","whenever","where","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","whoever","whole","whom","whose","why","will","with","within","without","would","yet","you","your","yours","yourself","yourselves"];
        var filteredArray = [];
        for (var i = 0; i < givenStringArray.length; i++) {
            var givenWord = givenStringArray[i];
            if (stopWords.indexOf(givenWord) != - 1) {
                // ignore
            } else {
                // ok
                filteredArray.push(givenWord);
            }
        }
        var filteredString = filteredArray.join(" ");
        return filteredString;
    }
};

module.exports = new Validator();

