// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

use crate::freeradiantbunny::controller::library::filename::filename::Filename;
use crate::freeradiantbunny::site_configuration::site_configuration::{CONFIG_DIR, LOG_PATH};
/// debugger - study the data and the data types and converting
use std::fs::OpenOptions;
use std::io::prelude::*;

#[doc = "This the structure for a Dugger instance."]
pub struct Debugger {
    thread_name: String,
    logfile: Filename,
}

#[doc = "This the implentation of a Dugger instance."]
impl Debugger {
    #[doc = "new()."]
    pub fn new(thread_name: &str) -> Debugger {
        // bootstrap, so no debugger logging
        // turn filename into a filename instance
        let filename_instance = Filename::new(CONFIG_DIR, LOG_PATH);
        // create instance of Debugger structure and return it
        let debugger_instance = Debugger {
            thread_name: thread_name.to_string(),
            logfile: filename_instance,
        };
        debugger_instance
    }
    #[doc = "get_thread_name()."]
    fn get_thread_name(&self) -> String {
        (*(self.thread_name)).to_string()
    }
    #[doc = "get_logfile()."]
    fn get_logfile(&self) -> &Filename {
        &self.logfile
    }
    #[doc = "log()."]
    pub fn log(&self, debug_type: &str, file: &str, line: &str) {
        let debug_debug_string = format!(
            "{} {} {} {}",
            self.get_thread_name(),
            debug_type,
            file,
            line
        );
        println!("{}", debug_debug_string);
        self.write_to_log(&debug_debug_string);
    }
    #[doc = "log_data()."]
    pub fn log_data(&self, debug_type: &str, data: &str) {
        let debug_data_string = format!("{} {} {}", self.get_thread_name(), debug_type, data);
        println!("{}", debug_data_string);
        self.write_to_log(&debug_data_string);
    }
    #[doc = "log_error()."]
    pub fn log_error(&self, debug_type: &str, error_message: &str) {
        let debug_error_string = format!(
            "{} {} {}",
            self.get_thread_name(),
            debug_type,
            error_message
        );
        println!("{}", debug_error_string);
        // have a different color to signafy debug type was error
        // todo build color into log data and log output
        // todo make a log reader via the website
        self.write_to_log(&debug_error_string);
    }
    #[doc = "write_to_log()."]
    fn write_to_log(&self, debug_string: &str) {
        // check if file path exists
        if !self.get_logfile().exists() {
            // print error message
            println!(
                "freeradiantbunny main error: file '{}' does not exist.",
                self.get_logfile().get_fullpath_filename()
            );
            // exit function early
            return;
        };
        // file exists, so proceed
        // write debug_string to logfile
        // open the file in append mode
        let fullpath_filename = self.get_logfile().get_fullpath_filename();
        let mut file = OpenOptions::new()
            .write(true)
            .append(true)
            .open(fullpath_filename)
            .unwrap();
        if let Err(e) = writeln!(file, "{}", debug_string) {
            eprintln!("debugger error: failed to write to file with error: {}", e);
        }
    }
    #[doc = "get_pretty()."]
    pub fn get_pretty(&self) -> String {
        format!(
            "####################################################\ndebugger: thread_name: {}",
            self.get_thread_name()
        )
    }
}

/* end */
