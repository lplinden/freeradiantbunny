// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// cell_colors - manages the colors on the webpage and specifically the colors of the cells of the table
// structures
use crate::freeradiantbunny::model::timekeeper::Date;
// constants
pub const DEFAULT_COLOR: &str = "black";
pub const DEFAULT_BACKGROUND_COLOR: &str = "transparent";
pub const BLACK: &str = "black";
pub const YELLOW: &str = "yellow";
pub const BLUE: &str = "blue";
pub const ORANGE: &str = "orange";
pub const HEX_GREEN: &str = "#009933";
pub const HEX_ANISE: &str = "#D3E344";
// todo implement more colors
// pub const HEX_BEIGE: &str = "#E5E3D1";
// pub const = "background-color: green"
// pub const = "background-color: orange"
// pub const = "background-color: yellow"
// pub const = "background-colqor: #AA99FF; color: #EFEFEF"
// pub const = "background-color: #3399EE; color: #000000"
// pub const = "background-color: #CCCCCC"

#[doc = "The CellColors structure."]
pub struct CellColors {}

#[doc = "The CellColors implementation."]
impl CellColors {
    #[doc = "new()."]
    pub fn new() -> CellColors {
        let cell_colors = CellColors {};
        cell_colors
    }
    #[doc = "calculate_state()."]
    pub fn calculate_status(&self, status: &str) -> (&str, &str) {
        // adjust color based upon value of status
        match status {
            "2021" => {
                // yellow on green
                (YELLOW, HEX_GREEN)
            }
            "2022" => {
                // orange on green
                (ORANGE, HEX_GREEN)
            }
            "2023" => {
                // orange on blue
                (ORANGE, BLUE)
            }
            "2024" => {
                // blue on yellow
                (BLUE, YELLOW)
            }
            "2025" => {
                // blue on yellow
                (BLACK, HEX_GREEN)
            }
            _ => (DEFAULT_COLOR, DEFAULT_BACKGROUND_COLOR),
        }
    }
    #[doc = "calculate_sort()."]
    pub fn calculate_sort(&self, sort_as_date_styled: Date) -> String {
        // define colors
        //let color_error = "#CD0000"; // firebrick red;
        // set default color rainbow
        //let color_00 = "#0099CC".to_string();
        let color_1 = "#A6D785".to_string();
        let color_1b = "#84BE6A".to_string(); // green
                                              //let color_2 = "#33811D".to_string(); // dark green
        let color_3 = "#3D77E4".to_string(); // blue
        let color_4 = "#7F49D0".to_string(); // purple
        let color_5 = "#E28D31".to_string(); // orange
        let color_5b = "#928e88".to_string(); // light deep purple
                                              //let color_6 = "#CD5555".to_string(); // red
        let color_7 = "#3BF965".to_string(); // bright green
                                             // check sort date
        if sort_as_date_styled.is_today() {
            return color_7;
        } else {
            let timespans = [10, 90, 180, 200, 365];
            if sort_as_date_styled.get_days_elapsed() < timespans[0] {
                return color_1;
            } else if sort_as_date_styled.get_days_elapsed() < timespans[1] {
                return color_1b;
            } else if sort_as_date_styled.get_days_elapsed() < timespans[2] {
                return color_3;
            } else if sort_as_date_styled.get_days_elapsed() < timespans[3] {
                return color_5;
            } else if sort_as_date_styled.get_days_elapsed() < timespans[3] {
                return color_4;
            } else {
                return color_5b;
            }
        }
    }
    #[doc = "calculate_dev()."]
    pub fn calculate_dev(&self, dev: &str) -> (&str, &str) {
        // adjust color based upon value of status
        match dev {
            "0.0.5" => (BLACK, HEX_ANISE),
	    "0.0.6" => (BLUE, ORANGE),
            "2.0.3" => (BLACK, ORANGE),
            "2.0.2" => (ORANGE, BLUE),
            _ => (DEFAULT_COLOR, DEFAULT_BACKGROUND_COLOR),
        }
    }
}
