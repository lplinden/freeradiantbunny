// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// scrubber - a structure which all classes abide by as interface
// import
use std::fmt;
// structures
use crate::freeradiantbunny::model::manifest::field_box::FieldBox;

#[doc = "The Scrubber trait is an interface for the classes on the Manifest."]
pub trait Scrubber {
    fn play(&self);
    fn get_field_boxes(&self) -> Vec<FieldBox>;
    fn get_num(&self) -> Option<String>;
    fn get_id(&self) -> Option<String>;
    fn get_name(&self) -> Option<String>;
    fn get_description(&self) -> Option<String>;
    fn get_img_url(&self) -> Option<String>;
    fn get_status(&self) -> Option<String>;
    fn get_sort(&self) -> Option<String>;
    fn get_dev(&self) -> Option<String>;
    fn get_lookup(&self) -> Option<String>;
    fn get_fk_constraints(&self) -> Option<String>;
    fn get_specialized_fields(&self) -> Option<String>;
    fn get_privileged_owner(&self) -> Option<String>;
    fn get_make_index_flag(&self) -> Option<bool>;
    fn get_make_unique(&self) -> Option<String>;
    fn get_increment_id_flag(&self) -> Option<bool>;
    fn get_scrubber_flag(&self) -> Option<bool>;
    fn get_rules(&self) -> Option<String>;
    fn get_url(&self) -> Option<String>;
    fn get_url_external(&self) -> Option<String>;
    fn get_subsystems_id(&self) -> Option<i32>;
    fn get_zachmans_id(&self) -> Option<i32>;
    fn get_subsystems(&self) -> Option<String>;
    fn get_zachmans(&self) -> Option<String>;
    fn get_referenced(&self) -> Option<i32>;
    fn get_referenced_table(&self) -> Option<String>;
    fn get_referenced_id(&self) -> Option<i32>;
    fn get_tli(&self) -> Option<String>;
    fn get_domain_name(&self) -> Option<String>;
    fn get_ssl_cert(&self) -> Option<String>;
    fn get_tagline(&self) -> Option<String>;
    fn get_registrar(&self) -> Option<String>;
    fn get_hosting(&self) -> Option<String>;
    fn get_crm(&self) -> Option<String>;
    fn get_backups(&self) -> Option<String>;
    fn get_log(&self) -> Option<String>;
    fn get_path(&self) -> Option<String>;
    fn get_botanical_name(&self) -> Option<String>;
    fn get_plant_list_name(&self) -> Option<String>;
    fn get_plant_families(&self) -> Option<String>;
    fn get_webpages_id(&self) -> Option<i32>;
    fn get_maxonomies_id(&self) -> Option<i32>;
    fn get_watch(&self) -> Option<String>;
    fn get_type(&self) -> Option<String>;
    fn get_platform(&self) -> Option<String>;
    fn get_symbol(&self) -> Option<String>;
}

#[doc = "The fmt for Scrubber."]
impl fmt::Display for Box<dyn Scrubber> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // use `as_ref()` to convert the Box to a reference of the Scrubber trait
        //let scrubber_ref: &dyn Scrubber = self.as_ref();
        write!(f, "scrubber.display")
    }
}

/* end */
