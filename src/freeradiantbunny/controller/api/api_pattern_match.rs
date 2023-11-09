// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

use crate::freeradiantbunny::controller::api::api::Api;
use crate::freeradiantbunny::controller::api::api_constants::{DATA, HOMEPAGE_PAGENAME, HTTP_404};
/// api_pattern_match - enforces the patterns of freeradiantbunny API
use crate::freeradiantbunny::controller::api::api_pattern_requested::ApiPatternRequested;
use crate::freeradiantbunny::controller::characters::{NULL_STR, SLASH};
use crate::freeradiantbunny::controller::debugger::Debugger;
use crate::freeradiantbunny::controller::library::filename::filename::Filename;
use crate::freeradiantbunny::controller::library::hosts::host::Host;
use crate::freeradiantbunny::controller::library::path_query_fragments::path_query_fragment::PathQueryFragment;
use crate::freeradiantbunny::model::manifest::screen::Screen;
use crate::freeradiantbunny::site_configuration::site_configuration::DEFAULT_HOST_DIR;

#[doc = "This private function checks the unfoound_sanitized_path against the designed patterns of the freeradiantbunny API."]
pub fn pattern_match_api(
    debugger: &Debugger,
    path_query_fragment_instance: &PathQueryFragment,
    screen: &Screen,
    host_instance: &Host,
) -> (Option<ApiPatternRequested>, Filename) {
    // log debug string
    //debugger.log(DEBUG, file!(), format!("{}", line!()).as_str());
    // declare variable to return...
    // ...and set to default of error webpage
    // log filename_instance data
    debugger.log_data(
        DATA,
        format!(
            "is_unfound_sanitized_path: ({})",
            path_query_fragment_instance
                .get_path_instance()
                .is_unfound_sanitized_path()
        )
        .as_str(),
    );
    // freeradiantbunny API
    // split by slash
    if !path_query_fragment_instance
        .get_path_instance()
        .is_unfound_sanitized_path()
    {
        panic!("api error: unfound_santized_path is not found.");
    }
    // dissect the inbound string
    // split on SLASH char
    let binding = path_query_fragment_instance
        .get_path_instance()
        .get_unfound_sanitized_path();
    // match API patters using all the parts of the path...
    // ...after being split by slash
    // so, split by slash
    let slashed_paths: Vec<&str> = binding.split(SLASH).collect();
    // now, match API patterns
    let api_pattern = match slashed_paths.len() {
        2 => {
            if slashed_paths[0] == NULL_STR && screen.is_classes_name(slashed_paths[1]) {
                Api::Classes
            } else {
                Api::Http404
            }
        }
        3 => {
            if slashed_paths[0] == NULL_STR
                && screen.is_classes_name(slashed_paths[1])
                && slashed_paths[2] == NULL_STR
            {
                Api::Classes
            } else if slashed_paths[0] == NULL_STR
                && screen.is_classes_name(slashed_paths[1])
                && slashed_paths[2] == HOMEPAGE_PAGENAME
            {
                Api::Classes
            } else if slashed_paths[0] == NULL_STR
                && screen.is_classes_name(slashed_paths[1])
                && screen.is_id_candidate(slashed_paths[2])
            {
                Api::IdCandidate
            } else {
                Api::Http404
            }
        }
        4 => {
            if slashed_paths[0] == NULL_STR
                && screen.is_classes_name(slashed_paths[1])
                && screen.is_referenced_classes_name(slashed_paths[1], slashed_paths[2])
                && screen.is_id_candidate(slashed_paths[3])
            {
                Api::Referenced
            } else {
                Api::Http404
            }
        }
        _ => Api::Http404,
    };
    // now examine the pattern that has resulted
    match api_pattern {
        Api::Classes => {
            return screen.do_classes(host_instance, slashed_paths[1]);
        }
        Api::IdCandidate => {
            return screen.do_id_candidate(host_instance, slashed_paths[1], slashed_paths[2]);
        }
        Api::Referenced => {
            return screen.do_referenced(
                host_instance,
                slashed_paths[1],
                slashed_paths[2],
                slashed_paths[3],
            );
        }
        Api::Http404 => {
            // 404
            let webpage_filename = Filename::new(DEFAULT_HOST_DIR, HTTP_404);
            return (None, webpage_filename);
        }
    }
}

/* end */
