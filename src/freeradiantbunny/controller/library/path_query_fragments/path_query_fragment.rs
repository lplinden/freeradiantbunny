// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// path_query_fragmend - models user intent in URL
// structures
use crate::freeradiantbunny::controller::library::path_query_fragments::fragment::Fragment;
use crate::freeradiantbunny::controller::library::path_query_fragments::path::Path;
use crate::freeradiantbunny::controller::library::path_query_fragments::query::Query;
// constants
use crate::freeradiantbunny::controller::characters::{HASH, NULL_STR, QUESTION_MARK};

#[doc = "The PathQueryFragment structure contains the original path that is previded by the request which was provided by the webserver. The function splits up the given string and creates three structure instances: Path, Query, and Fragment."]
pub struct PathQueryFragment {
    path_instance: Path,
    query_instance: Query,
    fragment_instance: Fragment,
}

#[doc = "The Path implementation contains functions using the Path structure."]
impl PathQueryFragment {
    pub fn new(given_path_query_fragment: &str) -> PathQueryFragment {
        // error check the given
        // calculate lengnth
        let given_path_query_fragment_length = given_path_query_fragment.len();
        // check that path exists
        if given_path_query_fragment_length == 0 {
            panic!("freeradiantbunny paths error: given_path_query_fragment is less than 1 char failed.");
        }
        // split the given
        let (path_string, query_string, fragment_string) =
            split_given_path_query_fragment(&given_path_query_fragment);
        // convert the strings to structure instance
        // create Path structure
        let path_instance = Path::new(&path_string);
        // create Query structure
        let query_instance = Query::new(&query_string);
        // create Fragment structure
        let fragment_instance = Fragment::new(&fragment_string);
        // create an instance of the Path structure
        let path_query_fragment_instance = PathQueryFragment {
            path_instance: path_instance,
            query_instance: query_instance,
            fragment_instance: fragment_instance,
        };
        path_query_fragment_instance
    }
    pub fn get_path_instance(&self) -> &Path {
        &(self.path_instance)
    }
    pub fn get_query_instance(&self) -> &Query {
        &(self.query_instance)
    }
    pub fn get_fragment_instance(&self) -> &Fragment {
        &(self.fragment_instance)
    }
    #[doc = "Function to return a pretty string of the data of the structure."]
    pub fn get_pretty(&self) -> String {
        let pretty_string = format!(
            "path_query_fragment: (\n\t   path: {},\n\t   query: {},\n\t   fragment: {})",
            self.get_path_instance().get_pretty(),
            self.get_query_instance().get_pretty(),
            self.get_fragment_instance().get_pretty(),
        );
        pretty_string
    }
}

#[doc = "split_given_path_query_fragment()."]
fn split_given_path_query_fragment(given_path_query_fragment: &str) -> (String, String, String) {
    let given_path_array_by_question_mark: Vec<&str> =
        given_path_query_fragment.split(QUESTION_MARK).collect();
    match given_path_array_by_question_mark.len() {
        1 => {
            // ok
            return (
                given_path_array_by_question_mark[0].to_string(),
                NULL_STR.to_string(),
                NULL_STR.to_string(),
            );
        }
        2 => {
            // ok
            // split for fragment
            let given_path_array_by_hash: Vec<&str> =
                given_path_array_by_question_mark[1].split(HASH).collect();
            match given_path_array_by_hash.len() {
                1 => {
                    // ok
                    return (
                        given_path_array_by_question_mark[0].to_string(),
                        given_path_array_by_hash[0].to_string(),
                        NULL_STR.to_string(),
                    );
                }
                2 => {
                    // ok
                    return (
                        given_path_array_by_question_mark[0].to_string(),
                        given_path_array_by_hash[0].to_string(),
                        given_path_array_by_hash[1].to_string(),
                    );
                }
                _ => {
                    panic!(
                        "freeradiantbunny server error: failed given_path_array_by_hash syntax."
                    );
                }
            }
        }
        _ => {
            panic!(
                "freeradiantbunny server error: failed given_path_array_by_question_mark syntax."
            );
        }
    }
}

/* end */
