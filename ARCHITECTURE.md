# Architecture Documentation

Last Updated: 2026-02-23

## Overview

freeradiantbunny is a database-backed web application for permaculture herb gardeners. It serves as an MVC web framework written in Rust, providing a plant list system and database browsing capabilities. The application uses a custom TCP server with thread-per-request concurrency, PostgreSQL for persistence, and Askama templates for HTML generation.

**Website:** https://freeradiantbunny.org/

**Version:** 0.0.7

## INPUTS

### HTTP Requests
| Input | Source | Format | Purpose | Required |
|-------|--------|--------|---------|----------|
| TCP stream | TcpListener on configured IP:PORT | Raw TCP bytes (1024 byte buffer) | Incoming HTTP requests from clients | Yes |
| HTTP request data | TCP stream | UTF-8 encoded HTTP request string | Parsed into Request struct via bootstrap | Yes |
| Request path | HTTP request line | String (e.g., "/classes", "/plants/123") | Determines which resource to fetch | Yes |
| Query parameters | URL query string | Key-value pairs after `?` | Filters and modifies data retrieval (view, upk, sort) | No |
| URL fragment | URL hash component | String after `#` | Client-side navigation hints | No |
| Host header | HTTP request headers | String (hostname:port or domain) | Virtual host resolution for multi-domain support | Yes |

### Configuration Files
| Input | Source | Format | Purpose | Required |
|-------|--------|--------|---------|----------|
| PGPASS file | `~/.pgpass` or configured path | Colon-delimited text: `host:port:database:user:password` | PostgreSQL connection credentials | Yes |
| Site configuration constants | `site_configuration.rs` compile-time | Rust constants | IP binding, paths, domain mappings, passkeys | Yes |
| Known hosts mapping | `KNOWN_HOSTS` constant array | Array of tuples `("domain", "/path")` | Maps hostnames to document roots | Yes |
| Known paths mapping | `KNOWN_PATHS` constant array | Array of strings | Static file paths like "/index.html", "/404.html" | Yes |

### Database Queries
| Input | Source | Format | Purpose | Required |
|-------|--------|--------|---------|----------|
| PostgreSQL query results | tokio-postgres async connection | Row sets with typed columns | Data to populate web pages | Yes |
| Database connection string | Built from PGPASS file | PostgreSQL URI: `postgresql://user:pass@host:port/db` | Establishes async DB connection | Yes |

### Static Files
| Input | Source | Format | Purpose | Required |
|-------|--------|--------|---------|----------|
| HTML files | Filesystem at host document root | HTML text files | Served for known static paths | No |
| 404 page | `DEFAULT_HOST_DIR/404.html` | HTML file | Error page when resources not found | Yes |
| Askama templates | `templates/` directory | HTML with Askama syntax | Template files for dynamic content rendering | Yes |

### Query Parameters (Known Parameters)
| Input | Source | Format | Purpose | Required |
|-------|--------|--------|---------|----------|
| view | Query string `?view=` | String: "html", "text", or "htmx" | Output format selection | Yes |
| upk | Query string `?upk=` | String passkey | User authentication for protected resources | Conditional |
| sort | Query string `?sort=` | String enum value | Database result ordering | No |

### URL Path Patterns (API Routes)
| Input | Source | Format | Purpose | Required |
|-------|--------|--------|---------|----------|
| Classes path | URL path segment | String (e.g., "classes", "plants") | Identifies database table/manifest | Yes |
| ID candidate | URL path segment | Integer (e.g., "/plants/123") | Retrieves specific row by primary key | No |
| Referenced type | URL path segment | String (e.g., "/plants/123/plant_families") | Retrieves related records via foreign key | No |

## OUTPUTS

### HTTP Responses
| Output | Destination | Format | Trigger |
|--------|-------------|--------|---------|
| HTTP 200 response | TCP stream to client | `HTTP/1.1 200 OK` with headers and HTML body | Successful request processing |
| HTTP 404 response | TCP stream to client | `HTTP/1.1 404 OK` with 404.html content | Resource not found or invalid request |
| Content-Type header | HTTP response headers | `text/html; charset=utf-8` | All HTML responses |
| Content-Length header | HTTP response headers | Integer byte count | All responses |

