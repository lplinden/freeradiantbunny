/**
 * Module timekeeper.
 *
 * @public
 */

'use strict';

var debug = require('debug')('frb');

var instanceCount = 0;

function Timekeeper() {
    instanceCount = instanceCount + 1;
    debug("timekeeper instantiated", instanceCount);
    // used by server
    this.isToday = function (givenString) {
        // debug
        //print "debug dates: now date " + getNowDate() + "<br />\n";
        //print "debug dates: given date " + given_date + "<br />\n";
        if (this.getNowDate() === givenString) {
            return 1;
        }
        return 0;
    };
    this.getDaysElapsed = function (givenString) {
        // declare variable to return
        //debug("timekeeper getDaysElapsed()");
        //debug("timekeeper givenString =",  givenString);
        var daysElapsed = "";
        // this day is EST
        // to get GMT add 4 hours
        var timestampGiven = this.convertYearFirstStyleDateToTimestamp(givenString);
        // get today
        var dateTodayWithPrefix = this.getTodayDateAsFirstYearStyle();
        // this day is EST
        // to get GMT add 4 hours
        var dateToday = this.getSortNoPrefix(dateTodayWithPrefix);
        //debug("timekeeper dateToday =", dateToday);
        var timestampToday = this.convertYearFirstStyleDateToTimestamp(dateToday);
        //debug("timekeeper timestampGiven =",  timestampGiven);
        //debug("timekeeper timestampToday =",  timestampToday);
        // get difference
        var diff = timestampToday - timestampGiven;
        //debug("timekeeper diff =", diff);
        // divide by seconds minutes hours
        // in order to make days
        daysElapsed = Math.round((diff / (60 * 60 * 24)), 0);
        //debug("timekeeper daysElapsed =", daysElapsed);
        // now add the fraction so that the hours of today are included
        //var hoursElapsedToday = (new Date() - todayTimestamp) / (60 * 60);
        // convert to fraction of a day
        //var hoursElapsedTodayInDays = hoursElapsedToday / 24;
        // debug
        //print "debug dates.php get_days_elapsed(): hours elapsed today in days = " + hours_elapsed_today_in_days + "<br />\n";
        // add the hours that have elapsed today
        //days_elapsed += hours_elapsed_today_in_days;
        // round
        //days_elapsed = Math.round(daysElapsed, 2);
        // debug
        //print "debug dates.php get_days_elapsed(): days elapsed = " + days_elapsed + "<br />\n";
        return daysElapsed;
    };
    this.convertYearFirstStyleDateToTimestamp = function (yearFirstStyleDateStart) {
        //debug("timekeeper convertYearFirstStyleDateToTimestamp()");
        //debug("timekeeper yearFirstStyleDateStart =", yearFirstStyleDateStart);
        var hyphenCount = yearFirstStyleDateStart.split("-").length - 1;
        //debug("timekeeper hyphenCount =", hyphenCount);
        // note: year_first_style_date is in the "2010-11-21" style
        // est the string first to make sure that 2 dashes exist
        // only split if there exists the correct form
        var list = [];
        if (hyphenCount === 2) {
            // [year, month, day] 
            list = yearFirstStyleDateStart.split('-');
        } else {
            // perhaps there is a a better way to deal with the error
            debug("timekeeper timekeeper.php error: bad sort form");
            var why = "timekeeper error: bad sort form";
            throw why;
        }
        var year = list[0];
        var month = list[1];
        var day = list[2];
        //debug("timekeeper list (year) =", list[0]);
        //debug("timekeeper list (month) =", list[1]);
        //debug("timekeeper list (day) =", list[2]);
        // convert date input into timestamp
        // note that this function appears to assume local zone (+4 from GMT)
        // php version
        //  mktime(0,0,0,month,day,year);
        var hour = 0;
        var minute = 0;
        var second = 0;
        var millisecond = 0;
        //var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
        var datum = new Date(year, month - 1, day, hour, minute, second, millisecond);
        // convert from milliseconds to seconds by dividing by 1000
        return datum.getTime() / 1000;
    };
    this.getTodayDateAsFirstYearStyle = function () {
        // move variable selection to config for user to choose
        var prefix = "Y ";
        var currentDate = new Date();
        // get year
        var today_year = currentDate.getFullYear();
        // returns year (e.g. 2010)
        // get month
        var today_month = currentDate.getMonth() + 1;
        // returns numerical month (e.g. 11)
        if (today_month < 10) {
            today_month = "0" + today_month;
        }
        // get day
        var today_date = currentDate.getDate();
        if (today_date < 10) {
            today_date = "0" + today_date;
        }
        // returns numerical day (e.g. 21)
        return prefix + today_year + "-" + today_month + "-" + today_date;
    };
    this.getSortNoPrefix = function (sort) {
        // assumes "Z " is at the beginning of string
        return sort.substring(2, 12);
    };
    this.getNowDate = function () {
        // debug
        //print "debug lib/dates: date_default_timezone_get() " +  date_default_timezone_get() + "<br />\n";
        //print "debug lib/dates: date_default_timezone_get() " +  date_default_timezone_get() + "<br />\n";
        return new Date().toISOString().slice(0, 10);
    };
    this.getNowTimestamp = function () {
        return new Date();
    };
}

