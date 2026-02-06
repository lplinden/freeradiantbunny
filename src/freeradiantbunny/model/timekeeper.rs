// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// timekeeper - models dates
// import
use chrono::{Local, NaiveDate};

// constants
use crate::freeradiantbunny::controller::api::api_constants::{DATE_SEPARATOR, SORT_PREFIX_STRING};
use crate::freeradiantbunny::controller::characters::SPACE;

#[doc = "timekeeper knows time and provides date strings via the Date struct."]
#[doc = "A date_styled_date_string is a string that is always formatted as YYYY-MM-DD, where YYYY is a year, MM is a month, and DD is a day of the month."]
#[doc = "A sort_styled_date_string is a string that is always formatted as 'X YYYY-MM-DD', where 'X ' is the SORT_STYLED_PREFIX constant found in the configuration file, YYYY is a year, MM is a month, and DD is a day of the month. A sort_styled_date_string is used by the sort field in several freeradiantbunny database tables."]
#[doc = "This is an array that holds the characters of a date_styled_date_string."]

pub struct DateStyled {
    array: [char; 10],
}

impl DateStyled {
    #[doc = "Public constructor for DateStyled struct."]
    fn get(&self) -> String {
        // loop through array of chars to make a string
        let mut date_styled_date_string = String::new();
        for element in self.array {
            let char_as_string = element.to_string();
            let char_as_str_ref = char_as_string.as_str();
            date_styled_date_string.push_str(char_as_str_ref);
        }
        date_styled_date_string
    }
}

#[doc = "This is an array that holds the characters of prefix of the sort_styled_date_string, which is used for the sort field of several database tables and defined by the user in the configuration file."]
pub struct SortPrefix {
    array: [char; 2],
}

impl SortPrefix {
    #[doc = "Public constructor for SortStyled struct."]
    fn get(&self) -> String {
        // loop through array of chars to make a string
        let mut sort_styled_date_string = String::new();
        for element in self.array {
            let char_as_string = element.to_string();
            let char_as_str_ref = char_as_string.as_str();
            sort_styled_date_string.push_str(char_as_str_ref);
        }
        sort_styled_date_string
    }
    fn get_array(&self) -> [char; 2] {
        self.array
    }
    pub fn pretty_print(&self) {
        for x in self.get_array().iter() {
            println!("timekeeper: array: {}", x);
        }
    }
}

#[doc = "Date factory insntance creation function returns instance of Date structure."]

pub struct Date {
    date_styled_instance: DateStyled,
    sort_prefix_instance: SortPrefix,
}