### HTML Content
| Output | Destination | Format | Trigger |
|--------|-------------|--------|---------|
| Database table view (many rows) | HTTP response body | HTML rendered from `standard_many.html` template | API request without ID candidate |
| Database single row view | HTTP response body | HTML rendered from `standard_one.html` template | API request with ID candidate |
| Referenced data view | HTTP response body | HTML rendered from `standard_referenced.html` template | API request with referenced type |
| Static HTML page | HTTP response body | Raw HTML file content | Known path match |
| Error message | HTTP response body | Plain text error string | Invalid view parameter or query failure |

### Database Operations
| Output | Destination | Format | Trigger |
|--------|-------------|--------|---------|
| SQL SELECT queries | PostgreSQL server | SQL strings (dynamically built) | API pattern matching success |
| Database connection | PostgreSQL async connection pool | tokio-postgres client | Per-request database query |

### Logging and Debug Output
| Output | Destination | Format | Trigger |
|--------|-------------|--------|---------|
| Debug messages | stdout | String messages with context | Debugger.log_data() calls throughout request lifecycle |
| Error messages | stderr | Error strings with context | Connection failures, panics, error conditions |
| Thread info | stdout | Thread name/ID | Thread spawn during request handling |
| Pretty-printed structs | Debugger log | Formatted struct data | Bootstrap and API processing |

### Rendered Components
| Output | Destination | Format | Trigger |
|--------|-------------|--------|---------|
| Navigation menu | HTML template variable | HTML string (hyperlinks) | Menu::get_goto_menu() |
| Table headers | HTML template variable | TableHeaders struct | Column name extraction from first row |
| Styled table data | HTML template variable | StyledData with CSS classes | StyleManager processing field boxes |
| Table title with hyperlink | HTML template variable | String with HTML anchor | table_title::get_table_title_with_hyperlink() |

### Data Structures (Internal)
| Output | Destination | Format | Trigger |
|--------|-------------|--------|---------|
| Request struct | Bootstrap process | Structured HTTP request data | Request::try_from() |
| PathQueryFragment | Bootstrap process | Parsed URL components (Path, Query, Fragment) | PathQueryFragment::new() |
| Host struct | Bootstrap process | Resolved virtual host info | Host::new() |
| ApiPatternRequested | API pattern matching | Enum variant with manifest/ID/referenced data | Api::do_api() |
| Vector of Scrubbers | Database query result | `Vec<Box<dyn Scrubber>>` containing Row instances | database::do_query() |
| Suitcase | API processing | Container with PathQueryFragment, ApiPatternRequested, Host | Suitcase::new() |

### Text Output (Alternative View)
| Output | Destination | Format | Trigger |
|--------|-------------|--------|---------|
| Plain text response | HTTP response body | Simple text with manifest name | view parameter = "text" |

### HTMX Output (Real-time View)
| Output | Destination | Format | Trigger |
|--------|-------------|--------|---------|
| HTMX HTML fragments | HTTP response body | HTML with HTMX attributes | view parameter = "htmx" |

## CODELIST

### Entry Point
- `src/main.rs` - TCP server entry point with TcpListener, spawns threads for each connection

### Controller Layer

#### Core Controller
- `src/freeradiantbunny/controller/server.rs` - Main application entrance point, orchestrates request processing
- `src/freeradiantbunny/controller/bootstrap.rs` - Initializes Debugger, Request, PathQueryFragment, Host
- `src/freeradiantbunny/controller/debugger.rs` - Debug logging and data tracking
- `src/freeradiantbunny/controller/characters.rs` - Character constants (SLASH, COLON, etc.)
- `src/freeradiantbunny/controller/mod.rs` - Controller module declaration

#### API Layer
- `src/freeradiantbunny/controller/api/api.rs` - API pattern matching and request routing
- `src/freeradiantbunny/controller/api/api_pattern_match.rs` - URL pattern matching logic
- `src/freeradiantbunny/controller/api/api_pattern_requested.rs` - ApiPatternRequested struct and methods
- `src/freeradiantbunny/controller/api/api_constants.rs` - API constant definitions
- `src/freeradiantbunny/controller/api/mod.rs` - API module declaration

