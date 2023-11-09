// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// row - This models one row of data from a table in the database.
// traits
use crate::freeradiantbunny::model::manifest::scrubber::Scrubber;
// structures
use crate::freeradiantbunny::model::manifest::field_box::FieldBox;
// constants
use crate::freeradiantbunny::model::manifest::column_type::{
    BACKUPS, BOTANICAL_NAME, CRM, DESCRIPTION, DEV, DOMAIN_NAME, FK_CONSTRAINTS, HOSTING, ID,
    IMG_URL, INCREMENT_ID_FLAG, LOG, LOOKUP, MAKE_INDEX_FLAG, MAKE_UNIQUE, MAXONOMIES_ID, NAME,
    PATH, PLANT_FAMILIES, PLANT_LIST_NAME, PRIVILEGED_OWNER, REFERENCED, REFERENCED_ID,
    REFERENCED_TABLE, REGISTRAR, RULES, SCRUBBER_FLAG, SORT, SPECIALIZED_FIELDS, SSL_CERT, STATUS,
    SUBSYSTEMS, SUBSYSTEMS_ID, TAGLINE, TLI, URL, WEBPAGES_ID, ZACHMANS, ZACHMANS_ID, WATCH, TYPE, PLATFORM, SYMBOL
};

#[derive(Clone)]
pub struct Row {
    field_boxes: Vec<FieldBox>,
}

impl Row {
    pub fn new(field_boxes: Vec<FieldBox>) -> Row {
        let row_instance = Row { field_boxes };
        row_instance
    }
    #[doc = "get_field_box_given_name()."]
    pub fn get_field_box_given_column_name(&self, column_name: &str) -> Option<FieldBox> {
        // loop to search
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == column_name.to_string() {
                return Some(field_box);
            }
        }
        None
    }
}

