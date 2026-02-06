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

/* end */
