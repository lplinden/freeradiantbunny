# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

freeradiantbunny is a Rust-based database-backed website system for permaculture designers, featuring a plant list system with herb garden information. The application serves as an MVC web framework with PostgreSQL as the persistent data store.

**Website:** https://freeradiantbunny.org/

## Build Commands

```bash
cargo build           # Development build
cargo build --release # Release build
cargo run             # Run the server (requires site_configuration and PostgreSQL)
cargo fmt             # Format code
cargo clippy          # Lint warnings
```

## Architecture

The application follows an MVC pattern with this module structure:

```
src/
├── main.rs                           # TCP server entry point (TcpListener, thread-per-request)
└── freeradiantbunny/
    ├── controller/                   # Request handling
    │   ├── server.rs                 # serve_webpage() - main application entrance
    │   ├── bootstrap.rs              # Initialization (Debugger, Request, PathQueryFragment, Host)
    │   ├── api/                      # URL pattern matching and API routing
    │   └── library/                  # Request parsing utilities
    │       ├── path_query_fragments/ # HTTP request component parsing
    │       ├── hosts/                # Virtual host resolution
    │       ├── filename/             # File I/O operations
    │       └── suitcase/             # Request context packaging
    ├── model/
    │   ├── manifest/                 # Database schema definitions
    │   │   ├── screen.rs             # Registry of all database classes
    │   │   ├── classes.rs            # Table definitions (implements Scrubber trait)
    │   │   └── scrubber.rs           # Trait for polymorphic database rows
    │   └── persistent/               # Database access layer
    │       ├── database.rs           # Async PostgreSQL queries (tokio-postgres)
    │       └── connection_string.rs  # Builds connection from pgpass file
    ├── view/
    │   ├── viewer.rs                 # Main rendering orchestrator
    │   ├── template_engine.rs        # Askama template integration
    │   └── moulder/                  # HTML generation (hyperlinks, tables, menus)
    ├── controller2modeller.rs        # Bridge between controller and model layers
    └── site_configuration/           # Configuration constants (IP, paths, pgpass location)
```

**Request Flow:**
1. `main.rs` accepts TCP connections, spawns thread per request
2. `server::serve_webpage()` orchestrates the request through bootstrap
3. Bootstrap initializes Debugger, Request, PathQueryFragment, Host
4. API layer matches URL patterns and routes to appropriate handler
5. Model layer queries PostgreSQL via tokio-postgres
6. View layer renders HTML using Askama templates

## Database

- PostgreSQL with async access via tokio-postgres
- Connection string read from `.pgpass` file (path configured in site_configuration)
- Schema files located in `/sql` directory (~200 SQL files)
- Uses `Scrubber` trait for polymorphic database table abstraction

## Key Dependencies

- `tokio-postgres` - async PostgreSQL driver
- `askama` - type-safe HTML templates
- `tokio` - async runtime
- `regex` - URL pattern matching

## Current State

**Note:** The `site_configuration/site_configuration.rs` file was recently deleted but is still referenced by `main.rs` and `server.rs`. This file needs to be recreated with constants:
- `IP_ADDRESS_AND_PORT` - Server binding address
- `DEFAULT_HOST_DIR` - Default host directory path
- `PGPASS_FULLPATH_FILENAME` - PostgreSQL password file path

The project is transitioning from JavaScript to Rust (see git history).
