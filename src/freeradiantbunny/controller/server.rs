// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// server - entrance to freeradiantbunny application
// structures
use crate::freeradiantbunny::controller::api::api::Api;
use crate::freeradiantbunny::controller::bootstrap::Bootstrap;
use crate::freeradiantbunny::controller::library::filename::filename::Filename;
use crate::freeradiantbunny::model::manifest::screen::Screen;
// constants
use crate::freeradiantbunny::controller::api::api_constants::{DATA, HTTP_404, NONE, PANIC};
use crate::freeradiantbunny::site_configuration::site_configuration::DEFAULT_HOST_DIR;

#[doc = "This first function validates the requested_data and then compares it the patterns of the freeradiantbunny API. Entrance to freeradiantbunny application."]
pub fn serve_webpage(request_data: &str) -> String {
    // bootstrap the bootstrap
    let bootstrap = Bootstrap::new();
    // load via the bootstrap
    let debugger = bootstrap.boot_debugger();
    let request = bootstrap.boot_request(request_data, &debugger);
    let path_query_fragment = bootstrap.boot_path_query_fragment(&request, &debugger);
    let host = match bootstrap.boot_host(request_data, &debugger) {
        Ok(host) => {
            // log
            let host_debug = host.get_pretty();
            debugger.log_data(DATA, &host_debug);
            // return
            host
        }
        Err(e) => {
            // error
            // use debugger to log a message via the log
            let panic_debug = format!(
                "server panic: failed to boot_host() meaning no host requested: error: {}",
                e
            );
            debugger.log_data(PANIC, &panic_debug);
            return send_404();
        }
    };
    // create the screen which hold the classes definitions
    let screen = Screen::new();
    // solve for the API
    let (api_pattern_requested_instance_option, webpage_filename) =
        Api::do_api(&debugger, &path_query_fragment, &screen, &host);
    // debugger
    // log filename_instance data
    debugger.log_data(
        DATA,
        format!("filename_instance: {}", webpage_filename.get_pretty()).as_str(),
    );
    // given the api_pattern_requested instance that was just created...
    // ...now see what that api_pattern_requested represents
    let html_content_option: Option<String> = Api::do_api_pattern_requested(
        &path_query_fragment,
        &host,
        &screen,
        api_pattern_requested_instance_option,
        &debugger,
    );
    // ...so we took the api_pattern_requested...
    // ...and tried to find what webpage it represented
    // let us now see what happened when...
    match html_content_option {
        Some(html_content) => {
            // looks like we got us some database data...
            // ...so now we send it back
            //here now is the response being returned
            // encased in HTTP response, a wepage is served
            return_http_200_with_html_content(html_content)
        }
        None => {
            // log
            let none_debug = format!(
                "server error: failed to match html_content: webpage_filename: {}",
                webpage_filename.get_fullpath_filename()
            );
            debugger.log_data(NONE, &none_debug);
            // serve a webpage
            let webpage_filename_debug = webpage_filename.get_pretty();
            debugger.log_data(DATA, &webpage_filename_debug);
            // check if webpage_filename path exists
            if webpage_filename.exists() {
                // log
                let webpage_filename_debug = webpage_filename.get_pretty();
                println!("webpage_filename: {}", webpage_filename_debug);
                debugger.log_data(DATA, &webpage_filename_debug);
                // read webpage file...
                // ...and encase the webpage string...
                // ...within an HTTP response
                let html_content = webpage_filename.read();
                return_http_200_with_html_content(html_content)
            } else {
                return send_404();
            }
        }
    }
}

#[doc = "This function places the webpage with a 200 HTTP Response Code."]
fn return_http_200_with_html_content(html_content: String) -> String {
    // cobmines HTTP status response with html content
    return format!(
        "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\n\r\n{}",
        html_content.len(),
        html_content
    );
}

#[doc = "This function places the webpage with a 404 HTTP Response Code."]
fn send_404() -> String {
    // serve up the HTTP 404 response status code;
    let webpage_filename = Filename::new(DEFAULT_HOST_DIR, HTTP_404);
    // read
    let html_content = format!("{}", webpage_filename.read());
    // return
    return format!(
        "HTTP/1.1 404 OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\n\r\n{}",
        html_content.len(),
        html_content
    );
}

/* end */
