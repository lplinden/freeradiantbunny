// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// read_file - standard  accesss to files holding HTML
// import
use std::fs::File;
use std::io::{self, Read};

#[doc = "read_file_to_string()."]
pub fn read_file_to_string(filename: &str) -> Result<String, io::Error> {
    // Open the file
    let mut file = File::open(filename)?;

    // Create a buffer to store the file content
    let mut buffer = String::new();

    // Read the file content into the buffer
    file.read_to_string(&mut buffer)?;

    Ok(buffer)
}

/* end */
