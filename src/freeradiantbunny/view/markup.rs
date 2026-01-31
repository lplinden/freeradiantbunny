// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

use crate::freeradiantbunny::controller::library::suitcase::suitcase::Suitcase;
/// markup - manages the generation of HTML and other website parts
use crate::freeradiantbunny::model::manifest::column_type::convert_str_to_type;
use crate::freeradiantbunny::model::manifest::column_type::ColumnType;
use crate::freeradiantbunny::model::manifest::column_type::{ID, NUM};
use crate::freeradiantbunny::model::manifest::scrubber::Scrubber;
use crate::freeradiantbunny::model::persistent::row_type::RowType;
use crate::freeradiantbunny::view::moulder::style_manager::StyleManager;
use crate::freeradiantbunny::view::moulder::styled_data::StyledData;
use crate::freeradiantbunny::view::moulder::webpage::menu::Menu;
use crate::freeradiantbunny::view::table_title;
use crate::freeradiantbunny::view::template_engine::TemplateEngine;
//use crate::freeradiantbunny::site_configuration::site_configuration::{
//    WEBSITE_NAME,
//};
use crate::freeradiantbunny::view::moulder::webpage::table_headers::{TableHeader, TableHeaders};

#[doc = "The markup has a major function called do_html() and some minor functions."]
pub fn do_html(
    suitcase: &Suitcase,
    vector_of_boxed_rows: &Vec<Box<dyn Scrubber>>,
    //screen: &Screen,
    row_type: RowType,
) -> String {
    // first, there is set-up
    // set-up
    // create and then set head title
    /*
            let head_title = if suitcase.get_api_pattern_requested().is_id_candidate() {
                let id_candidate = converts::convert_option_i32_to_string(
                    suitcase
                        .get_api_pattern_requested()
                        .get_id_candidate_option(),
                );
                format!(
                    "{} {} - {}",
                    suitcase
                        .get_api_pattern_requested()
                        .get_manifest_selected()
                        .get_string(),
                    id_candidate,
                    WEBSITE_NAME
                )
            } else {
                format!(
                    "{} - {}",
                    suitcase
                        .get_api_pattern_requested()
                        .get_manifest_selected()
                        .get_string(),
                    WEBSITE_NAME
                )
            };
    */
    // set table_title
    let table_title = table_title::get_table_title_with_hyperlink(suitcase);
    // set head_title
    //webpage_manifest_instance.set_head_title(head_title);
    // create table_headers_instance
    let mut table_header_vec: Vec<TableHeader> = vec![];
    // delare a variable to load here and then use down below
    let mut column_name_vec: Vec<String> = vec![];
    // declare a variable to hold the first row
    let first_row: &Box<dyn Scrubber>;
    if let Some(found_first_row) = vector_of_boxed_rows.get(0) {
        // ok
        first_row = found_first_row;
    } else {
        panic!("markup debug: no first scrubber.");
    }
    // declare for other parts of webpage
    // (like for the table header)
    let mut id: i32 = 0;
    // deal with column_names
    // loop first to get id
    for field_box in first_row.get_field_boxes() {
        let column_name = field_box.get_column_type().to_string();
        // debug
        //println!("markup field_boxes column_name: {}", column_name);
        if column_name == ID.to_string() {
            // get id
            id = field_box
                .get_value_i32()
                .expect("markup error failed to get id.");
        }
    }
    // loop again to get data
    for field_box in first_row.get_field_boxes() {
        let column_name = field_box.get_column_type().to_string();
        // debug
        //println!("markup loop column_name: {}", column_name);
        column_name_vec.push(column_name.clone());
        // skip metadata
        if column_name == NUM.to_string() {
            // do not display num in the table
            continue;
        }
        // i32
        let option_i32 = field_box.get_value_i32();
        match option_i32 {
            Some(data) => {
                let row_one_data = format!("{}", data);
                let table_header_instance = TableHeader::new(&column_name, &row_one_data, id);
                table_header_vec.push(table_header_instance);
            }
            None => {
                // ok, no message needed
                //println!("markup failed to get column_names i32. {}", column_name);
            }
        };
        // string
        let option_string = field_box.get_value_string();
        match option_string {
            Some(data) => {
                let row_one_data = format!("{}", data);
                let table_header_instance = TableHeader::new(&column_name, &row_one_data, id);
                table_header_vec.push(table_header_instance);
            }
            None => {
                // ok, no message needed
                //println!("markup failed to get column_names string. {}", column_name);
            }
        };
        // bool
        let option_bool = field_box.get_value_bool();
        match option_bool {
            Some(data) => {
                let row_one_data = format!("{}", data);
                let table_header_instance = TableHeader::new(&column_name, &row_one_data, id);
                table_header_vec.push(table_header_instance);
            }
            None => {
                // ok, no message needed
                //println!("markup failed to get column_names bool. {}", column_name);
            }
        };
    }
    // now, store the data that was just gathered
    let table_headers_instance: TableHeaders = TableHeaders::new(&table_header_vec);
    // more set-up
    // get styles based upon header and classes_name
    let mut styled_data_vec: Vec<StyledData> = vec![];
    let mut style_manager_instance = StyleManager::new(&mut styled_data_vec);
    //
    // spcial interlude
    // the design issue is that he standard_one template outputs each row data element to a row of its own (as opposed to the template many where all the row data goes on one row)
    // currently, the data is store in TablHeeader,...
    // ...because it is already to be display in rows.
    // but now the task at hand is the stylize all the data
    // loop through all the data...
    // well, if the row_type is one, a loop before the main loop
    if row_type == RowType::One {
        // loop through all the data (which is only one row)
        //for boxed_scrubber in (*struct_of_table_instance).iter()
        for table_header in table_headers_instance.get_table_headers() {
            // process the data here
            // debug
            //println!("markup debug table_header column_name: {}, value: {}", table_header.get_name(), table_header.get_value());
            let column_type_option = convert_str_to_type(table_header.get_name().as_str());
            match column_type_option {
                Some(column_type) => {
                    style_manager_instance.get_stylized_for_table_header(
                        suitcase.get_api_pattern_requested().get_manifest_selected(),
                        suitcase
                            .get_api_pattern_requested()
                            .get_referenced_type_option(),
                        &table_header,
                        &column_type,
                        &row_type,
                    );
                }
                None => {
                    panic!(
                        "markup error: failed with column_type_option: table_header name: {}",
                        table_header.get_name()
                    );
                }
            };
        }
    };
    // end special interlude
    // now back to regularly-schedule program
    // the main loop
    // loop through all data...
    // ... and (1) process data and (2) generate styles_properties
    // loop through each row
    // archived line of code
    // for boxed_scrubber in (*struct_of_table_instance).iter() {
    for boxed_row in vector_of_boxed_rows.iter() {
        // debug
        //println!("markup boxed_row: {}", boxed_row);
        // and for that row, loop through each column_name from db
        for column_name in &mut column_name_vec {
            // debug
            //println!("markup debug: column_name: {}", &column_name);
            let column_type_option: Option<ColumnType> = convert_str_to_type(&column_name);
            // todo clean this up...
            // ...(now that it is defined)
            // stylize the td in the html table...
            // ...and the data inside
            // set fields here for style
            match column_type_option {
                Some(column_type) => {
                    style_manager_instance.get_stylized(
                        suitcase.get_api_pattern_requested().get_manifest_selected(),
                        suitcase
                            .get_api_pattern_requested()
                            .get_referenced_type_option(),
                        &boxed_row,
                        &column_type,
                        &row_type,
                    );
                }
                None => {
                    panic!(
                        "markup column_type is not known: column_name: {}",
                        column_name
                    );
                }
            };
        }
    }
    // solve for menu
    let menu = Menu::new();
    // have template_engine return the webpage as a string

    let template_engine_instance = TemplateEngine::new();
    template_engine_instance.render(
        &suitcase,
        //&struct_of_table_instance,
        vector_of_boxed_rows,
        &table_headers_instance,
        &style_manager_instance,
        //&mut data_for_one_vec,
        &menu,
        &table_title,
    )
}

