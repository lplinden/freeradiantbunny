/**
 * Module Timekeeper.
 * version 2.0.2
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
	//debug("timekeeper isToday()");
        //debug("timekeeper givenStringee =",  givenString);
        //debug("timekeeper nowDate =",  this.getNowDate());
        if (this.getNowDate() === givenString) {
	    debug("timekeeper isToday() returning true");
            return 1;
        }
        return 0;
    };
    this.getDaysElapsed = function (givenString) {
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
        //debug("timekeeper timestampToday =",  timestampToday);
        // get difference
        var diff = timestampToday - timestampGiven;
        //debug("timekeeper diff =", diff);
        // divide by seconds minutes hours
        // in order to make days
        daysElapsed = Math.round((diff / (60 * 60 * 24)), 0);
        debug("timekeeper daysElapsed =", daysElapsed);
	// todo see if the following code about extra hours is needed
        // now add the fraction so that the hours of today are included
        //var hoursElapsedToday = (new Date() - todayTimestamp) / (60 * 60);
        // convert to fraction of a day
        //var hoursElapsedTodayInDays = hoursElapsedToday / 24;
        // debug
        //print "debug dates.php get_days_elapsed(): hours elapsed today in days = " + hours_elapsed_today_in_days + "<br>\n";
        // add the hours that have elapsed today
        //days_elapsed += hours_elapsed_today_in_days;
        // round
        //days_elapsed = Math.round(daysElapsed, 2);
        // debug
        //print "debug dates.php get_days_elapsed(): days elapsed = " + days_elapsed + "<br>\n";
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
            var why = "timekeeper found bad sort form";
            //debug("timekeeper error why =", why);
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
        var hour = 0;
        var minute = 0;
        var second = 0;
        var millisecond = 0;
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
	// make localtime
	//debug("timekeeper getNowDate()");
	// convert from UTC to localtime
        var date = new Date();
	//debug("timekeeper date =", date);
	var offset = date.getTimezoneOffset();
	//debug("timekeeper offset =", offset);
	var offset_hours = offset / 60;
	//debug("timekeeper offset_hours =", offset_hours);
	var hours = date.getHours();
	//debug("timekeeper hours =", hours);
	var diff_hours = hours - offset_hours;
	//debug("timekeeper diff_hours =", diff_hours);
	date.setHours(diff_hours);
	//debug("timekeeper date =", date);
	var dateStyled = date.toISOString().slice(0, 10)
	debug("timekeeper dateStyles =", dateStyled);
	return dateStyled;
    };
    this.getNowTimestamp = function () {
        return new Date();
    };
}

module.exports = new Timekeeper();
