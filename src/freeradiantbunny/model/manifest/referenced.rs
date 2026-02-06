// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// referenced - this models the table whose id is a foreign key in other tables.
// constants
use crate::freeradiantbunny::model::manifest::manifest_constants::{
    DOMAINS, MAXONOMIES, PLANTS, PLANT_FAMILIES, PLANT_LISTS, SUBSYSTEMS, ZACHMANS,
};

/*
zachmans_id	  used by classes
subsystems_id 	  used by classes
plants_id 	  used by plant_list_plants
plant_lists_id 	  used by plant_list_plants
plant_families_id used by plants
domains_tli	  used by webpages
domains_tli 	  used by images
domains_tli	  used by stylesheets
domains_tli       used by maxonomies via webpage_maxonoimes
maxonomies_id     used by domains via webpage_maxonomies
 */

// these represent tables whose id is used in another table as a foreign key.
#[derive(Copy, Clone)]
pub enum Referenced {
    Subsystems,
    Zachmans,
    Domains,
    Maxonomies,
    Plants,
    PlantLists,
    PlantFamilies,
}

impl Referenced {
    pub fn get_string(&self) -> String {
        match self {
            Referenced::Subsystems => String::from(SUBSYSTEMS),
            Referenced::Zachmans => String::from(ZACHMANS),
            Referenced::Domains => String::from(DOMAINS),
            Referenced::Maxonomies => String::from(MAXONOMIES),
            Referenced::Plants => String::from(PLANTS),
            Referenced::PlantLists => String::from(PLANT_LISTS),
            Referenced::PlantFamilies => String::from(PLANT_FAMILIES),
        }
    }
}

pub fn convert_str_to_referenced_type(input: &str) -> Option<Referenced> {
    match input {
        SUBSYSTEMS => Some(Referenced::Subsystems),
        ZACHMANS => Some(Referenced::Zachmans),
        DOMAINS => Some(Referenced::Domains),
        MAXONOMIES => Some(Referenced::Maxonomies),
        PLANTS => Some(Referenced::Plants),
        PLANT_LISTS => Some(Referenced::PlantLists),
        PLANT_FAMILIES => Some(Referenced::PlantFamilies),
        _ => None,
    }
}

impl std::fmt::Display for Referenced {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match *self {
            Referenced::Subsystems => write!(f, "subsystems"),
            Referenced::Zachmans => write!(f, "zachmans"),
            Referenced::Domains => write!(f, "domains"),
            Referenced::Maxonomies => write!(f, "maxonomies"),
            Referenced::Plants => write!(f, "plants"),
            Referenced::PlantLists => write!(f, "plant_lists"),
            Referenced::PlantFamilies => write!(f, "plant_families"),
        }
    }
}

/* end */
