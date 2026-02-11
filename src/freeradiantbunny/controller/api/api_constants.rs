// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// api_constants - keywords of the freeradiantbunny API
// constants
use crate::freeradiantbunny::controller::characters::NULL_STR;

// declare public cosntants
pub const KEYWORD_HOST: &str = "Host";
pub const KNOWN_KEY_VIEW: &str = "view";
pub const KNOWN_KEY_SORT: &str = "sort";
pub const KNOWN_KEY_FILTER: &str = "filter";
pub const KNOWN_KEY_UPK: &str = "upk";
pub const KNOWN_KEY_COMMAND: &str = "command";
pub const KNOWN_KEY_MAKESORTTODAY: &str = "makesorttoday";
pub const KNOWN_KEY_CLASS: &str = "class";
pub const KNOWN_PARAMETER_KEYS: [&str; 6] = [
    KNOWN_KEY_VIEW,
    KNOWN_KEY_SORT,
    KNOWN_KEY_FILTER,
    KNOWN_KEY_UPK,
    KNOWN_KEY_COMMAND,
    KNOWN_KEY_MAKESORTTODAY,
];
pub const KNOWN_KEY_VIEW_VALUE_HTML: &str = "html";
pub const KNOWN_KEY_VIEW_VALUE_TEXT: &str = "text";
pub const KNOWN_KEY_VIEW_VALUE_HTMX: &str = "htmx";
pub const KNOWN_KEY_VIEW_VALUE_DEFAULT: &str = NULL_STR;
pub const KNOWN_FRAGMENTS: [&str; 1] = ["top"];
pub const HOMEPAGE_PAGENAME: &str = "index.html";
pub const HOMEPAGE_PATH: &str = "/index.html";
pub const HTTP_404: &str = "/404.html";
pub const DEBUG: &str = "debug ";
pub const DATA: &str = "data  ";
pub const ERROR: &str = "error ";
pub const PANIC: &str = "panic ";
pub const NONE: &str = "none  ";
pub const DATE_SEPARATOR: char = '-';
pub const SORT_PREFIX_STRING: char = 'Y';
pub const TABLE_ALIAS: &str = "a";
pub const MAKESORTTODAY_WEBPAGE: &str = "makesorttoday.php";

// LPL 2026-02-11
#[cfg(test)]
mod tests {
    use super::*;

    // Test query parameter key constants
    #[test]
    fn test_known_key_constants() {
        assert_eq!(KNOWN_KEY_VIEW, "view");
        assert_eq!(KNOWN_KEY_SORT, "sort");
        assert_eq!(KNOWN_KEY_FILTER, "filter");
        assert_eq!(KNOWN_KEY_UPK, "upk");
        assert_eq!(KNOWN_KEY_COMMAND, "command");
        assert_eq!(KNOWN_KEY_MAKESORTTODAY, "makesorttoday");
        assert_eq!(KNOWN_KEY_CLASS, "class");
    }

    // Test view value constants
    #[test]
    fn test_view_value_constants() {
        assert_eq!(KNOWN_KEY_VIEW_VALUE_HTML, "html");
        assert_eq!(KNOWN_KEY_VIEW_VALUE_TEXT, "text");
        assert_eq!(KNOWN_KEY_VIEW_VALUE_HTMX, "htmx");
        assert_eq!(KNOWN_KEY_VIEW_VALUE_DEFAULT, NULL_STR);
    }

    // Test KNOWN_PARAMETER_KEYS array contains expected keys
    #[test]
    fn test_known_parameter_keys_array() {
        assert_eq!(KNOWN_PARAMETER_KEYS.len(), 6);
        assert!(KNOWN_PARAMETER_KEYS.contains(&KNOWN_KEY_VIEW));
        assert!(KNOWN_PARAMETER_KEYS.contains(&KNOWN_KEY_SORT));
        assert!(KNOWN_PARAMETER_KEYS.contains(&KNOWN_KEY_FILTER));
        assert!(KNOWN_PARAMETER_KEYS.contains(&KNOWN_KEY_UPK));
        assert!(KNOWN_PARAMETER_KEYS.contains(&KNOWN_KEY_COMMAND));
        assert!(KNOWN_PARAMETER_KEYS.contains(&KNOWN_KEY_MAKESORTTODAY));
    }

    // Test page and path constants
    #[test]
    fn test_page_constants() {
        assert_eq!(HOMEPAGE_PAGENAME, "index.html");
        assert_eq!(HOMEPAGE_PATH, "/index.html");
        assert_eq!(HTTP_404, "/404.html");
    }

    // Test host keyword
    #[test]
    fn test_keyword_host() {
        assert_eq!(KEYWORD_HOST, "Host");
    }

    // Test logging level constants
    #[test]
    fn test_log_level_constants() {
        assert_eq!(DEBUG, "debug ");
        assert_eq!(DATA, "data  ");
        assert_eq!(ERROR, "error ");
        assert_eq!(PANIC, "panic ");
        assert_eq!(NONE, "none  ");
    }

    // Test date and sort constants
    #[test]
    fn test_date_sort_constants() {
        assert_eq!(DATE_SEPARATOR, '-');
        assert_eq!(SORT_PREFIX_STRING, 'Y');
    }

    // Test SQL alias
    #[test]
    fn test_table_alias() {
        assert_eq!(TABLE_ALIAS, "a");
    }

    // Test fragments array
    #[test]
    fn test_known_fragments() {
        assert_eq!(KNOWN_FRAGMENTS.len(), 1);
        assert_eq!(KNOWN_FRAGMENTS[0], "top");
    }

    // Test makesorttoday webpage
    #[test]
    fn test_makesorttoday_webpage() {
        assert_eq!(MAKESORTTODAY_WEBPAGE, "makesorttoday.php");
    }
}

/* end */
