// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// parameter -- models a single key-value pairs that is found in the URL.
use crate::freeradiantbunny::model::persistent::order_by::ParamSort;
use crate::freeradiantbunny::controller::api::api_constants::{
    KNOWN_KEY_COMMAND, KNOWN_KEY_FILTER, KNOWN_KEY_MAKESORTTODAY, KNOWN_KEY_SORT, KNOWN_KEY_UPK,
    KNOWN_KEY_VIEW, KNOWN_KEY_VIEW_VALUE_DEFAULT, KNOWN_KEY_VIEW_VALUE_HTML,
    KNOWN_KEY_VIEW_VALUE_TEXT, KNOWN_PARAMETER_KEYS,
};
use crate::freeradiantbunny::controller::characters::{
    EQUALS_SIGN, NULL_STR
};

#[doc = "Parameter structure holds key-value pairs."]
pub struct Parameter {
    found_known_key: String,
    value: String,
}

#[doc = "Parameter implementation."]
impl Parameter {
    pub fn new(given_parameter_string: &str) -> Parameter {
        let (found_known_key, value) = split_parameter_string(&given_parameter_string);
        // create an instance of the Parameter structure
        let parameter_instance = Parameter {
            found_known_key,
            value,
        };
        parameter_instance
    }
    pub fn new_as_blank(key: &str) -> Parameter {
        // create an instance of the Parameter structure
        let parameter_instance = Parameter {
            found_known_key: key.to_string(),
            value: NULL_STR.to_string(),
        };
        parameter_instance
    }
    pub fn get_found_known_key(&self) -> String {
        self.found_known_key.clone()
    }
    pub fn get_value(&self) -> String {
        self.value.clone()
    }
    pub fn get_value_as_paramsort(&self) -> ParamSort {
        match self.value.as_str() {
            "sort" => ParamSort::Sort,
            "id" => ParamSort::Id,
            "name" => ParamSort::Name,
            "status" => ParamSort::Status,
            "num" => ParamSort::Num,
            "random" => ParamSort::Random,
            _ => ParamSort::Sort,
        }
    }
    // pretty data output
    pub fn get_key_value_pair(&self) -> String {
        format!("({}, '{}')", self.get_found_known_key(), self.get_value())
    }
    pub fn is_valid_value(&self) -> bool {
        match self.get_found_known_key().as_str() {
            KNOWN_KEY_VIEW => match self.get_value().as_str() {
                KNOWN_KEY_VIEW_VALUE_HTML => true,
                KNOWN_KEY_VIEW_VALUE_TEXT => true,
                KNOWN_KEY_VIEW_VALUE_DEFAULT => true,
                _ => false,
            },
            KNOWN_KEY_SORT => false,
            KNOWN_KEY_FILTER => false,
            KNOWN_KEY_UPK => false,
            KNOWN_KEY_COMMAND => false,
            KNOWN_KEY_MAKESORTTODAY => false,
            _ => {
                panic!("paramerers match fiailed.");
            }
        }
    }
    pub fn get_valid_value(&self) -> String {
        match self.get_found_known_key().as_str() {
            KNOWN_KEY_VIEW => {
                match self.get_value().as_str() {
                    KNOWN_KEY_VIEW_VALUE_HTML => KNOWN_KEY_VIEW_VALUE_HTML.to_string(),
                    KNOWN_KEY_VIEW_VALUE_TEXT => KNOWN_KEY_VIEW_VALUE_TEXT.to_string(),
                    KNOWN_KEY_VIEW_VALUE_DEFAULT => {
                        // todo refactor to consider input value
                        // todo refactor to consider action value
                        // todo the input should map to the output
                        KNOWN_KEY_VIEW_VALUE_HTML.to_string()
                    }
                    _ => {
                        // todo refactor as an Enum and this may...
                        // todo ... not be needed.
                        panic!("parameters get_valid_value() needs code.");
                    }
                }
            }
            KNOWN_KEY_SORT => {
                panic!("parameters get_valid_value() needs code.");
            }
            KNOWN_KEY_FILTER => {
                panic!("parameters get_valid_value() needs code.");
            }
            KNOWN_KEY_UPK => {
                panic!("parameters get_valid_value() needs code.");
            }
            KNOWN_KEY_COMMAND => {
                panic!("parameters get_valid_value() needs code.");
            }
            KNOWN_KEY_MAKESORTTODAY => {
                panic!("parameters get_valid_value() needs code.");
            }
            _ => {
                panic!("parameters unable to match knownkeys.");
            }
        }
    }
}

#[doc = "This private functions splits the given parameter string."]
fn split_parameter_string(given_parameter_string: &str) -> (String, String) {
    // check if null str
    if given_parameter_string == NULL_STR {
        // debug
        // todo refactor to bubble up reference
        //println!("freeradiantbunny parameters debug: given_parameter_string is null str.");
        return (NULL_STR.to_string(), NULL_STR.to_string());
    }
    let given_key_and_value: Vec<&str> = given_parameter_string.split(EQUALS_SIGN).collect();
    let given_key_and_value_length = given_key_and_value.len();
    match given_key_and_value_length {
        0 => {
            println!("freeradiantbunny parameter error: failed to split given_key_and_value.");
            // todo refactor this so that no instnace is made and an error bubbles up
            (NULL_STR.to_string(), NULL_STR.to_string())
        }
        1 => {
            println!("freeradiantbunny parameter error: failed to split given_key_and_value.");
            // todo refactor this so that no instnace is made and an error bubbles up
            (NULL_STR.to_string(), NULL_STR.to_string())
        }
        2 => {
            let found_known_key = validate_parameter_key(given_key_and_value[0]);
            let value = validate_parameter_value(given_key_and_value[1]);
            (found_known_key, value)
        }
        _ => {
            println!("freeradiantbunny parameter error: failed to split given_key_value_string.");
            // todo refactor this so that no instnace is made and an error bubbles up
            (NULL_STR.to_string(), NULL_STR.to_string())
        }
    }
}

#[doc = "Validates a parameter key."]
fn validate_parameter_key(given_key_string: &str) -> String {
    // check if null str
    if given_key_string == NULL_STR {
        // todo refactor to bubble up the error
        panic! {"Could not validate given_key_string because it is a null str."};
    }
    // loop to see if given matches a known parameters
    for known_parameter_key in KNOWN_PARAMETER_KEYS {
        // check for valid match
        if given_key_string == known_parameter_key {
            return known_parameter_key.to_string();
        }
    }
    // todo refactor to bubble up the error
    panic! {"freeradiantbunny parameters error: failed to validate given_key_string. The given_key_string is not known."};
}

#[doc = "Validates a parameter value."]
fn validate_parameter_value(given_value_string: &str) -> String {
    // perform a sanity check on the value
    // todo refactor to add sanity check
    if given_value_string == NULL_STR {
        panic!("freeradiantbuuny parameters error: given_value_string is not valid.");
    }
    // todo can validate based on what the key is
    // todo refactor this to add validation of value
    given_value_string.to_string()
}

#[doc = "The fmt for Parameter."]
impl std::fmt::Display for Parameter {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "parameter: found_known_key: {}, value: {}", self.get_found_known_key(), self.get_value())
    }
}
    
/* end */
