// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// ux_design - this models the documentation and hense deliverables of UX Designer
// constants
use crate::freeradiantbunny::view::ux_design_constants::{
 PERSONAE, EMPATHY_MAP, USER_SCENERIO, USER_RESEARCH, COMPETITIVE_ANALYSIS, WIREFRAME, PROTOTYPE, SITE_MAP, SEARCH, USE_CASE, DESIGN_BRIEF,  DESIGN_SEARCH,
};

// these represent tables whose id is used in another table as a foreign key.
#[derive(Copy, Clone)]
pub enum UxDesign {
    Personae,
    EmpathyMap,
    UserScenerio,
    UserResearch,
    CompetitiveAnalysis,
    Wireframe,
    Prototype,
    SiteMap,
    Search,
    UseCase,
    DesignBrief,
    DesignSearch,
}

impl UxDesign {
    pub fn get_string(&self) -> String {
        match self {
            UxDesign::Personae => String::from(PERSONAE),
            UxDesign::EmpathyMap => String::from(EMPATHY_MAP),
            UxDesign::UserScenerio => String::from(USER_SCENERIO),
            UxDesign::UserResearch => String::from(USER_RESEARCH),
            UxDesign::CompetitiveAnalysis => String::from(COMPETITIVE_ANALYSIS),
            UxDesign::Wireframe => String::from(WIREFRAME),
            UxDesign::Prototype => String::from(PROTOTYPE),
            UxDesign::SiteMap => String::from(SITE_MAP),
            UxDesign::Search => String::from(SEARCH),
            UxDesign::UseCase => String::from(USE_CASE),
            UxDesign::DesignBrief => String::from(DESIGN_BRIEF),
            UxDesign::DesignSearch => String::from(DESIGN_SEARCH),
        }
    }
}

pub fn convert_str_to_ux_design_type(input: &str) -> Option<UxDesign> {
    match input {
        PERSONAE => Some(UxDesign::Personae),
        EMPATHY_MAP => Some(UxDesign::EmpathyMap),
        USER_SCENERIO => Some(UxDesign::UserScenerio),
        USER_RESEARCH => Some(UxDesign::UserResearch),
        COMPETITIVE_ANALYSIS => Some(UxDesign::CompetitiveAnalysis),
        WIREFRAME => Some(UxDesign::Wireframe),
        PROTOTYPE => Some(UxDesign::Prototype),
        SITE_MAP => Some(UxDesign::SiteMap),
        SEARCH => Some(UxDesign::Search),
        USE_CASE => Some(UxDesign::UseCase),
        DESIGN_BRIEF => Some(UxDesign::DesignBrief),
        DESIGN_SEARCH => Some(UxDesign::DesignSearch),
        _ => None,
    }
}

impl std::fmt::Display for UxDesign {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match *self {
            UxDesign::Personae => write!(f, "personae"),
            UxDesign::EmpathyMap => write!(f, "empathy_map"),
            UxDesign::UserScenerio => write!(f, "user_scenerio"),
            UxDesign::UserResearch => write!(f, "user_research"),
            UxDesign::CompetitiveAnalysis => write!(f, "competitive_analysis"),
            UxDesign::Wireframe => write!(f, "wireframe"),
            UxDesign::Prototype => write!(f, "prototype"),
            UxDesign::SiteMap => write!(f, "site_map"),
            UxDesign::Search => write!(f, "search"),
            UxDesign::UseCase => write!(f, "use_case"),
            UxDesign::DesignBrief => write!(f, "design_brief"),
            UxDesign::DesignSearch => write!(f, "design_search"),
        }
    }
}

/* end */
