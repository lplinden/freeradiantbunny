// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

use crate::freeradiantbunny::controller::api::api_constants::KNOWN_KEY_MAKESORTTODAY;
use crate::freeradiantbunny::controller::api::api_constants::KNOWN_KEY_CLASS;
use crate::freeradiantbunny::controller::api::api_constants::MAKESORTTODAY_WEBPAGE;
use crate::freeradiantbunny::controller::characters::{DOT, EQUALS_SIGN, QUESTION_MARK, SLASH, AMPERSAND};
use crate::freeradiantbunny::model::manifest::column_type::ColumnType;
use crate::freeradiantbunny::model::manifest::manifest::Manifest;
/// style_manager - manages the CSS styles placed within HTML elements
use crate::freeradiantbunny::model::manifest::referenced::convert_str_to_referenced_type;
use crate::freeradiantbunny::model::manifest::referenced::Referenced;
use crate::freeradiantbunny::model::manifest::scrubber::Scrubber;
use crate::freeradiantbunny::model::persistent::row_type::RowType;
use crate::freeradiantbunny::model::timekeeper::Date;
use crate::freeradiantbunny::site_configuration::site_configuration::BASE_URL;
use crate::freeradiantbunny::site_configuration::site_configuration::BASE_DIRECTORY;
use crate::freeradiantbunny::view::moulder::styled_data::StyledData;
use crate::freeradiantbunny::view::moulder::version::Version;
use crate::freeradiantbunny::view::moulder::webpage::cell_colors::CellColors;
use crate::freeradiantbunny::view::moulder::webpage::table_headers::TableHeader;
pub const BACKGROUND_COLOR_LIGHT_GREEN: &str = "background-color: #64e390;";
pub const BACKGROUND_COLOR_SUPER_LIGHT_GREEN: &str = "background-color: #90EE99;";
pub const BACKGROUND_COLOR_GREY: &str = "background-color: #CCCCCC;";
pub const CSS_TEXT_ALIGN_CENTER: &str = "text-align: center;";

#[doc = "The StyleManager structure."]
pub struct StyleManager<'a> {
    styled_data_vec: &'a mut Vec<StyledData>,
}

