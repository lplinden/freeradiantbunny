/**
 * Module Moulder.
 * version 2.0.2
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
    // get data from one row cell for another (later) row cell
    var plant_list_id;
    var plant_list_plant_id;
    var plant_history_id;
    var plant_id;
    var land_id;
    var bed_id;
    var supplier_id;
    var theId
    var seed_packet_id;
    // flag variables
    var rowFlag = 0;
    this.get = function(columnName, value, className, id, baseUrl, localBaseUrl, extends_class_id, idOrNotId, pageName, aId, paramUpkIsValid, paramFilter) {
        debug("moulder given className =", className);
        debug("moulder given columnName =", columnName);
        var styles = "";
        if (columnName === "id") {
	    if (className == "plant_histories") {
		plant_history_id = value;
	    }
	    if (className == "lands") {
		land_id = value;
	    }
	    if (className == "beds") {
		bed_id = value;
	    }
	    if (className == "suppliers") {
		supplier_id = value;
	    }
	    if (className == "plant_events") {
		theId = value;
	    }
	    if (className == "seed_packets") {
		seed_packet_id = value;
	    }
	    if (className == "plant_lists") {
		plant_list_id = value;
	    }
	    if (className == "moneymaker_measurement_instances") {
		// for paramView == "json"
		// no link
		var chardata = value;
		return this.getStyledData("", chardata, value, styles);
	    }
            var chardata = this.getIdAsUrl(baseUrl, className, value, value, paramUpkIsValid);
            return this.getStyledData("", chardata, value, styles);
        } else if (columnName === "id_url") {
            var chardata = this.getIdAsUrl(baseUrl, className, value, value, paramUpkIsValid);
            return this.getStyledData("", chardata, value, styles);
	} else if (columnName === "last_updated") {
	    styles = "white-space: nowrap;";
	    return this.getStyledData("", value, value, styles);
	} else if (columnName === "profit_or_loss") {
	    if (value) {
		if (value > 0) {
		    styles += "background-color: #64e390;";
		} else {
		    styles = "background-color: #ff9999;";
		}
	    }
	    return this.getStyledData("", value, value, styles);
        } else if (columnName.slice(0, 10) == "associated" && columnName != "associated polymorphic") {
            debug("moulder given className.slice(0, 11) =", columnName.slice(0, 11));
	    debug("moulder given value ", value);
	    var associatedListMarkup = "<ul>";
	    // turn the value into a html list
	    for (let i = 0; i < value.length; i++) {
		associatedListMarkup += "<li>";
		associatedListMarkup += value[i];
		associatedListMarkup += "</li>";
	    }
	    associatedListMarkup += "</ul>";
	    var chardata = associatedListMarkup;
	    return this.getStyledData("", chardata, value, styles);

	} else if (columnName.slice(0, 10) == "reasons") {
	    debug("moulder given value ", value);
	    var reasonsListMarkup = "<ul>";
	    // turn the value into a html list
	    // remove semicolon at the end so that it is not made into a list item
	    var reason_string = value.slice(0, -1);
	    var reasons = reason_string.split(';');
	    for (let i = 0; i < reasons.length; i++) {
		reasonsListMarkup += "<li>";
		reasonsListMarkup += reasons[i];
		reasonsListMarkup += "</li>";
	    }
	    reasonsListMarkup += "</ul>";
	    var chardata = reasonsListMarkup;
	    return this.getStyledData("", chardata, value, styles);
	    
	} else if (columnName === "statuscode") {
            var chardata = this.getIdAsUrl(baseUrl, className, value, value, paramUpkIsValid);
            return this.getStyledData("", chardata, value, styles);
	    
        } else if (columnName === "validhtml") {
            var chardata = this.getIdAsUrl(baseUrl, className, value, value, paramUpkIsValid)
            return this.getStyledData("", chardata, value, styles);

        } else if (columnName === "tli") {
	    styles = "text-align: center;";
	    return this.getStyledData("", value, value, styles);
	    
	} else if (columnName === "ex_ct") {
	    styles = "text-align: center;";
	    return this.getStyledData("", value, value, styles);

	} else if (columnName.slice(0,14) == "units") {
	    styles += "text-align: right;";
	    return this.getStyledData("", value, value, styles);
	} else if (columnName.slice(0,7) == "perc_ch" ||
		   columnName == "vol_ch_24h") {
	    // columns from the coin_prices table
	    if (value > 0) {
		// determine shade of green
		if (value > 20) {
		    // 20% green (darker)
		    styles += "text-align: right; background-color: #006600; color: yellow;";
		} else if(value > 15) {
		    // 40% green
		    styles += "text-align: right; background-color: #00CC00;";
		} else if(value > 10) {
		    // 50% green
		    styles += "text-align: right; background-color: #00FF00;";
		} else if(value > 5) {
		    // 70% green
		    styles += "text-align: right; background-color: #66FF66;";
		} else {
		    // 90% green (lighter)
		    styles += "text-align: right; background-color: #CCFFCC;";
		}
	    } else if (value < 0) {
		// light red
		styles = "text-align: right; background-color: #ff9999;";
	    } else {
		// grey
		styles = "text-align: right; background-color: #efefef;";
	    }
	    return this.getStyledData("", value, value, styles);
	} else if (columnName == "trades_balance" ||
	    	   columnName == "trades_comp") {
	    styles += "font-family: monospace;";
	    return this.getStyledData("", value, value, styles);
	} else if (columnName.slice(0,14) == "run") {
	    // columns from the coin_prices table
	    if (value > 0) {
		// 40% green
		styles += "text-align: right; background-color: #00CC00; text-align: center;";
	    }
	    return this.getStyledData("", value, value, styles);
	} else if (columnName.slice(0,14) == "big") {
	    // columns from the coin_prices table
	    if (value > 0) {
		// 40% green
		styles += "text-align: right; background-color: #00CC00; text-align: center;";
	    }
	    return this.getStyledData("", value, value, styles);
	} else if (columnName.slice(0,14) == "vlf") {
	    // columns from the coin_prices table
	    if (value > 0) {
		// 40% green
		styles += "text-align: right; background-color: #00CC00; text-align: center;";
	    }
	    return this.getStyledData("", value, value, styles);
	} else if (columnName === "sig_lvl" ||
		   columnName === "recent" ||
		   columnName === "recent_previous" ||
		   columnName === "change_percent" ||
		   columnName === "chg_prev_percent" ||
		   columnName === "trigger" ||
		   columnName === "acc" ||
		   columnName === "acc_prev" ||
		   columnName === "acc_chg" ||
		   columnName === "acc_chg_note") {
	    styles = "text-align: right; font-family: monospace; font-size: 135%;";
	    // colorize acc_ch column
            if (columnName === "acc_chg_note") {
		styles = "font-size: 135%;";
		if (value == "stepping gas") {
		    // light-green
		    styles += "background-color: #64e390;";
    		} else if (value == "brakes to gas") {
		    // very light pale green
		    styles += "background-color: #eef6c5;";
		} else if (value == "less brakes") {
		    // yellow with some red
		    styles += "background-color: #f6d4c5;";
		}
		// debug
		//value = position + " " + value.substring(position);
	    } else {
		// color negative values so they appear on a red background
		styles = "text-align: right; font-family: monospace; font-size: 145%;";
		if (value < 0) {
		    // red
		    styles += "background-color: #CD5555;";
		}
	    }
	    return this.getStyledData("", value, value, styles);
	} else if (columnName === "ticker") {
	    styles = "text-align: center; font-family: monospace; font-size: 200%;";
	    return this.getStyledData("", value, value, styles);
	    
        } else if (columnName === "variety_id") {
	    var  anotherClassName = "varieties";
            var chardata = this.getIdAsUrl(baseUrl, anotherClassName, value, value, paramUpkIsValid)
            return this.getStyledData("", chardata, value, styles);

        } else if (columnName === "plants_count") {
	    // goes to another table
	    if (className == "plant_lists") {
		var anotherClassName = "plant_list_plants/plant_lists";
		id = plant_list_id;
		var chardata = this.getIdAsUrl(baseUrl, anotherClassName, id, value, paramUpkIsValid)
	    } else {
		var anotherClassName = "plant_lists";
		id = plant_list_id;
		var chardata = this.getIdAsUrl(baseUrl, anotherClassName, id, value, paramUpkIsValid);
	    }
            return this.getStyledData("", chardata, value, styles);

        } else if (columnName === "supplier_id") {
	    if (className == "scene_elements") {
		// skip
	    } else {
		var  anotherClassName = "suppliers";
		var chardata = this.getIdAsUrl(baseUrl, anotherClassName, value, value, paramUpkIsValid)
		return this.getStyledData("", chardata, value, styles);
	    }

        } else if (columnName === "plant_list_plant_id") {
	    // get data for a later column
	    if (className == "plant_list_plants") {
		plant_list_plant_id = value;
	    }
	    if (className == "plant_histories") {
		var anotherClassName = "plant_list_plants";
		className = anotherClassName;
	    }
            var chardata = this.getIdAsUrl(baseUrl, className, value, value, paramUpkIsValid)
            return this.getStyledData("", chardata, value, styles);
	    	    
        } else if (columnName === "soil_area_id") {
	    // get data for a later column
	    if (className == "plant_events") {
		var anotherClassName = "soil_areas";
		className = anotherClassName;
		var chardata = this.getIdAsUrl(baseUrl, className, value, value, paramUpkIsValid)
		return this.getStyledData("", chardata, value, styles);
	    }
	    
        } else if (columnName === "plant_history_id") {
	    // get data for a later column
	    if (className == "plant_events") {
		var anotherClassName = "plant_histories";
		className = anotherClassName;
		var chardata = this.getIdAsUrl(baseUrl, className, value, value, paramUpkIsValid)
		return this.getStyledData("", chardata, value, styles);
	    }
	    
        } else if (columnName === "botanical_name") {
	    // red
	    styles = "font-style: italic;";
	    return this.getStyledData("", value, value, styles);

        } else if (columnName === "plant_id") {
	    plant_id = value;
	    var anotherClassName = "plants";
            var chardata = this.getIdAsUrl(baseUrl, anotherClassName, value, value, paramUpkIsValid)
            return this.getStyledData("", chardata, value, styles);
	    
        } else if (columnName === "url" ||
		   columnName === "development") {
	    // change from column name to actual url
	    //var simplerText = "url";
	    // only markup if not null
	    //var chardata = simplerText;
	    var chardata = value;
	    if (!value) {
		// return empty string (rather than null)'s null
		chardata = "no-value";
	    } else {
		// add link to text
		var firstFourChars = value.substring(0,4);
		if (firstFourChars === "http") {
		    chardata = this.getAsUrl(value, chardata)
		} else {
		    chardata = value;
		}
	    }
	    return this.getStyledData("", chardata, value, styles);
	    
        } else if (columnName === "plant_histories_count") {
	    if (value != "0") {
		if (className === "plant_list_plants") {
		    // associative table
		    className = "plant_histories/plant_list_plants";
	            chardata = value;
		    // should be plant_list_plant_id
		    id = plant_list_plant_id;
		    var chardata = this.getIdAsUrl(baseUrl, className, id, chardata, paramUpkIsValid)
		    return this.getStyledData("", chardata, value, styles);
		} else if (className === "seed_packets") {

		    // associative table
		    className = "plant_histories/seed_packets";
	            chardata = value;
		    // should be seed_packet_id
		    id = seed_packet_id;
		    var chardata = this.getIdAsUrl(baseUrl, className, id, chardata, paramUpkIsValid)
		    return this.getStyledData("", chardata, value, styles);
		}
	    } else {
		// colorize
		// red
		styles = "background-color: #CD5555;";
		return this.getStyledData("", value, value, styles);
	    }
        } else if (columnName === "name") {
	    if (className === "classes") {
		var valuePrefix = value.substring(0, 4);
		if (valuePrefix === "lib/") {
		    // grey
		    styles = "background-color: #CCCCCC;";
		    return this.getStyledData("", value, value, styles);
		} else {
		    // crop out first four characters
		    // make meta
		    className = value;
		    id = "";
		    valueAsLink = this.getAsLink(value, baseUrl, className, id);
		    // light-green
		    styles = "background-color: #64e390;";
		    return this.getStyledData("", valueAsLink, valueAsLink, styles);
		}
	    }
	} else if (columnName === "lookup") {
	    if (value === "true" || value === "t") {
		// signal on
		styles = "text-align: center; background-color: #CCFFCE;";
		return this.getStyledData("", value, value, styles);
	    } else {
		// grey for nuetral
		styles = "text-align: center; background-color: #CCCCCC;";
		return this.getStyledData("", value, value, styles);
	    }
	} else if (columnName === "scrubber_flag") {
	    if (value === true) {
		// signal on
		styles = "text-align: center; background-color: #CCFFCE;";
		return this.getStyledData("", value, value, styles);
	    } else {
		// grey for nuetral
		styles = "text-align: center; background-color: #CCCCCC;";
		return this.getStyledData("", value, value, styles);
	    }	} else if (columnName === "increment_id_flag") {
	    if (value === true) {
		// signal on
		styles = "text-align: center; background-color: #CCFFCE;";
		return this.getStyledData("", value, value, styles);
	    } else {
		// grey for nuetral
		styles = "text-align: center; background-color: #CCCCCC;";
		return this.getStyledData("", value, value, styles);
	    }
	} else if (columnName === "dev") {
	    if (className === "classes") {
		if (value === "2.0.3") {
		    // signal on
		    styles = "text-align: center; background-color: #D3E344;";
		    return this.getStyledData("", value, value, styles);
		} else if (value === "2.0.2") {
		    // signal on
		    styles = "text-align: center; background-color: #E5E3D1;";
		    return this.getStyledData("", value, value, styles);
		} else {
		    // grey for nuetral
		    styles = "text-align: center; background-color: #CCCCCC;";
		    return this.getStyledData("", value, value, styles);
		}
	    }
        } else if (columnName === "count") {
	    if (value) {
		var length_columns = value.length - 2;
		// length_columns of 10 is 2
		if (length_columns > 1) {
		    // color of success light-green
		    styles = "background-color: #64e390;";
		    return this.getStyledData("", value, value, styles);
		}
	    }
	} else if (columnName === "profit_or_loss") {
	    if (value) {
		if (value > 0) {
		    // color of success light-green
		    styles = "background-color: #64e390;";
		} else {
		    styles = "text-align: right; background-color: #ff9999;";
		}
		return this.getStyledData("", value, value, styles);
	    }
	} else if (columnName === "trade_completed") {
	    if (value) {
		if (value === "PRICE-FELL-BELOW-BUY-PRICE") {
		    styles = "background-color: #CE9AF3;";
		} else if (value === "SIGNAL-FELL-BELOW-SIGNAL-BUY") {
		    styles = "background-color: #6534AA; color: yellow;";
		}
		return this.getStyledData("", value, value, styles);
	    }	    
        } else if (columnName === "watch") {
	    if (className === "coins") {
		// check if beginning of string matches a given string
		if (value) {
		    if (value === "true") {
			// colorize
			// color of success light-green
			styles = "background-color: #64e390;";
			return this.getStyledData("", value, value, styles);
		    }
		    if (value === "false") {
			// colorize
			// color of success light-red
			styles = "background-color: #FF9999;";
			return this.getStyledData("", value, value, styles);
		    }
		}
	    }
		
        } else if (columnName === "stage") {
	    if (className === "coins") {
		// check if beginning of string matches a given string
		if (value) {
		    if (value === "stage1") {
			// colorize
			// color of success lieght-gray
			styles = "background-color: #EFEFEF;";
			return this.getStyledData("", value, value, styles);
		    }
		    if (value === "stage2") {
			// colorize
			// color of success light-green
			styles = "background-color: #64e390;";
			return this.getStyledData("", value, value, styles);
		    }
		    if (value === "stage4") {
			// colorize
			// color of success light-red
			styles = "background-color: #FF9999;";
			return this.getStyledData("", value, value, styles);
		    }
		}
	    }
	} else if (columnName === "price") {
            // format 1 of 2
	    // remove zeros
	    var new_string = "";
	    var end_flag = 1;
	    var end_char = "";
	    var chars = value.toString().split("").reverse();
	    for (let i = 0; i < chars.length; i++) {
		if (chars[i] == "0" && end_flag) {
		    // skip (until actual non-zero numbers)
		} else {
		    // stop skipping zero using this flag
		    end_flag = 0;
		    // get end_char to see if it is a decimal
		    if (end_char == "") {
			end_char = chars[i];
		    }
		    // concatenate chars
		    new_string += chars[i];
		}
	    }
	    // if it chopped of all decimal zeros, then add a zero
	    // to the beginning, which is soon to be the end
	    if (end_char == ".") {
		new_string = "00" + new_string;
	    }
	    // reverse string (back to forward)
	    value = new_string.split("").reverse().join("");
            // format 2 of 2
	    var decimal_flag = 0;
	    var significant_digits = 0;
            var chars = value.toString().split("");
	    var new_string = "";
	    for (let i = 0; i < chars.length; i++) {
		if (chars[i] == ".") {
		    decimal_flag = 1;
		    new_string += chars[i];
		} else {
		    if (decimal_flag) {
			significant_digits++;
			if (significant_digits <= 3) {
			    new_string += chars[i];
			    if (chars[i] == "0") {
				significant_digits--;
			    }
			}
		    } else {
			new_string += chars[i];
		    }
		}
	    }
	    value = new_string;
	    // add style
	    styles = "text-align: right; font-size: 120%;";
	    // conditional style
	    if (rowFlag) {
		// highlight the XRP row so that it stands out
		// grey
		styles += "background-color: #EFEFEF;";
		// reset
		rowFlag = 0;
	    }
	    return this.getStyledData("", value, value, styles);
        } else if (columnName === "ath") {
	    // ath stands for all-time high of a price
	    if (className === "coins") {
		// check if a string exists
		if (value) {
		    if (value === "n/a") {
			// skip not applicable n/a
		    } else {
			// colorize
			// color of success light-green
			styles = "background-color: #64e390;";
			return this.getStyledData("", value, value, styles);
		    }
		}
	    }
	} else if (columnName.slice(0, 10) == "associated") {
	    // colorize light-blue
	    styles = "background-color: #83c0f2;";
	    return this.getStyledData("", value, value, styles);
        } else if (columnName === "status") {
	    if (value != "0") {
		if (value == "2021" || value == "2022" || value == "2023") {
		    if (value == "2021") {
			// yellow on green
			styles = "color: yellow; background-color: #009933; text-align: center;";
		    }
		    if (value == "2022") {
			// orange on green
			styles = "color: orange; background-color: #009933; text-align: center;";
		    }
		    if (value == "2023") {
			// orange on blue
			styles = "color: orange; background-color: blue; text-align: center;";
		    }
		    return this.getStyledData("", value, value, styles);
		} 
		if (className === "moneymaker_measurement_instances") {
		    if (value == "config" ||
			value == "variable" ||
			value == "setup") {
			// yellow on green
			styles = "color: yellow; background-color: #009933; text-align: center;";
			return this.getStyledData("", value, value, styles);
		    } else if (value == "Success") {
			// 
			styles = "color: black; background-color: #C39BD3; text-align: center;";
			return this.getStyledData("", value, value, styles);
		    } else if (value == "Live") {
			// 
			styles = "color: black; background-color: yellow; text-align: center;";
			return this.getStyledData("", value, value, styles);
		    } else if (value == "IDE") {
			// 
			styles = "color: black; background-color: #BCEF9A; text-align: center;";
			return this.getStyledData("", value, value, styles);
		    }		    
		} else if (className === "machines") {
		    if (value == "ok" ||
			value == "production") {
			// yellow on green
			styles = "color: yellow; background-color: #009933; text-align: center;";
			return this.getStyledData("", value, value, styles);
		    }
		}
	    } else {
		// colorize
		// red
		styles = "background-color: #CD5555;";
		return this.getStyledData("", value, value, styles);
	    }
		
        } else if (columnName === "input" ||
		   columnName === "address" ||
		   columnName === "entity" ||
		   columnName === "measurement" ||
		   columnName === "txn_hash") {
	    var chardata = value;
	    if (!value) {
		// return empty string (rather than null)'s null
		chardata = "";
	    } else {
		if (className === "moneymaker_measurement_instances") {
		    if (chardata == "null") {
			styles = "color: #333333; background-color: #BBBBBB; text-align: center;";
			return this.getStyledData("", value, value, styles);

		    }
		    if (chardata == "Chainlink node" ||
			chardata == "[Chainlink node]") {
			styles = "color: white; background-color: blue; text-align: center;";
			return this.getStyledData("", value, value, styles);
		    } else {
			if (chardata.substring(0,9) == "Chainlink" ||
			    chardata.substring(0,9) == "[Chainlin") {
			    // light blue background
			    styles = "color: #EFEFEF; background-color: #3366ff; text-align: center;";
			    return this.getStyledData("", value, value, styles);
			}

		    }
		    if (columnName === "input" ||
			columnName === "address" ||
			   columnName === "txn_hash") {
			// only if aggregate page
			if (! idOrNotId) {
			    // shorten string if a long string
			    if (chardata.length > 10) {
				// associative table
				chardata = chardata.substring(0,10);
				// add ellipsis
				// give the user a clue of clipping
				chardata += "...";
			    }
			}
		    }
		} else if (className == "coin_indicators") {
		    if (columnName === "measurement") {
			if (value == 'UPTREND-MACD-XOVER-IS-DOWN-TO-UP') {
			    styles = "background-color: green;";
			} else if (value == 'DOWNTREND-MACD-XOVER-IS-UP-TO-DOWN') {
			    styles = "background-color: orange;";
			} else if (value == 'UPTREND-MACD-ABOVE-SIGNAL-LINE') {
			    styles = "background-color: #64AAaa;";
			} else if (value == 'DOWNTREND-MACD-BELOW-SIGNAL-LINE') {
			    styles = "background-color: #f6d499;";
			} else if (value == 'UPTREND-EMA-12-ABOVE-EMA-26') {
			    styles = "background-color: #64ddaa;";
			} else if (value == 'DOWNTREND-EMA-12-BELOW-EMA-26') {
			    styles = "background-color: #f6dd99;";
			}
			return this.getStyledData("", value, value, styles);
		    }
		}
	    }
	    return this.getStyledData("", chardata, value, styles);
		
        } else if (columnName === "soil_areas_count") {
	    if (value != "0") {
		// associative table
		className = "soil_areas/beds";
	        chardata = value;
		// should be bed_id
		id = bed_id;
		var chardata = this.getIdAsUrl(baseUrl, className, id, chardata, paramUpkIsValid)
		return this.getStyledData("", chardata, value, styles);
	    }

        } else if (columnName === "beds_count") {
	    if (value != "0") {
		// associative table
		className = "beds/lands";
	        chardata = value;
		// should be land_id
		id = land_id;
		var chardata = this.getIdAsUrl(baseUrl, className, id, chardata, paramUpkIsValid)
		return this.getStyledData("", chardata, value, styles);
	    }

        } else if (columnName === "seed_packets_count") {
	    if (typeof value !== 'undefined' && value !== "0" && value !== "") {
		if (className === "suppliers") {
		    // associative table
		    var classNameForUrl = "seed_packets/suppliers";
	            chardata = value;
		    // should be plant_history_id
		    id = supplier_id;
		    var chardata_as_url = this.getIdAsUrl(baseUrl, classNameForUrl, id, chardata, paramUpkIsValid)
		    // green
                    styles = "background-color: #CCFFCC;";
		    return this.getStyledData("", chardata_as_url, value, styles);
		} else if (className === "plant_list_plants") {
		    // green
                    styles = "background-color: #CCFFCC;";
		    if (value == 0) {
			// red
			styles = "background-color: #CD5555;";
		    }
		    return this.getStyledData("", value, value, styles);
		    
		} else {
		    // associative table
		    var classNameForUrl = "seed_packets/plant_histories";
	            chardata = value;
		    // should be plant_history_id
		    id = plant_history_id;
		    var chardata_as_url = this.getIdAsUrl(baseUrl, classNameForUrl, id, chardata, paramUpkIsValid)
		    // green
                    styles = "background-color: #CCFFCC;";

		    return this.getStyledData("", chardata_as_url, value, styles);
		}
	    }
	    // make cell red if zero
	    //var re = new RegExp(".*>0</a>$");
	    //if (re.test(chardata)) {
            // red
            styles = "background-color: #CD5555;";
	    return this.getStyledData("", value, value, styles);
	    
        } else if (columnName === "plant_events_count") {
	    if (typeof value !== 'undefined' && value !== "0" && value !== "") {
		// associative table
		var classNameForUrl = "plant_events/plant_histories";
	        chardata = value;
		// should be plant_history_id
		id = plant_history_id;
		var chardata_as_url = this.getIdAsUrl(baseUrl, classNameForUrl, id, chardata, paramUpkIsValid)
		// green
                styles = "background-color: #CCFFCC;";
		if (className === "plant_list_plants") {
		    // no hyperlink
		    return this.getStyledData("", chardata, value, styles);
		} else {
		    return this.getStyledData("", chardata_as_url, value, styles);
		}
	    } else {
		// make cell red if zero
		//var re = new RegExp(".*>0</a>$");
		//if (re.test(chardata)) {
                // red
                styles = "background-color: #CD5555;";
		return this.getStyledData("", value, value, styles);
	    }
	    
        } else if (columnName === "linkcheck") {
            var chardata = this.getIdAsUrl(baseUrl, className, value, value, paramUpkIsValid)
            return this.getStyledData("", chardata, value, styles);
	    
        } else if (columnName === "password") {
            return this.getStyledData("", "[obscured]");
	    
        } else if (columnName === "zachmans") {
            var anotherClassName = "zachmans";
            var zachman_id = this.getZachmanIdGivenZachmanName(value);
            var chardata = this.getIdAsUrl(baseUrl, anotherClassName, zachman_id, value, paramUpkIsValid);
            return this.getStyledData("", chardata);

        } else if (columnName === "seed_packet_id") {
            var anotherClassName = "seed_packets";
            var chardata = this.getIdAsUrl(baseUrl, anotherClassName, value, value, paramUpkIsValid);
            return this.getStyledData("", chardata);

        } else if (columnName === "classes_associated") {
            var zachman_id = id;
            var classesList = this.getClassesListGivenZachmanId(zachman_id);
            var charadata = "total count = " + value + "<br>" + classesList;
            return this.getStyledData("", chardata);

        } else if (columnName === "q") {
            if (value == "ok") {
                // color
                styles = "background-color: #AAFFEE;";
            } else {
                // inherit
                styles = "background-color: inherit;";
            }
            return this.getStyledData("", value, value, styles);
	} else if (columnName === "sort") {
	    
            var sortClass = "";
            var styles = this.getSortStyle(value);
            // sort data as hyperlink
            // note set url
            var sortNoPrefix = this.getSortNoPrefix(value);
            debug("moulder sortNoPrefix", sortNoPrefix);
            var sort;
            if (timekeeper.isToday(sortNoPrefix) || className === "tenperdays") {
                debug("moulder is today and tenperdays class");
                // today, so no link
                sort = value;
                // this if else clause should not be here so un-hardcode this
            } else {
                debug("moulder not today or tenperdays class");
                // not today, so link button
                // this if else clause should not be here so un-hardcode this
                // make url
		var flag = 0;
		var url = baseUrl + className;
		url += "?" + "makesorttoday=" + aId + "&sort=sort";
                // note add parameters of this class
                sort = "<a href=\"" + url + "\" style=\"text-decoration: none;\">" + value + "</a>";
	    }
	    var raw = "";
	    return this.getStyledData(sortClass, sort, raw, styles);

        } else if (columnName === "name") {
	    var valueAsLink;
	    if (className == "coins") {
		// make meta
		var prefix = value.substring(0, 11);
		if (prefix == "<a href=\"\">") {
		    var valueWithoutLink = value.substring(11);
		    // remove end of element
		    var valueLength = valueWithoutLink.length - 4;
		    valueWithoutLink = valueWithoutLink.substring(0, valueLength)
		    var styledData = this.getStyledData("", valueWithoutLink);
		    return styledData;
		} else {
		    // do nothing
		    valueAsLink = value;
		}
	    } else if (className == "plant_events") {
		valueAsLink = this.getAsLink(value, baseUrl, className, theId);
	    } else if (className == "plant_list_plants") {
		// make to another class
		className = "plants";
		id = plant_id;
		valueAsLink = this.getAsLink(value, baseUrl, className, id);
	    } else {
		if (typeof id !== "undefined") {
		    if (id !== "") {
			valueAsLink = this.getAsLink(value, baseUrl, className, id);
		    } else {
			valueAsLink = this.getAsLink(value, baseUrl, className, aId);
		    }
		} else {
		    valueAsLink = this.getAsLink(value, baseUrl, className, aId);
		}
	    }
            debug("moulder idOrNotId =", idOrNotId);
            //if (idOrNotId) {
            //    valueAsLink = this.makeStandOut(valueAsLink);
	    //}
            var styledData = this.getStyledData("", valueAsLink);
            //debug("moulder styledData =", styledData);
            return styledData;

        } else if (columnName === "front_cover") {
	    // if baseUrl is offline, try localhost_baseurl
	    var filteredValue = this.filterToLocalBaseUrlIfNotOnline(value, localBaseUrl);
	    var size = "album";
	    var chardata = this.getImgUrlAsImageElement(baseUrl, className, filteredValue, id, size);
	    return this.getStyledData("", chardata);
	    
	} else if (columnName === "coins_symbol" ||
		   columnName === "den" ||
		   columnName === "baseline") {
	    if (className === "coin_prices") {
		if (columnName === "coins_symbol" && value == "XRP") {
		    rowFlag = 1;
		}
		if (paramFilter == "XRP") {
		    //debug("moulder className =", className);
		    //debug("moulder paramFilter =", paramFilter);		          // only change style to the XRP row
		    if (rowFlag) {
			// highlight the XRP row so that it stands out
			// grey
			styles = "background-color: #EFEFEF;";
			return this.getStyledData("", value, value, styles);
		    }
		}
	    }
        } else if (columnName === "img" || columnName === "image") {
            //debug("moulder columnName =", columnName);
	    // if baseUrl is offline, try localhost_baseurl
	    var filteredValue = this.filterToLocalBaseUrlIfNotOnline(value, localBaseUrl);
	    // special filter
	    // element to single (in other words: make all images the same small size)
            if (pageName === "/search.html" ||
                className === "domains" ||
                className === "webpages" ||
                className === "maxonomies" ||
                className === "projects" ||
                className === "goal_statements" ||
                className === "business_plan_texts" ||
                className === "processes" ||
                className === "scene_elements" ||
                className === "classes"
	       ) {
                //debug("moulder className =", className);
                var chardata = this.getImgUrlAsImageElementToSingle(baseUrl, className, filteredValue, aId);
                return this.getStyledData("", chardata);
            } else {
		if (!value || value == "null") {
		    // null, so skip img element
		} else {
		    var chardata;
		    var size = "";
		    if (columnName === "image") {
			// adjust the size of the image below
			size = "200px";
		    }
		    chardata = this.getImgUrlAsImageElement(baseUrl, className, filteredValue, id, size);
                    return this.getStyledData("", chardata);
		}
            }
        } else if (columnName === "aimg") {
            //debug("moulder columnName =", columnName);
            //debug("moulder value =", value);
            // the sql does it all (both a element and img element)
            var chardata = value;
	    var raw = "";
	    var styles = "";
	    //debug("moulder styles =", styles);
	    return this.getStyledData("", chardata, raw, styles);
        } else if (columnName === "img_url") {
            // the field is for meta-purposes in the frb single data context
            // shorten field name for display purposes
            // save img_url field as img (see sql)
            // note that two values are concatenated below so showing more than one view withinn a view
            var chardata = this.getImgUrlAsImageElement(baseUrl, className, value, id) + "<br>" + value;
	    // older (not sure why it has only 2 parameters
            //return this.getStyledData("", chardata);
	    // newer
	    styles = "font-size: 70%; font-family: monospace;";
	    return this.getStyledData("", chardata, value, styles);
        } else if (columnName === "search") {
            return this.getStyledData("", value, value, styles);
	    
        } else if (columnName === "reasonscount" ||
                   columnName === "ptopicscount" ||
                   columnName === "categoriescount" ||
                   columnName === "tagscount" ||
                   columnName === "plantscount") {
            if (value > 0) {
                debug("moulder value > 0");
                // green
                styles = "background-color: #CCFFCC;";
            } else {
                // red
                styles = "background-color: #CD5555;";
            }
            return this.getStyledData("", value, value, styles);

	} else if (columnName === "business_plan_texts") {
            styles = "width: 40%;";
            return this.getStyledData("", value, value, styles);

        } else if (columnName === "extends_class") {

            // shorten field name for display purposes
            // save img_url field as img (see sql)
            //debug("moulder extends_class =", extends_class_id);

            var extendsClass = this.getExtendsClassStyle(extends_class_id);
            //debug("moulder extendsClassStyle =", extendsClassStyle);

            var valueAsLink = this.getAsLink(value, baseUrl, className, extends_class_id);
            //debug("moulder valueAsLink =", valueAsLink);
	    
            var styledData = this.getStyledData(extendsClass, valueAsLink);
            //debug("moulder styledData =", styledData);
	    
            return styledData;

        } else if (columnName === "plant_attributes") {
	    // todo refactor the code below fr plant_attributes
	    // on hold
	    // should be from plants table
	    //var plantId = aId;
	    //var value = this.getPlantAttributesGivenPlantsId(plantId);
	    //var associativeClassName = "plant_attributes/plants"
            //var valueAsLink = this.getAsLink(value, baseUrl, associativeClassName, aId);
            //var styledData = this.getStyledData(extendsClass, valueAsLink);
            //debug("moulder styledData =", styledData);
            //return styledData;
	    // new way
	    // make meta
	    className = "plant_attributes/plants/";
	    valueAsLink = this.getAsLink(value, baseUrl, className, id);
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
    };
    this.getIdAsUrl = function (baseUrl, className, id, chardata, paramUpkIsValid) {
	var paramString = "";
	if (paramUpkIsValid) {
	    paramString = "?" + paramUpkIsValid;
	}
        return "<a href=\"" + baseUrl + className + "/" + id + paramString + "\">" + chardata + "</a>";
        //return "<a href=\"" + id + "\">" + id + "</a>";
    };
    this.getAsUrl = function (chardata) {
        return "<a href=\"" + chardata + "\">" + chardata + "</a>";
    };
    this.getAsUrl = function (href, chardata) {
        return "<a href=\"" + href + "\">" + chardata + "</a>";
    };
    this.makeStandOut = function (chardata) {
        //return "<a href=\"" + className + "/" + id + "\">" + id + "</a>";
        return "<h2>" + chardata + "</h2>";
    };
    this.getImgUrlAsImageElement = function (baseUrl, className, imgUrl, id, size = "") {
        // need to implement alt attribute and title attribute
	if (size == "image") {
	    // image maintains original size see class and css
            return "<a href=\"" + baseUrl + className + "/" + id + "\"><img src=\"" + imgUrl + "\" class=\"data-image\" alt=\"\" title=\"\"></a>";
	} else if (size == "album") {
	    // image maintains original size see class and css
            return "<a href=\"" + baseUrl + className + "/" + id + "\"><img src=\"" + imgUrl + "\" class=\"data-album-image\" alt=\"\" title=\"\"></a>";
	}
        return "<a href=\"" + baseUrl + className + "/" + id + "\"><img src=\"" + imgUrl + "\" class=\"data-img\" alt=\"\" title=\"\"></a>";
    };
    this.getImgUrlAsImageElementToSingle = function (baseUrl, className, imgUrl, id) {
        // need to implement alt attribute and title attribute
        //debug("moulder getImgUrlAsImageElementToSingle()");
	//debug("moulder imgUrl =", imgUrl);
        return "<a href=\"" + baseUrl + className + "/" + id + "\"><img src=\"" + imgUrl + "\" class=\"data-img\" alt=\"\" title=\"\" style=\"width: 33px; height: 24px;\"></a>";
    };
    this.getSortStyle = function(sort) {
        return "background: " + this.calculateCellColor(sort) + "; text-align: center; width: 140px;";
    };
    this.getSortAsLink = function(baseUrl, className, id, sort) {
        return markup;
    };
    this.getAsLink = function(chardata, baseUrl, className, id) {
        // note set url
        var url = "";
        var path = require('path');
        var url = baseUrl + className
	if (typeof id !== 'undefined' && id !== "") {
	    // id is defined so add to url
            url += "/" + id;
	}
        return "<a href=\"" + url + "\" style=\"text-decoration: none;\">" + chardata + "</a>";
    };
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
        var color_7 = "#3BF965"; // bright green
        // check date prefix to see if this is an old "Z" date
        // make the Y editable in the config
        debug("moulder sort =", sort);
        var sortLetter = "";
        if (sort !== null) {
            sortLetter = sort.substr(0, 1);
        }
	//debug("moulder sortLetter =", sortLetter);
        if (sortLetter === "Y") {
            //debug("moulder timekeeper =", timekeeper);
            // color according to the timespan
            var date = sort.substr(2);
            //debug("moulder date =", date);

            var daysElapsed = timekeeper.getDaysElapsed(date);
            //debug("moulder daysElapsed =", daysElapsed);

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
    };
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
    };
    this.getSortNoPrefix = function(sort) {
        // assumes "Z " is at the beginning of string
        if (sort !== null) {
            return sort.substring(2, 12);
        }
        return "";
    };
    this.getStyledData = function (theClass, chardata, raw = "", styles = "") {
        //debug("moulder getStyledData()");
        var styledData = {
            class: theClass,
            style: styles,
            chardata: chardata,
            raw: raw
        };
        //debug("moulder styledData =", styledData);
        return styledData;
    };
    this.getClassesListGivenZachmanId = function (zachman_id) {
        var classesList = [];
        // consult database to get list of classes matching this zachmand_id
        // foreign key
        //debug("moulder foreign key class list with zachman_id =", zachman_id);
        // Top Ten Promise() function
        // deal with a Promise() type
        //            try {
        //                var foreignKeyDataSetPromise = ""; //myFreeRadiantBunny.getFreeRadiantBunny().getForeignKeyDataSetPromise();
        //            } catch(error) {
        //            }
        var foreignKeyDataSetPromise = "";
        return foreignKeyDataSetPromise;
    };
    this.getPlantAttributesGivenPlantsId = function (plantId) {
        var classesList = [];
        // consult database to get list of classes matching this zachmand_id
        // foreign key situation
        // Top Ten Promise() function
        // deal with a Promise() type
        //            try {
        //                var foreignKeyDataSetPromise = ""; //myFreeRadiantBunny.getFreeRadiantBunny().getForeignKeyDataSetPromise();
        //            } catch(error) {
        //            }
        var foreignKeyDataSetPromise = "";
        // foreignKeyDataSetPromise;
	return "[to-be-developed]";
    };
};

module.exports = new Moulder();
