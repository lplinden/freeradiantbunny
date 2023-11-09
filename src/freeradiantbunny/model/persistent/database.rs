// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

use crate::freeradiantbunny::controller::api::api::Api;
use crate::freeradiantbunny::controller::api::api_constants::DATA;
use crate::freeradiantbunny::controller::api::api_pattern_requested::ApiPatternRequested;
use crate::freeradiantbunny::controller::debugger::Debugger;
use crate::freeradiantbunny::model::manifest::column_type::ColumnType;
use crate::freeradiantbunny::model::manifest::field_box::FieldBox;
use crate::freeradiantbunny::model::manifest::manifest::Manifest;
use crate::freeradiantbunny::model::manifest::referenced_host::ReferencedHost;
use crate::freeradiantbunny::model::manifest::row::Row;
use crate::freeradiantbunny::model::manifest::screen::Screen;
use crate::freeradiantbunny::model::manifest::scrubber::Scrubber;
use crate::freeradiantbunny::model::persistent::connection_string;
use crate::freeradiantbunny::model::persistent::order_by::ParamSort;
use crate::freeradiantbunny::model::persistent::row_type::RowType;
/// Database - proxy to postgresql datbase
use tokio_postgres::{Error, NoTls};

// todo implement promise design pattern
// todo var promise = new Promise(async function (resolve, reject) {
// note tokio_postgres uses the tokio crate as its runtime
// note next line needed for tokio_postgres
#[doc = "db_query() uses tokio::main."]
#[tokio::main]
pub async fn do_query(
    api_pattern_requested_instance: &ApiPatternRequested,
    parameter_sort: ParamSort,
    screen: &Screen,
    debugger: &Debugger,
) -> Result<Vec<Box<dyn Scrubber>>, Error> {
    // declare the variable that holds that data from database
    let mut vector_of_boxed_rows: Vec<Box<dyn Scrubber>> = Vec::new();
    // todo refactor this db stuff
    // connect to the database
    // start by getting database connection-string
    let connection_string = connection_string::get();
    let (client, connection) = tokio_postgres::connect(&connection_string, NoTls).await?;
    // debug
    //println!("database debug: database got connection.");
    // connection object performs the actual communication with the database, so spawn it off to run on its own
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });
    // define the SQL statement
    // there are variations
    // get classes instance
    //let database_schema_instance = DatabaseSchema::new();
    //database_schema_instance.pretty_print();
    // ...to define an SQL
    // variables classes_type is used by all variaions
    let manifest_selected = api_pattern_requested_instance.get_manifest_selected();
    // debug
    let manifest_selected_string = manifest_selected.to_string();
    debugger.log_data(
        DATA,
        format!("manifest_selected: {}", manifest_selected_string).as_str(),
    );
    // use this scrubberized to get SQL statements
    let scrubber_instance = screen.get_scrubber_given_manifest(manifest_selected);
    // match based upon id_candidate variable existing or not
    // now given the above 2 matches, decide

    let api_pattern = api_pattern_requested_instance.get_api_pattern();
    // get the SQL statement
    let sql: String;
    // match
    match api_pattern {
        Api::Classes => {
            // variation 1 of 3
            // (neither id_candiate exists nor referenced_name exists)
            // zero, one, or many rows
            // todo implement the parameter_sort
            // debug
            println!("database debug: parameter_sort: {}", parameter_sort);
            let sql_option = scrubber_instance.get_sql();
            match sql_option {
                Some(found_sql) => {
                    sql = found_sql;
                }
                None => {
                    panic!("database panic: sql_option was None.");
                }
            }
        }
        Api::IdCandidate => {
            // variation 2 of 3
            // id_candiate exists (but referenced_name does not exist)
            // zero or one row
            let id_candidate_option = api_pattern_requested_instance.get_id_candidate_option();
            match id_candidate_option {
                Some(id_candidate) => {
                    // debug
                    let id_candidate_string = id_candidate.to_string();
                    debugger.log_data(
                        DATA,
                        format!("id_candidate: {}", id_candidate_string).as_str(),
                    );
                    let sql_option = scrubber_instance.get_sql_given_id_candidate(id_candidate);
                    match sql_option {
                        Some(found_sql) => {
                            sql = found_sql;
                        }
                        None => {
                            panic!("database panic: sql_option was None. Again.");
                        }
                    };
                }
                None => {
                    panic!("database error: id_candidate is None: bad match.");
                }
            }
        }
        Api::Referenced => {
            // variation 3 of 3 (going in reverse order)
            // both referenced_name exists and id_candiate exists
            // zero, one, or many rows
            let referenced_type_option =
                api_pattern_requested_instance.get_referenced_type_option();
            let id_candidate_option = api_pattern_requested_instance.get_id_candidate_option();
            match referenced_type_option {
                Some(referenced_type) => {
                    // debug
                    let referenced_type_string = referenced_type.to_string();
                    debugger.log_data(
                        DATA,
                        format!("referenced_type: {}", referenced_type_string).as_str(),
                    );
                    match id_candidate_option {
                        Some(id_candidate) => {
                            // debug
                            let id_candidate_string = id_candidate.to_string();
                            debugger.log_data(
                                DATA,
                                format!("id_candidate: {}", id_candidate_string).as_str(),
                            );
                            let sql_option = scrubber_instance
                                .get_sql_given_referenced(id_candidate, referenced_type);
                            match sql_option {
                                Some(found_sql) => sql = found_sql,
                                None => {
                                    panic!("database error: sql was None.");
                                }
                            }
                        }
                        None => {
                            panic!("database error: id_candidate is None: bad match.");
                        }
                    };
                }
                None => {
                    panic!("database error: referenced_type is None: bad match.");
                }
            }
        }
        Api::Http404 => {
            panic!("database error: Api::Http404 needs to send a file.");
        }
    };
    // debug
    println!("database debug: sql: '{}'", sql);
    // execute the database query with the SQL statement
    let rows = client.query(sql.as_str(), &[]).await?;
    // process the results and store them in a variable
    // accessing elements of the vector
    // struct_of_table_instance variable is the data structure...
    // ...that stores the database data that is bound for the output
    // create a Vec<Scrubber> to hold the rows of data
    // move the results from the database query to a struct
    // iterate through the rows returned by the query...
    // ...and populate the Vec<Scrubber>
    // create variables for derived values needed for output
    let mut num: i32 = 0;
    // loop
    for row in rows {
        // add variable num that will number the rows...
        // ...in the output table
        // increment
        num = num + 1;
        // create an instance of the struct
        // fork in the road here
        // one way for 0-1 rows....
        // ...and one way for 0-1-many rows...
        // ...and eventually one way for referenced rows
        let row_type = api_pattern_requested_instance.get_row_type();
        //println!("database debug: row_type: {}", row_type.to_string());
        match row_type {
            RowType::One => {
                //println!("database debug: RowType::One.");
                match manifest_selected {
                    Manifest::Classes => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Dev, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::Lookup, None, Some(row.get(7)), None),
                            FieldBox::new(ColumnType::FkConstraints, None, Some(row.get(8)), None),
                            FieldBox::new(
                                ColumnType::SpecializedFields,
                                None,
                                Some(row.get(9)),
                                None,
                            ),
                            FieldBox::new(
                                ColumnType::PrivilegedOwner,
                                None,
                                Some(row.get(10)),
                                None,
                            ),
                            FieldBox::new(ColumnType::MakeIndexFlag, None, None, Some(row.get(11))),
                            FieldBox::new(ColumnType::MakeUnique, None, Some(row.get(12)), None),
                            FieldBox::new(
                                ColumnType::IncrementIdFlag,
                                None,
                                None,
                                Some(row.get(13)),
                            ),
                            FieldBox::new(ColumnType::ScrubberFlag, None, None, Some(row.get(14))),
                            FieldBox::new(ColumnType::SubsystemsId, Some(row.get(15)), None, None),
                            FieldBox::new(ColumnType::ZachmansId, Some(row.get(16)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Subsystems => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Rules, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Zachmans => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Modules => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Domains => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Tli, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::DomainName, None, Some(row.get(7)), None),
                            FieldBox::new(ColumnType::Tagline, None, Some(row.get(8)), None),
                            FieldBox::new(ColumnType::SslCert, None, Some(row.get(9)), None),
                            FieldBox::new(ColumnType::Registrar, None, Some(row.get(10)), None),
                            FieldBox::new(ColumnType::Hosting, None, Some(row.get(11)), None),
                            FieldBox::new(ColumnType::Crm, None, Some(row.get(12)), None),
                            FieldBox::new(ColumnType::Log, None, Some(row.get(13)), None),
                            FieldBox::new(ColumnType::Backups, None, Some(row.get(14)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Webpages => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Path, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::WebpageMaxonomies => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::WebpagesId, Some(row.get(1)), None, None),
                            FieldBox::new(ColumnType::MaxonomiesId, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Images => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Path, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Stylesheets => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Path, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Applications => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Url, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Maxonomies => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Plants => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::PlantLists => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::PlantListPlants => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::PlantFamilies => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::PermacultureTopics => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Projects => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::GoalStatements => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::BusinessPlanTexts => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Processes => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::SceneElements => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Coins => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Url, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::Watch, None, Some(row.get(7)), None),
                            FieldBox::new(ColumnType::Type, None, Some(row.get(8)), None),
                            FieldBox::new(ColumnType::Platform, None, Some(row.get(9)), None),
                            FieldBox::new(ColumnType::Symbol, None, Some(row.get(10)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::CoinPrices => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Status, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                };
            }
            RowType::Many => {
                match manifest_selected {
                    Manifest::Classes => {
                        //println!("database debug: Manifest::Classes.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Subsystems, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Dev, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Subsystems => {
                        //println!("database debug: Manifest::Subsystems.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Referenced, Some(row.get(5)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Zachmans => {
                        //println!("database debug: Manifest::Zachmans.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Description, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Referenced, Some(row.get(6)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Modules => {
                        //println!("database debug: Manifest::Modules.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Dev, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Domains => {
                        //println!("database debug: Manifest::Domains.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::DomainName, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Referenced, Some(row.get(4)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Webpages => {
                        //println!("database debug: Manifest::Webpages.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::WebpageMaxonomies => {
                        //println!("database debug: Manifest::WebpagesMaxonomies.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Id, Some(row.get(0)), None, None),
                            FieldBox::new(ColumnType::WebpagesId, Some(row.get(1)), None, None),
                            FieldBox::new(ColumnType::MaxonomiesId, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Images => {
                        //println!("database debug: Manifest::Images.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Stylesheets => {
                        //println!("database debug: Manifest::Stylesheets.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Applications => {
                        //println!("database debug: Manifest::Applications.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Maxonomies => {
                        //println!("database debug: Manifest::Maxonomies.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Referenced, Some(row.get(5)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Plants => {
                        //println!("database debug: Manifest::Plants.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::BotanicalName, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::PlantFamilies, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::PlantLists => {
                        //println!("database debug: Manifest::PlantLists.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Referenced, Some(row.get(4)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::PlantListPlants => {
                        //println!("database debug: Manifest::PlantListPlants.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, None, Some(row.get(2)), None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Referenced, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::PlantFamilies => {
                        //println!("database debug: Manifest::Families.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Referenced, Some(row.get(4)), None, None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::PermacultureTopics => {
                        let field_boxes = vec![
                                FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Projects => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::GoalStatements => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::BusinessPlanTexts => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Processes => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::SceneElements => {
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::Coins => {
                        //println!("database debug: Manifest::Applications.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Symbol, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(5)), None),
                            FieldBox::new(ColumnType::Watch, None, Some(row.get(6)), None),
                            FieldBox::new(ColumnType::Type, None, Some(row.get(7)), None),
                            FieldBox::new(ColumnType::Platform, None, Some(row.get(8)), None),
                            
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                    Manifest::CoinPrices => {
                        //println!("database debug: Manifest::Applications.");
                        let field_boxes = vec![
                            FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                            FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                            FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                            FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                            FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                            FieldBox::new(ColumnType::Num, Some(num), None, None),
                        ];
                        let row_instance = Row::new(field_boxes);
                        vector_of_boxed_rows.push(Box::new(row_instance));
                    }
                };
            }
            RowType::Referenced => {
                //println!("database debug: RowType::Referenced.");
                let referenced_host_type_option =
                    api_pattern_requested_instance.get_referenced_host_type_option();
                match referenced_host_type_option {
                    Some(referenced_host_type) => {
                        match referenced_host_type {
                            ReferencedHost::Classes => {
                                let field_boxes = vec![
                                    FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                                    FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                                    FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                                    FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                                    FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                                    FieldBox::new(
                                        ColumnType::ReferencedTable,
                                        None,
                                        Some(row.get(5)),
                                        None,
                                    ),
                                    FieldBox::new(
                                        ColumnType::ReferencedId,
                                        Some(row.get(6)),
                                        None,
                                        None,
                                    ),
                                    FieldBox::new(ColumnType::Num, Some(num), None, None),
                                ];
                                let row_instance = Row::new(field_boxes);
                                vector_of_boxed_rows.push(Box::new(row_instance));
                            }
                            ReferencedHost::Webpages => {
                                let field_boxes = vec![
                                    FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                                    FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                                    FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                                    FieldBox::new(ColumnType::Path, None, Some(row.get(3)), None),
                                    FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(4)), None),
                                    FieldBox::new(ColumnType::Name, None, Some(row.get(5)), None),
                                    FieldBox::new(
                                        ColumnType::ReferencedTable,
                                        None,
                                        Some(row.get(6)),
                                        None,
                                    ),
                                    FieldBox::new(
                                        ColumnType::ReferencedId,
                                        Some(row.get(7)),
                                        None,
                                        None,
                                    ),
                                    FieldBox::new(ColumnType::Num, Some(num), None, None),
                                ];
                                let row_instance = Row::new(field_boxes);
                                vector_of_boxed_rows.push(Box::new(row_instance));
                            }
                            ReferencedHost::Images => {
                                let field_boxes = vec![
                                    FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                                    FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                                    FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                                    FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                                    FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                                    FieldBox::new(
                                        ColumnType::ReferencedTable,
                                        None,
                                        Some(row.get(5)),
                                        None,
                                    ),
                                    FieldBox::new(
                                        ColumnType::ReferencedId,
                                        Some(row.get(6)),
                                        None,
                                        None,
                                    ),
                                    FieldBox::new(ColumnType::Num, Some(num), None, None),
                                ];
                                let row_instance = Row::new(field_boxes);
                                vector_of_boxed_rows.push(Box::new(row_instance));
                            }
                            ReferencedHost::Stylesheets => {
                                let field_boxes = vec![
                                    FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                                    FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                                    FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                                    FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                                    FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                                    FieldBox::new(
                                        ColumnType::ReferencedTable,
                                        None,
                                        Some(row.get(5)),
                                        None,
                                    ),
                                    FieldBox::new(
                                        ColumnType::ReferencedId,
                                        Some(row.get(6)),
                                        None,
                                        None,
                                    ),
                                    FieldBox::new(ColumnType::Num, Some(num), None, None),
                                ];
                                let row_instance = Row::new(field_boxes);
                                vector_of_boxed_rows.push(Box::new(row_instance));
                            }
                            ReferencedHost::Plants => {
                                let field_boxes = vec![
                                    FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                                    FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                                    FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                                    FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                                    FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                                    FieldBox::new(
                                        ColumnType::ReferencedTable,
                                        None,
                                        Some(row.get(5)),
                                        None,
                                    ),
                                    FieldBox::new(
                                        ColumnType::ReferencedId,
                                        Some(row.get(6)),
                                        None,
                                        None,
                                    ),
                                    FieldBox::new(ColumnType::Num, Some(num), None, None),
                                ];
                                let row_instance = Row::new(field_boxes);
                                vector_of_boxed_rows.push(Box::new(row_instance));
                            }
                            ReferencedHost::PlantListPlants => {
                                let field_boxes = vec![
                                    FieldBox::new(ColumnType::Status, None, Some(row.get(0)), None),
                                    FieldBox::new(ColumnType::Sort, None, Some(row.get(1)), None),
                                    FieldBox::new(ColumnType::Id, Some(row.get(2)), None, None),
                                    FieldBox::new(ColumnType::ImgUrl, None, Some(row.get(3)), None),
                                    FieldBox::new(ColumnType::Name, None, Some(row.get(4)), None),
                                    FieldBox::new(
                                        ColumnType::ReferencedTable,
                                        None,
                                        Some(row.get(5)),
                                        None,
                                    ),
                                    FieldBox::new(
                                        ColumnType::ReferencedId,
                                        Some(row.get(6)),
                                        None,
                                        None,
                                    ),
                                    FieldBox::new(ColumnType::Num, Some(num), None, None),
                                ];
                                let row_instance = Row::new(field_boxes);
                                vector_of_boxed_rows.push(Box::new(row_instance));
                            }
                        };
                    }
                    None => {
                        panic!("database error: failed to get referenced_type.");
                    }
                };
            }
        }
    }
    // done!
    Ok(vector_of_boxed_rows)
}

/* end */
