// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// query - models the part of URL after the ? (questing mark)
// structures
use crate::freeradiantbunny::controller::library::path_query_fragments::parameters::Parameters;
// constants
use crate::freeradiantbunny::controller::characters::AMPERSAND;

#[doc = "Query struct. The query models the part of the URi that is after the question amrk and before the hash. The query has one or more key-value pairs."]
pub struct Query {
    known_parameters_instance: Parameters,
}

#[doc = "Query implementation for Query struct."]
impl Query {
    pub fn new(given_query_string: &str) -> Query {
        let known_parameters_instance = split_query_string(&given_query_string);
        // create an instance of the Query struct
        let query_instance = Query {
            known_parameters_instance: known_parameters_instance,
        };
        query_instance
    }
    pub fn get_known_parameters_instance(&self) -> &Parameters {
        &(self.known_parameters_instance)
    }
    #[doc = "Function to return a pretty string of the data of the struct."]
    pub fn get_pretty(&self) -> String {
        let pretty_string = format!(
            "(known_paraters: {})",
            self.get_known_parameters_instance().get_pretty(),
        );
        pretty_string
    }
}

#[doc = "This private function splits the query string and creates an instance of the Parameters struct."]
fn split_query_string(given_query_string: &str) -> Parameters {
    let given_parameter_strings_vector: Vec<&str> = given_query_string.split(AMPERSAND).collect();
    // initialize the vector that stores the instances of Parameter struct
    let known_parameters_instance = Parameters::new(given_parameter_strings_vector);
    known_parameters_instance
}

/* end */