#[doc = "The StyleManager implementation."]
impl StyleManager<'_> {
    #[doc = "new()."]
    pub fn new<'a>(given_styled_data_vec: &'a mut Vec<StyledData>) -> StyleManager<'a> {
        let style_manager_instance = StyleManager {
            styled_data_vec: given_styled_data_vec,
        };
        style_manager_instance
    }
    #[doc = "get_style_data()."]
    pub fn get_styled_data(&self, identifier: &String) -> StyledData {
        // todo probably a better way to do this (return a Result)
        let styled_data_instance_default = StyledData::new_default();
        if self.styled_data_vec.len() > 0 {
            for styled_data_instance in self.styled_data_vec.iter() {
                if identifier.to_string() == styled_data_instance.get_identifier() {
                    return styled_data_instance.clone();
                }
            }
        }
        //println!(
        //    "style_manager get_styled_data() error: styled_data_vec is empty: identifier: {}",
        //    identifier
        //);
        styled_data_instance_default
    }
    #[doc = "This public function get_stylized() calls the StyledData factory and gets a StyledData instance and stores the StyledData instances in a vector."]
    pub fn get_stylized_for_table_header(
        &mut self,
        classes_type: Manifest,
        referenced_type_option: Option<Referenced>,
        table_header: &TableHeader,
        column_type: &ColumnType,
        row_type: &RowType,
    ) {
        // set up data for later
        let referenced_id_option = table_header.get_referenced_id();
        // get some important data
        let id = table_header.get_id();
        let value_string = table_header.get_value();
        // match
        match column_type {
            ColumnType::Num => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Id => {
                self.styled_data_vec.push(self.get_style(
                    Version::IdStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Name => {
                self.styled_data_vec.push(self.get_style(
                    Version::NameStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Description => {
                self.styled_data_vec.push(self.get_style(
                    Version::PlainStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::ImgUrl => {
                self.styled_data_vec.push(self.get_style(
                    Version::ImageStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Status => {
                self.styled_data_vec.push(self.get_style(
                    Version::StatusStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Sort => {
                self.styled_data_vec.push(self.get_style(
                    Version::SortStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Dev => {
                self.styled_data_vec.push(self.get_style(
                    Version::DevStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Lookup => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::FkConstraints => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::FkConstraints,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::SpecializedFields => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::SpecializedFields,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::PrivilegedOwner => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::PrivilegedOwner,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::MakeIndexFlag => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::MakeIndexFlag,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::MakeUnique => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::MakeUnique,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::ScrubberFlag => {
                self.styled_data_vec.push(self.get_style(
                    Version::FlagStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::ScrubberFlag,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::IncrementIdFlag => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::IncrementIdFlag,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Rules => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::Rules,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Url => {
                self.styled_data_vec.push(self.get_style(
                    Version::UrlStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::Url,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
	    ColumnType::UrlExternal => {
                self.styled_data_vec.push(self.get_style(
                    Version::UrlStyle,
                    classes_type,
                    None,
                    None,
                    &ColumnType::UrlExternal,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::SubsystemsId => {
                self.styled_data_vec.push(self.get_style(
                    Version::SubsystemsIdStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::ZachmansId => {
                self.styled_data_vec.push(self.get_style(
                    Version::ZachmansIdStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Subsystems => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Zachmans => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Referenced => {
                self.styled_data_vec.push(self.get_style(
                    Version::ReferencedStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::ReferencedTable => {
                self.styled_data_vec.push(self.get_style(
                    Version::ReferencedTableStyle,
                    classes_type,
                    referenced_type_option,
                    referenced_id_option,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::ReferencedId => {
                self.styled_data_vec.push(self.get_style(
                    Version::ReferencedTableIdStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Tli => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::DomainName => {
                self.styled_data_vec.push(self.get_style(
                    Version::DomainNameStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::SslCert => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Tagline => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Registrar => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Hosting => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Crm => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Backups => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Log => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Path => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::BotanicalName => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::PlantListName => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::PlantFamilies => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::WebpagesId => {
                self.styled_data_vec.push(self.get_style(
                    Version::WebpagesIdStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::MaxonomiesId => {
                self.styled_data_vec.push(self.get_style(
                    Version::MaxonomiesIdStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Watch => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Type => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Platform => {
                self.styled_data_vec.push(self.get_style(
                    Version::BoilerplateStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
            ColumnType::Symbol => {
                self.styled_data_vec.push(self.get_style(
                    Version::SymbolStyle,
                    classes_type,
                    None,
                    None,
                    column_type,
                    value_string,
                    row_type,
                    id.to_string(),
                ));
            }
        }
    }
    #[doc = "This public function get_stylized() calls the StyledData factory and gets a StyledData instance and stores the StyledData instances in a vector."]
    pub fn get_stylized(
        &mut self,
        classes_type: Manifest,
        referenced_type_option: Option<Referenced>,
        boxed_row: &Box<dyn Scrubber>,
        column_type: &ColumnType,
        row_type: &RowType,
    ) {
        // unbox the boxed_row
        let row = boxed_row;
        // todo implement referenced_type_option
        match referenced_type_option {
            Some(referenced_type) => {
                println!(
                    "style_manager debug: referenced_type_option: {}",
                    referenced_type
                );
            }
            None => {
                //println!("style_manager panic: unable to get referenced_type_option.");
            }
        };
        // set up some data
        //let referenced_id_option = boxed_scrubber.get_referenced_id();
        // get some important data
        let id_option = row.get_id();
        let id = match id_option {
            Some(id) => id,
            None => {
                panic!("style_manager panic: failed to get id.");
            }
        };
        // match
        match column_type {
            ColumnType::Num => {
                let option = row.get_num();
                match option {
                    Some(num) => {
                        let value_string = format!("{}", num);
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get num.");
                    }
                };
            }
            ColumnType::Id => {
                let option = row.get_id();
                match option {
                    Some(id) => {
                        let value_string = format!("{}", id);
                        self.styled_data_vec.push(self.get_style(
                            Version::IdStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get id.");
                    }
                };
            }
            ColumnType::Name => {
                let option = row.get_name();
                match option {
                    Some(name) => {
                        let value_string = name;
                        self.styled_data_vec.push(self.get_style(
                            Version::NameStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get id.");
                    }
                };
            }
            ColumnType::Description => {
                let option = row.get_description();
                match option {
                    Some(description) => {
                        let value_string = description;
                        self.styled_data_vec.push(self.get_style(
                            Version::ParagraphStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get description.");
                    }
                };
            }
            ColumnType::ImgUrl => {
                let option = row.get_img_url();
                match option {
                    Some(img_url) => {
                        let value_string = img_url;
                        self.styled_data_vec.push(self.get_style(
                            Version::ImageStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get img_url.");
                    }
                };
            }
            ColumnType::Status => {
                let option = row.get_status();
                match option {
                    Some(status) => {
                        let value_string = status;
                        self.styled_data_vec.push(self.get_style(
                            Version::StatusStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get status.");
                    }
                };
            }
            ColumnType::Sort => {
                let option = row.get_sort();
                match option {
                    Some(sort) => {
                        let value_string = sort;
                        self.styled_data_vec.push(self.get_style(
                            Version::SortStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get sort.");
                    }
                };
            }
            ColumnType::Dev => {
                let option = row.get_dev();
                match option {
                    Some(dev) => {
                        let value_string = dev;
                        self.styled_data_vec.push(self.get_style(
                            Version::DevStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get dev.");
                    }
                };
            }
            ColumnType::Lookup => {
                let option = row.get_lookup();
                match option {
                    Some(lookup) => {
                        let value_string = lookup;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get dev.");
                    }
                };
            }
            ColumnType::FkConstraints => {
                let option = row.get_fk_constraints();
                match option {
                    Some(fk_constraints) => {
                        let value_string = fk_constraints;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::FkConstraints,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get fk_constraints.");
                    }
                };
            }
            ColumnType::SpecializedFields => {
                let option = row.get_specialized_fields();
                match option {
                    Some(specialized_fields) => {
                        let value_string = specialized_fields;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::SpecializedFields,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get specialized_fields.");
                    }
                };
            }
            ColumnType::PrivilegedOwner => {
                let option = row.get_privileged_owner();
                match option {
                    Some(privileged_owner) => {
                        let value_string = privileged_owner;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::PrivilegedOwner,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get privileged_owner.");
                    }
                };
            }
            ColumnType::MakeIndexFlag => {
                let option = row.get_make_index_flag();
                match option {
                    Some(make_index_flag) => {
                        let value_string = make_index_flag.to_string();
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::MakeIndexFlag,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get make_index_flag.");
                    }
                };
            }
            ColumnType::MakeUnique => {
                let option = row.get_make_unique();
                match option {
                    Some(make_unique) => {
                        let value_string = make_unique;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::MakeUnique,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get make_unique.");
                    }
                };
            }
            ColumnType::ScrubberFlag => {
                let option = row.get_scrubber_flag();
                match option {
                    Some(scrubber_flag) => {
                        let value_string = scrubber_flag.to_string();
                        self.styled_data_vec.push(self.get_style(
                            Version::FlagStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::ScrubberFlag,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get scrubber_flag.");
                    }
                };
            }
            ColumnType::IncrementIdFlag => {
                let option = row.get_increment_id_flag();
                match option {
                    Some(increment_id_flag) => {
                        let value_string = increment_id_flag.to_string();
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::IncrementIdFlag,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get increment_id_flag.");
                    }
                };
            }
            ColumnType::Rules => {
                let option = row.get_rules();
                match option {
                    Some(rules) => {
                        let value_string = rules;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Rules,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get rules.");
                    }
                };
            }
            ColumnType::Url => {
                let option = row.get_url();
                match option {
                    Some(url) => {
                        let value_string = url;
                        self.styled_data_vec.push(self.get_style(
                            Version::UrlStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Url,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get url.");
                    }
                };
            }
	    ColumnType::UrlExternal => {
                let option = row.get_url();
                match option {
                    Some(url_external) => {
                        let value_string = url_external;
                        self.styled_data_vec.push(self.get_style(
                            Version::UrlStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::UrlExternal,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get url_external.");
                    }
                };
            }
            ColumnType::SubsystemsId => {
                let option = row.get_subsystems_id();
                match option {
                    Some(subsystems_id) => {
                        let value_string = format!("{}", subsystems_id);
                        self.styled_data_vec.push(self.get_style(
                            Version::SubsystemsIdStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get subsystems_id.");
                    }
                };
            }
            ColumnType::ZachmansId => {
                let option = row.get_zachmans_id();
                match option {
                    Some(zachmans_id) => {
                        let value_string = format!("{}", zachmans_id);
                        self.styled_data_vec.push(self.get_style(
                            Version::ZachmansIdStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get zachmans_id.");
                    }
                };
            }
            ColumnType::Subsystems => {
                let option = row.get_subsystems();
                match option {
                    Some(subsystems) => {
                        let value_string = subsystems;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get subsystems.");
                    }
                };
            }
            ColumnType::Zachmans => {
                let option = row.get_zachmans();
                match option {
                    Some(zachmans) => {
                        let value_string = zachmans;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get zachmans.");
                    }
                };
            }
            ColumnType::Referenced => {
                let option = row.get_referenced();
                match option {
                    Some(referenced) => {
                        let value_string = referenced.to_string();
                        self.styled_data_vec.push(self.get_style(
                            Version::ReferencedStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get referenced.");
                    }
                };
            }
            ColumnType::ReferencedTable => {
                let option = row.get_referenced_table();
                match option {
                    Some(referenced_table) => {
                        // these are extra
                        println!(
                            "style_manager debug: referenced_table: {}",
                            referenced_table
                        );
                        let referenced_type_option =
                            convert_str_to_referenced_type(referenced_table.as_str());
                        let referenced_id_option = row.get_referenced_id();
                        self.styled_data_vec.push(self.get_style(
                            Version::ReferencedTableStyle,
                            classes_type,
                            referenced_type_option,
                            referenced_id_option,
                            column_type,
                            // odd name change of variable below
                            referenced_table,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get referenced_table.");
                    }
                };
            }
            ColumnType::ReferencedId => {
                let option = row.get_referenced_id();
                match option {
                    Some(referenced_id) => {
                        let value_string = format!("{}", referenced_id);
                        self.styled_data_vec.push(self.get_style(
                            Version::ReferencedTableIdStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get referenced_id.");
                    }
                };
            }
            ColumnType::Tli => {
                let option = row.get_tli();
                match option {
                    Some(tli) => {
                        let value_string = tli;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Tli,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get tli.");
                    }
                };
            }
            ColumnType::DomainName => {
                let option = row.get_domain_name();
                match option {
                    Some(domain_name) => {
                        let value_string = domain_name;
                        self.styled_data_vec.push(self.get_style(
                            Version::DomainNameStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::DomainName,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get domain_name.");
                    }
                };
            }
            ColumnType::SslCert => {
                let option = row.get_ssl_cert();
                match option {
                    Some(ssl_cert) => {
                        let value_string = ssl_cert;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::SslCert,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get ssl_cert.");
                    }
                };
            }
            ColumnType::Tagline => {
                let option = row.get_tagline();
                match option {
                    Some(tagline) => {
                        let value_string = tagline;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Tagline,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get tagline.");
                    }
                };
            }
            ColumnType::Registrar => {
                let option = row.get_registrar();
                match option {
                    Some(registrar) => {
                        let value_string = registrar;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Registrar,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get registrar.");
                    }
                };
            }
            ColumnType::Hosting => {
                let option = row.get_hosting();
                match option {
                    Some(hosting) => {
                        let value_string = hosting;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Hosting,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get hosting.");
                    }
                };
            }
            ColumnType::Crm => {
                let option = row.get_crm();
                match option {
                    Some(crm) => {
                        let value_string = crm;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Crm,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get crm.");
                    }
                };
            }
            ColumnType::Backups => {
                let option = row.get_backups();
                match option {
                    Some(backups) => {
                        let value_string = backups;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Backups,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get backups.");
                    }
                };
            }
            ColumnType::Log => {
                let option = row.get_log();
                match option {
                    Some(log) => {
                        let value_string = log;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Log,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get log.");
                    }
                };
            }
            ColumnType::Path => {
                let option = row.get_path();
                match option {
                    Some(path) => {
                        let value_string = path;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::Path,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get path.");
                    }
                };
            }
            ColumnType::BotanicalName => {
                let option = row.get_botanical_name();
                match option {
                    Some(path) => {
                        let value_string = path;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::BotanicalName,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get botanical_name.");
                    }
                };
            }
            ColumnType::PlantListName => {
                let option = row.get_plant_list_name();
                match option {
                    Some(path) => {
                        let value_string = path;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::PlantListName,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get plant_families.");
                    }
                };
            }
            ColumnType::PlantFamilies => {
                let option = row.get_plant_families();
                match option {
                    Some(path) => {
                        let value_string = path;
                        self.styled_data_vec.push(self.get_style(
                            Version::BoilerplateStyle,
                            classes_type,
                            None,
                            None,
                            &ColumnType::PlantFamilies,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get plant_families.");
                    }
                };
            }
            ColumnType::WebpagesId => {
                let option = row.get_webpages_id();
                match option {
                    Some(webpages_id) => {
                        let value_string = format!("{}", webpages_id);
                        self.styled_data_vec.push(self.get_style(
                            Version::WebpagesIdStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get webpages_id.");
                    }
                };
            }
            ColumnType::MaxonomiesId => {
                let option = row.get_maxonomies_id();
                match option {
                    Some(maxonomies_id) => {
                        let value_string = format!("{}", maxonomies_id);
                        self.styled_data_vec.push(self.get_style(
                            Version::MaxonomiesIdStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get maxonomies_id.");
                    }
                };
            }
            ColumnType::Watch => {
                let option = row.get_watch();
                match option {
                    Some(description) => {
                        let value_string = description;
                        self.styled_data_vec.push(self.get_style(
                            Version::ParagraphStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get watch.");
                    }
                };
            }
            ColumnType::Type => {
                let option = row.get_type();
                match option {
                    Some(description) => {
                        let value_string = description;
                        self.styled_data_vec.push(self.get_style(
                            Version::ParagraphStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get type.");
                    }
                };
            }
            ColumnType::Platform => {
                let option = row.get_platform();
                match option {
                    Some(description) => {
                        let value_string = description;
                        self.styled_data_vec.push(self.get_style(
                            Version::ParagraphStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get platform.");
                    }
                };
            }
            ColumnType::Symbol => {
                let option = row.get_symbol();
                match option {
                    Some(description) => {
                        let value_string = description;
                        self.styled_data_vec.push(self.get_style(
                            Version::SymbolStyle,
                            classes_type,
                            None,
                            None,
                            column_type,
                            value_string,
                            row_type,
                            id,
                        ));
                    }
                    None => {
                        panic!("style_manager panic: failed to get symbol.");
                    }
                };
            }
        }
    }
    #[doc = "This private function get_style() is a StyledData factory."]
    fn get_style(
        &self,
        version_column_name_style: Version,
        classes_type: Manifest,
        referenced_type_option: Option<Referenced>,
        referenced_id_option: Option<i32>,
        column_type: &ColumnType,
        value_string: String,
        row_type: &RowType,
        id: String,
    ) -> StyledData {
        match version_column_name_style {
            Version::IdStyle => self.get_style_id(&classes_type, column_type, value_string, id),
            Version::NameStyle => self.get_style_name(column_type, value_string, id),
            Version::ParagraphStyle => self.get_style_paragraph(column_type, value_string, id),
            Version::PlainStyle => self.get_style_plain(column_type, value_string, id),
            Version::SymbolStyle => self.get_style_monospace(column_type, value_string, id),
            Version::ImageStyle => {
                match row_type {
                    RowType::One => {
                        self.get_style_image_and_img_url(
                            &classes_type,
                            column_type,
                            value_string,
                            id,
                        )
                    }
                    RowType::Many => {
                        self.get_style_image(&classes_type, column_type, value_string, id)
                    }
                    RowType::Referenced => {
                        self.get_style_image(&classes_type, column_type, value_string, id)
                    }
                }
            }
            Version::StatusStyle => self.get_style_status(column_type, value_string, id),
            Version::SortStyle => self.get_style_sort(&classes_type, column_type, value_string, id),
            Version::SubsystemsIdStyle => {
                // swap out the classes_type for Subsystems
                // so that the url of the link is adjusted
                let classes_type = Manifest::Subsystems;
                // also swap out the id with referenced_id which is the data held by the valud string aka the foreign key
                self.get_style_id_referenced(&classes_type, column_type, value_string, id)
            }
            Version::ZachmansIdStyle => {
                // swap out the classes_type for Subsystems
                // so that the url of the link is adjusted
                let classes_type = Manifest::Zachmans;
                // also swap out the id with referenced_id
                // this was resulting in "default"
                self.get_style_id_referenced(&classes_type, column_type, value_string, id)
            }
            Version::WebpagesIdStyle => {
                // swap out the classes_type for Subsystems
                // so that the url of the link is adjusted
                let classes_type = Manifest::Webpages;
                // also swap out the id with referenced_id
                // this was resulting in "default"
                self.get_style_id_referenced(&classes_type, column_type, value_string, id)
            }
            Version::MaxonomiesIdStyle => {
                // swap out the classes_type for Subsystems
                // so that the url of the link is adjusted
                let classes_type = Manifest::Maxonomies;
                // also swap out the id with referenced_id
                // this was resulting in "default"
                self.get_style_id_referenced(&classes_type, column_type, value_string, id)
            }
            Version::FlagStyle => self.get_style_boilerplate_bool(column_type, value_string, id),
            Version::UrlStyle => self.get_style_url(&classes_type, column_type, value_string, id),
            Version::DomainNameStyle => {
                self.get_style_domain_name(&classes_type, column_type, value_string, id)
            }
            Version::DevStyle => self.get_style_dev(column_type, value_string, id),
            Version::ReferencedStyle => {
                self.get_style_referenced(&classes_type, column_type, value_string, id)
            }
            Version::ReferencedTableStyle => {
                // todo need to fix the referenced table style
                // note that this has a difference signature...
                // because it is linking to a referenced
                self.get_style_referenced_table(
                    &referenced_type_option,
                    &referenced_id_option,
                    column_type,
                    &value_string,
                    id,
                )
            }
            Version::ReferencedTableIdStyle => {
                self.get_style_boilerplate_string(column_type, value_string, id)
            }
            Version::BoilerplateStyle => {
                self.get_style_boilerplate_string(column_type, value_string, id)
            }
        }
    }
    #[doc = "get_as_a_element()."]
    fn get_as_a_element(
        &self,
        version: &str,
        value: &str,
        classes_type: &Manifest,
        id: String,
    ) -> String {
        let url: String;
        let classes_name = classes_type.to_string();
        if version == "id-style".to_string() {
            url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
        } else if version == "name-style".to_string() {
            // this is cool because classes is special in that the names are the classes part of url
            match classes_type {
                Manifest::Classes => {
                    // classes RowType::Many
                    // go to classes.name of this row
                    url = format!("{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, value);
                }
                Manifest::Subsystems => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Zachmans => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Modules => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Domains => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Webpages => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Images => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Stylesheets => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Applications => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Maxonomies => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Plants => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::PlantLists => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::PlantListPlants => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::PlantFamilies => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::WebpageMaxonomies => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::PermacultureTopics => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Projects => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::GoalStatements => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::BusinessPlanTexts => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Processes => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::SceneElements => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::Coins => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
                Manifest::CoinPrices => {
                    url = format!("{}{}{}{}{}{}", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id);
                }
            };
        } else if version == "url-style".to_string() {
            url = value.to_string();
        } else if version == "domain-name-style".to_string() {
            // old or at least what was from url-style
            //url = value.to_string();
            // possible new will test
            // domain_name is the value is the namespace of the URL
            url = format!("https://{}", value);
        } else if version == "sort-style".to_string() {
            url = format!(
                "{}{}{}{}{}{}{}{}{}{}{}{}",
		BASE_URL,
		BASE_DIRECTORY,
                SLASH,
		MAKESORTTODAY_WEBPAGE,
                QUESTION_MARK,
                KNOWN_KEY_MAKESORTTODAY,
                EQUALS_SIGN,
                id,
		AMPERSAND,
		KNOWN_KEY_CLASS,
                EQUALS_SIGN,
                classes_name,
            );
        } else {
            panic!(
                "style_manager get_as_a_element() error: failed because of unknown version: {}",
                version
            );
        }
        format!(
            "<a href=\"{}\" style=\"text-decoration: none;\">{}</a>",
            url, value
        )
    }
    #[doc = "get_as_a_element_referenced(). Note how this jams the system having the classes_type be declared a Referenced data type, but hey the name of the function gives advanced notice that something is special about this function."]
    fn get_as_a_element_referenced(
        &self,
        version: &str,
        value: &str,
        referenced_type: &Referenced,
        referenced_id: String,
    ) -> String {
        let url: String;
        let classes_name = referenced_type.to_string();
        if version == "referenced-table-style".to_string() {
            url = format!(
                "{}{}{}{}{}{}",
                BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, referenced_id
            );
        } else {
            panic!("style_manager get_as_a_element_referenced() error: failed because of unknown version: {}", version);
        }
        format!(
            "<a href=\"{}\" style=\"text-decoration: none;\">{}</a>",
            url, value
        )
    }
    #[doc = "get_as_a_element_fk(). This is like get_as_a_element() but with the additional Manifest (classes_type) parameter."]
    fn get_as_a_element_fk(
        &self,
        version: &str,
        value: &str,
        classes_type: &Manifest,
        id: String,
        foreign_key_classes_type: &Manifest,
    ) -> String {
        let url: String;
        let classes_name = classes_type.to_string();
        let foreign_key_classes_name = foreign_key_classes_type.to_string();
        if version == "referenced-style".to_string() {
            url = format!(
                "{}{}{}{}{}{}{}{}",
                BASE_URL, BASE_DIRECTORY, SLASH, foreign_key_classes_name, SLASH, classes_name, SLASH, id
            );
        } else {
            panic!(
                "style_manager get_as_a_element_fk() error: failed because version is not known."
            );
        }
        format!(
            "<a href=\"{}\" style=\"text-decoration: none;\">{}</a>",
            url, value
        )
    }
    #[doc = "get_as_img_element()."]
    fn get_as_img_element(
        &self,
        version: &str,
        value: &str,
        classes_type: &Manifest,
        id: String,
    ) -> String {
        if version == "image-style".to_string() {
            // todo img_url implement size adjustment?
            // todo img_url need to implement alt attribute
            // todo implement title attribute
            let img_style = "width: 30px;";
            let classes_name = classes_type.to_string();
            format!("<a href=\"{}{}{}{}{}{}\"><img style=\"{}\" src=\"{}\" class=\"data-image\" alt=\"\" title=\"\"></a>", BASE_URL, BASE_DIRECTORY, SLASH, classes_name, SLASH, id, img_style, value)
        } else {
            panic!(
                "style_manager get_as_img_element() error: failed because version is not known."
            );
        }
    }
    #[doc = "get_as_p_element()."]
    fn get_as_p_element(&self, version: &str, value: &str) -> String {
        if version == "boilerplate-string-style".to_string()
            || version == "boilerplate-bool-style".to_string()
            || version == "paragraph-style".to_string()
        {
            format!("<p>{}</p>", value)
        } else {
            panic!("style_manager get_as_paragraph() error: failed because version is not known: version: {}", version);
        }
    }
    #[doc = "get_style_id()."]
    pub fn get_style_id(
        &self,
        classes_type: &Manifest,
        column_type: &ColumnType,
        value: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_id(): identifier: {}", identifier);
        // version
        let version = "id-style".to_string();
        // a element - hyperlink
        let processed_data = self.get_as_a_element(&version, &value, &classes_type, id);
        let style_properties = format!("{}", BACKGROUND_COLOR_LIGHT_GREEN.to_string());
        StyledData::new(identifier, processed_data, style_properties)
    }

    #[doc = "get_style_id_referenced()."]
    pub fn get_style_id_referenced(
        &self,
        classes_type: &Manifest,
        column_type: &ColumnType,
        value: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_id(): identifier: {}", identifier);
        // version
        let version = "id-style".to_string();
        // a element - hyperlink
        // here is the special part of this function
        // the id argument is swapped out
        // and the value is place in
        let id = value.parse().unwrap();
        let processed_data = self.get_as_a_element(&version, &value, &classes_type, id);
        let style_properties = format!("{}", BACKGROUND_COLOR_LIGHT_GREEN.to_string());
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_name()."]
    pub fn get_style_name(
        &self,
        //classes_type: &Manifest,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_name(): identifier: {}", identifier);
        // version
        //let version = "name-style".to_string();
        // a element - hyperlink
        // old (caused double hyperlink)
        //let processed_data = self.get_as_a_element(&version, &value_string, &classes_type, id);
        // new
        let processed_data = value_string;
        let style_properties = BACKGROUND_COLOR_SUPER_LIGHT_GREEN.to_string();
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_paragraph()."]
    pub fn get_style_paragraph(
        &self,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_paragraph(): identifier: {}", identifier);
        // version
        let version = "paragraph-style".to_string();
        // p element - paragraph
        let processed_data = self.get_as_p_element(&version, &value_string);
        let style_properties = BACKGROUND_COLOR_LIGHT_GREEN.to_string();
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_plain()."]
    pub fn get_style_plain(
        &self,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_paragraph(): identifier: {}", identifier);
        // version (not needed)
        //let version = "plain-style".to_string();
        // skip the p element - let the database element be the markup
        let processed_data = format!("{}", &value_string);
        let style_properties = BACKGROUND_COLOR_LIGHT_GREEN.to_string();
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_monospace()."]
    pub fn get_style_monospace(
        &self,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        let processed_data = format!("{}", &value_string);
        let font_family = "monospace";
        let background_color = BACKGROUND_COLOR_LIGHT_GREEN.to_string();
        let style_properties = format!(
            "font-family: {};{} text-align: center; font-size: 120%;",
            font_family, background_color
        );
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_image()."]
    fn get_style_image(
        &self,
        classes_type: &Manifest,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_image(): identifier: {}", identifier);
        // change to img element
        // version
        let version = "image-style".to_string();
        let processed_data = self.get_as_img_element(&version, &value_string, &classes_type, id);
        // todo look in version 2.0.3 and see if there are a style properties
        let style_properties = BACKGROUND_COLOR_LIGHT_GREEN.to_string();
        // status is not processed
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_image_and_img_url()."]
    fn get_style_image_and_img_url(
        &self,
        classes_type: &Manifest,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_image(): identifier: {}", identifier);
        // change to img element
        // version
        let version = "image-style".to_string();

        // gibberish:
        // first deal with callback-like movement of data
        // todo investigate if this really works
        // send processed_data to the message_constraint
        // this is going to provide the data to the template_one
        let processed_data = format!(
            "{}<br>{}",
            self.get_as_img_element(&version, &value_string, &classes_type, id),
            &value_string
        );
        // debug
        //println!("style_manager debug: storing get_proceessed_data().");
        // todo look in version 2.0.3 and see if there are a style properties
        let style_properties = BACKGROUND_COLOR_LIGHT_GREEN.to_string();
        // status is not processed
        let styled_data_instance = StyledData::new(identifier, processed_data, style_properties);

        // return
        styled_data_instance
    }
    #[doc = "get_style_status()."]
    fn get_style_status(
        &self,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // changes status color based up status
        let cell_colors = CellColors::new();
        let (color, background_color) = cell_colors.calculate_status(&value_string);
        let style_properties = format!(
            "background-color: {}; color: {}; text-align: center;",
            background_color, color
        );
        // status is not processed
        let styled_data_instance = StyledData::new(identifier, value_string, style_properties);
        styled_data_instance
    }
    #[doc = "get_style_sort()."]
    fn get_style_sort(
        &self,
        classes_type: &Manifest,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // debug
        //println!("style_manager debug: value_string: {}", value_string);
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // version
        let version = "sort-style".to_string();
        let sort_as_date_styled = Date::new_given_sort_styled_date_string(&value_string);
        let processed_data = if !sort_as_date_styled.is_today() {
            self.get_as_a_element(&version, &value_string, &classes_type, id)
        } else {
            value_string
        };
        // set TableCellColors
        // if sort is today then no link
        // todo change color of sort
        let cell_colors = CellColors::new();
        let background_color = cell_colors.calculate_sort(sort_as_date_styled);
        // move string to constants
        let style_properties = format!(
            "background-color: {}; width: 140px;{}",
            background_color,
            CSS_TEXT_ALIGN_CENTER.to_string()
        );
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_boilerplate_string()."]
    fn get_style_boilerplate_string(
        &self,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        let version = "boilerplate-string-style".to_string();
        let processed_data = self.get_as_p_element(&version, &value_string);
        let style_properties = BACKGROUND_COLOR_SUPER_LIGHT_GREEN.to_string();
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_boilerplate_bool()."]
    fn get_style_boilerplate_bool(
        &self,
        column_type: &ColumnType,
        value: String,
        id: String,
    ) -> StyledData {
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // version
        let version = "boilerplate-bool-style".to_string();
        let processed_data = self.get_as_p_element(&version, &value);
        let style_properties = BACKGROUND_COLOR_SUPER_LIGHT_GREEN.to_string();
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_url()."]
    pub fn get_style_url(
        &self,
        classes_type: &Manifest,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_url(): identifier: {}", identifier);
        // version
        let version = "url-style".to_string();
        // a element - hyperlink
        let processed_data = self.get_as_a_element(&version, &value_string, &classes_type, id);
        let style_properties = BACKGROUND_COLOR_SUPER_LIGHT_GREEN.to_string();
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_domain_name()."]
    pub fn get_style_domain_name(
        &self,
        classes_type: &Manifest,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // version
        let version = "domain-name-style".to_string();
        // a element - hyperlink
        let processed_data = self.get_as_a_element(&version, &value_string, &classes_type, id);
        let style_properties = BACKGROUND_COLOR_SUPER_LIGHT_GREEN.to_string();
        StyledData::new(identifier, processed_data, style_properties)
    }
    #[doc = "get_style_dev()."]
    fn get_style_dev(
        &self,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // debug
        //println!("style_manager get_style_dev(): identifier: {}", identifier);
        // todo change status color based up status
        // set TableCellColors
        // if sort is today then no link
        // todo change color of sort
        let cell_colors = CellColors::new();
        let (color, background_color) = cell_colors.calculate_dev(&value_string);
        let style_properties = format!(
            "color: {}; background-color: {}; text-align: center;",
            color, background_color
        );
        // status is not processed
        let styled_data_instance = StyledData::new(identifier, value_string, style_properties);
        styled_data_instance
    }
    #[doc = "get_style_referenced()."]
    fn get_style_referenced(
        &self,
        classes_type: &Manifest,
        column_type: &ColumnType,
        value_string: String,
        id: String,
    ) -> StyledData {
        // debug
        println!(
            "style_manager get_style_referenced(): value: {}",
            value_string
        );
        // the identifier variable below uniquely identify each row...
        // ...by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // version
        let version = "referenced-style".to_string();
        // the URL needs to know the referenced_table
        // special for referenced
        let primary_key_classes_type: Manifest;
        match classes_type {
            Manifest::Classes => {
                primary_key_classes_type = Manifest::Subsystems;
            }
            Manifest::Subsystems => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::Zachmans => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::Modules => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::Domains => {
                primary_key_classes_type = Manifest::Webpages;
            }
            Manifest::Webpages => {
                primary_key_classes_type = Manifest::Domains;
            }
            Manifest::Images => {
                primary_key_classes_type = Manifest::Domains;
            }
            Manifest::Stylesheets => {
                primary_key_classes_type = Manifest::Domains;
            }
            Manifest::Applications => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::Maxonomies => {
                primary_key_classes_type = Manifest::Webpages;
            }
            Manifest::Plants => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::PlantLists => {
                primary_key_classes_type = Manifest::PlantListPlants;
            }
            Manifest::PlantListPlants => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::PlantFamilies => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::WebpageMaxonomies => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::PermacultureTopics => {
                primary_key_classes_type = Manifest::Webpages;
            }
            Manifest::Projects => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::GoalStatements => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::BusinessPlanTexts => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::Processes => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::SceneElements => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::Coins => {
                primary_key_classes_type = Manifest::Classes;
            }
            Manifest::CoinPrices => {
                primary_key_classes_type = Manifest::Classes;
            }
        };
        // note special fk version below
        let processed_data = self.get_as_a_element_fk(
            &version,
            &value_string,
            &classes_type,
            id,
            &primary_key_classes_type,
        );
        let style_properties = format!(
            "{}{}",
            BACKGROUND_COLOR_GREY.to_string(),
            CSS_TEXT_ALIGN_CENTER.to_string()
        );
        // no hyperlink if value is zero
        if value_string == "0".to_string() {
            StyledData::new(identifier, value_string, style_properties)
        } else {
            StyledData::new(identifier, processed_data, style_properties)
        }
    }
    #[doc = "get_style_referenced_table()."]
    fn get_style_referenced_table(
        &self,
        referenced_type_option: &Option<Referenced>,
        referenced_id_option: &Option<i32>,
        column_type: &ColumnType,
        value_string: &String,
        id: String,
    ) -> StyledData {
        // uniquely identify each row...
        // by combining row (using id) and column (by column_name)
        let identifier = format!("{}{}{}", id, DOT, column_type.to_string());
        // version
        let version = "referenced-table-style".to_string();
        // note that this is a special URL
        // need to get classes_type and referenced_type
        match referenced_type_option {
            Some(referenced_type) => match referenced_id_option {
                Some(referenced_id) => {
                    let processed_data = self.get_as_a_element_referenced(
                        &version,
                        &value_string,
                        &referenced_type,
                        referenced_id.to_string(),
                    );
                    let style_properties = format!(
                        "{}{}",
                        BACKGROUND_COLOR_GREY.to_string(),
                        CSS_TEXT_ALIGN_CENTER.to_string()
                    );
                    StyledData::new(identifier, processed_data, style_properties)
                }
                None => {
                    panic!("style_manager error: could not get referenced_id.");
                }
            },
            None => {
                panic!("style_manager error: could not get referenced_type.");
            }
        }
    }
}

// todo make a request to the database
//fn get_id_of_referenced_table(classes_table_name: &String) -> i32 {
//}

/* end */
