// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

use std::fmt;
use std::fs::File;
/// filename - models a file on the filesystem
// import
use std::io::{Error, Read, Write};
use std::path::Path;
// constants
use crate::freeradiantbunny::site_configuration::site_configuration::USER_HOME_PATH;

#[doc = "The Filename structure."]
pub struct Filename {
    fullpath_filename: String,
}

#[doc = "The Filename implementation."]
impl Filename {
    pub fn new(found_known_host_dir: &str, found_known_path: &str) -> Filename {
        let fullpath_filename = format!(
            "{}{}{}",
            USER_HOME_PATH, found_known_host_dir, found_known_path,
        );
        let filename_instance = Filename {
            fullpath_filename: fullpath_filename,
        };
        filename_instance
    }
    pub fn get_fullpath_filename(&self) -> String {
        self.fullpath_filename.clone()
    }
    #[doc = "This private function accepts a fullpath_filename and determines if the path exists."]
    pub fn exists(&self) -> bool {
        // check if file exists
        let fullpath_filename = self.get_fullpath_filename();
        let path = Path::new(fullpath_filename.as_str());
        if path.exists() {
            return true;
        }
        println!("freeradiantbunny filename error: file does not exist!");
        false
    }
    #[doc = "This private function accepts a fullpath_filename (which should be of a webpage) and opens that file and read the file, and then returns a buffer holding the contents of the file."]
    pub fn read(&self) -> String {
        // todo is the mime_type even needed
        //let mime_type = "text/html";
        let mut file = File::open(self.get_fullpath_filename())
            .expect("freeradiantbunny server error: open file failed.");
        let mut buffer = String::new();
        // todo the _ can be replaced with byte_size
        // todo perhaps byte_size should be sstored
        let _ = file
            .read_to_string(&mut buffer)
            .expect("freeradiantbunny server error: read webpage file failed.");
        buffer
    }
    pub fn write(&self, data: &str) -> Result<Option<bool>, Error> {
        let mut output = File::create(self.get_fullpath_filename())?;
        write!(output, "{}", data)?;
        // todo this result create will have to do
        let result: Result<Option<bool>, Error> = Ok(Option::Some(true));
        result
    }
    #[doc = "Function to return a pretty string of the data of the struct."]
    pub fn get_pretty(&self) -> String {
        let pretty_string = format!("fullpath_filename: {}", self.get_fullpath_filename(),);
        pretty_string
    }
}

#[doc = "The fmt implementation for Filename."]
impl fmt::Display for Filename {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "Filename: fullpath_filename: {:?}",
            self.fullpath_filename
        )
    }
}

/* end */