#[doc = "The markup has a major function called do_htmx."]
pub fn do_htmx(
    suitcase: &Suitcase,
    vector_of_boxed_rows: &Vec<Box<dyn Scrubber>>,
    //screen: &Screen,
    row_type: RowType,
) -> String {
    // currently this mimics do_html()
    // first, there is set-up
    // set-up
    // create and then set head title
    /*
            let head_title = if suitcase.get_api_pattern_requested().is_id_candidate() {
                let id_candidate = converts::convert_option_i32_to_string(
                    suitcase
                        .get_api_pattern_requested()
                        .get_id_candidate_option(),
                );
                format!(
                    "{} {} - {}",
                    suitcase
                        .get_api_pattern_requested()
                        .get_manifest_selected()
                        .get_string(),
                    id_candidate,
                    WEBSITE_NAME
                )
            } else {
                format!(
                    "{} - {}",
                    suitcase
                        .get_api_pattern_requested()
                        .get_manifest_selected()
                        .get_string(),
                    WEBSITE_NAME
                )
            };
    */
    // set table_title
    let table_title = table_title::get_table_title_with_hyperlink(suitcase);
    // set head_title
    //webpage_manifest_instance.set_head_title(head_title);
    // create table_headers_instance
    let mut table_header_vec: Vec<TableHeader> = vec![];
    // delare a variable to load here and then use down below
    let mut column_name_vec: Vec<String> = vec![];
    // declare a variable to hold the first row
    let first_row: &Box<dyn Scrubber>;
    if let Some(found_first_row) = vector_of_boxed_rows.get(0) {
        // ok
        first_row = found_first_row;
    } else {
        panic!("markup debug: no first scrubber.");
    }
    // declare for other parts of webpage
    // (like for the table header)
    let mut id: i32 = 0;
    // deal with column_names
    // loop first to get id
    for field_box in first_row.get_field_boxes() {
        let column_name = field_box.get_column_type().to_string();
        // debug
        //println!("markup field_boxes column_name: {}", column_name);
        if column_name == ID.to_string() {
            // get id
            id = field_box
                .get_value_i32()
                .expect("markup error failed to get id.");
        }
    }
    // loop again to get data
    for field_box in first_row.get_field_boxes() {
        let column_name = field_box.get_column_type().to_string();
        // debug
        //println!("markup loop column_name: {}", column_name);
        column_name_vec.push(column_name.clone());
        // skip metadata
        if column_name == NUM.to_string() {
            // do not display num in the table
            continue;
        }
        // i32
        let option_i32 = field_box.get_value_i32();
        match option_i32 {
            Some(data) => {
                let row_one_data = format!("{}", data);
                let table_header_instance = TableHeader::new(&column_name, &row_one_data, id);
                table_header_vec.push(table_header_instance);
            }
            None => {
                // ok, no message needed
                //println!("markup failed to get column_names i32. {}", column_name);
            }
        };
        // string
        let option_string = field_box.get_value_string();
        match option_string {
            Some(data) => {
                let row_one_data = format!("{}", data);
                let table_header_instance = TableHeader::new(&column_name, &row_one_data, id);
                table_header_vec.push(table_header_instance);
            }
            None => {
                // ok, no message needed
                //println!("markup failed to get column_names string. {}", column_name);
            }
        };
        // bool
        let option_bool = field_box.get_value_bool();
        match option_bool {
            Some(data) => {
                let row_one_data = format!("{}", data);
                let table_header_instance = TableHeader::new(&column_name, &row_one_data, id);
                table_header_vec.push(table_header_instance);
            }
            None => {
                // ok, no message needed
                //println!("markup failed to get column_names bool. {}", column_name);
            }
        };
    }
    // now, store the data that was just gathered
    let table_headers_instance: TableHeaders = TableHeaders::new(&table_header_vec);
    // more set-up
    // get styles based upon header and classes_name
    let mut styled_data_vec: Vec<StyledData> = vec![];
    let mut style_manager_instance = StyleManager::new(&mut styled_data_vec);
    //
    // spcial interlude
    // the design issue is that he standard_one template outputs each row data element to a row of its own (as opposed to the template many where all the row data goes on one row)
    // currently, the data is store in TablHeeader,...
    // ...because it is already to be display in rows.
    // but now the task at hand is the stylize all the data
    // loop through all the data...
    // well, if the row_type is one, a loop before the main loop
    if row_type == RowType::One {
        // loop through all the data (which is only one row)
        //for boxed_scrubber in (*struct_of_table_instance).iter()
        for table_header in table_headers_instance.get_table_headers() {
            // process the data here
            // debug
            //println!("markup debug table_header column_name: {}, value: {}", table_header.get_name(), table_header.get_value());
            let column_type_option = convert_str_to_type(table_header.get_name().as_str());
            match column_type_option {
                Some(column_type) => {
                    style_manager_instance.get_stylized_for_table_header(
                        suitcase.get_api_pattern_requested().get_manifest_selected(),
                        suitcase
                            .get_api_pattern_requested()
                            .get_referenced_type_option(),
                        &table_header,
                        &column_type,
                        &row_type,
                    );
                }
                None => {
                    panic!(
                        "markup error: failed with column_type_option: table_header name: {}",
                        table_header.get_name()
                    );
                }
            };
        }
    };
    // end special interlude
    // now back to regularly-schedule program
    // the main loop
    // loop through all data...
    // ... and (1) process data and (2) generate styles_properties
    // loop through each row
    // archived line of code
    // for boxed_scrubber in (*struct_of_table_instance).iter() {
    for boxed_row in vector_of_boxed_rows.iter() {
        // debug
        //println!("markup boxed_row: {}", boxed_row);
        // and for that row, loop through each column_name from db
        for column_name in &mut column_name_vec {
            // debug
            //println!("markup debug: column_name: {}", &column_name);
            let column_type_option: Option<ColumnType> = convert_str_to_type(&column_name);
            // todo clean this up...
            // ...(now that it is defined)
            // stylize the td in the html table...
            // ...and the data inside
            // set fields here for style
            match column_type_option {
                Some(column_type) => {
                    style_manager_instance.get_stylized(
                        suitcase.get_api_pattern_requested().get_manifest_selected(),
                        suitcase
                            .get_api_pattern_requested()
                            .get_referenced_type_option(),
                        &boxed_row,
                        &column_type,
                        &row_type,
                    );
                }
                None => {
                    panic!(
                        "markup column_type is not known: column_name: {}",
                        column_name
                    );
                }
            };
        }
    }
    // solve for menu
    let menu = Menu::new();
    // have template_engine return the webpage as a string

    let template_engine_instance = TemplateEngine::new();
    template_engine_instance.render(
        &suitcase,
        //&struct_of_table_instance,
        vector_of_boxed_rows,
        &table_headers_instance,
        &style_manager_instance,
        //&mut data_for_one_vec,
        &menu,
        &table_title,
    )
}

/* end */
