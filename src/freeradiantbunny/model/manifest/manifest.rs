// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// manifest - This enumeration specifyies all all classes which are the models of the database table data.
// constants
use crate::freeradiantbunny::model::manifest::manifest_constants::{
    APPLICATIONS, CLASSES, DOMAINS, IMAGES, MAXONOMIES, MODULES, PLANTS, PLANT_FAMILIES,
    PLANT_LISTS, PLANT_LIST_PLANTS, STYLESHEETS, SUBSYSTEMS, WEBPAGES, WEBPAGE_MAXONOMIES,
    ZACHMANS, PERMACULTURE_TOPICS, PROJECTS, GOAL_STATEMENTS, BUSINESS_PLAN_TEXTS, PROCESSES, SCENE_ELEMENTS, COINS, COIN_PRICES
};

#[doc = "The emum Manifest is where the classes ar named."]
#[derive(Copy, Clone)]
pub enum Manifest {
    Classes,
    Subsystems,
    Zachmans,
    Modules,
    Domains,
    Images,
    Stylesheets,
    Webpages,
    Applications,
    Maxonomies,
    Plants,
    PlantLists,
    PlantListPlants,
    PlantFamilies,
    WebpageMaxonomies,
    PermacultureTopics,
    Projects,
    GoalStatements,
    BusinessPlanTexts,
    Processes,
    SceneElements,
    Coins,
    CoinPrices,
}

#[doc = "The Manifest implementation."]
impl Manifest {
    pub fn get_string(&self) -> String {
        match self {
            Manifest::Classes => String::from(CLASSES),
            Manifest::Subsystems => String::from(SUBSYSTEMS),
            Manifest::Zachmans => String::from(ZACHMANS),
            Manifest::Modules => String::from(MODULES),
            Manifest::Domains => String::from(DOMAINS),
            Manifest::Webpages => String::from(WEBPAGES),
            Manifest::Images => String::from(IMAGES),
            Manifest::Stylesheets => String::from(STYLESHEETS),
            Manifest::Applications => String::from(APPLICATIONS),
            Manifest::Maxonomies => String::from(MAXONOMIES),
            Manifest::Plants => String::from(PLANTS),
            Manifest::PlantLists => String::from(PLANT_LISTS),
            Manifest::PlantListPlants => String::from(PLANT_LIST_PLANTS),
            Manifest::PlantFamilies => String::from(PLANT_FAMILIES),
            Manifest::WebpageMaxonomies => String::from(WEBPAGE_MAXONOMIES),
            Manifest::PermacultureTopics => String::from(PERMACULTURE_TOPICS),
            Manifest::Projects => String::from(PROJECTS),
            Manifest::GoalStatements => String::from(GOAL_STATEMENTS),
            Manifest::BusinessPlanTexts => String::from(BUSINESS_PLAN_TEXTS),
            Manifest::Processes => String::from(PROCESSES),
            Manifest::SceneElements => String::from(SCENE_ELEMENTS),
            Manifest::Coins => String::from(COINS),
            Manifest::CoinPrices => String::from(COIN_PRICES),
        }
    }
}

#[doc = "convert_str_to_manifst_type()."]
pub fn convert_str_to_manifest_type(input: &str) -> Option<Manifest> {
    match input {
        "classes" => Some(Manifest::Classes),
        "subsystems" => Some(Manifest::Subsystems),
        "zachmans" => Some(Manifest::Zachmans),
        "modules" => Some(Manifest::Modules),
        "domains" => Some(Manifest::Domains),
        "webpages" => Some(Manifest::Webpages),
        "images" => Some(Manifest::Images),
        "stylesheets" => Some(Manifest::Stylesheets),
        "applications" => Some(Manifest::Applications),
        "maxonomies" => Some(Manifest::Maxonomies),
        "plants" => Some(Manifest::Plants),
        "plant_lists" => Some(Manifest::PlantLists),
        "plant_list_plants" => Some(Manifest::PlantListPlants),
        "plant_families" => Some(Manifest::PlantFamilies),
        "webpage_maxonomies" => Some(Manifest::WebpageMaxonomies),
        "permaculture_topics" => Some(Manifest::PermacultureTopics),
        "projects" => Some(Manifest::Projects),
        "goal_statements" => Some(Manifest::GoalStatements),
        "business_plan_texts" => Some(Manifest::BusinessPlanTexts),
        "processes" => Some(Manifest::Processes),
        "scene_elements" => Some(Manifest::SceneElements),
        "coins" => Some(Manifest::Coins),
        "coin_prices" => Some(Manifest::CoinPrices),
        _ => None,
    }
}

#[doc = "The fmt for Manifest."]
impl std::fmt::Display for Manifest {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match *self {
            Manifest::Classes => write!(f, "classes"),
            Manifest::Subsystems => write!(f, "subsystems"),
            Manifest::Zachmans => write!(f, "zachmans"),
            Manifest::Modules => write!(f, "modules"),
            Manifest::Domains => write!(f, "domains"),
            Manifest::Webpages => write!(f, "webpages"),
            Manifest::Images => write!(f, "images"),
            Manifest::Stylesheets => write!(f, "stylesheets"),
            Manifest::Applications => write!(f, "applications"),
            Manifest::Maxonomies => write!(f, "maxonomies"),
            Manifest::Plants => write!(f, "plants"),
            Manifest::PlantLists => write!(f, "plant_lists"),
            Manifest::PlantListPlants => write!(f, "plant_list_plants"),
            Manifest::PlantFamilies => write!(f, "plant_families"),
            Manifest::WebpageMaxonomies => write!(f, "webpage_maxonomies"),
            Manifest::PermacultureTopics => write!(f, "permaculture_topics"),
            Manifest::Projects => write!(f, "projects"),
            Manifest::GoalStatements => write!(f, "goal_statements"),
            Manifest::BusinessPlanTexts => write!(f, "business_plan_texts"),
            Manifest::Processes => write!(f, "processes"),
            Manifest::SceneElements => write!(f, "scene_elements"),
            Manifest::Coins => write!(f, "coins"),
            Manifest::CoinPrices => write!(f, "coin_prices"),
        }
    }
}

/* end */
