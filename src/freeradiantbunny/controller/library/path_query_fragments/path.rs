// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

use crate::freeradiantbunny::controller::characters::{
    AMPERSAND, DOLLAR_SIGN, GREATER_THAN_SIGN, LESS_THAN_SIGN, NULL_STR,
};
/// path = models the part of URL that contains file information
// constants
use crate::freeradiantbunny::site_configuration::site_configuration::KNOWN_PATHS;

#[doc = "Path is from the URI."]
pub struct Path {
    found_known_path: String,
    unfound_sanitized_path: String,
}

#[doc = "Path implementation."]
impl Path {
    pub fn new(given_path_string: &str) -> Path {
        // validate the given_path_string
        let (found_known_path, unfound_sanitized_path) = validate(given_path_string);
        let path_instance = Path {
            found_known_path: found_known_path,
            unfound_sanitized_path: unfound_sanitized_path,
        };
        path_instance
    }
    pub fn get_found_known_path(&self) -> String {
        // todo using clone() but there may be another way
        self.found_known_path.clone()
    }
    pub fn get_unfound_sanitized_path(&self) -> String {
        // todo using clone() but there may be another way
        self.unfound_sanitized_path.clone()
    }
    pub fn is_found_known_path(&self) -> bool {
        if self.found_known_path == NULL_STR {
            return false;
        };
        true
    }
    pub fn is_unfound_sanitized_path(&self) -> bool {
        if self.unfound_sanitized_path == NULL_STR {
            return false;
        };
        true
    }
    #[doc = "Function to return a pretty string of the data of the struct."]
    pub fn get_pretty(&self) -> String {
        let pretty_string = format!(
            "(found_known_path: '{}',\n\t\t  unfound_sanitized_path: '{}')",
            self.get_found_known_path(),
            self.get_unfound_sanitized_path(),
        );
        pretty_string
    }
}

#[doc = "validate()."]
pub fn validate(given_path_string: &str) -> (String, String) {
    // check if null str
    if given_path_string == NULL_STR {
        // todo refactor to bubble up the error
        panic! {"Could not validate given_path_string because it is a null_str."};
    }
    // loop to see if given matches a known paths
    for known_path in KNOWN_PATHS {
        // check for valid match
        if given_path_string == known_path {
            return (known_path.to_string(), NULL_STR.to_string());
        }
    }
    // todo write more code that sanitizes the user input
    if let Some(unfound_sanitized_path) = sanitize_input(given_path_string) {
        // ok
        return (NULL_STR.to_string(), unfound_sanitized_path.to_string());
    } else {
        // unable to sanitize the user input
        // todo refactor to bubble up the error
        panic!("freeradiantbunny path error: failed to sanitize given_path_string because invalid input detected.");
    }
}

#[doc = "sanitize_input()."]
fn sanitize_input(input: &str) -> Option<String> {
    // check if the input is empty or exceeds a certain length limit
    if input.is_empty() || input.len() > 100 {
        return None;
    }

    // check if the input contains any disallowed characters
    let disallowed_chars: Vec<char> =
        vec![LESS_THAN_SIGN, GREATER_THAN_SIGN, AMPERSAND, DOLLAR_SIGN];
    if input.chars().any(|c| disallowed_chars.contains(&c)) {
        return None;
    }
    // if all checks pass, return a sanitized copy of the input
    Some(input.to_string())
}

/* end */
