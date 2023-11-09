// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

use crate::freeradiantbunny::controller::characters::{
    CLOSED_PARENTHESIS, NULL_STR, OPEN_PARENTHESIS,
};

/// parameters - models part of URL that enables user to specify commands
use crate::freeradiantbunny::controller::library::path_query_fragments::parameter::Parameter;

#[doc = "The Parameters structure stores a vector Parameter instances."]
pub struct Parameters {
    view_parameter: Parameter,
    sort_parameter: Parameter,
    filter_parameter: Parameter,
    upk_parameter: Parameter,
    command_parameter: Parameter,
    makesorttoday_parameter: Parameter,
}

#[doc = "Implements Parameters."]
impl Parameters {
    pub fn new(given_parameters_strings_vector: Vec<&str>) -> Parameters {
        let mut parameters: Vec<Parameter> = Vec::new();
        for given_parameter_string in given_parameters_strings_vector {
            let parameter = Parameter::new(&given_parameter_string);
            parameters.push(parameter);
        }
        // kludge
        // initialize
        let mut view_parameter: Parameter = Parameter::new_as_blank("view");
        let mut sort_parameter: Parameter = Parameter::new_as_blank("sort");
        let mut filter_parameter: Parameter = Parameter::new_as_blank("filter");
        let mut upk_parameter: Parameter = Parameter::new_as_blank("upk");
        let mut command_parameter: Parameter = Parameter::new_as_blank("command");
        let mut makesorttoday_parameter: Parameter = Parameter::new_as_blank("makesorttoday");
        // loop
        for found_parameter in parameters {
            // convert
            // match
            match found_parameter.get_found_known_key().as_str() {
                // todo was unable...
                // ...to use view as a variable below
                // todo the rust kept...
                // ...assigning the match to it
                "view" => {
                    view_parameter = found_parameter;
                }
                "sort" => {
                    sort_parameter = found_parameter;
                }
                "filter" => {
                    filter_parameter = found_parameter;
                }
                "upk" => {
                    upk_parameter = found_parameter;
                }
                "command" => {
                    command_parameter = found_parameter;
                }
                "makesorttoday" => {
                    makesorttoday_parameter = found_parameter;
                }
                NULL_STR => {
                    // skip
                    // debug
                    //println!("freeradiantbunny parameters debug: no known parameters.");
                }
                _ => {
                    panic!("freeradiantbunny parameters error: match filaed due to unknown key.");
                }
            }
        }
        let parameters_instance = Parameters {
            view_parameter,
            sort_parameter,
            filter_parameter,
            upk_parameter,
            command_parameter,
            makesorttoday_parameter,
        };
        parameters_instance
    }
    pub fn get_view_parameter(&self) -> &Parameter {
        &(self.view_parameter)
    }
    pub fn get_sort_parameter(&self) -> &Parameter {
        &(self.sort_parameter)
    }
    pub fn get_upk_parameter(&self) -> &Parameter {
        &(self.upk_parameter)
    }
    fn get_known_parameters(
        &self,
    ) -> (
        &Parameter,
        &Parameter,
        &Parameter,
        &Parameter,
        &Parameter,
        &Parameter,
    ) {
        (
            (&self.view_parameter),
            (&self.sort_parameter),
            (&self.filter_parameter),
            (&self.upk_parameter),
            (&self.command_parameter),
            (&self.makesorttoday_parameter),
        )
    }
    #[doc = "Function to return a pretty string of the data of the structure."]
    pub fn get_pretty(&self) -> String {
        // add open parenthesis
        let mut list_string = OPEN_PARENTHESIS.to_string();
        // flag is needed to supress comma
        let mut last_flag = false;
        // loop
        let known_parameter = self.get_known_parameters();
        // define last index
        let parameter_count = 6;
        let last_index = 5;
        // using indexing
        for i in 0..parameter_count {
            // assign known_parameter to element variable
            let parameter_instance = match i {
                0 => &known_parameter.0,
                1 => &known_parameter.1,
                2 => &known_parameter.2,
                3 => &known_parameter.3,
                4 => &known_parameter.4,
                5 => &known_parameter.5,
                _ => panic!("freeradiantbunny parameters error: failed because of invalid index."),
            };
            // is this the last element?
            if i == last_index {
                // last element, raise flag
                last_flag = true;
            };
            //  concatenate element to string
            if !last_flag {
                // with comma
                list_string = format!(
                    "{} {},",
                    list_string,
                    parameter_instance.get_key_value_pair(),
                );
            } else {
                // last
                // so, without comma
                list_string = format!(
                    "{} {}",
                    list_string,
                    parameter_instance.get_key_value_pair(),
                );
            };
        }
        // add closing parenthesis
        list_string = format!("{}{}", list_string, CLOSED_PARENTHESIS.to_string());
        list_string
    }
}

/* end */
