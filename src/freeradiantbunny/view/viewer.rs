// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.6

/// viewer - works with the model and the controller
// structures
use crate::freeradiantbunny::controller::library::suitcase::suitcase::Suitcase;
use crate::freeradiantbunny::model::manifest::scrubber::Scrubber;
use crate::freeradiantbunny::model::persistent::row_type::RowType;
use crate::freeradiantbunny::view::markup;
// constants
use crate::freeradiantbunny::controller::api::api_constants::{
    KNOWN_KEY_VIEW, KNOWN_KEY_VIEW_VALUE_HTML, KNOWN_KEY_VIEW_VALUE_TEXT, KNOWN_KEY_VIEW_VALUE_HTMX,
};

#[doc = "make_viewwable()."]
pub fn make_viewable(
    row_type: RowType,
    suitcase: &Suitcase,
    vector_of_boxed_rows: &Vec<Box<dyn Scrubber>>,
    //screen: &Screen
) -> String {
    match suitcase
        .get_path_query_fragment()
        .get_query_instance()
        .get_known_parameters_instance()
        .get_view_parameter()
        .is_valid_value()
    {
        true => {
            let valid_value = suitcase
                .get_path_query_fragment()
                .get_query_instance()
                .get_known_parameters_instance()
                .get_view_parameter()
                .get_valid_value();
            match valid_value.as_str() {
                KNOWN_KEY_VIEW_VALUE_HTML => {
                    // make html
                    return do_html(&suitcase, &vector_of_boxed_rows, row_type);
                }
                KNOWN_KEY_VIEW_VALUE_TEXT => {
                    // send command-line version
                    return do_text(suitcase);
                }
	        KNOWN_KEY_VIEW_VALUE_HTMX => {
                    // make htmx
		    // real-time
		    // changes to database reflected on webpage
                    return do_htmx(&suitcase, &vector_of_boxed_rows, row_type);
                }
                _ => {
                    // todo bubble up the error
                    panic!("viewer error: panic during match should not be here.");
                }
            };
        }
        false => {
            let error_message_for_user = format!(
                "Error: the URL had an unknown value for {} parameter key.",
                KNOWN_KEY_VIEW
            );
            error_message_for_user
        }
    }
}
#[doc = "do_html()."]
fn do_html(
    suitcase: &Suitcase,
    vector_of_boxed_rows: &Vec<Box<dyn Scrubber>>,
    //screen: &Screen,
    row_type: RowType,
) -> String {
    markup::do_html(&suitcase, vector_of_boxed_rows, row_type)
}
#[doc = "do_text()."]
fn do_text(suitcase: &Suitcase) -> String {
    // text generation implemented here
    // loop data and store in string
    let classes_name = suitcase
        .get_api_pattern_requested()
        .get_manifest_selected()
        .get_string();
    // output data
    let string_from_database = format!("{}\n", classes_name);
    // and the elment equated to a row
    // because it had get_sort() and do on
    // it was fully-functionalized
    // archive code museum displays the line below
    // for element in (*struct_of_table_instance).iter() {
    // return
    string_from_database
}
#[doc = "do_htmx()."]
fn do_htmx(
    suitcase: &Suitcase,
    vector_of_boxed_rows: &Vec<Box<dyn Scrubber>>,
    //screen: &Screen,
    row_type: RowType,
) -> String {
  // start the real-time engine with stage
  // create sprites and load the stage with sprites
  // send the real-time engine handle to user menu
  markup::do_htmx(&suitcase, vector_of_boxed_rows, row_type)
}
/* end */
