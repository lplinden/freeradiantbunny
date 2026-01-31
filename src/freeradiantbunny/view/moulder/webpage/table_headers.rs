// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// headers - each table has a header at the top of each column

#[doc = "The TableHeaders structure."]
pub struct TableHeaders<'a> {
    table_header_instances: &'a Vec<TableHeader>,
}

#[doc = "The TableHeaders implementation."]
impl TableHeaders<'_> {
    #[doc = "new()."]
    pub fn new<'a>(given_table_header_instances: &'a Vec<TableHeader>) -> TableHeaders<'a> {
        let table_headers_instance = TableHeaders {
            table_header_instances: given_table_header_instances,
        };
        table_headers_instance
    }
    // used by standard RowType::Many
    #[doc = "get_header_displays()."]
    pub fn get_header_displays(&self) -> Vec<String> {
        let mut header_displays: Vec<String> = Vec::new();
        for table_header_instance in self.table_header_instances {
            header_displays.push(table_header_instance.get_display());
        }
        header_displays
    }
    // used by standard_one RowType::One
    #[doc = "get_table_headers()."]
    pub fn get_table_headers(&self) -> Vec<TableHeader> {
        self.table_header_instances.clone()
    }
}

#[doc = "The TableHeader structure."]
#[derive(Clone)]
pub struct TableHeader {
    name: String,
    display: String,
    value: String,
    processed_data_option: Option<String>,
    id: i32,
}

#[doc = "The TableHeader implementation."]
impl TableHeader {
    #[doc = "new()."]
    pub fn new(name: &String, value: &String, id: i32) -> TableHeader {
        let table_header_instance = TableHeader {
            name: name.clone(),
            display: convert_name_to_display(name.to_string()),
            value: value.to_string(),
            processed_data_option: None,
            id: id,
        };
        table_header_instance
    }
    #[doc = "get_name()."]
    pub fn get_name(&self) -> String {
        self.name.clone()
    }
    #[doc = "get_display()."]
    pub fn get_display(&self) -> String {
        self.display.clone()
    }
    #[doc = "get_value()."]
    pub fn get_value(&self) -> String {
        self.value.clone()
    }
    #[doc = "get_referenced_id()."]
    pub fn get_referenced_id(&self) -> Option<i32> {
        // todo ah ha! there is no referenced_id to clone
        //self.referenced_id.clone()
        None
    }
    #[doc = "get_id()."]
    pub fn get_id(&self) -> i32 {
        self.id.clone()
    }
    #[doc = "get_processed_data()."]
    pub fn get_processed_data(&self) -> String {
        // how to get the StyledData instance question mark
        match &self.processed_data_option {
            Some(processed_data) => {
                return processed_data.to_string();
            }
            None => {
                panic!("headers error: unable to get_processed_data().");
            }
        }
    }
}

#[doc = "convert_name_to_display()."]
pub fn convert_name_to_display(name: String) -> String {
    format!(
        "{}{}{}",
        "<strong>".to_string(),
        name,
        "</strong>".to_string()
    )
}

/* end */