#### Request Processing Library
- `src/freeradiantbunny/controller/library/path_query_fragments/path_query_fragment.rs` - URL component parser
- `src/freeradiantbunny/controller/library/path_query_fragments/path.rs` - Path struct and methods
- `src/freeradiantbunny/controller/library/path_query_fragments/query.rs` - Query string parser
- `src/freeradiantbunny/controller/library/path_query_fragments/fragment.rs` - URL fragment handler
- `src/freeradiantbunny/controller/library/path_query_fragments/requests.rs` - Request struct
- `src/freeradiantbunny/controller/library/path_query_fragments/headers.rs` - HTTP header parsing
- `src/freeradiantbunny/controller/library/path_query_fragments/parameter.rs` - Single parameter struct
- `src/freeradiantbunny/controller/library/path_query_fragments/parameters.rs` - Parameters collection
- `src/freeradiantbunny/controller/library/path_query_fragments/mod.rs` - Path/query/fragment module

#### File and Host Management
- `src/freeradiantbunny/controller/library/filename/filename.rs` - Filename struct for file paths
- `src/freeradiantbunny/controller/library/filename/read_file.rs` - File reading utility
- `src/freeradiantbunny/controller/library/filename/mod.rs` - Filename module
- `src/freeradiantbunny/controller/library/hosts/host.rs` - Virtual host resolution
- `src/freeradiantbunny/controller/library/hosts/mod.rs` - Host module
- `src/freeradiantbunny/controller/library/suitcase/suitcase.rs` - Request context container
- `src/freeradiantbunny/controller/library/suitcase/mod.rs` - Suitcase module
- `src/freeradiantbunny/controller/library/mod.rs` - Library module declaration

### Model Layer

#### Database Persistence
- `src/freeradiantbunny/model/persistent/database.rs` - Async PostgreSQL query execution with tokio-postgres
- `src/freeradiantbunny/model/persistent/connection_string.rs` - Builds connection string from .pgpass file
- `src/freeradiantbunny/model/persistent/row_type.rs` - RowType enum (One, Many, Referenced)
- `src/freeradiantbunny/model/persistent/order_by.rs` - ParamSort for query ordering
- `src/freeradiantbunny/model/persistent/mod.rs` - Persistent module declaration

#### Database Schema Manifest
- `src/freeradiantbunny/model/manifest/screen.rs` - Registry of all database table definitions
- `src/freeradiantbunny/model/manifest/classes.rs` - Database table class definitions
- `src/freeradiantbunny/model/manifest/classes_definitions.rs` - Loads screen with all table classes
- `src/freeradiantbunny/model/manifest/scrubber.rs` - Trait for polymorphic database row handling
- `src/freeradiantbunny/model/manifest/manifest.rs` - Manifest enum representing all tables
- `src/freeradiantbunny/model/manifest/manifest_constants.rs` - Table name string constants
- `src/freeradiantbunny/model/manifest/row.rs` - Row struct implementing Scrubber trait
- `src/freeradiantbunny/model/manifest/field_box.rs` - Container for typed database field values
- `src/freeradiantbunny/model/manifest/column_type.rs` - ColumnType enum for all field types
- `src/freeradiantbunny/model/manifest/referenced.rs` - Referenced enum for foreign key relationships
- `src/freeradiantbunny/model/manifest/referenced_host.rs` - ReferencedHost enum for reference types
- `src/freeradiantbunny/model/manifest/upk_type.rs` - UpkType enum for access protection
- `src/freeradiantbunny/model/manifest/play.rs` - Play trait for manifest operations
- `src/freeradiantbunny/model/manifest/mod.rs` - Manifest module declaration

#### Utilities
- `src/freeradiantbunny/model/timekeeper.rs` - Time and date utilities
- `src/freeradiantbunny/model/mod.rs` - Model module declaration

### View Layer

#### Core View Components
- `src/freeradiantbunny/view/viewer.rs` - Main rendering orchestrator, decides output format
- `src/freeradiantbunny/view/template_engine.rs` - Askama template integration and rendering
- `src/freeradiantbunny/view/markup.rs` - HTML generation coordinator
- `src/freeradiantbunny/view/table_title.rs` - Table title with hyperlink generation
- `src/freeradiantbunny/view/ux_design.rs` - UX design utilities
- `src/freeradiantbunny/view/ux_design_constants.rs` - UX design constants
- `src/freeradiantbunny/view/mod.rs` - View module declaration

