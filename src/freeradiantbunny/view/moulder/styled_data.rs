// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// styled_data - models the information need to add CSS styules to the webpage elements
// constants
use crate::freeradiantbunny::controller::characters::NULL_STR;

#[doc = "The StyledData structure."]
// note the derive clone statement below
#[derive(Clone)]
pub struct StyledData {
    identifier: String,
    processed_data: String,
    style_properties: String,
}

#[doc = "The StyledData implementation."]
impl StyledData {
    #[doc = "new()."]
    pub fn new(identifier: String, processed_data: String, style_properties: String) -> StyledData {
        let styled_data_instance = StyledData {
            identifier: identifier,
            processed_data: processed_data,
            style_properties: style_properties,
        };
        styled_data_instance
    }
    #[doc = "new_default()."]
    pub fn new_default() -> StyledData {
        let styled_data_instance_default = StyledData {
            identifier: "default".to_string(),
            processed_data: "default".to_string(),
            style_properties: NULL_STR.to_string(),
        };
        styled_data_instance_default
    }
    #[doc = "get_identifier()."]
    pub fn get_identifier(&self) -> String {
        self.identifier.clone()
    }
    #[doc = "get_processed_data()."]
    pub fn get_processed_data(&self) -> String {
        self.processed_data.clone()
    }
    #[doc = "get_style_properties()."]
    pub fn get_style_properties(&self) -> String {
        self.style_properties.clone()
    }
}

#[doc = "The fmt impl for StyledData."]
impl std::fmt::Display for StyledData {
    #[doc = "fmt()."]
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        // implementation of the display when formatting for Style
        write!(
            f,
            "Style: identifer: {},\nprocessed_data: {}\nstyle_properties: {}",
            self.get_identifier(),
            self.get_processed_data(),
            self.get_style_properties()
        )
    }
}

/* end */
