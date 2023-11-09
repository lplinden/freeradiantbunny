// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// connection_string - models for datbase access
// functions
use crate::freeradiantbunny::controller::library::filename::read_file;

// constants
use crate::freeradiantbunny::controller::characters::{COLON, SLASH};
use crate::freeradiantbunny::site_configuration::site_configuration::PGPASS_FULLPATH_FILENAME;

#[doc = "get()."]
pub fn get() -> String {
    // call the function to read the file and store the data in a string
    match read_file::read_file_to_string(PGPASS_FULLPATH_FILENAME) {
        Ok(file_content) => {
            // connection string syntax example
            // postgres://username:password@localhost:5432/mydatabase
            let parts: Vec<&str> = file_content.split(COLON).collect();
            let host = parts[0];
            let postgresql_port = parts[1];
            let database_name = parts[2];
            let user_name = parts[3];
            let password = parts[4].trim();
            let connection_string = format!(
                "postgresql{}{}{}{}{}{}@{}{}{}{}{}",
                COLON,
                SLASH,
                SLASH,
                user_name,
                COLON,
                password,
                host,
                COLON,
                postgresql_port,
                SLASH,
                database_name
            );
            connection_string
        }
        Err(e) => {
            // todo bubble up error
            panic!("Error reading the file: {}", e);
        }
    }
}