#### HTML Builders (Moulder)
- `src/freeradiantbunny/view/moulder/webpage/hyperlink.rs` - Hyperlink HTML generation
- `src/freeradiantbunny/view/moulder/webpage/menu.rs` - Navigation menu builder
- `src/freeradiantbunny/view/moulder/webpage/table_headers.rs` - Table header generation
- `src/freeradiantbunny/view/moulder/webpage/image.rs` - Image tag generation
- `src/freeradiantbunny/view/moulder/webpage/cell_colors.rs` - Table cell color styling
- `src/freeradiantbunny/view/moulder/webpage/mod.rs` - Webpage moulder module
- `src/freeradiantbunny/view/moulder/style_manager.rs` - CSS class and style management
- `src/freeradiantbunny/view/moulder/styled_data.rs` - Styled data wrapper
- `src/freeradiantbunny/view/moulder/version.rs` - Version information
- `src/freeradiantbunny/view/moulder/mod.rs` - Moulder module declaration

### Bridge Layer
- `src/freeradiantbunny/controller2modeller.rs` - Bridge between controller and model, orchestrates database queries

### Site Configuration
- `src/freeradiantbunny/site_configuration/site_configuration.rs` - Configuration constants (IP, paths, credentials)
- `src/freeradiantbunny/site_configuration/known_hosts.rs` - Virtual host definitions
- `src/freeradiantbunny/site_configuration/known_paths.rs` - Static file path definitions
- `src/freeradiantbunny/site_configuration/mod.rs` - Configuration module

### Root Module
- `src/freeradiantbunny/mod.rs` - Root freeradiantbunny module declaration

### Templates
- `templates/standard_many.html` - Askama template for multi-row table views
- `templates/standard_one.html` - Askama template for single-row detail views
- `templates/standard_referenced.html` - Askama template for referenced relationship views

### Database Schema Files
Located in `sql/` directory (201 files total):

#### Core System Tables
- `sql/classes.sql` - Metadata registry for all database tables
- `sql/subsystems.sql` - Application subsystem definitions
- `sql/zachmans.sql` - Zachman framework classifications
- `sql/modules.sql` - Software module definitions
- `sql/domains.sql` - Website domain management
- `sql/webpages.sql` - Webpage path definitions
- `sql/webpage_maxonomies.sql` - Webpage taxonomy relationships
- `sql/images.sql` - Image asset management
- `sql/stylesheets.sql` - CSS stylesheet registry
- `sql/applications.sql` - Application metadata

#### Permaculture Domain Tables
- `sql/plants.sql` - Plant species information
- `sql/plant_families.sql` - Botanical family classifications
- `sql/plant_lists.sql` - Curated plant collections
- `sql/plant_list_plants.sql` - Many-to-many plant list relationships
- `sql/plant_events.sql` - Plant lifecycle events
- `sql/permaculture_topics.sql` - Permaculture subject taxonomy
- `sql/projects.sql` - Permaculture project tracking
- `sql/goal_statements.sql` - Project goals and objectives
- `sql/business_plan_texts.sql` - Business planning content
- `sql/processes.sql` - Process definitions
- `sql/scene_elements.sql` - Design scene components
- `sql/lands.sql` - Land parcel data
- `sql/land_width_lengths.sql` - Land measurements
- `sql/land_city_states.sql` - Geographic locations

#### Additional Domain Tables
- `sql/coins.sql` - Cryptocurrency tracking
- `sql/coin_prices.sql` - Cryptocurrency price data
- `sql/coin_macds.sql` - Cryptocurrency technical indicators
- `sql/maxonomies.sql` - General taxonomy system
- `sql/hyperlink_categories.sql` - Link categorization
- `sql/postings.sql` - Content postings
- `sql/stories.sql` - Story/article content
- `sql/book_clips.sql` - Book excerpts and references
- `sql/tools.sql` - Tool inventory
- `sql/moneymakers.sql` - Revenue stream tracking
- `sql/moneymaker_measurements.sql` - Revenue metrics
- `sql/domain_measurements.sql` - Domain analytics
- `sql/application_complexity_measurements.sql` - Code complexity tracking
- `sql/ux_public_design_kits.sql` - UX design resources
- `sql/ux_low-fidelity_prototypes.sql` - UX prototype artifacts
- `sql/ta_checklist_items.sql` - Task checklist items

#### Database Migrations
- `sql/migrations/add_cascade_delete_webpage_tags.sql` - Migration for cascade delete constraints

### Build and Configuration Files
- `Cargo.toml` - Rust package manifest with dependencies
- `Cargo.lock` - Locked dependency versions
- `.gitignore` - Git ignore patterns

### Documentation
- `README.md` - Human-readable project documentation
- `CLAUDE.md` - Claude Code guidance and project instructions
- `TECH.md` - Technology stack documentation
- `ARCHITECTURE.md` - This architecture documentation (you are here)
- `USAGE.md` - Usage instructions
- `BUGFIX.md` - Bug tracking notes

