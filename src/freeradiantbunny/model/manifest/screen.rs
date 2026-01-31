// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

use crate::freeradiantbunny::controller::api::api_constants::HOMEPAGE_PATH;
use crate::freeradiantbunny::controller::api::api_pattern_requested::ApiPatternRequested;
use crate::freeradiantbunny::controller::characters::SLASH;
use crate::freeradiantbunny::controller::library::filename::filename::Filename;
use crate::freeradiantbunny::model::manifest::upk_type::UpkType;
use crate::freeradiantbunny::controller::library::hosts::host::Host;
use crate::freeradiantbunny::model::manifest::classes::Classes;
use crate::freeradiantbunny::model::manifest::classes_definitions::load_screen_with_classes;
use crate::freeradiantbunny::model::manifest::manifest::convert_str_to_manifest_type;
use crate::freeradiantbunny::model::manifest::manifest::Manifest;
use crate::freeradiantbunny::model::manifest::manifest_constants::{
    APPLICATIONS, CLASSES, DOMAINS, IMAGES, MAXONOMIES, MODULES, PLANTS, PLANT_FAMILIES,
    PLANT_LISTS, PLANT_LIST_PLANTS, STYLESHEETS, SUBSYSTEMS, WEBPAGES, WEBPAGE_MAXONOMIES,
    ZACHMANS, PERMACULTURE_TOPICS, PROJECTS, GOAL_STATEMENTS, BUSINESS_PLAN_TEXTS, PROCESSES, SCENE_ELEMENTS, COINS, COIN_PRICES
};
use crate::freeradiantbunny::model::manifest::referenced::convert_str_to_referenced_type;
use crate::freeradiantbunny::model::manifest::referenced::Referenced;
/// screen - enables a stage upon which to have sprites play
// import
use std::fmt;

#[doc = "The structure has a vector of components that play()."]
pub struct Screen {
    pub scrubbers: Vec<Box<Classes>>,
}

