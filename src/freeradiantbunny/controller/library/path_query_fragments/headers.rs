// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// headers - models HTTP headers that are incoming
// constants
use crate::freeradiantbunny::controller::api::api_constants::KEYWORD_HOST;

#[doc = "This private function parses the headers."]
pub fn get_host(request_data: &str) -> Option<&str> {
    // try to get the host variable from the headers
    let headers = parse_headers(request_data);
    for (name, value) in &headers {
        if name.to_string() == KEYWORD_HOST {
            // return host
            return Some(*value);
        }
    }
    // failed getting host
    None
}

#[doc = "This private function parses the headers."]
fn parse_headers(request: &str) -> Vec<(&str, &str)> {
    let mut headers = Vec::new();
    let lines = request.lines();
    // loop
    for line in lines {
        if line.trim().is_empty() {
            break; // Empty line indicates end of headers
        }
        let parts: Vec<&str> = line.splitn(2, ": ").collect();
        if parts.len() == 2 {
            headers.push((parts[0], parts[1]));
        }
    }
    headers
}

/* end */
