# Comparison: freeradiantbunny vs frbrust

Date: 2026-02-11

## Overview

These are **essentially the same project in different states** of development and deployment.

## Relationship

| Aspect | freeradiantbunny | frbrust |
|--------|------------------|---------|
| **Role** | Public upstream repo | Production deployment fork |
| **Version** | 0.0.7 | 0.0.6 |
| **Status** | Cannot compile (missing config) | Production-ready |
| **Repository** | github.com/lplinden/freeradiantbunny | github.com/lplinden/frbrust |
| **Website** | freeradiantbunny.org | mudia.com/frbrust |

## Key Difference: site_configuration.rs

**freeradiantbunny** is missing `src/freeradiantbunny/site_configuration/site_configuration.rs` - the file was deleted (noted in CLAUDE.md). This blocks compilation because `main.rs` imports `IP_ADDRESS_AND_PORT` from this non-existent file.

**frbrust** has this file with all required constants:
- `IP_ADDRESS_AND_PORT: "127.0.0.1:5051"`
- `WEBSITE_NAME: "mudia.com"`
- `BASE_URL: "https://mudia.com"`
- `BASE_DIRECTORY: "/frbrust"`
- `DEFAULT_HOST_DIR` path
- `PGPASS_FULLPATH_FILENAME` path
- 30+ other configuration values

## What's Identical

- All Rust source code in `src/freeradiantbunny/` (77 files)
- MVC architecture (controller/model/view)
- Cargo.toml dependencies (askama, tokio, tokio-postgres, etc.)
- Askama templates (3 template files)
- ~200 SQL schema files

## Source Code Structure

Both contain identical file structure:

```
src/
├── main.rs
└── freeradiantbunny/
    ├── controller/         (17 files) - Request handling, API routing
    ├── model/              (13 files) - Database & schema definitions
    ├── view/               (14 files) - HTML rendering & templates
    ├── site_configuration/ (3 files in frb, 4 in frbrust)
    └── controller2modeller.rs - Bridge layer
```

## Support Files Differences

| freeradiantbunny | frbrust |
|------------------|---------|
| pull_git.pl, up_git.pl | Same + compile_run_frbrust.pl |
| No test files | frbrust_test.pl included |
| 5 docs (README, CLAUDE, TECH, USAGE, ARCHITECTURE) | 5 docs + frb_spec.md |
| _notes/ directory | _notes/, _docs/, _owl/, _site_config_work_area/ |

## Cargo.toml Dependencies (Identical)

```toml
[dependencies]
askama = "0.12.0"
async-std = "1.10.0"
chrono = "0.4"
http = "0.2"
rand = "0.8.5"
regex = "1.9.1"
sha2 = "0.9.5"
tokio = { version = "1", features = ["full"] }
tokio-postgres = "0.7"
vec_map = "0.8.2"
```

## Request Flow (Identical Architecture)

```
TCP connection (port 5051 in frbrust, undefined in freeradiantbunny)
  ↓
main.rs spawns thread per request
  ↓
server::serve_webpage() orchestrates request
  ↓
Bootstrap (parse HTTP, path, query, host)
  ↓
API router matches URL pattern
  ↓
Model queries PostgreSQL (async/tokio-postgres)
  ↓
View renders Askama template
  ↓
HTTP response
```

## Deployment Status

**freeradiantbunny (Public Upstream):**
- Cannot compile: missing site_configuration.rs
- Template configuration incomplete
- Status: Under development, not production-ready

**frbrust (mudia.com Deployment):**
- Compiles successfully (all config present)
- Configured for production: port 5051, mudia.com domain
- Includes test suite and deployment scripts
- Status: Production-ready reverse proxy integration

## Summary

frbrust is a **deployable fork** of freeradiantbunny configured for mudia.com. The upstream freeradiantbunny repo is currently broken because the site_configuration.rs file needs to be recreated with environment-specific values before it can compile.

To make freeradiantbunny compilable, the site_configuration.rs file needs to be recreated with:
- `IP_ADDRESS_AND_PORT`
- `WEBSITE_NAME`
- `BASE_URL`
- `BASE_DIRECTORY`
- `DEFAULT_HOST_DIR`
- `PGPASS_FULLPATH_FILENAME`
- And other required constants
