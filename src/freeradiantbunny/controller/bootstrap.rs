// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

use crate::freeradiantbunny::controller::api::api_constants::DATA;
use crate::freeradiantbunny::controller::debugger::Debugger;
use crate::freeradiantbunny::controller::library::hosts::host::Host;
use crate::freeradiantbunny::controller::library::path_query_fragments::path_query_fragment::PathQueryFragment;
use crate::freeradiantbunny::controller::library::path_query_fragments::requests::Request;
/// bootstrap - organizes the structures needed before we call the api
use std::thread;

#[doc = "The Bootstrap structure maintains a variable holding the count."]
pub struct Bootstrap {
    count: i32,
}

#[doc = "Bootstrap implementation."]
impl Bootstrap {
    #[doc = "new()."]
    pub fn new() -> Bootstrap {
        let count_start = 1;
        let bootstrap_instance = Bootstrap { count: count_start };
        bootstrap_instance
    }
    #[doc = "get_count()."]
    pub fn get_count(&self) -> i32 {
        return self.count;
    }
    #[doc = "Public function boot_debugger(). This function sets up a debugger for the database-base-backed webserver of freeradiantbunny. The goal is to create reports with test data."]
    pub fn boot_debugger(&self) -> Debugger {
        // debug
        println!("bootstrap debug boot(): count: {}", self.get_count());
        // do
        // bootstrap debugger
        // get thead_name
        let handle = thread::current();
        let thread_name = handle.name().unwrap();
        // get debugger instance and assign to name
        let debugger: Debugger = Debugger::new(thread_name);
        // log
        // log Debugger instance
        //debugger.log(DEBUG, file!(), format!("{}", line!()).as_str());
        let debugger_debug = debugger.get_pretty();
        debugger.log_data(DATA, &debugger_debug);
        // return
        debugger
    }
    #[doc = "boot_request()."]
    pub fn boot_request(&self, request_data: &str, debugger: &Debugger) -> Request {
        // do
        // convert to request_data to Request structure instance
        let request = Request::try_from(request_data.to_string()).expect(
            "freeradiantbunny bootstrap error: failed to convert request_data to Request structure.",
        );
        // log
        // log Request instance
        //debugger.log(DEBUG, file!(), format!("{}", line!()).as_str());
        let request_debug = request.get_pretty();
        debugger.log_data(DATA, &request_debug);
        // return
        request
    }
    #[doc = "boot_path_query_fragment()."]
    pub fn boot_path_query_fragment(
        &self,
        request: &Request,
        debugger: &Debugger,
    ) -> PathQueryFragment {
        // do
        // convert Request's field path_query_instance to PathQueryFragment structure instance
        let request_path_query_fragment = request.get_path_query_fragment();
        let path_query_fragment = PathQueryFragment::new(request_path_query_fragment.as_str());
        // log
        // log PathQueryFragment instance
        //debugger.log(DEBUG, file!(), format!("{}", line!()).as_str());
        let path_query_fragment_debug = path_query_fragment.get_pretty();
        debugger.log_data(DATA, &path_query_fragment_debug);
        // return
        path_query_fragment
    }
    #[doc = "boot_host()."]
    pub fn boot_host(
        &self,
        request_data: &str,
        debugger: &Debugger,
    ) -> Result<Host, std::fmt::Error> {
        // from request_data...
        // ...create a Host instance (or not)
        Host::new(&request_data, &debugger)
    }
}

/* end */