#[doc = "Define the Date implementation."]
impl Date {
    #[doc = "Public function is a constructor, a Date factory instance creation function, and it returns an instance of Date structure."]
    pub fn new() -> Self {
        // tally the number of calls to this function
        //let instance_count = 0;
        //instance_count += 1;
        //print_ln!("instance_count: {}", instance_count);
        // return instance of Date
        get_now_as_date_instance()
    }
    #[doc = "Public function is a constructor, a Date factory instance creation function function, and it accepts a String that should be in the date_styled_date_string format and this function returns a date_styled_instance of the Date struct."]
    pub fn new_given_date_styled_date_string(given_date_styled_date_string: &String) -> Self {
        // todo test the folloiwng if statement
        if !is_date_styled_date_string(given_date_styled_date_string) {
            panic!("timekeeper error: given date_styled_date_string has bad format.");
        }
        let (result_flag, given_date_styled_instance) =
            get_given_date_styled_date_string_as_date_styled_instance(
                given_date_styled_date_string,
            );
        if !result_flag {
            panic!("timekeeper error: given_date_styled_date_string could not be converted to date_styled_instance.");
        }
        let sort_prefix_instance = SortPrefix {
            array: [SORT_PREFIX_STRING, SPACE],
        };
        // debug
        println!(
            "timekeeper debug: given_date_styled: {}",
            given_date_styled_instance.get()
        );
        // create instance of struct
        let date_instance = Date {
            date_styled_instance: given_date_styled_instance,
            sort_prefix_instance: sort_prefix_instance,
        };
        date_instance
    }
    //
    pub fn new_given_sort_styled_date_string(given_sort_styled_date_string: &String) -> Self {
        if !is_sort_styled_date_string(given_sort_styled_date_string) {
            panic!("timekeeper error: given sort_styled_date_string has bad format: given_sort_styled_data_string: {}", given_sort_styled_date_string);
        }
        get_given_sort_styled_date_string_as_date_instance(given_sort_styled_date_string)
    }
    #[doc = "Wrapper function for get_date_styled_date_string()."]
    pub fn get_date(&self) -> String {
        (*self.get_date_styled_date_string()).to_string()
    }
    #[doc = "Public function that returns date_styled_date_string."]
    pub fn get_date_styled_date_string(&self) -> String {
        self.date_styled_instance.get()
    }
    #[doc = "Wrapper function for get_sort_styled_date_string()."]
    pub fn get_sort(&self) -> String {
        (self.get_sort_styled_date_string()).to_string()
    }
    #[doc = "Public function that concatenates the sort prefix and the date_styled_date_string and resturs the resuling sort_styled_date_string."]
    pub fn get_sort_styled_date_string(&self) -> String {
        let sort_styled_date_string = format!(
            "{}{}",
            self.get_sort_prefix(),
            self.get_date_styled_date_string()
        );
        sort_styled_date_string
    }
    #[doc = "Getter function for sort_styled_instance of the Date struct."]
    pub fn get_sort_prefix(&self) -> String {
        self.sort_prefix_instance.get()
    }
    #[doc = "get_sort_instance()"]
    pub fn get_sort_prefix_instance(&self) -> &SortPrefix {
        &self.sort_prefix_instance
    }
    #[doc = "Returns true if given date_styled_date_string is today."]
    pub fn is_today(&self) -> bool {
        let date_styled_date_string = self.date_styled_instance.get();
        if get_now_as_date_styled_date_string() == date_styled_date_string {
            return true;
        }
        false
    }
    #[doc = "Returns the number of days since given date_sgtyled_date_string."]
    pub fn get_days_elapsed(&self) -> u32 {
        let this_date_styled_date_string = (*self.get_date()).to_string();
        let given_timestamp =
            convert_date_styled_date_string_to_timestamp(this_date_styled_date_string);
        let now_date_styled_date_string = get_now_as_date_styled_date_string();
        let now_timestamp =
            convert_date_styled_date_string_to_timestamp(now_date_styled_date_string);
        let diff = now_timestamp - given_timestamp;
        // convert seconds of timestamp to days
        let days_elapsed = (diff / (60 * 60 * 24)) as u32;
        days_elapsed
    }
}

#[doc = "Public function that returns the time now as an instance of the Date structure."]
pub fn get_now_as_date_instance() -> Date {
    let date_styled_instance = get_now_as_date_styled_instance();
    let sort_prefix_instance = SortPrefix {
        array: [SORT_PREFIX_STRING, SPACE],
    };
    let date_instance = Date {
        date_styled_instance: date_styled_instance,
        sort_prefix_instance: sort_prefix_instance,
    };
    date_instance
}

#[doc = "Public function that returns the time of given date_styled_formatted_string as an instance ofthe Date structure."]
pub fn get_given_date_styled_date_string_as_date_instance(
    given_date_styled_date_string: &String,
) -> Date {
    if !is_date_styled_date_string(given_date_styled_date_string) {
        panic!("timekeeper error: given date_styled_date_string has bad format.");
    }
    let (result_flag, given_date_styled_instance) =
        get_given_date_styled_date_string_as_date_styled_instance(given_date_styled_date_string);
    if !result_flag {
        panic!("timekeeper error: given_date_styled_date_string could not be converted to date_styled_instance.");
    }
    let sort_prefix_instance = SortPrefix {
        array: [SORT_PREFIX_STRING, SPACE],
    };
    // create instance of struct
    let date_instance = Date {
        date_styled_instance: given_date_styled_instance,
        sort_prefix_instance: sort_prefix_instance,
    };
    date_instance
}

