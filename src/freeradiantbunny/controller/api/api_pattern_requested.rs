// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

use crate::freeradiantbunny::controller::api::api::Api;
use crate::freeradiantbunny::model::manifest::manifest::Manifest;
use crate::freeradiantbunny::model::manifest::referenced::Referenced;
use crate::freeradiantbunny::model::manifest::referenced_host::convert_str_to_referenced_host_type;
use crate::freeradiantbunny::model::manifest::referenced_host::ReferencedHost;
use crate::freeradiantbunny::model::persistent::row_type::RowType;
/// api_pattern_requested - a structure that models post API data and pre db data. This is the information needed to search the database.
use std::fmt;
// constants
use crate::freeradiantbunny::model::manifest::manifest_constants::{
    CLASSES, PLANTS, PLANT_LIST_PLANTS, WEBPAGES,
};

#[doc = "ApiPatternRequested is the essense of the freeradiantbunny API and always is based upon the URI."]
pub struct ApiPatternRequested {
    manifest_selected: Manifest,
    referenced_type_option: Option<Referenced>,
    id_candidate_option: Option<i32>,
}

#[doc = "ApiPatternRequested implementation."]
impl ApiPatternRequested {
    #[doc = "new()."]
    pub fn new(
        manifest_selected: Manifest,
        referenced_type_option: Option<Referenced>,
        id_candidate_option: Option<i32>,
    ) -> ApiPatternRequested {
        let api_pattern_requested_instance = ApiPatternRequested {
            manifest_selected,
            referenced_type_option,
            id_candidate_option,
        };
        api_pattern_requested_instance
    }
    pub fn get_api_pattern(&self) -> Api {
        if self.is_referenced_type() && self.is_id_candidate() {
            Api::Referenced
        } else if self.is_id_candidate() {
            Api::IdCandidate
        } else {
            Api::Classes
        }
    }
    #[doc = "get_manifest_selected()."]
    pub fn get_manifest_selected(&self) -> Manifest {
        self.manifest_selected
    }
    #[doc = "get_referenced_type_option()."]
    pub fn get_referenced_type_option(&self) -> Option<Referenced> {
        self.referenced_type_option
    }
    #[doc = "is_referenced_type()."]
    pub fn is_referenced_type(&self) -> bool {
        match self.referenced_type_option {
            None => false,
            _ => true,
        }
    }
    #[doc = "get_referenced_type_as_string()."]
    pub fn get_referenced_type_as_string(&self) -> String {
        match self.referenced_type_option {
            Some(referenced) => {
                println!("api_pattern_requested debug: referenced: {}", referenced);
                referenced.to_string()
            }
            None => {
                panic!("api_pattern_requested error: call is_referenced_type_as_string() first.");
            }
        }
    }
    #[doc = "get_referenced_host_type_option()."]
    pub fn get_referenced_host_type_option(&self) -> Option<ReferencedHost> {
        // here
        // referenced_host is the manifest cast as ReferencedHost type
        match self.manifest_selected {
            Manifest::Classes => convert_str_to_referenced_host_type(CLASSES),
            Manifest::Webpages => convert_str_to_referenced_host_type(WEBPAGES),
            Manifest::Plants => convert_str_to_referenced_host_type(PLANTS),
            Manifest::PlantListPlants => convert_str_to_referenced_host_type(PLANT_LIST_PLANTS),
            _ => {
                panic!("api_pattern_requested error could not get referenced_host type.");
            }
        }
    }
    #[doc = "is_referenced_host_type()."]
    pub fn is_referenced_host_type(&self) -> bool {
        // if a referenced_type exists the refernced_host exists
        match self.referenced_type_option {
            None => false,
            _ => true,
        }
    }
    #[doc = "get_referenced_host_type_as_string()."]
    pub fn get_referenced_host_type_as_string(&self) -> String {
        // here
        match self.referenced_type_option {
            Some(referenced) => {
                println!("api_pattern_requested debug: referenced: {}", referenced);
                referenced.to_string()
            }
            None => {
                panic!(
                    "api_pattern_requested panic: call is_referenced_host_type_as_string() first."
                );
            }
        }
    }
    #[doc = "get_id_candidate_option()."]
    pub fn get_id_candidate_option(&self) -> Option<i32> {
        self.id_candidate_option
    }
    #[doc = "is_id_candidate()."]
    pub fn is_id_candidate(&self) -> bool {
        match self.id_candidate_option {
            None => false,
            _ => true,
        }
    }
    #[doc = "get_row_type()."]
    pub fn get_row_type(&self) -> RowType {
        match self.id_candidate_option {
            None => RowType::Many,
            _ => {
                if self.is_referenced_type() {
                    RowType::Referenced
                } else {
                    RowType::One
                }
            }
        }
    }
    #[doc = "Function to return a pretty string of the data of the struct."]
    // todo this seemes like a duplicate of fmt Display
    pub fn get_pretty(&self) -> String {
        let manifest_selected_string = format!("{}", self.get_manifest_selected().get_string());
        let referenced_type_string: String;
        match self.get_referenced_type_option() {
            Some(referenced_type) => {
                referenced_type_string = format!("{}", referenced_type.get_string())
            }
            None => referenced_type_string = "None".to_string(),
        }
        let id_candidate_string: String;
        match self.get_id_candidate_option() {
            Some(id_candidate) => id_candidate_string = format!("{}", id_candidate),
            None => id_candidate_string = "None".to_string(),
        }
        format!(
            "ApiPatternRequested: (\n\t   manifest_selected: '{}',\n\t   referenced_type: '{}',\n\t   id_candidate: '{}')",
            manifest_selected_string, referenced_type_string, id_candidate_string,
        )
    }
}

