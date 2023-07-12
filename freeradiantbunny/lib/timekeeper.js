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
    this.isToday = function (givenString) {
        if (this.getNowDate() === givenString) {
	    debug("timekeeper isToday() returning true");
            return 1;
        }
        return 0;
    };
    this.getDaysElapsed = function (givenString) {
        var daysElapsed = "";
        // this day is EST; to get GMT add 4 hours
        var timestampGiven = this.convertYearFirstStyleDateToTimestamp(givenString);
        // get today
        var dateTodayWithPrefix = this.getTodayDateAsFirstYearStyle();
        // this day is EST; to get GMT add 4 hours
        var dateToday = this.getSortNoPrefix(dateTodayWithPrefix);
        var timestampToday = this.convertYearFirstStyleDateToTimestamp(dateToday);
        // get difference
        var diff = timestampToday - timestampGiven;
        // divide by seconds minutes hours to make days
        daysElapsed = Math.round((diff / (60 * 60 * 24)), 0);
        debug("timekeeper daysElapsed =", daysElapsed);
        return daysElapsed;
    };
    this.convertYearFirstStyleDateToTimestamp = function (yearFirstStyleDateStart) {
        var hyphenCount = yearFirstStyleDateStart.split("-").length - 1;
        // note: year_first_style_date is "2010-11-21"
        // make sure that 2 dashes exist
        // only split if there exists the correct form
        var list = [];
        if (hyphenCount === 2) {
            // [year, month, day] 
            list = yearFirstStyleDateStart.split('-');
        } else {
            // error
            var why = "timekeeper found bad sort form";
            throw why;
        }
        var year = list[0];
        var month = list[1];
        var day = list[2];
        // convert date input into timestamp
        // function assumes local zone (+4 from GMT)
        var hour = 0;
        var minute = 0;
        var second = 0;
        var millisecond = 0;
        var datum = new Date(year, month - 1, day, hour, minute, second, millisecond);
        // convert from milliseconds to seconds
        return datum.getTime() / 1000;
    };
    this.getTodayDateAsFirstYearStyle = function () {
        // todo: move variable to config for user to choose
        var prefix = "Y ";
        var currentDate = new Date();
        // year
        // returns year (e.g. 2010)
        var today_year = currentDate.getFullYear();
        // month
        // returns numerical month (e.g. 11)
        var today_month = currentDate.getMonth() + 1;
        if (today_month < 10) {
            today_month = "0" + today_month;
        }
        // day
        // returns numerical day (e.g. 21)
        var today_date = currentDate.getDate();
        if (today_date < 10) {
            today_date = "0" + today_date;
        }
        return prefix + today_year + "-" + today_month + "-" + today_date;
    };
    this.getSortNoPrefix = function (sort) {
        // assumes "Z " is at the beginning of string
        return sort.substring(2, 12);
    };
    this.getNowDate = function () {
	// make localtime
	// convert from UTC to localtime
        var date = new Date();
	var offset = date.getTimezoneOffset();
	var offset_hours = offset / 60;
	var hours = date.getHours();
	var diff_hours = hours - offset_hours;
	date.setHours(diff_hours);
	var dateStyled = date.toISOString().slice(0, 10)
	debug("timekeeper dateStyles =", dateStyled);
	return dateStyled;
    };
    this.getNowTimestamp = function () {
        return new Date();
    };
}

module.exports = new Timekeeper();
