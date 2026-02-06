// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// suitcase - structure to hold references to other structs
use crate::freeradiantbunny::controller::api::api_pattern_requested::ApiPatternRequested;
use crate::freeradiantbunny::controller::library::hosts::host::Host;
use crate::freeradiantbunny::controller::library::path_query_fragments::path_query_fragment::PathQueryFragment;

#[doc = "The Suitcase structure."]
pub struct Suitcase<'a> {
    path_query_fragment: &'a PathQueryFragment,
    api_pattern_requested: &'a ApiPatternRequested,
    host: &'a Host,
}

#[doc = "The Suitcase implementation."]
impl Suitcase<'_> {
    pub fn new<'a>(
        path_query_fragment: &'a PathQueryFragment,
        api_pattern_requested: &'a ApiPatternRequested,
        host: &'a Host,
    ) -> Suitcase<'a> {
        let suitcase = Suitcase {
            path_query_fragment,
            api_pattern_requested,
            host,
        };
        suitcase
    }
    pub fn get_path_query_fragment(&self) -> &PathQueryFragment {
        self.path_query_fragment
    }
    pub fn get_api_pattern_requested(&self) -> &ApiPatternRequested {
        self.api_pattern_requested
    }
    pub fn get_host(&self) -> &Host {
        self.host
    }
}

/* end */