### Utility Scripts
- `pull_git.pl` - Git pull automation script
- `up_git.pl` - Git commit and push automation script
- `insert.sql` - SQL data insertion script
- `appnames_needing_keywords.txt` - Application keyword tracking

### Notes
- `_notes/` - Development notes directory

## Request Flow

1. **TCP Connection** - `main.rs` accepts TCP connection on configured IP:PORT
2. **Thread Spawn** - New thread created with random ID for request
3. **Request Reading** - 1024-byte buffer reads HTTP request from TcpStream
4. **Server Entry** - `server::serve_webpage()` receives request string
5. **Bootstrap Phase**:
   - `Debugger` initialized with thread name
   - `Request` struct parsed from HTTP string
   - `PathQueryFragment` created from request path
   - `Host` resolved from Host header
6. **Screen Loading** - `Screen::new()` loads all database table definitions
7. **API Pattern Matching** - `Api::do_api()` checks for:
   - Known static paths → serve file directly
   - API patterns → proceed to database query
8. **API Pattern Processing** - `Api::do_api_pattern_requested()`:
   - Validates UPK passkey for protected resources
   - Calls `controller2modeller::do_query()`
9. **Database Query** - `database::do_query()`:
   - Builds connection string from .pgpass
   - Connects to PostgreSQL via tokio-postgres
   - Constructs SQL based on API pattern (Classes/IdCandidate/Referenced)
   - Executes async query
   - Maps rows to `Vec<Box<dyn Scrubber>>`
10. **Suitcase Creation** - `Suitcase::new()` packages request context
11. **View Selection** - `viewer::make_viewable()` checks view parameter:
    - "html" → `do_html()`
    - "text" → `do_text()`
    - "htmx" → `do_htmx()`
12. **HTML Generation** - `markup::do_html()`:
    - Creates `TableHeaders` from first row
    - Creates `StyleManager` for CSS classes
    - Creates `Menu` for navigation
    - Generates table title
    - Calls `TemplateEngine::render()`
13. **Template Rendering** - Askama renders appropriate template:
    - `standard_many.html` for multiple rows
    - `standard_one.html` for single row
    - `standard_referenced.html` for referenced data
14. **HTTP Response** - `server::return_http_200_with_html_content()`:
    - Wraps HTML in HTTP 200 response
    - Adds Content-Type and Content-Length headers
15. **Stream Write** - Response written to TcpStream
16. **Stream Cleanup** - TcpStream flushed and closed

## Database Schema Pattern

All database tables follow a common pattern with core fields:
- `id` - Primary key (integer, auto-incrementing)
- `name` - Record name (text, required)
- `description` - Record description (text)
- `img_url` - Associated image URL (text)
- `sort` - Sort order (text)
- `status` - Record status (text)

Many tables include foreign keys for relationships:
- `subsystems_id` - Links to subsystems table
- `zachmans_id` - Links to zachmans framework
- `plant_families_id` - Links to plant family taxonomy
- Various `*_id` fields for cross-references

The `classes` table serves as metadata registry, storing information about all other tables in the system.

## Technology Stack

- **Language**: Rust (edition 2021)
- **Web Server**: Custom TCP server with `std::net::TcpListener`
- **Concurrency**: Thread-per-request model using `std::thread`
- **Database**: PostgreSQL accessed via `tokio-postgres` (async)
- **Async Runtime**: `tokio` with full features
- **Template Engine**: `askama` for type-safe HTML templates
- **Pattern Matching**: `regex` crate for URL routing
- **Other Dependencies**: `chrono`, `http`, `rand`, `sha2`, `async-std`, `vec_map`

## Notes

- Configuration file `site_configuration.rs` contains template placeholders and must be customized per deployment
- The application uses `.pgpass` file format for PostgreSQL credentials (5 colon-separated fields: host:port:database:user:password)
- Thread IDs are random u8 values for request tracking
- Panics are used for error handling in many places (production deployment should use Result types)
- The codebase includes comprehensive debug logging via the Debugger system
- The application supports three view modes: html (full pages), text (plain text), htmx (real-time fragments)
- Protected resources require UPK (user passkey) parameter matching `USER_PASSKEY` constant
- URL patterns follow REST-like structure: `/table_name`, `/table_name/id`, `/table_name/id/referenced_table`
