/**
 * Module dates.
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Dates() {
    instanceCount = instanceCount + 1;
    console.log("dates instantiated", instanceCount);
    // move this to config for user to set
    this.dateDefaultTimezone = "America/New_York";
    // clean up the following
    // multifunction dates that strings like the ones below are understood
    //last_spring_frost_month = 5;
    //last_spring_frost_rough_date = 4;
    //first_fall_frost_month = 10;
    //first_fall_frost_rough_date = 17;
    // method
    this.output_date_given = function (last_spring_frost_month, last_spring_frost_date, first_fall_frost_month, first_fall_frost_date) {
        var markup = "";
        // set
        this.set_type("get_all");
        // load data from database
        this.determine_type();
        markup += this.prepare_query();
        // only output if there are items to output 
        if (this.get_list_bliss().get_count() > 0) {
            // use these date_last_spring_frost, date_first_fall_frost
            // to calculate a precise date
            // in the meantime, get something
            // create a rank that allows everything to sort
            var day;
            var month;
            if (this.get_freeform_datetype() === "weeks before first fall frost") {
                month = first_fall_frost_month;
                day = first_fall_frost_date;
            } else if (this.get_freeform_datetype() === "weeks before last spring frost" ||
                       this.get_freeform_datetype() === "on last frost (week number)" ||
                       this.get_freeform_datetype() === "week after last spring frost" ||
                       this.get_freeform_datetype() === "weeks after last spring frost") {
                month = last_spring_frost_month;
                day = last_spring_frost_date;
            } else {
                // so, the date is not based upon the frosts, (aka frost-oriented)
                // assume that it is a regular calendar date
                markup += this.get_freeform_datetype();
                // old version
                //markup += "?";
                return markup;
            }
            var year = 2012;
            var date = new DateTime();
            date.setDate(year, month, day);
            // debug of frost date (starting point)
            //markup += date.format("Y-m-d") + "<br />";
	    var data_string;
            if (this.get_freeform_datetype() === "weeks before first fall frost" ||
                this.get_freeform_datetype() === "weeks before last spring frost" ||
                this.get_freeform_datetype() === "on last frost (week number)") {
                date_string = this.get_value() + " weeks";
                date_sub(date, date_interval_create_from_date_string(date_string));
                markup += date.format("Y-m-d") + "<br />";
            } else if (this.get_freeform_datetype() === "week after last spring frost" ||
                       this.get_freeform_datetype() === "weeks after last spring frost"  ) {
                date_string = this.get_value() + " week";
                date_add(date, date_interval_create_from_date_string(date_string));
                markup += date.format("Y-m-d") + "<br />";
            }
        }
        return markup;
    }
    this.get_yesterday_date = function () {
        var nowDate = new Date().format("Y-m-d");
        // move back 1 day
        var timestamp = strtotime(nowDate + " - 1 day");
        return yesterday_date = date('Y-m-d', timestamp);
    }
    this.get_date_obj = function (date_string) {
        date_obj = new DateTime();
        pattern = '/(.*)-(.*)-(.*)/';
        if (preg_match(pattern, date_string, matches)) {
            year = matches[1];
            month = matches[2];
            day = matches[3];
            date_obj.setDate(year, month, day);
        }
        return date_obj;
    }
    this.getNowTimestamp = function () {
        return time();
    }
    this.this_date_plus_one_day = function (date) { 
        timestamp = strtotime(date + " + 1 day");
        next_date = date('Y-m-d', timestamp);
        return next_date;
    }
    this.is_yesterday = function (given_date) { 
        //print "debug dates: given date " + given_date + "<br />\n";
        if (this.get_yesterday_date() === given_date) {
            return 1;
        }
    }
    this.convert_from_timestamp_to_date_as_first_year_style = function (timestamp) {
        // debug
        //print "converting timestamp = " + timestamp + "<br />\n";
        date = strftime('%Y-%m-%d', timestamp);
        return date;
    }
    this.convert_from_twodash_to_date_as_first_year_style = function (twodash) {
        // convert to timestamp
        timestamp = strtotime(twodash);
        date = strftime('%Y-%m-%d', timestamp);
        return date;
    }
    this.convert_from_timestamp_to_date_as_first_year_style_with_time = function (timestamp) {
        // debug
        //print "converting timestamp = " + timestamp + "<br />\n";
        date = strftime('%Y-%m-%d %l:%M %P', timestamp);
        return date;
    }
    this.convert_epoch_time_to_words = function (timestamp) {
        date_and_time = strftime('%I:%M:%S&nbsp;%p&nbsp;%d&nbsp;%b&nbsp;%Y', timestamp);
        return date_and_time;    
    }
    this.get_time_now_as_am_pm_style = function () {
        timestamp = this.getNowTimestamp();
        time = strftime('%I:%M %P', timestamp);
        return time;
    }
    this.get_today_date_as_first_year_style = function () {
        // get year
        today_year = date("Y");
        // returns year (e.g. 2010)
        // get month
        today_month = date("m");
        // returns numerical month (e.g. 11)
        // get day
        today_day = date("d");
        // returns numerical day (e.g. 21)
        return today_year + "-" + today_month + "-" + today_day;
    }
    this.convert_year_first_style_date_to_timestamp = function (year_first_style_date_start) {
        // debug
        //print "debug dates.php: year_first_style_date_start = " + year_first_style_date_start + "<br />\n";
        // note: year_first_style_date is the YYYY-MM-DD format (e.g. "2010-11-21")
        pattern = '/-/';
        subject = year_first_style_date_start;
        if (subject) {
            matches = array();
            if (matches = preg_split(pattern, subject)) { 
                // debug
                //print "debug dates.php: matches = " + matches[0] + "<br />\n";
                //print "debug dates.php: matches = " + matches[1] + "<br />\n";
                //print "debug dates.php: matches = " + matches[2] + "<br />\n";
                if (count(matches) === 3) {
                    list(year, month, day) = matches;
                    // debug
                    //print "debug dates.php: input year = " + year + "<br />\n";
                    //print "debug dates.php: input month = " + month + "<br />\n";
                    //print "debug dates.php: input day = " + day + "<br />\n";
                    // convert date input into timestamp
                    // note that this function appears to assume local zone (+4 from GMT)
                    return mktime(0,0,0,month,day,year);
                }
            }
        }
        return "?";
    }
    this.get_production_day_count = function (year_first_style_date_start = "") {
        if (year_first_style_date_start === "") {
            // no parameter value, so set
            year_first_style_date_start = this.get_oldest_date_in_db();
        }
        // count the first day
        // and count today (even if partial)
        // and all days in between the two above
        // declare variable that is being solved for
        days_elapsed = 0;
        // deal with date input
        // the funcion below was a date but for 4 o'clock
        // debug
        //print "<p>timekeeper: year first style date to timestamp = year_first_style_date_start</p>\n";
        // this day is EST
        // to get GMT add 4 hours
        timestamp_start = this.convert_year_first_style_date_to_timestamp(year_first_style_date_start);
        // debug
        //print "<p>timekeeper: timestamp start = " + timestamp_start + "</p>\n";
        year_first_style_date_today = this.get_today_date_as_first_year_style();
        // debug
        //print "<p>timekeep: year first style data today = year_first_style_date_today</p>\n";
        // this day is rounded to the beginning of the day
        // this day is EST
        // to get GMT add 4 hours
        timestamp_today = this.convert_year_first_style_date_to_timestamp(year_first_style_date_today);
        // debug
        //print "<p>timekeeper: timestamp today = " + timestamp_today + "</p>\n";
        diff = timestamp_today - timestamp_start;
        // debug
        //print "<p>timekeeper: diff = " + diff + "</p>\n";
        // divide by seconds minutes hours
        // in order to make days
        days_elapsed = round((diff / (60 * 60 * 24)), 0);
        // now add the fraction so that the hours of today are included
        hours_elapsed_today = (this.getNowTimestamp() - timestamp_today) / (60 * 60);
        // convert to fraction of a day
        hours_elapsed_today_in_days = hours_elapsed_today / 24;
        // debug
        //print "<p>timekeeper: hours elapsed today in days = " + hours_elapsed_today_in_days + "</p>\n";
        // add the hours that have elapsed today
        days_elapsed += hours_elapsed_today_in_days;
        // round
        days_elapsed = round(days_elapsed, 2);
        // debug
        //print "timekeeper: days elapsed = " + days_elapsed + "<br />\n";
        // all done
        return days_elapsed;
    }
    this.is_less_than_month_apart = function (given_timecard_date) {
        boolean = "";
        days_in_a_month = 30;
        if (this.get_production_day_count(given_timecard_date) < days_in_a_month) {
            boolean = this.get_production_day_count(given_timecard_date);
            // debug
            //print "debug dates boolean = " + boolean + "<br />\n";
        }
        return boolean;
    }
    this.is_less_than_week_apart = function (given_timecard_date) {
        boolean = "";
        days_in_a_week = 7;
        if (this.get_production_day_count(given_timecard_date) < days_in_a_week) {
            boolean = this.get_production_day_count(given_timecard_date);
            // debug
            //print "debug dates boolean = " + boolean + "<br />\n";
        }
        return boolean;
    }
    this.is_less_than_day_apart = function (given_timecard_date) {
        boolean = "";
        days_in_a_week = 1;
        if (this.get_production_day_count(given_timecard_date) < days_in_a_week) {
            boolean = this.get_production_day_count(given_timecard_date);
            // debug
            //print "debug dates boolean = " + boolean + "<br />\n";
        }
        return boolean;
    }
    this.is_business_day = function (date_string) {
        // note: use the following to test (should output "Fri")
        //date_string = "2013-03-08";
        day_of_week = date('D', strtotime( date_string));
        // debug
        //print "debug dates day_of_week = " + day_of_week + "<br />\n";
        if (day_of_week == "Mon" ||
            day_of_week == "Tue" ||
            day_of_week == "Wed" ||
            day_of_week == "Thu" ||
            day_of_week == "Fri") {
            return "yes";
        }
        return 0;
    }
    this.get_days_diff = function (given_date_string_1, given_date_string_2) {
        timestamp_1 = this.convert_year_first_style_date_to_timestamp(given_date_string_1);
        timestamp_2 = this.convert_year_first_style_date_to_timestamp(given_date_string_2);
        // debug
        //print "debug responsibilities timestamp_1 = " + timestamp_1 + "<br />\n";
        //print "debug responsibilities timestamp_2 = " + timestamp_2 + "<br />\n";
        // note: convert timestamp's second units to day units by 
        // note: dividing by the number of seconds in a day
        days = (timestamp_2 - timestamp_1) / 82400;
        // note round
        return round(days);
    }
    this.get_days_diff_fine = function (given_date_string_1, given_date_string_2) {
        timestamp_1 = this.convert_year_first_style_date_to_timestamp(given_date_string_1);
        timestamp_2 = this.convert_year_first_style_date_to_timestamp(given_date_string_2);
        // note: convert timestamp's second units to day units by 
        // note: dividing by the number of seconds in a day
        days = (timestamp_2 - timestamp_1) / 82400;
        // note do not round    
        return days;
    }
    this.is_days_diff_if_no_more_than_given_days_difference = function (given_date_string_1, given_date_string_2, given_days) {
        timestamp_1 = this.convert_year_first_style_date_to_timestamp(given_date_string_1);
        timestamp_2 = this.convert_year_first_style_date_to_timestamp(given_date_string_2);
        diff = timestamp_1 - timestamp_2;
        // debug
        //print "<p>timekeeper: diff = " + diff + "</p>\n";
        // divide by seconds minutes hours in order to make days
        days_diff = round((diff / (60 * 60 * 24)), 0);
        if (days_diff < given_days) {
            //print "timekeeper: days_diff = " + days_diff + "<br />\n";
            return "true";
        }
        return 0;
    }
    this.get_timestamptz_obj = function (given_time_start) {
        // note given_time_start is a timestamptz type
        date = new DateTime(given_time_start);
        return date;
    }
    this.remove_y = function (given_date) {
        return substr(given_date, 2);
    }
};

module.exports = new Dates();