module.exports = new Timekeeper();

/*
    get_oldest_date_in_db = function () {
        return "2010-10-09";
    }
    this_date_plus_one_day = function (date) { 
        var timestamp = strtotime(date + " + 1 day");
        var next_date = date('Y-m-d', timestamp);
        return next_date;
    }
    convert_from_timestamp_to_date_as_first_year_style = function (timestamp) {
        // debug
        //print "debug TimeKeeper: converting timestamp = " _ timestamp + "<br />\n";
        return strftime('%Y-%m-%d', timestamp);
    }
    get_production_day_count = function(yearFirstStyleDateStart = "") {
        // count the first day
        // and count today (even if partial)
        // and all days in between the two above
        var yearFirstStyleDateStart = get_oldest_date_in_db();
        // declare variable that is being solved for
        var days_elapsed = 0;
        // deal with date input
        // the funcion below was a date but for 4 o'clock
        // debug
        //print "<p>timekeeper: year first style date to timestamp = yearFirstStyleDateStart</p>\n";
        // this day is EST
        // to get GMT add 4 hours
        var timestamp_start = convertYearFirstStyleDateToTimestamp(yearFirstStyleDateStart);
        // debug
        //print "<p>timekeeper: timestamp start = " + timestamp_start + "</p>\n";
        var year_first_style_date_today = get_today_date_as_first_year_style();
        // debug
        //print "<p>timekeep: year first style data today = year_first_style_date_today</p>\n";
        // this day is rounded to the beginning of the day
        // this day is EST
        // to get GMT add 4 hours
        var timestamp_today = convertYearFirstStyleDateToTimestamp(year_first_style_date_today);
        // debug
        //print "<p>timekeeper: timestamp today = " + timestamp_today + "</p>\n";
        var diff = timestamp_today - timestamp_start;
        // debug
        //print "<p>timekeeper: diff = " + diff + "</p>\n";
        // divide by seconds minutes hours
        // in order to make days
        var days_elapsed = Math.round((diff / (60 * 60 * 24)), 0);
        // now add the fraction so that the hours of today are included
        var hours_elapsed_today = (getNowTimestamp() - timestamp_today) / (60 * 60);
        // convert to fraction of a day
        var hours_elapsed_today_in_days = hours_elapsed_today / 24;
        // debug
        //print "<p>timekeeper: hours elapsed today in days = " + hours_elapsed_today_in_days + "</p>\n";
        // add the hours that have elapsed today
        days_elapsed += hours_elapsed_today_in_days;
        // rwound
        return Math.round(days_elapsed, 2);
    }
    get_cell_colorized_given_sort_date = function(given_sort_date, given_column_name, given_class_name_for_url = "", given_id = "", given_view = "", cell_element_flag = "") {
        var markup = "";
        // create an HTML table cell
        // create a flag that tells whether there is a link or not
        // assumes a letter and a space at the beginning of string
        // for example "Z " or "Y "
        var link_flag = 0;
        if (given_class_name_for_url && given_id && ! isToday(substr(given_sort_date, 2))) {
            // is today, so up goes the flag to add a link
            link_flag = 1;
        }
        if (cell_element_flag != "off") {
            markup += "  <td style=\"background-color: " + calculate_cell_color(given_column_name, given_sort_date) + "; text-align: center;\">\n";
        }
        markup += "      <span style=\"font-size: 80%;\">";
        if (link_flag) {
            var url = given_class_name_for_url + "?";
            // move this to a be passed via parameter: below is for processes
            //if (get_status() === "online") {
            //  url += "status=online";
            //  url += "&amp;";
            //}
            url += "makesorttoday=" + given_id;
            markup += "<a href=\"" + url + "\" style=\"text-decoration: none;\">";
        }
        markup += given_sort_date;
        if (link_flag) {
            markup  += "</a>";
        }
        markup += "</span>\n";
        if (cell_element_flag != "off") {
            markup += "  </td>\n";
        }
        return markup;
    }
*/

