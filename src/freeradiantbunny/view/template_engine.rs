// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

use crate::freeradiantbunny::controller::library::suitcase::suitcase::Suitcase;
use crate::freeradiantbunny::model::manifest::scrubber::Scrubber;
use crate::freeradiantbunny::site_configuration::site_configuration::{
    DESCRIPTION, HEAD_TITLE, HOME_HREF, HOME_TITLE, LOGO_CLASS, LOGO_SRC, SITE_NAME, SITE_STYLE,
    SITE_TAGLINE,
};
use crate::freeradiantbunny::view::moulder::style_manager::StyleManager;
use crate::freeradiantbunny::view::moulder::webpage::menu::Menu;
use crate::freeradiantbunny::view::moulder::webpage::table_headers::TableHeaders;
/// template_engine - manages the webpage template
use askama::Template;

// many
// the field names of structure below should match variable names in template
#[doc = "The TemplateVariables structure."]
#[derive(Template)]
#[template(path = "standard_many.html")]
struct TemplateVariables<'a> {
    head_title: &'a str,
    site_style: &'a str,
    description: &'a str,
    home_href: &'a str,
    home_title: &'a str,
    logo_src: &'a str,
    logo_class: &'a str,
    freeradiantbunny_home_href: &'a str,
    site_name: &'a str,
    site_tagline: &'a str,
    goto_menu: &'a str,
    message_form_flag: &'a str,
    table_title: &'a str,
    table_title_flag: &'a str,
    data_exists_flag: &'a str,
    socket_io_flag: &'a str,
    search_form_flag: &'a str,
    vector_of_boxed_rows: &'a Vec<Box<dyn Scrubber>>,
    table_headers_instance: &'a TableHeaders<'a>,
    style_manager_instance: &'a StyleManager<'a>,
    // api
    classes_name: &'a str,
}

// one
// the field names of structure below...
// ...should match variable names in template
#[doc = "The TemplateVariablesOne structure."]
#[derive(Template)]
#[template(path = "standard_one.html")]
struct TemplateVariablesOne<'a> {
    head_title: &'a str,
    site_style: &'a str,
    description: &'a str,
    home_href: &'a str,
    home_title: &'a str,
    logo_src: &'a str,
    logo_class: &'a str,
    freeradiantbunny_home_href: &'a str,
    site_name: &'a str,
    site_tagline: &'a str,
    goto_menu: &'a str,
    message_form_flag: &'a str,
    table_title: &'a str,
    table_title_flag: &'a str,
    data_exists_flag: &'a str,
    socket_io_flag: &'a str,
    search_form_flag: &'a str,
    // note about the following line: data field not needed; there is one row; find it in table_header
    //vector_of_boxed_rows
    table_headers_instance: &'a TableHeaders<'a>,
    style_manager_instance: &'a StyleManager<'a>,
    // api
    // not needed for RowType::One
    //classes_name: &'a str,
}

// referenced
// the field names of structure below...
// ...should match variable names in template
#[doc = "The TemplateVariablesReferenced structure."]
#[derive(Template)]
#[template(path = "standard_referenced.html")]
struct TemplateVariablesReferenced<'a> {
    head_title: &'a str,
    site_style: &'a str,
    description: &'a str,
    home_href: &'a str,
    home_title: &'a str,
    logo_src: &'a str,
    logo_class: &'a str,
    freeradiantbunny_home_href: &'a str,
    site_name: &'a str,
    site_tagline: &'a str,
    goto_menu: &'a str,
    message_form_flag: &'a str,
    table_title: &'a str,
    table_title_flag: &'a str,
    data_exists_flag: &'a str,
    socket_io_flag: &'a str,
    search_form_flag: &'a str,
    vector_of_boxed_rows: &'a Vec<Box<dyn Scrubber>>,
    table_headers_instance: &'a TableHeaders<'a>,
    style_manager_instance: &'a StyleManager<'a>,
    // api
    classes_name: &'a str,
}

#[doc = "The TemplateEngine structure."]
pub struct TemplateEngine {}

