// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// referenced_host - this models the table containing st least one foreign key to another table.
// constants
use crate::freeradiantbunny::model::manifest::manifest_constants::{
    CLASSES, IMAGES, PLANTS, PLANT_LIST_PLANTS, STYLESHEETS, WEBPAGES,
};

/*
plants		   -> plant_families_id
webpages 	   -> domains_tli
image 		   -> domains_tli
stylesheets 	   -> domains_tli
classes		   -> subsystems_id
classes 	   -> zachmans_id
plant_list_plants  -> plants_id
plant_list_plants  -> plant_lists_id
webpage_maxonomies -> domains_tli
webpage_maxonomies -> maxonomies_id
 */

#[derive(Copy, Clone)]
#[doc = "A referenced is defined using two classes. The first is the table that contains the foreign key, and the second is the table whose id is the id that shows up as the foreign key in the first table."]
pub enum ReferencedHost {
    Classes,
    Webpages,
    Images,
    Stylesheets,
    Plants,
    PlantListPlants,
}

#[doc = "A referenced is defined using two classes. The first is the table that contains the foreign key, and the second is the table whose id is the id that shows up as the foreign key in the first table."]
impl ReferencedHost {
    pub fn get_string(&self) -> String {
        match self {
            ReferencedHost::Classes => String::from(CLASSES),
            ReferencedHost::Webpages => String::from(WEBPAGES),
            ReferencedHost::Images => String::from(IMAGES),
            ReferencedHost::Stylesheets => String::from(STYLESHEETS),
            ReferencedHost::Plants => String::from(PLANTS),
            ReferencedHost::PlantListPlants => String::from(PLANT_LIST_PLANTS),
        }
    }
}

pub fn convert_str_to_referenced_host_type(input: &str) -> Option<ReferencedHost> {
    match input {
        CLASSES => Some(ReferencedHost::Classes),
        WEBPAGES => Some(ReferencedHost::Webpages),
        IMAGES => Some(ReferencedHost::Images),
        STYLESHEETS => Some(ReferencedHost::Stylesheets),
        PLANTS => Some(ReferencedHost::Plants),
        PLANT_LIST_PLANTS => Some(ReferencedHost::PlantListPlants),
        _ => None,
    }
}

#[doc = "convert_str_to_referenced_host_type()."]
pub fn convert_str_to_rereenced_host_type(input: &str) -> Option<ReferencedHost> {
    match input {
        "classes" => Some(ReferencedHost::Classes),
        "webpages" => Some(ReferencedHost::Webpages),
        "images" => Some(ReferencedHost::Images),
        "stylesheets" => Some(ReferencedHost::Stylesheets),
        "plants" => Some(ReferencedHost::Plants),
        "plant_list_plants" => Some(ReferencedHost::PlantListPlants),
        _ => None,
    }
}

impl std::fmt::Display for ReferencedHost {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match *self {
            ReferencedHost::Classes => write!(f, "classes"),
            ReferencedHost::Webpages => write!(f, "webpages"),
            ReferencedHost::Images => write!(f, "images"),
            ReferencedHost::Stylesheets => write!(f, "stylesheets"),
            ReferencedHost::Plants => write!(f, "plants"),
            ReferencedHost::PlantListPlants => write!(f, "plant_list_plants"),
        }
    }
}

/* end */