#[doc = "This private function accepts a given_date_stuled_date_string as a parameter and returns a date_styled_instance."]
fn get_given_date_styled_date_string_as_date_styled_instance(
    given_date_styled_date_string: &String,
) -> (bool, DateStyled) {
    if !is_date_styled_date_string(given_date_styled_date_string) {
        let empty_date_styled_instance = DateStyled {
            array: [
                SPACE,
                SPACE,
                SPACE,
                SPACE,
                DATE_SEPARATOR,
                SPACE,
                SPACE,
                DATE_SEPARATOR,
                SPACE,
                SPACE,
            ],
        };
        return (false, empty_date_styled_instance);
    }
    let y_m_d_tuple: (i32, u32, u32) =
        convert_date_styled_date_string_to_year_month_day_tuple(given_date_styled_date_string);
    let year: i32 = y_m_d_tuple.0;
    let month: u32 = y_m_d_tuple.1;
    let day: u32 = y_m_d_tuple.2;
    // convert integers to chars for year
    let year_string = year.to_string();
    let year_chars: Vec<char> = year_string.chars().collect();
    let year_char_1 = year_chars[0];
    let year_char_2 = year_chars[1];
    let year_char_3 = year_chars[2];
    let year_char_4 = year_chars[3];
    // convert integers to chars for month
    let month_string = month.to_string();
    let month_chars: Vec<char> = month_string.chars().collect();
    let month_string_length = month_string.len();
    let (month_char_1, month_char_2) = if month_string_length == 1 {
        ('0', month_chars[0])
    } else {
        (month_chars[0], month_chars[1])
    };
    // convert integers to chars
    let day_string = day.to_string();
    let day_chars: Vec<char> = day_string.chars().collect();
    let day_string_length = day_string.len();
    let (day_char_1, day_char_2) = if day_string_length == 1 {
        ('0', day_chars[0])
    } else {
        (day_chars[0], day_chars[1])
    };
    let given_date_styled_instance = DateStyled {
        array: [
            year_char_1,
            year_char_2,
            year_char_3,
            year_char_4,
            DATE_SEPARATOR,
            month_char_1,
            month_char_2,
            DATE_SEPARATOR,
            day_char_1,
            day_char_2,
        ],
    };
    (true, given_date_styled_instance)
}

#[doc = "Public function that returns the time of given sort_styled_formatted_string as an instance ofthe Date structure."]
pub fn get_given_sort_styled_date_string_as_date_instance(
    given_sort_styled_date_string: &String,
) -> Date {
    if !is_sort_styled_date_string(given_sort_styled_date_string) {
        panic!("timekeeper error: given sort_styled_date_string has bad format.");
    }
    let (result_flag, given_sort_prefix_instance) =
        get_given_sort_styled_date_string_as_sort_prefix_instance(given_sort_styled_date_string);
    if !result_flag {
        panic!("timekeeper error: given_sort_styled_date_string could not be converted to sort_prefix_instance.");
    }
    let (result_flag, given_date_styled_date_string) =
        convert_sort_styled_date_string_to_date_styled_date_string(given_sort_styled_date_string);
    if !result_flag {
        panic!("timekeeper error: given_sort_styled_date_string could not be converted to date_styled_date_string.");
    }
    let (result_flag, given_date_styled_instance) =
        get_given_date_styled_date_string_as_date_styled_instance(&given_date_styled_date_string);
    if !result_flag {
        panic!("timekeeper error: given_date_styled_date_string could not be converted to date_styled_instance.");
    }
    // create instance of struct
    let date_instance = Date {
        date_styled_instance: given_date_styled_instance,
        sort_prefix_instance: given_sort_prefix_instance,
    };
    date_instance
}

#[doc = "Private function that returns the time now as DataTime local."]
fn get_now() -> chrono::DateTime<Local> {
    Local::now()
}

#[doc = "Public function that returns the time now as a date_styled_date_string."]
pub fn get_now_as_date_styled_date_string() -> String {
    // get time now was a DateTime local
    let now = get_now();
    let date_styled_date_string = now.format("%Y-%m-%d");
    date_styled_date_string.to_string()
}

#[doc = "Private function that returns the time now as date_styled_date_string."]
fn get_now_as_date_styled_instance() -> DateStyled {
    let date_styled_date_string = get_now_as_date_styled_date_string();
    let (result_flag, date_styled_instance) =
        get_given_date_styled_date_string_as_date_styled_instance(&date_styled_date_string);
    if !result_flag {
        panic!("timekeeper error: date_styled_date_string could not be converted to date_styled_instance.");
    }
    date_styled_instance
}

#[doc = "Private funtion that converts a date_styled_date_string to a (year, month, day) typle."]
fn convert_date_styled_date_string_to_year_month_day_tuple(
    given_date_styled_date_string: &String,
) -> (i32, u32, u32) {
    let list: Vec<&str> = given_date_styled_date_string.split('-').collect();
    if list.len() != 3 {
        panic!(
            "timekeeper error: found date_styled_date_string with bad format: list.lwn: {}",
            list.len()
        );
    }
    //println!("timekeeper convert_date... error: list[0]: {} ", list[0] );
    let year: i32 = list[0].parse().expect("timekeeper error: invalid year.");
    let month: u32 = list[1].parse().expect("timekeeper error: invalid month.");
    let day: u32 = list[2].parse().expect("timekeeper error: invalid day.");
    (year, month, day)
}