#[doc = "The TemplateEngine implementation."]
impl TemplateEngine {
    #[doc = "new()"]
    pub fn new() -> TemplateEngine {
        let template_engine_instance = TemplateEngine {};
        template_engine_instance
    }
    #[doc = "render()"]
    pub fn render<'a>(
        &self,
        suitcase: &Suitcase,
        vector_of_boxed_rows: &'a Vec<Box<dyn Scrubber>>,
        table_headers_instance: &TableHeaders,
        style_manager_instance: &StyleManager,
        menu: &Menu,
        table_title: &String,
    ) -> String {
        let classes_name = suitcase
            .get_api_pattern_requested()
            .get_manifest_selected()
            .get_string();
        // debug
        //println!("template_engine: classes_name: {}", classes_name);
        // decide many or one
        match suitcase
            .get_api_pattern_requested()
            .get_id_candidate_option()
        {
            Some(_) => {
                // decide one or referenced
                match suitcase
                    .get_api_pattern_requested()
                    .get_referenced_type_option()
                {
                    Some(_) => {
                        // referenced table exists
                        // so try to out put is
                        // and with given id_candidate
                        // this must be a one row
                        // create structure same as the many page
                        // referenced uses many standard template
                        let template_variables_referenced = TemplateVariablesReferenced {
                            head_title: HEAD_TITLE,
                            site_style: SITE_STYLE,
                            description: DESCRIPTION,
                            home_href: HOME_HREF,
                            home_title: HOME_TITLE,
                            logo_src: LOGO_SRC,
                            logo_class: LOGO_CLASS,
                            freeradiantbunny_home_href: "frb-home-ref",
                            site_name: SITE_NAME,
                            site_tagline: SITE_TAGLINE,
                            goto_menu: &menu.get_goto_menu(),
                            message_form_flag: "false",
                            table_title: table_title,
                            table_title_flag: "true",
                            data_exists_flag: "true",
                            socket_io_flag: "false",
                            search_form_flag: "false",
                            vector_of_boxed_rows: &vector_of_boxed_rows,
                            table_headers_instance: table_headers_instance,
                            style_manager_instance: style_manager_instance,
                            // api
                            classes_name: &classes_name,
                        };
                        template_variables_referenced.render().unwrap()
                    }
                    None => {
                        // no, referenced
                        // and with an id_candidate
                        // this must be a one row
                        // one
                        // create structure
                        let template_variables_one = TemplateVariablesOne {
                            head_title: HEAD_TITLE,
                            site_style: SITE_STYLE,
                            description: DESCRIPTION,
                            home_href: HOME_HREF,
                            home_title: HOME_TITLE,
                            logo_src: LOGO_SRC,
                            logo_class: LOGO_CLASS,
                            freeradiantbunny_home_href: "frb-home-ref",
                            site_name: SITE_NAME,
                            site_tagline: SITE_TAGLINE,
                            goto_menu: &menu.get_goto_menu(),
                            message_form_flag: "false",
                            table_title: table_title,
                            table_title_flag: "true",
                            data_exists_flag: "true",
                            socket_io_flag: "false",
                            search_form_flag: "false",
                            // turn off for one page
                            table_headers_instance: table_headers_instance,
                            style_manager_instance: style_manager_instance,
                            // api
                            // not needed for Rowtype::One
                            //classes_name: &classes_name,
                        };
                        template_variables_one.render().unwrap()
                    }
                }
            }
            None => {
                // many
                // create structure
                let template_variables = TemplateVariables {
                    head_title: HEAD_TITLE,
                    site_style: SITE_STYLE,
                    description: DESCRIPTION,
                    home_href: HOME_HREF,
                    home_title: HOME_TITLE,
                    logo_src: LOGO_SRC,
                    logo_class: LOGO_CLASS,
                    freeradiantbunny_home_href: "frb-home-ref",
                    site_name: SITE_NAME,
                    site_tagline: SITE_TAGLINE,
                    goto_menu: &menu.get_goto_menu(),
                    message_form_flag: "false",
                    table_title: table_title,
                    table_title_flag: "true",
                    data_exists_flag: "true",
                    socket_io_flag: "false",
                    search_form_flag: "false",
                    vector_of_boxed_rows: &vector_of_boxed_rows,
                    table_headers_instance: table_headers_instance,
                    style_manager_instance: style_manager_instance,
                    // api
                    classes_name: &classes_name,
                };
                template_variables.render().unwrap()
            }
        }
    }
}

/* end */
