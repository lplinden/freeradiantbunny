// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// site_configuration - enables specification of hosted website
///
/// INSTRUCTIONS: Copy this file to site_configuration.rs and replace all
/// placeholder values marked with angle brackets <PLACEHOLDER> with your
/// site-specific configuration.

// Server binding address - use localhost for reverse proxy setups
pub const IP_ADDRESS_AND_PORT: &str = "127.0.0.1:<PORT>";

// URL scheme (http or https)
pub const URL_SCHEME: &str = "https";

// Your domain name
pub const WEBSITE_NAME: &str = "<YOUR_DOMAIN>";

// Full base URL including scheme
pub const BASE_URL: &str = "https://<YOUR_DOMAIN>";

// URL path prefix (use "" for root, or "/app" for subdirectory)
pub const BASE_DIRECTORY: &str = "/<APP_PATH>";

// Home link configuration
pub const HOME_HREF: &str = BASE_URL;
pub const HOME_TITLE: &str = "<SITE_TITLE>";

// Site branding
pub const SITE_NAME: &str = "<YOUR_DOMAIN> running freeradiantbunny";
pub const SITE_TAGLINE: &str = "an inquiring system for permaculture herb gardeners";

// Default document root directory
pub const DEFAULT_HOST_DIR: &str = "/var/www/html";

// Virtual host mappings: (hostname, document_root)
pub const KNOWN_HOSTS: [(&str, &str); 2] = [
    ("localhost:<PORT>", "/var/www/html"),
    ("<YOUR_DOMAIN>", "/var/www/html"),
];

// Known static file paths
pub const KNOWN_PATHS: [&str; 2] = [
    "/index.html",
    "/404.html",
];

// Default API endpoint
pub const DEFAULT_CLASSES_PATH: &str = "/classes";

// User paths - replace with your system username
pub const USER_HOME_PATH: &str = "/home/<USERNAME>";
pub const PGPASS_FULLPATH_FILENAME: &str = "/home/<USERNAME>/.pgpass";

// Application directories
pub const CONFIG_DIR: &str = "/.freeradiantbunny";
pub const LOG_PATH: &str = "/logs/freeradiantbunny.log";

// HTML head configuration
pub const HEAD_TITLE: &str = WEBSITE_NAME;

// Asset URLs
pub const SITE_STYLE: &str = "https://<YOUR_DOMAIN>/_styles/freeradiantbunny.css";
pub const LOGO_SRC: &str = "https://<YOUR_DOMAIN>/_images/logo.png";
pub const LOGO_CLASS: &str = "logo";

// Site description for meta tags
pub const DESCRIPTION: &str = "Tables of information for permaculture planning.";

// Authentication passkey (generate a secure random string for production)
// Use: openssl rand -base64 32
pub const USER_PASSKEY: &str = "<GENERATE_SECURE_PASSKEY>";

/* end */