#[doc = "The Screen implementation has the Super Play in that it calls the superplay() that results in the loop where each line results in a scrubber play()."]
impl Screen {
    #[doc = "new()."]
    pub fn new() -> Screen {
        let screen_option = load_screen_with_classes();
        match screen_option {
            Some(screen) => {
                return screen;
            }
            None => {
                panic!("screen panic: unable to new().");
            }
        };
    }
    #[doc = "get_sql()."]
    pub fn get_sql(&self, classes_type: Manifest) -> Option<String> {
        let scrubber = self.get_scrubber_given_manifest(classes_type);
        let sql_option = scrubber.get_sql();
        sql_option
    }
    #[doc = "get_upk_type()."]
    pub fn get_upk_type(&self, classes_type: Manifest) -> UpkType {
        let scrubber = self.get_scrubber_given_manifest(classes_type);
        let upk_type = scrubber.get_upk_type();
        upk_type
    }
    pub fn get_scrubber_given_manifest(&self, manifest_selected: Manifest) -> &Box<Classes> {
        for scrubber in self.scrubbers.iter() {
            let manifest_option = scrubber.get_manifest();
            match manifest_option {
                Some(manifest) => {
                    if manifest.to_string() == manifest_selected.get_string() {
                        return scrubber;
                    }
                }
                None => {
                    panic!("screen panic: unable to get manifest_option.");
                }
            }
        }
        panic!("screen panic: get_scrubber_given_manifest().");
    }
    pub fn get_manifest_given_name(name: String) -> Manifest {
        if name == CLASSES {
            let manifest_option = convert_str_to_manifest_type(CLASSES);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == SUBSYSTEMS {
            let manifest_option = convert_str_to_manifest_type(SUBSYSTEMS);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == ZACHMANS {
            let manifest_option = convert_str_to_manifest_type(ZACHMANS);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == MODULES {
            let manifest_option = convert_str_to_manifest_type(MODULES);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == DOMAINS {
            let manifest_option = convert_str_to_manifest_type(DOMAINS);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == WEBPAGES {
            let manifest_option = convert_str_to_manifest_type(WEBPAGES);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == IMAGES {
            let manifest_option = convert_str_to_manifest_type(IMAGES);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == STYLESHEETS {
            let manifest_option = convert_str_to_manifest_type(STYLESHEETS);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == APPLICATIONS {
            let manifest_option = convert_str_to_manifest_type(APPLICATIONS);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == MAXONOMIES {
            let manifest_option = convert_str_to_manifest_type(MAXONOMIES);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == PLANTS {
            let manifest_option = convert_str_to_manifest_type(PLANTS);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == PLANT_LISTS {
            let manifest_option = convert_str_to_manifest_type(PLANT_LISTS);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == PLANT_LIST_PLANTS {
            let manifest_option = convert_str_to_manifest_type(PLANT_LIST_PLANTS);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else if name == PLANT_FAMILIES {
            let manifest_option = convert_str_to_manifest_type(PLANT_FAMILIES);
            match manifest_option {
                Some(manifest) => {
                    return manifest;
                }
                None => {
                    panic!("classes convert failed.");
                }
            }
        } else {
            panic!("classes panic: name is not known.");
        }
    }
    #[doc = "This private function checks if a given_string is a classes name, returning a boolean."]
    pub fn is_classes_name(&self, slashed_path_element: &str) -> bool {
        // edit below to add new classes on manifest
        // todo move this to site_configuration
        // classes gateway
        // special as a gatekeeper
        if slashed_path_element == CLASSES
            || slashed_path_element == SUBSYSTEMS
            || slashed_path_element == ZACHMANS
            || slashed_path_element == MODULES
            || slashed_path_element == DOMAINS
            || slashed_path_element == WEBPAGES
            || slashed_path_element == IMAGES
            || slashed_path_element == STYLESHEETS
            || slashed_path_element == APPLICATIONS
            || slashed_path_element == MAXONOMIES
            || slashed_path_element == PLANTS
            || slashed_path_element == PLANT_LISTS
            || slashed_path_element == PLANT_FAMILIES
            || slashed_path_element == WEBPAGE_MAXONOMIES
            || slashed_path_element == PERMACULTURE_TOPICS
            || slashed_path_element == PROJECTS
            || slashed_path_element == GOAL_STATEMENTS
            || slashed_path_element == BUSINESS_PLAN_TEXTS
            || slashed_path_element == PROCESSES
            || slashed_path_element == SCENE_ELEMENTS
            || slashed_path_element == COINS
            || slashed_path_element == COIN_PRICES
        {
            return true;
        } else {
            return false;
        };
    }
    #[doc = "This private function checks if a given_string is a classes name that is a referenced, a table that has an primary key id that is a foreign key id in another table, returning a boolean."]
    pub fn is_referenced_classes_name(
        &self,
        slashed_path_element_classes_type: &str,
        slashed_path_element_referenced_type: &str,
    ) -> bool {
        if slashed_path_element_classes_type == CLASSES {
            if slashed_path_element_referenced_type == SUBSYSTEMS
                || slashed_path_element_referenced_type == ZACHMANS
                || slashed_path_element_referenced_type == MAXONOMIES
            {
                return true;
            } else {
                return false;
            }
        } else if slashed_path_element_classes_type == WEBPAGES {
            if slashed_path_element_referenced_type == DOMAINS
                || slashed_path_element_referenced_type == MAXONOMIES
            {
                return true;
            } else {
                return false;
            }
        } else if slashed_path_element_classes_type == IMAGES {
            if slashed_path_element_referenced_type == DOMAINS {
                return true;
            } else {
                return false;
            }
        } else if slashed_path_element_classes_type == STYLESHEETS {
            if slashed_path_element_referenced_type == DOMAINS {
                return true;
            } else {
                return false;
            }
        } else if slashed_path_element_classes_type == PLANTS {
            if slashed_path_element_referenced_type == PLANT_FAMILIES {
                return true;
            } else {
                return false;
            }
        } else if slashed_path_element_classes_type == PLANT_LIST_PLANTS {
            if slashed_path_element_referenced_type == PLANTS
                || slashed_path_element_referenced_type == PLANT_LISTS
            {
                return true;
            } else {
                return false;
            }
        }
        false
    }
    #[doc = "is_id_candidate()"]
    pub fn is_id_candidate(&self, slashed_path_element: &str) -> bool {
        // check
        if let Ok(number) = slashed_path_element.parse::<i32>() {
            // given value is a number
            if number >= 0 {
                // given value is a positive number
                return true;
            }
        }
        false
    }
    #[doc = "is_id_candidate()"]
    pub fn get_id_candidate_option(&self, slashed_path_element: &str) -> Option<i32> {
        // check
        if let Ok(number) = slashed_path_element.parse::<i32>() {
            // given value is a number
            if number >= 0 {
                // given value is a positive number
                return Some(number);
            }
        }
        None
    }
    #[doc = "The do_classes()."]
    pub fn do_classes(
        &self,
        host_instance: &Host,
        slashed_paths_1: &str,
    ) -> (Option<ApiPatternRequested>, Filename) {
        // debug
        //println!("api_pattern_match debug: API: <classes>");
        //println!("apt_freeradiantbunny debug: API: <classes>/NULL_STR");
        let classes_type: Manifest = get_classes_type(slashed_paths_1);
        let api_pattern_requested_instance = ApiPatternRequested::new(classes_type, None, None);
        // make fullpath_filename
        let path = format!("{}{}{}", SLASH, slashed_paths_1, HOMEPAGE_PATH);
        let found_known_host_dir_option = host_instance.get_found_known_host_dir();
        match found_known_host_dir_option {
            Some(found_known_host_dir) => {
                let filename_instance = Filename::new(found_known_host_dir.as_str(), path.as_str());
                // return instance of Filename
                return (Some(api_pattern_requested_instance), filename_instance);
            }
            None => {
                panic!("api_pattern_match error: unable to get found_known_host_dir.");
            }
        }
    }
    #[doc = "The do_id_candidate()."]
    pub fn do_id_candidate(
        &self,
        host_instance: &Host,
        slashed_paths_1: &str,
        slashed_paths_2: &str,
    ) -> (Option<ApiPatternRequested>, Filename) {
        println!("api_pattern_match debug: API: <classes>/<id>");
        let classes_type: Manifest = get_classes_type(slashed_paths_1);
        let id_candidate_option = self.get_id_candidate_option(slashed_paths_2);
        let api_pattern_requested_instance =
            ApiPatternRequested::new(classes_type, None, id_candidate_option);
        println!(
            "api_pattern_match debug: api_pattern_requested_instance: {}",
            api_pattern_requested_instance
        );
        // make fullpath_filename
        let path = format!("{}{}{}{}", SLASH, slashed_paths_1, SLASH, slashed_paths_2);
        let found_known_host_dir_option = host_instance.get_found_known_host_dir();
        match found_known_host_dir_option {
            Some(found_known_host_dir) => {
                let filename_instance = Filename::new(found_known_host_dir.as_str(), path.as_str());
                println!(
                    "api_pattern_match debug: filename_instance: {}",
                    filename_instance
                );
                // return instance of Filename
                return (Some(api_pattern_requested_instance), filename_instance);
            }
            None => {
                panic!("api_pattern_match error: unable to find found_known_host_dir.");
            }
        }
    }
    #[doc = "The do_referenced()."]
    pub fn do_referenced(
        &self,
        host_instance: &Host,
        slashed_paths_1: &str,
        slashed_paths_2: &str,
        slashed_paths_3: &str,
    ) -> (Option<ApiPatternRequested>, Filename) {
        println!("api_pattern_match debug: API: <classes>/<referenced>/<id_candiate>");
        let classes_type: Manifest = get_classes_type(slashed_paths_1);
        let referenced_type: Referenced = get_referenced_type(slashed_paths_2);
        let id_candidate_option = self.get_id_candidate_option(slashed_paths_3);
        let api_pattern_requested_instance =
            ApiPatternRequested::new(classes_type, Some(referenced_type), id_candidate_option);
        println!(
            "api_pattern_match debug: api_pattern_requested_instance: {}",
            api_pattern_requested_instance
        );
        // make fullpath_filename
        let path = format!("{}{}{}", SLASH, slashed_paths_1, HOMEPAGE_PATH);
        let found_known_host_dir_option = host_instance.get_found_known_host_dir();
        match found_known_host_dir_option {
            Some(found_known_host_dir) => {
                let filename_instance = Filename::new(found_known_host_dir.as_str(), path.as_str());
                println!(
                    "api_pattern_match debug: filename_instance: {}",
                    filename_instance
                );
                // return instance of Filename
                return (Some(api_pattern_requested_instance), filename_instance);
            }
            None => {
                panic!("api_pattern_match error: unable to find found_known_path_dir.");
            }
        }
    }
}

#[doc = "The get_classes_type() function is a private function."]
fn get_classes_type(given_user_str: &str) -> Manifest {
    let manifest_option = convert_str_to_manifest_type(given_user_str);
    match manifest_option {
        Some(classes_type) => {
            return classes_type;
        }
        None => {
            panic!("api_pattern_match get_classes_type() error: could not convert user str to Manifest type.")
        }
    }
}

#[doc = "The get_referenced_type() function is a private function."]
fn get_referenced_type(given_user_str: &str) -> Referenced {
    println!(
        "api_pattern_match debug: get_referenced_type() given_user_str: {}",
        given_user_str
    );
    let referenced_option = convert_str_to_referenced_type(given_user_str);
    match referenced_option {
        Some(referenced_type) => {
            return referenced_type;
        }
        None => {
            panic!(
                "api get_referenced_type() error: could not convert user str to Referenced type."
            )
        }
    }
}

#[doc = "The fmt for Screen."]
impl fmt::Display for Screen {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // use `as_ref()` to convert the Box to a reference of the Scrubber trait
        //let scrubber_ref: &dyn Scrubber = self.as_ref();
        write!(f, "screen display.")
    }
}

/* end */