#[doc = "The fmt for ApiPatternRequested."]
impl fmt::Display for ApiPatternRequested {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let manifest_selected_string = format!("{}", self.get_manifest_selected().get_string());
        let referenced_type_string: String;
        match self.get_referenced_type_option() {
            Some(referenced_type) => {
                referenced_type_string = format!("{}", referenced_type.get_string())
            }
            None => referenced_type_string = "None".to_string(),
        }
        let id_candidate_string: String;
        match self.get_id_candidate_option() {
            Some(id_candidate) => id_candidate_string = format!("{}", id_candidate),
            None => id_candidate_string = "None".to_string(),
        }
        write!(
            f,
            "ApiPatternRequested: (\n\tmanifest_selected: '{}',\n\treferenced_type: '{}',\n\tid_candidate: '{}')",
            manifest_selected_string, referenced_type_string, id_candidate_string,
        )
    }
}

// custom function to convert Option<i32> to String
#[doc = "convert_option_i32_to_string()."]
pub fn convert_option_i32_to_string(option_value: Option<i32>) -> String {
    match option_value {
        Some(value) => value.to_string(),
        None => String::from("None"),
    }
}

#[doc = "convert_option_referenced_to_string() is an explicit function name, What is it you want ot know?"]
pub fn convert_option_referenced_to_string(option_value: Option<Referenced>) -> String {
    match option_value {
        Some(value) => value.to_string(),
        None => String::from("None"),
    }
}

// LPL 2026-02-11
#[cfg(test)]
mod tests {
    use super::*;

    // Test ApiPatternRequested::new() creates instance correctly
    #[test]
    fn test_api_pattern_requested_new_basic() {
        let api_req = ApiPatternRequested::new(Manifest::Plants, None, None);
        assert!(matches!(api_req.get_manifest_selected(), Manifest::Plants));
        assert!(api_req.get_referenced_type_option().is_none());
        assert!(api_req.get_id_candidate_option().is_none());
    }

    #[test]
    fn test_api_pattern_requested_new_with_id() {
        let api_req = ApiPatternRequested::new(Manifest::Classes, None, Some(42));
        assert!(matches!(api_req.get_manifest_selected(), Manifest::Classes));
        assert!(api_req.get_id_candidate_option().is_some());
        assert_eq!(api_req.get_id_candidate_option().unwrap(), 42);
    }

    #[test]
    fn test_api_pattern_requested_new_with_referenced() {
        let api_req =
            ApiPatternRequested::new(Manifest::Plants, Some(Referenced::PlantFamilies), Some(5));
        assert!(api_req.get_referenced_type_option().is_some());
        assert!(api_req.get_id_candidate_option().is_some());
    }

    // Test get_api_pattern() returns correct Api variant
    #[test]
    fn test_get_api_pattern_classes() {
        let api_req = ApiPatternRequested::new(Manifest::Plants, None, None);
        assert!(matches!(api_req.get_api_pattern(), Api::Classes));
    }

    #[test]
    fn test_get_api_pattern_id_candidate() {
        let api_req = ApiPatternRequested::new(Manifest::Plants, None, Some(123));
        assert!(matches!(api_req.get_api_pattern(), Api::IdCandidate));
    }

    #[test]
    fn test_get_api_pattern_referenced() {
        let api_req =
            ApiPatternRequested::new(Manifest::Plants, Some(Referenced::PlantFamilies), Some(10));
        assert!(matches!(api_req.get_api_pattern(), Api::Referenced));
    }

    // Test is_referenced_type()
    #[test]
    fn test_is_referenced_type_true() {
        let api_req =
            ApiPatternRequested::new(Manifest::Classes, Some(Referenced::Subsystems), None);
        assert!(api_req.is_referenced_type());
    }

