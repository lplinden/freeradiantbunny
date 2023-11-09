// Freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// serve_database - bridge to database
// import
//use tokio_postgres::Error;
// structures
use crate::freeradiantbunny::controller::api::api_pattern_requested::ApiPatternRequested;
use crate::freeradiantbunny::controller::debugger::Debugger;
use crate::freeradiantbunny::controller::library::path_query_fragments::path_query_fragment::PathQueryFragment;
use crate::freeradiantbunny::model::manifest::screen::Screen;
use crate::freeradiantbunny::model::manifest::scrubber::Scrubber;
use crate::freeradiantbunny::model::persistent::database;

#[doc = "DatabaseServe is a focal point because this is where the controller provides the request package to the database. Use the doQuery()."]
pub fn do_query(
    api_pattern_requested_instance: &ApiPatternRequested,
    path_query_fragment_instance: &PathQueryFragment,
    screen: &Screen,
    debugger: &Debugger,
) -> Result<Vec<Box<dyn Scrubber>>, tokio_postgres::Error> {
    // first, declare some variables needed for the loops
    // access the database
    // archived line of code
    // The data go sent to the screen
    // let result: Result<Vec<Box<dyn Scrubber>>, Error> = database_instance.do_query(
    let result: Result<Vec<Box<dyn Scrubber>>, tokio_postgres::Error> = database::do_query(
        &api_pattern_requested_instance,
        path_query_fragment_instance
            .get_query_instance()
            .get_known_parameters_instance()
            .get_sort_parameter()
            .get_value_as_paramsort(),
        &screen,
        &debugger,
    );
    result
}

/* end */
