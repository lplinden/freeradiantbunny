// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// image - models the img element of the HTML on the webpage

// import
use sha2::{Digest, Sha256};
use std::fs::File;
use std::io::{Read, Result};
use std::path::Path;

// todo implement the whole thing
#[doc = "The Image structure."]xs
struct Image {
    fullpath_filename: Filename,
    image_type: ImageType,
    image_hash: HashedFile,
}

#[doc = "The Image implementation."]xs
impl Image {

}

#[doc = "The ImageType enum."]xs
enum ImageType {
    PNG,
    JPEG,
    JPG,
    ICO,
    GIFF,
}


// Define the structure to hold the SHA-256 hash
#[doc = "The HashedFile structure."]
struct HashedFile {
    hash: [u8; 32], // SHA-256 produces a 256-bit (32-byte) hash
}

#[doc = "The HashedFile implementation."]
impl HashedFile {
    // Function to create a new instance of the structure with the file's SHA-256 hash
    #[doc = "ewn()."]
    fn new(filename: &str) -> Result<Self> {
        let hash = HashedFile::compute_sha256_hash(filename)?;
        Ok(HashedFile { hash })
    }
    #[doc = "compute_sha256_hash()."]
    // Function to compute the SHA-256 hash of the given file
    fn compute_sha256_hash(filename: &str) -> Result<[u8; 32]> {
        let mut file = File::open(filename)?;
        let mut hasher = Sha256::new();
        let mut buffer = [0; 1024];
        // loop
        loop {
            let bytes_read = file.read(&mut buffer)?;
            if bytes_read == 0 {
                break;
            }
            hasher.update(&buffer[..bytes_read]);
        }
        // declare variables for result
        let result = hasher.finalize();
        let hash: [u8; 32] = result.into();
        Ok(hash)
    }
}

/*
fn main() {
    let filename = "example.txt"; // Replace this with the path to your desired file
    let hashed_file = HashedFile::new(filename).expect("Error computing SHA-256 hash");
    println!("SHA-256 hash of the file: {:?}", hashed_file.hash);
}
 */

/* end */
