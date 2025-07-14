// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.6

/// site_configuration - enables specification hosted website
pub const IP_ADDRESS_AND_PORT: &str = "127.0.0.1:1000";
pub const URL_SCHEME: &str = "https";
pub const WEBSITE_NAME: &str = "mudia.com";
pub const BASE_URL: &str = "https://DOMAIN";
pub const BASE_DIRECTORY: &str = "/freeradiantbunny";
pub const HOME_HREF: &str = BASE_URL;
pub const HOME_TITLE: &str = "mudia.com";
pub const SITE_NAME: &str = "mudia.com running freeradiantbunny";
pub const SITE_TAGLINE: &str = "a demo of an inquiring system for permaculture herb gardeners.";
pub const DEFAULT_HOST_DIR: &str = "/public_mud";
pub const KNOWN_HOSTS: [(&str, &str); 3] = [
    ("localhost:5050", "/public_html"),
    ("DOMAIN", "/public_html"),
];
pub const KNOWN_PATHS: [&str; 2] = [
    "/index.html",
    "/404.html",
];
pub const DEFAULT_CLASSES_PATH: &str = "/classes";
pub const USER_HOME_PATH: &str = "/home/USER";
pub const PGPASS_FULLPATH_FILENAME: &str = "/home/USER/.PGFILE";
pub const CONFIG_DIR: &str = "/.freeradiantbunny";
pub const LOG_PATH: &str = "/log.txt";
pub const HEAD_TITLE: &str = WEBSITE_NAME;
pub const SITE_STYLE: &str = "https://DOMAIN/_styles/freeradiantbunny.css";
pub const LOGO_SRC: &str = "https://DOMAIN/_images/logo.png";
pub const LOGO_CLASS: &str = "logo";
pub const DESCRIPTION: &str = "Here are some tables of information.";
// pub const USER_PASSKEY: &str = "";

/* end */
