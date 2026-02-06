// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

use crate::freeradiantbunny::controller::characters::{COMMA, DOT, SPACE};
/// classes - building the classes classes from the buttom up.
use crate::freeradiantbunny::model::manifest::manifest::convert_str_to_manifest_type;
use crate::freeradiantbunny::model::manifest::upk_type::UpkType;
use crate::freeradiantbunny::model::manifest::manifest::Manifest;
use crate::freeradiantbunny::model::manifest::manifest_constants::{DOMAINS, MAXONOMIES, WEBPAGES, CLASSES, ZACHMANS, SUBSYSTEMS};
use crate::freeradiantbunny::model::manifest::referenced::Referenced;

#[doc = "This structure has a vector of old the names of the database fields."]
pub struct Classes {
    classes_name: String,
    fields: Vec<String>,
    sql: String,
    upk_type: UpkType,
}

#[doc = "The Classes implementation."]
impl Classes {
    pub fn new(classes_name: String, fields: Vec<String>, sql: String, upk_type: UpkType) -> Classes {
        let classes = Classes {
            classes_name,
            fields,
            sql,
            upk_type,
        };
        classes
    }
    #[doc = "get_classes_name()."]
    fn get_classes_name(&self) -> String {
        self.classes_name.clone()
    }
    #[doc = "get_fields()."]
    pub fn get_fields(&self) -> Vec<String> {
        self.fields.clone()
    }
    #[doc = "print()."]
    pub fn print(&self) {
      // comment out due to compiler warning
      // format!("classes_name: {}", self.get_classes_name());
    }
    #[doc = "get_sql()."]
    pub fn get_sql(&self) -> Option<String> {
        Some(self.sql.clone())
    }
    #[doc = "get_upk_type()."]
    pub fn get_upk_type(&self) -> UpkType {
        match self.upk_type {
            UpkType::None => {
                UpkType::None
            },
            UpkType::Protected=> {
                UpkType::Protected
            },
        }
    }
    pub fn get_manifest(&self) -> Option<Manifest> {
        let classes_name = self.get_classes_name();
        convert_str_to_manifest_type(classes_name.as_str())
    }
    #[doc = "get_sql_given_id_candidate(). This generates the SQL based upon the fields in the Classes definition."]
    pub fn get_sql_given_id_candidate(&self, id_candidate: i32) -> Option<String> {
        let manifest_string = self
            .get_manifest()
            .expect("classes error failed manifest.")
            .get_string();
        let mut sql = "SELECT".to_string();
        let table_alias = "a".to_string();
        let count = self.get_fields().len();
        let mut x = 0;
        for field in self.get_fields().iter() {
            x = x + 1;
            if x < count {
                sql = sql
                    + SPACE.to_string().as_str()
                    + &table_alias
                    + DOT.to_string().as_str()
                    + field
                    + COMMA.to_string().as_str();
            } else {
                // no comma at end
                sql = sql
                    + SPACE.to_string().as_str()
                    + &table_alias
                    + DOT.to_string().as_str()
                    + field;
            }
        }
        sql = format!(
            "{0} FROM {1} {3} WHERE {3}.id = {2};",
            sql, manifest_string, id_candidate, table_alias
        );
        Some(sql)
    }
    #[doc = "get_sql_given_referenced()."]
    pub fn get_sql_given_referenced(
        &self,
        id_candidate: i32,
        referenced_type: Referenced,
    ) -> Option<String> {
        let manifest_string = self
            .get_manifest()
            .expect("classes error failed manifest.")
            .get_string();
        let referenced_type_string = referenced_type.get_string();
        // check if table is many-to-many
        if manifest_string == WEBPAGES.to_string()
            && referenced_type_string == MAXONOMIES.to_string()
        {
            let many_to_many_table_name = "webpage_maxonomies".to_string();
            let sql = format!("SELECT a.status, a.sort, a.id, a.img_url, a.name, '{1}' as referenced_table, b.id as referenced_id FROM {0} a, {1} b, {2} c WHERE a.id = c.{0}_id AND b.id = c.{1}_id AND b.id = {3} ORDER BY a.sort DESC, a.name, a.id;", manifest_string, referenced_type_string, many_to_many_table_name, id_candidate);
            Some(sql)
        } else if manifest_string == WEBPAGES.to_string()
            && referenced_type_string == DOMAINS.to_string()
        {

            // special because tli is used as a foreign key (instead of id)
            let sql = format!("SELECT a.status, a.sort, a.id, concat('<a href=\"https://', b.domain_name, a.path, '\">', a.path, '</a>') as path, a.img_url, a.name, '{1}' as referenced_table, b.id as referenced_id FROM {0} a, {1} b WHERE a.{1}_tli = b.tli AND b.id = {2} ORDER BY a.sort DESC, a.name, a.id;", manifest_string, referenced_type_string, id_candidate);
            Some(sql)
        } else if manifest_string == CLASSES.to_string()
            && referenced_type_string == ZACHMANS.to_string()
        {
            let sql = format!("SELECT a.status, a.sort, a.id, a.img_url, a.name, '{1}' as referenced_table, b.id as referenced_id FROM {0} a, {1} b WHERE a.{1}_id = b.id AND b.id = {2} ORDER BY a.sort DESC, a.name, a.id;", manifest_string, referenced_type_string, id_candidate);
            Some(sql)
        } else if manifest_string == CLASSES.to_string()
            && referenced_type_string == SUBSYSTEMS.to_string()
        {
            let sql = format!("SELECT a.status, a.sort, a.id, a.img_url, a.name, '{1}' as referenced_table, b.id as referenced_id FROM {0} a, {1} b WHERE a.{1}_id = b.id AND b.id = {2} ORDER BY a.sort DESC, a.name, a.id;", manifest_string, referenced_type_string, id_candidate);
            Some(sql)
        } else {
            let sql = format!("SELECT a.status, a.sort, a.id, a.img_url, a.name, b.name as referenced_table, b.id as referenced_id FROM {0} a, {1} b WHERE a.{1}_id = b.id AND b.id = {2} ORDER BY a.sort DESC, a.name, a.id;", manifest_string, referenced_type_string, id_candidate);
            Some(sql)
        }
    }
}

/* end */
