// freeradiantbunny - website for permaculture herb1;2c gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// host - models a domain_name being live on a webserver
// import
//use std::fmt::Debug;
//use std::fmt::Display;
use core::fmt::Error;
// modules
use crate::freeradiantbunny::controller::library::path_query_fragments::headers;
// structures
use crate::freeradiantbunny::controller::debugger::Debugger;
// constants
use crate::freeradiantbunny::controller::api::api_constants::{ERROR, NONE};
use crate::freeradiantbunny::controller::characters::NULL_STR;
use crate::freeradiantbunny::site_configuration::site_configuration::KNOWN_HOSTS;

// need to create an error type HostUnknownError
/*
    pub trait HostUnknownError: Debug + Display {
    fn description(&self) -> &str { /* ... */ }
    fn cause(&self) -> Option<&Error> { /* ... */ }
    fn source(&self) -> Option<&(Error + 'static)> { /* ... */ }
}
*/

#[doc = "The Host structure models the idea that the requester may request a given host. If a host is supplied in the headers, then this is compared to the hash in the site_configuration, and if mathcing a key, a directory is returned to where the (non-freeradiantbunny) HTML webpages of the system are maintained."]
pub struct Host {
    found_known_host: String,
}

#[doc = "Implemenation for Host."]
impl Host {
    pub fn new(request_data: &str, debugger: &Debugger) -> Result<Host, std::fmt::Error> {
        // extract host from headers
        let given_host_string_option = headers::get_host(&request_data);
        match given_host_string_option {
            Some(given_host_string) => {
                let found_known_host_option = validate_host(&given_host_string);
                match found_known_host_option {
                    Some(found_known_host) => {
                        // create instance
                        let host_instance = Host { found_known_host };
                        // return
                        Ok(host_instance)
                    }
                    None => {
                        let none_debug = format!("host none [1 of 3]: failed to validate the extracted headers the host with the site-configuration host, throwing this virtual HostUnknownError.");
                        // log
                        debugger.log_data(NONE, &none_debug);
                        // todo eventually throw an HOST_UNKNOWN_ERROR
                        Err(Error)
                    }
                }
            }
            _ => {
                let host_debug = format!("host error [2 of 3]: failed extracting host from headers, throwing virtual HostUnknownError.");
                // log
                debugger.log_data(ERROR, &host_debug);
                // todo eventually throw an HOST_UNKNOWN_ERROR
                Err(Error)
            }
        }
    }
    pub fn get_found_known_host(&self) -> String {
        self.found_known_host.to_string()
    }
    pub fn get_found_known_host_dir(&self) -> Option<String> {
        let found_known_host = self.get_found_known_host();
        for (known_host, known_host_dir) in KNOWN_HOSTS {
            if found_known_host == known_host {
                return Some(known_host_dir.to_string());
            }
        }
        // return
        None
    }
    pub fn is_found_known_host(&self) -> bool {
        if self.found_known_host == NULL_STR {
            // return
            return false;
        }
        true
    }
    #[doc = "Function to return a pretty string of the data of the struct."]
    pub fn get_pretty(&self) -> String {
        let found_known_host_dir_option = self.get_found_known_host_dir();
        match found_known_host_dir_option {
            Some(found_known_host_dir) => {
                let pretty_string = format!(
                    "host: (found_known_host: '{}',\n\t         found_known_host_dir: '{}',)",
                    self.get_found_known_host(),
                    found_known_host_dir,
                );
                // return
                pretty_string
            }
            None => {
                // log
                println!("host error: unable to get found_known_host_dir.");
                // send it anyway
                panic!("host error: unable to get found_known_host_dir.");
            }
        }
    }
}

#[doc = "validate_host()."]
fn validate_host(given_host_string: &str) -> Option<String> {
    // check if givenis null str
    if given_host_string == NULL_STR {
        // return
        return None;
    }
    // see if given matches a known host
    for (known_host, _) in KNOWN_HOSTS {
        if given_host_string == known_host {
            // return
            return Some(known_host.to_string());
        }
    }
    // return
    None
}

/* end */