#[doc = "Private function that returns true if given date_styled_date_string."]
fn is_date_styled_date_string(given_date_styled_date_string: &String) -> bool {
    let y_m_d_tuple: (i32, u32, u32) =
        convert_date_styled_date_string_to_year_month_day_tuple(given_date_styled_date_string);
    let year: i32 = y_m_d_tuple.0;
    if !is_valid_year(year) {
        return false;
    }
    let month: u32 = y_m_d_tuple.1;
    let day: u32 = y_m_d_tuple.2;
    if !is_valid_month_and_day(month, day) {
        return false;
    }
    true
}

#[doc = "Private function that returns true if given sort_styled_date is today."]
fn is_sort_styled_date_string(given_sort_styled_date_string: &String) -> bool {
    let (result_flag, given_date_styled_date_string) =
        convert_sort_styled_date_string_to_date_styled_date_string(given_sort_styled_date_string);
    if !result_flag {
        return false;
    }
    let y_m_d_tuple: (i32, u32, u32) =
        convert_date_styled_date_string_to_year_month_day_tuple(&given_date_styled_date_string);
    let year: i32 = y_m_d_tuple.0;
    if !is_valid_year(year) {
        return false;
    }
    let month: u32 = y_m_d_tuple.1;
    let day: u32 = y_m_d_tuple.2;
    if !is_valid_month_and_day(month, day) {
        return false;
    }
    true
}

#[doc = "Private function that returns true if given integer is a year."]
fn is_valid_year(year: i32) -> bool {
    if year >= 0 && year <= 9999 {
        return true;
    }
    false
}

#[doc = "Private function that returns true if given month and date are valid."]
fn is_valid_month_and_day(month: u32, day: u32) -> bool {
    if month == 1
        || month == 3
        || month == 5
        || month == 7
        || month == 8
        || month == 10
        || month == 12
    {
        if day >= 1 && day <= 31 {
            return true;
        }
    } else if month == 4 || month == 6 || month == 9 || month == 11 {
        if day >= 1 && day <= 30 {
            return true;
        }
    } else if month == 2 {
        // ignores leap year
        if day >= 1 && day <= 29 {
            return true;
        }
    }
    false
}

#[doc = "Private function that converts given date to unix timestamp."]
fn convert_date_styled_date_string_to_timestamp(date_styled_date_string: String) -> i64 {
    let list: Vec<&str> = date_styled_date_string.split('-').collect();
    if list.len() != 3 {
        panic!("timekeeper error: found date_styled_date_string with bad form.");
    }
    let year: i32 = list[0].parse().expect("timekeeper error: expected year.");
    let month: u32 = list[1].parse().expect("timekeeper error: expected month.");
    let day: u32 = list[2].parse().expect("timekeeper error: expected day.");
    let date_time =
        NaiveDate::from_ymd_opt(year, month, day).expect("timekeeper error:  not a NaiveDate ymd.");
    let date_time = date_time
        .and_hms_opt(0, 0, 0)
        .expect("Timekeeper error: not a NaiveDate hms.");
    let unix_timestamp = date_time.timestamp();
    unix_timestamp
}

#[doc = "Private function that returns date_date_string given a sort_styled_date_string."]
fn convert_sort_styled_date_string_to_date_styled_date_string(
    sort_styled_date_string: &String,
) -> (bool, String) {
    // check length
    let length = sort_styled_date_string.len();
    if length == 12 {
        let date_styled_date_string = sort_styled_date_string[2..12].to_string();
        // return tuple with success indication
        return (true, date_styled_date_string);
    }
    // return tuple with error indication
    let empty_string = "".to_string();
    (false, empty_string)
}

#[doc = ""]
fn get_given_sort_styled_date_string_as_sort_prefix_instance(
    given_sort_styled_date_string: &String,
) -> (bool, SortPrefix) {
    // check length
    let length = given_sort_styled_date_string.len();
    if length == 12 {
        // get first char
        let sort_prefix_chars: Vec<char> = given_sort_styled_date_string.chars().collect();
        let sort_prefix_char = sort_prefix_chars[0];
        let sort_prefix_instance = SortPrefix {
            array: [sort_prefix_char, SPACE],
        };
        // return tuple with success indication
        return (true, sort_prefix_instance);
    }
    // return tuple with error indication
    // this is weird because it is not used
    // however it keeps the symetry of the tuple
    let sort_prefix_instance = SortPrefix {
        array: [SORT_PREFIX_STRING, SPACE],
    };
    (false, sort_prefix_instance)
}
