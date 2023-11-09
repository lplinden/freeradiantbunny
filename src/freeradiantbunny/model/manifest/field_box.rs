// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// field_boxes - this models a data field from database with the field name
// functions
use crate::freeradiantbunny::model::manifest::column_type::convert_str_to_type;
// enumerations
use crate::freeradiantbunny::model::manifest::column_type::ColumnType;

#[doc = "The FieldBox structure."]
#[derive(Clone)]
pub struct FieldBox {
    pub column_type: ColumnType,
    data_in_box_i32: Option<i32>,
    data_in_box_string: Option<String>,
    data_in_box_bool: Option<bool>,
}

#[doc = "The FieldBox implementation."]
impl FieldBox {
    pub fn new(
        column_type: ColumnType,
        data_in_box_i32: Option<i32>,
        data_in_box_string: Option<String>,
        data_in_box_bool: Option<bool>,
    ) -> FieldBox {
        let field_box = FieldBox {
            column_type,
            data_in_box_i32,
            data_in_box_string,
            data_in_box_bool,
        };
        field_box
    }
    pub fn get_column_type(&self) -> ColumnType {
        self.column_type.clone()
    }
    pub fn get_value_i32(&self) -> Option<i32> {
        // only certain types are this data type
        if self.column_type.to_string()
            == convert_str_to_type("id")
                .expect("field_box convert failed.")
                .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("zachmans_id")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("subsystems_id")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("referenced")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("referenced_id")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("webpages_id")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("maxonomies_id")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("num")
                    .expect("field_box convert failed.")
                    .to_string()
        {
            return self.data_in_box_i32;
        } else {
            None
        }
    }
    pub fn get_value_string(&self) -> Option<String> {
        // only certain types are this data type
        if self.column_type.to_string()
            == convert_str_to_type("name")
                .expect("field_box convert failed.")
                .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("description")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("img_url")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("status")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("sort")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("dev")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("subsystems")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("zachmans")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("dev")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("tli")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("url")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("rules")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("lookup")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("domain_name")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("tagline")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("registrar")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("hosting")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("crm")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("backups")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("log")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("ssl_cert")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("plant_families")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("plant_list_name")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("botanical_name")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("path")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("fk_constraints")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("privileged_owner")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("specialized_fields")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("make_unique")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("referenced_table")
                    .expect("field_box convert failed.")
                    .to_string()
                        || self.column_type.to_string()
                == convert_str_to_type("watch")
                    .expect("field_box convert failed.")
                    .to_string()
                        || self.column_type.to_string()
                == convert_str_to_type("type")
                    .expect("field_box convert failed.")
                    .to_string()
                        || self.column_type.to_string()
                == convert_str_to_type("platform")
                    .expect("field_box convert failed.")
                    .to_string()
                        || self.column_type.to_string()
                == convert_str_to_type("symbol")
                    .expect("field_box convert failed.")
                    .to_string()
        {
            return self.data_in_box_string.clone();
        }
        None
    }
    pub fn get_value_bool(&self) -> Option<bool> {
        // only certain types are this data type
        if self.column_type.to_string()
            == convert_str_to_type("increment_id_flag")
                .expect("field_box convert failed.")
                .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("scrubber_flag")
                    .expect("field_box convert failed.")
                    .to_string()
            || self.column_type.to_string()
                == convert_str_to_type("make_index_flag")
                    .expect("field_box convert failed.")
                    .to_string()
        {
            return self.data_in_box_bool;
        }
        None
    }
    pub fn get_id(&self) -> i32 {
        let id_option = self.get_value_i32();
        match id_option {
            Some(id) => id,
            None => {
                panic!("field_box panic: unable to get_id().");
            }
        }
    }
    pub fn get_name(&self) -> String {
        let name_option = self.get_value_string();
        match name_option {
            Some(name) => name,
            None => {
                panic!("field_box panic: unable to get_name().");
            }
        }
    }
    pub fn get_description(&self) -> String {
        let description_option = self.get_value_string();
        match description_option {
            Some(description) => description,
            None => {
                panic!("field_box panic: unable to get_description().");
            }
        }
    }
    pub fn get_img_url(&self) -> String {
        let img_url_option = self.get_value_string();
        match img_url_option {
            Some(img_url) => img_url,
            None => {
                panic!("field_box panic: unable to get_img_url().");
            }
        }
    }
    pub fn get_status(&self) -> String {
        let status_option = self.get_value_string();
        match status_option {
            Some(status) => status,
            None => {
                panic!("field_box panic: unable to get_status().");
            }
        }
    }
    pub fn get_sort(&self) -> String {
        let sort_option = self.get_value_string();
        match sort_option {
            Some(sort) => sort,
            None => {
                panic!("field_box panic: unable to get_sort().");
            }
        }
    }
    pub fn get_value_string_given_column_name(&self, column_name: String) -> String {
        // add column names here
        if column_name == "dev"
            || column_name == "lookup"
            || column_name == "specialized_fields"
            || column_name == "fk_constraints"
            || column_name == "privileged_owner"
            || column_name == "rules"
            || column_name == "make_unique"
            || column_name == "watch"
            || column_name == "type"
            || column_name == "platform"
            || column_name == "symbol"
        {
            let value_option = self.get_value_string();
            match value_option {
                Some(value_string) => value_string,
                None => {
                    panic!("field_box error: failed to get_value_string_given_column_name().");
                }
            }
        } else {
            panic!("field_box error: failed to get_value_string_given_column_name(): column_name is not known.");
        }
    }
    pub fn get_value_i32_given_column_name(&self, column_name: String) -> i32 {
        if column_name == "subsystems_id"
            || column_name == "zachmans_id"
            || column_name == "webpages_id"
            || column_name == "maxonomies_id"
        {
            let value_i32_option = self.get_value_i32();
            match value_i32_option {
                Some(value_i32) => value_i32,
                None => {
                    panic!("field_box panic: could not get i32 by column name.");
                }
            }
        } else {
            panic!("field_box error: failed to get_value_i32_given_column_name(): column_name is not known.");
        }
    }
}

/* end */