    #[test]
    fn test_is_referenced_type_false() {
        let api_req = ApiPatternRequested::new(Manifest::Classes, None, None);
        assert!(!api_req.is_referenced_type());
    }

    // Test is_id_candidate()
    #[test]
    fn test_is_id_candidate_true() {
        let api_req = ApiPatternRequested::new(Manifest::Domains, None, Some(99));
        assert!(api_req.is_id_candidate());
    }

    #[test]
    fn test_is_id_candidate_false() {
        let api_req = ApiPatternRequested::new(Manifest::Domains, None, None);
        assert!(!api_req.is_id_candidate());
    }

    // Test get_row_type()
    #[test]
    fn test_get_row_type_many() {
        let api_req = ApiPatternRequested::new(Manifest::Webpages, None, None);
        assert_eq!(api_req.get_row_type(), RowType::Many);
    }

    #[test]
    fn test_get_row_type_one() {
        let api_req = ApiPatternRequested::new(Manifest::Webpages, None, Some(1));
        assert_eq!(api_req.get_row_type(), RowType::One);
    }

    #[test]
    fn test_get_row_type_referenced() {
        let api_req =
            ApiPatternRequested::new(Manifest::Webpages, Some(Referenced::Domains), Some(1));
        assert_eq!(api_req.get_row_type(), RowType::Referenced);
    }

    // Test is_referenced_host_type()
    #[test]
    fn test_is_referenced_host_type_true() {
        let api_req =
            ApiPatternRequested::new(Manifest::Plants, Some(Referenced::PlantFamilies), None);
        assert!(api_req.is_referenced_host_type());
    }

    #[test]
    fn test_is_referenced_host_type_false() {
        let api_req = ApiPatternRequested::new(Manifest::Plants, None, None);
        assert!(!api_req.is_referenced_host_type());
    }

    // Test convert_option_i32_to_string()
    #[test]
    fn test_convert_option_i32_to_string_some() {
        assert_eq!(convert_option_i32_to_string(Some(42)), "42");
        assert_eq!(convert_option_i32_to_string(Some(0)), "0");
        assert_eq!(convert_option_i32_to_string(Some(-5)), "-5");
    }

    #[test]
    fn test_convert_option_i32_to_string_none() {
        assert_eq!(convert_option_i32_to_string(None), "None");
    }

    // Test convert_option_referenced_to_string()
    #[test]
    fn test_convert_option_referenced_to_string_some() {
        assert_eq!(
            convert_option_referenced_to_string(Some(Referenced::Plants)),
            "plants"
        );
        assert_eq!(
            convert_option_referenced_to_string(Some(Referenced::Domains)),
            "domains"
        );
    }

    #[test]
    fn test_convert_option_referenced_to_string_none() {
        assert_eq!(convert_option_referenced_to_string(None), "None");
    }

    // Test Display trait
    #[test]
    fn test_api_pattern_requested_display() {
        let api_req = ApiPatternRequested::new(Manifest::Plants, None, Some(42));
        let display_string = format!("{}", api_req);
        assert!(display_string.contains("plants"));
        assert!(display_string.contains("42"));
        assert!(display_string.contains("None"));
    }

    // Test get_pretty()
    #[test]
    fn test_get_pretty() {
        let api_req = ApiPatternRequested::new(Manifest::Classes, None, None);
        let pretty = api_req.get_pretty();
        assert!(pretty.contains("ApiPatternRequested"));
        assert!(pretty.contains("classes"));
    }

    // Test all manifest types work with ApiPatternRequested
    #[test]
    fn test_various_manifests() {
        let manifests = vec![
            Manifest::Classes,
            Manifest::Subsystems,
            Manifest::Zachmans,
            Manifest::Plants,
            Manifest::PlantLists,
            Manifest::Domains,
            Manifest::Webpages,
        ];
        for manifest in manifests {
            let api_req = ApiPatternRequested::new(manifest, None, None);
            assert!(matches!(api_req.get_api_pattern(), Api::Classes));
            assert_eq!(api_req.get_row_type(), RowType::Many);
        }
    }

    // Test all referenced types work
    #[test]
    fn test_various_referenced_types() {
        let refs = vec![
            Referenced::Subsystems,
            Referenced::Zachmans,
            Referenced::Domains,
            Referenced::Plants,
            Referenced::PlantLists,
            Referenced::PlantFamilies,
        ];
        for referenced in refs {
            let api_req = ApiPatternRequested::new(Manifest::Classes, Some(referenced), Some(1));
            assert!(api_req.is_referenced_type());
            assert!(matches!(api_req.get_api_pattern(), Api::Referenced));
        }
    }
}

/* end */
