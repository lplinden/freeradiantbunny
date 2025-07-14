// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.6

use crate::freeradiantbunny::controller::api::api_constants::{DATA, NONE};
/// api - The API defines the REST URLs the user should use.
use crate::freeradiantbunny::controller::api::api_pattern_match::pattern_match_api;
use crate::freeradiantbunny::controller::api::api_pattern_requested::ApiPatternRequested;
use crate::freeradiantbunny::controller::debugger::Debugger;
use crate::freeradiantbunny::controller::library::filename::filename::Filename;
use crate::freeradiantbunny::controller::library::hosts::host::Host;
use crate::freeradiantbunny::controller::library::path_query_fragments::path_query_fragment::PathQueryFragment;
use crate::freeradiantbunny::controller::library::suitcase::suitcase::Suitcase;
use crate::freeradiantbunny::controller2modeller;
use crate::freeradiantbunny::model::manifest::screen::Screen;
use crate::freeradiantbunny::view::viewer;
use crate::freeradiantbunny::model::manifest::upk_type::UpkType;
use crate::freeradiantbunny::site_configuration::site_configuration::USER_PASSKEY;

#[doc = "This refines a structure for the freeeradiantbunny API. The api_pattern for the application allows three types of URL constructions to extract data from the database, and one type remains for declaring errors."]
pub enum Api {
    Classes,
    IdCandidate,
    Referenced,
    Http404,
}

#[doc = "Define an Api Implementation."]
impl Api {
    #[doc = "do_api()."]
    pub fn do_api(
        debugger: &Debugger,
        path_query_fragment: &PathQueryFragment,
        screen: &Screen,
        host: &Host,
    ) -> (Option<ApiPatternRequested>, Filename) {
        // log host data
        debugger.log_data(
            DATA,
            format!(
                "is_found_known_host(): ({})",
                host.is_found_known_host().to_string()
            )
            .as_str(),
        );
        // API check starts here
        // solve for webpage_filename
        // but first, check that a host was found
        if !host.is_found_known_host() {
            // todo remove panic and bubble-up
            panic!("api error: failed to find host. should not have been here and here is a just-in-case showing up.");
        }
        // log path_instance data
        debugger.log_data(
            DATA,
            format!(
                "is_found_known_path(): ({})",
                path_query_fragment
                    .get_path_instance()
                    .is_found_known_path()
            )
            .as_str(),
        );
        //
        // ask if known_path was found
        if path_query_fragment
            .get_path_instance()
            .is_found_known_path()
        {
            // log path_instance data
            debugger.log_data(
                DATA,
                format!(
                    "path_query_fragment.get_path_instance.get_found_known_path(): ('{}')",
                    path_query_fragment
                        .get_path_instance()
                        .get_found_known_path()
                )
                .as_str(),
            );
            // found_known_path is defined, so create filename
            let found_known_host_dir_option = host.get_found_known_host_dir();
            match found_known_host_dir_option {
                Some(found_known_host_dir) => {
                    let filename_instance = Filename::new(
                        found_known_host_dir.as_str(),
                        path_query_fragment
                            .get_path_instance()
                            .get_found_known_path()
                            .as_str(),
                    );
                    // log filename_instance data
                    debugger.log_data(
                        DATA,
                        format!("filename_instance: {}", filename_instance.get_pretty()).as_str(),
                    );
                    return (None, filename_instance);
                }
                None => {
                    panic!("api error: unable to get found_known_host_dir.");
                }
            }
        } else {
            // consider freeradiantbunny API
            // return instance of Filename
            return pattern_match_api(&debugger, &path_query_fragment, &screen, &host);
        }
    }
    #[doc = "db_api_pattern_requested()."]
    pub fn do_api_pattern_requested(
        path_query_fragment: &PathQueryFragment,
        host: &Host,
        screen: &Screen,
        api_pattern_requested_instance_option: Option<ApiPatternRequested>,
        debugger: &Debugger,
    ) -> Option<String> {
        // log ApiPatternRequested instance
        //debugger.log(DEBUG, file!(), format!("{}", line!()).as_str());
        match api_pattern_requested_instance_option {
            Some(api_pattern_requested_instance) => {
                // log ApiPatternRequested instance
                let api_pattern_requested_debug = api_pattern_requested_instance.get_pretty();
                debugger.log_data(DATA, &api_pattern_requested_debug);
                // check UPK user_pass_key
                // is this a manifest with UpkType::Protected?
                let manifest = api_pattern_requested_instance.get_manifest_selected();
                match screen.get_upk_type(manifest) {
                    UpkType::Protected => {
                        // check upk parameter
                        // upk parameter value from user must match USER_PASSKEY const in site_configuration
                        if path_query_fragment.get_query_instance().get_known_parameters_instance().get_upk_parameter().get_value() == USER_PASSKEY.to_string() {
                            println!("api debug: Upk::Selected UPK matched; OK to proceed.");
                            println!("api debug: upk_parameter: {}", path_query_fragment.get_query_instance().get_known_parameters_instance().get_upk_parameter());
                            println!("api debug: user_passkey: {}", USER_PASSKEY);
                        } else {
                            // not allowed
                            // send 404
                            println!("api debug: UPK failed.");
                            return None;
                        }
                    },
                    UpkType::None => {
                        // ok to proceed
                        println!("api debug: Upk::None.");
                    },                   
                }
                // get data from database //
                let result = controller2modeller::do_query(
                    &api_pattern_requested_instance,
                    &path_query_fragment,
                    &screen,
                    &debugger,
                );
                // see what happened
                // so just like that the database has told...
                // ...its truth and we are processing the data...
                // ...to give back to the requester
                // preliminary calculations
                // log the row_type
                let row_type = api_pattern_requested_instance.get_row_type();
                let row_type_string = row_type.to_string();
                debugger.log_data(DATA, format!("row_type: {}", row_type_string).as_str());
                // match
                let html_content = match result {
                    Ok(vector_of_boxed_rows) => {
                        let element_count = vector_of_boxed_rows.len();
                        println!(
                            "api debug: do_query result: element_count: {}",
                            element_count
                        );
                        // looks like there is data from the database
                        // process this data into the output
                        let suitcase_instance = Suitcase::new(
                            &path_query_fragment,
                            &api_pattern_requested_instance,
                            &host,
                        );
                        // let the viewer have its say
                        // this does not sink back into the guts of the controller but is sitting here in the database_server.
                        // html_content
                        viewer::make_viewable(row_type, &suitcase_instance, &vector_of_boxed_rows)
                    }
                    Err(e) => {
                        panic!("api error: no html_content, error: {}", e);
                    }
                };
                // log size of html_content
                let html_content_size = format!(
                    "api debug: html_content size in bytes: {}",
                    html_content.len()
                );
                debugger.log_data(DATA, &html_content_size);
                // return
                return Some(html_content);
            }
            None => {
                debugger.log_data(NONE, "api_pattern_requested: None");
                return None;
            }
        };
    }
}

/* end */