#[doc = "impl Scrubber for Row."]
impl Scrubber for Row {
    fn play(&self) {
        println!(
            "play row: field_boxes count: {}",
            self.get_field_boxes().len()
        );
    }
    fn get_field_boxes(&self) -> Vec<FieldBox> {
        self.field_boxes.clone()
    }
    fn get_num(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            // debug
            //println!("row debug: get_num() checking field_type: {}", field_box.get_field_type().to_string());
            if field_box.get_column_type().to_string() == "num".to_string() {
                let num_option = field_box.get_value_i32();
                match num_option {
                    Some(num) => {
                        // debug
                        //println!("row debug: get_num() checking: id {}", num);
                        let num_string = format!("{}", num);
                        return Some(num_string);
                    }
                    None => {
                        panic!("row failed to get_num() #1.");
                    }
                };
            }
        }
        panic!("row failed to get_num() #2.");
    }
    fn get_id(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            // debug
            //println!("row debug: get_id() checking field_type: {}", field_box.get_field_type().to_string());
            if field_box.get_column_type().to_string() == ID.to_string() {
                let id_option = field_box.get_value_i32();
                match id_option {
                    Some(id) => {
                        // debug
                        //println!("row debug: get_id() checking: id {}", id);
                        let id_string = format!("{}", id);
                        return Some(id_string);
                    }
                    None => {
                        panic!("row failed to get_id() #1.");
                    }
                };
            }
        }
        panic!("row failed to get_id() #2.");
    }
    fn get_name(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == NAME.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_name().");
    }
    fn get_description(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == DESCRIPTION.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_description().");
    }
    fn get_img_url(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == IMG_URL.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_img_url().");
    }
    fn get_status(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == STATUS.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_status().");
    }
    fn get_sort(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == SORT.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_sort().");
    }
    fn get_dev(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == DEV.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_dev().");
    }
    fn get_fk_constraints(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == FK_CONSTRAINTS.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_fk_constraints().");
    }
    fn get_specialized_fields(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == SPECIALIZED_FIELDS.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_specialized_fields().");
    }
    fn get_privileged_owner(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == PRIVILEGED_OWNER.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_privileged_owner().");
    }
    fn get_make_index_flag(&self) -> Option<bool> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == MAKE_INDEX_FLAG.to_string() {
                return field_box.get_value_bool();
            }
        }
        panic!("row failed to get_make_index_flag().");
    }
    fn get_make_unique(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == MAKE_UNIQUE.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_make_unique().");
    }
    fn get_increment_id_flag(&self) -> Option<bool> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == INCREMENT_ID_FLAG.to_string() {
                return field_box.get_value_bool();
            }
        }
        panic!("row failed to get_increment_id_flag().");
    }
    fn get_scrubber_flag(&self) -> Option<bool> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == SCRUBBER_FLAG.to_string() {
                return field_box.get_value_bool();
            }
        }
        panic!("row failed to get_scrubber_flag().");
    }
    fn get_rules(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == RULES.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_rules().");
    }
    fn get_tagline(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == TAGLINE.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_tagline().");
    }
    fn get_tli(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == TLI.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_tli().");
    }
    fn get_referenced(&self) -> Option<i32> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == REFERENCED.to_string() {
                return field_box.get_value_i32();
            }
        }
        panic!("row failed to get_referenced().");
    }
    fn get_referenced_table(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == REFERENCED_TABLE.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_referenced_table().");
    }
    fn get_referenced_id(&self) -> Option<i32> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == REFERENCED_ID.to_string() {
                return field_box.get_value_i32();
            }
        }
        panic!("row failed to get_referenced_id().");
    }
    fn get_url(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == URL.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_url().");
    }
    fn get_subsystems_id(&self) -> Option<i32> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == SUBSYSTEMS_ID.to_string() {
                return field_box.get_value_i32();
            }
        }
        panic!("row failed to get_subsystems_id().");
    }
    fn get_zachmans_id(&self) -> Option<i32> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == ZACHMANS_ID.to_string() {
                return field_box.get_value_i32();
            }
        }
        panic!("row failed to get_zachmans_id().");
    }
    fn get_subsystems(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == SUBSYSTEMS.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_subsystems().");
    }
    fn get_zachmans(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == ZACHMANS.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_zachmanbs().");
    }
    fn get_ssl_cert(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == SSL_CERT.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_ssl_cert().");
    }
    fn get_backups(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == BACKUPS.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_backups().");
    }
    fn get_crm(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == CRM.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_crm().");
    }
    fn get_domain_name(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == DOMAIN_NAME.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_domain_name().");
    }
    fn get_registrar(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == REGISTRAR.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_registrar().");
    }
    fn get_hosting(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == HOSTING.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_hosting().");
    }
    fn get_lookup(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == LOOKUP.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_lookup().");
    }
    fn get_log(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == LOG.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_log().");
    }
    fn get_path(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == PATH.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_path().");
    }
    fn get_botanical_name(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == BOTANICAL_NAME.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_botanical_name().");
    }
    fn get_plant_list_name(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == PLANT_LIST_NAME.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_plant_list_name().");
    }
    fn get_plant_families(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == PLANT_FAMILIES.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_plant_families().");
    }
    fn get_webpages_id(&self) -> Option<i32> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == WEBPAGES_ID.to_string() {
                return field_box.get_value_i32();
            }
        }
        panic!("row failed to get_webpages_id().");
    }
    fn get_maxonomies_id(&self) -> Option<i32> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == MAXONOMIES_ID.to_string() {
                return field_box.get_value_i32();
            }
        }
        panic!("row failed to get_maxonomies_id().");
    }
    fn get_watch(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == WATCH.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_watch().");
    }
    fn get_type(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == TYPE.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_type().");
    }
    fn get_platform(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == PLATFORM.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_platform().");
    }
    fn get_symbol(&self) -> Option<String> {
        for field_box in self.get_field_boxes() {
            if field_box.get_column_type().to_string() == SYMBOL.to_string() {
                return field_box.get_value_string();
            }
        }
        panic!("row failed to get_symbol().");
    }
}

/* end */
