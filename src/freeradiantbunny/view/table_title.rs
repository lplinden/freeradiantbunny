// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// table_title - Constructs the title of the webpage's table.
use crate::freeradiantbunny::controller::api::api_pattern_requested;
use crate::freeradiantbunny::controller::characters::{SEMICOLON, SLASH};
use crate::freeradiantbunny::controller::library::suitcase::suitcase::Suitcase;
use crate::freeradiantbunny::site_configuration::site_configuration::URL_SCHEME;
use crate::freeradiantbunny::site_configuration::site_configuration::BASE_DIRECTORY;

pub fn get_table_title_with_hyperlink(suitcase: &Suitcase) -> String {
    let found_known_host = suitcase.get_host().get_found_known_host();
    let no_underscore_name = switch_underscores(
        suitcase
            .get_api_pattern_requested()
            .get_manifest_selected()
            .to_string()
            .as_str(),
    );
    let table_title = if suitcase.get_api_pattern_requested().is_referenced_type()
        && suitcase.get_api_pattern_requested().is_id_candidate()
    {
        // classes_name and referenced_name
        format!(
            "{} which have {} id = {}",
            no_underscore_name,
            api_pattern_requested::convert_option_referenced_to_string(
                suitcase
                    .get_api_pattern_requested()
                    .get_referenced_type_option()
            ),
            api_pattern_requested::convert_option_i32_to_string(
                suitcase
                    .get_api_pattern_requested()
                    .get_id_candidate_option()
            )
        )
    } else {
        // just the classes_name
        no_underscore_name
    };
    // make a hyperlink
    let this_classes_home_url = format!(
        "{}{}{}{}{}{}{}{}",
        URL_SCHEME,
        SEMICOLON,
        SLASH,
        SLASH,
        found_known_host,
	BASE_DIRECTORY,
	SLASH,
        suitcase
            .get_api_pattern_requested()
            .get_manifest_selected()
            .to_string()
    );
    //let manifest = suitcase.get_api_pattern_requested().get_manifest_selected();
    let table_title_with_hyperlink = format!(
        "<a style=\"text-decoration: none; color: #000000;\" class=\"nolink\" href=\"{}\">{}</a>",
        this_classes_home_url, table_title
    );
    table_title_with_hyperlink
}

#[doc = "switch_underscores() is a formatting utility function."]
pub fn switch_underscores(input: &str) -> String {
    input.replace('_', " ")
}

/* end */
