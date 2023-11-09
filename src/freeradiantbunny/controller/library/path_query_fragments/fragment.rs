// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// fragment - in a URL there can be a # amd text of what is called a fratment
use crate::freeradiantbunny::controller::api::api_constants::KNOWN_FRAGMENTS;
use crate::freeradiantbunny::controller::characters::NULL_STR;

#[doc = "The Fragment structure stores the fragment that is from after the hash in a URI."]
pub struct Fragment {
    found_known_fragment: String,
}

#[doc = "Fragment implementation."]
impl Fragment {
    pub fn new(given_fragment_string: &str) -> Fragment {
        // validate the given_fragment_string
        let found_known_fragment = validate(&given_fragment_string);
        let fragment_instance = Fragment {
            found_known_fragment: found_known_fragment,
        };
        fragment_instance
    }
    pub fn get_found_known_fragment(&self) -> String {
        self.found_known_fragment.clone()
    }
    #[doc = "Function to return a pretty string of the data of the structure."]
    pub fn get_pretty(&self) -> String {
        let pretty_string = format!(
            "(found_known_fragment: '{}')",
            self.get_found_known_fragment(),
        );
        pretty_string
    }
}

#[doc = "validate()."]
pub fn validate(given_fragment_string: &str) -> String {
    // check if null str
    if given_fragment_string == NULL_STR {
        // todo refactor to bubble up the error
        // todo
        //println! {"Unable to validate given_fragment_string because it is a null str."};
        return NULL_STR.to_string();
    }
    // loop to see if given matches a known fragments
    for known_fragment in KNOWN_FRAGMENTS {
        // check for valid match
        if given_fragment_string == known_fragment {
            return known_fragment.to_string();
        }
    }
    // todo refactor to bubble up the error
    panic! {"freeradiantbunny fragment error: failed to validate given_fragment_string. The given_fragment_string is not known."};
}
