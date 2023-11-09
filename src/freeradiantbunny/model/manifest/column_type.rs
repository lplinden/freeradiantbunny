// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

///column_type - define enumeration for column names.
// constants
pub const NUM: &str = "num";
pub const ID: &str = "id";
pub const NAME: &str = "name";
pub const DESCRIPTION: &str = "description";
pub const IMG_URL: &str = "img_url";
pub const STATUS: &str = "status";
pub const SORT: &str = "sort";
pub const DEV: &str = "dev";
pub const REFERENCED: &str = "referenced";
pub const REFERENCED_TABLE: &str = "referenced_table";
pub const REFERENCED_ID: &str = "referenced_id";
pub const LOOKUP: &str = "lookup";
pub const FK_CONSTRAINTS: &str = "fk_constraints";
pub const SPECIALIZED_FIELDS: &str = "specialized_fields";
pub const PRIVILEGED_OWNER: &str = "privileged_owner";
pub const MAKE_INDEX_FLAG: &str = "make_index_flag";
pub const MAKE_UNIQUE: &str = "make_unique";
pub const INCREMENT_ID_FLAG: &str = "increment_id_flag";
pub const SCRUBBER_FLAG: &str = "scrubber_flag";
pub const RULES: &str = "rules";
pub const URL: &str = "url";
pub const SUBSYSTEMS_ID: &str = "subsystems_id";
pub const ZACHMANS_ID: &str = "zachmans_id";
pub const SUBSYSTEMS: &str = "subsystems";
pub const ZACHMANS: &str = "zachmans";
pub const TLI: &str = "tli";
pub const DOMAIN_NAME: &str = "domain_name";
pub const SSL_CERT: &str = "ssl_cert";
pub const TAGLINE: &str = "tagline";
pub const REGISTRAR: &str = "registrar";
pub const HOSTING: &str = "hosting";
pub const CRM: &str = "crm";
pub const BACKUPS: &str = "backups";
pub const LOG: &str = "log";
pub const PATH: &str = "path";
pub const PLANT_FAMILIES: &str = "plant_families";
pub const PLANT_LIST_NAME: &str = "plant_list_name";
pub const BOTANICAL_NAME: &str = "botanical_name";
pub const WEBPAGES_ID: &str = "webpages_id";
pub const MAXONOMIES_ID: &str = "maxonomies_id";
pub const WATCH: &str = "watch";
pub const TYPE: &str = "type";
pub const PLATFORM: &str = "platform";
pub const SYMBOL: &str = "symbol";

#[doc = "The ColumnType enum."]
#[derive(Clone)]
pub enum ColumnType {
    Num,
    Id,
    Name,
    Status,
    Sort,
    ImgUrl,
    Description,
    Dev,
    Lookup,
    FkConstraints,
    SpecializedFields,
    PrivilegedOwner,
    MakeIndexFlag,
    MakeUnique,
    IncrementIdFlag,
    ScrubberFlag,
    Rules,
    Url,
    SubsystemsId,
    ZachmansId,
    Subsystems,
    Zachmans,
    Referenced,
    ReferencedTable,
    ReferencedId,
    Tli,
    DomainName,
    SslCert,
    Tagline,
    Registrar,
    Hosting,
    Crm,
    Backups,
    Log,
    Path,
    PlantFamilies,
    PlantListName,
    BotanicalName,
    WebpagesId,
    MaxonomiesId,
    Watch,
    Type,
    Platform,
    Symbol,
}

#[doc = "convert_str_to_type()."]
pub fn convert_str_to_type(input: &str) -> Option<ColumnType> {
    match input {
        NUM => Some(ColumnType::Num),
        ID => Some(ColumnType::Id),
        NAME => Some(ColumnType::Name),
        STATUS => Some(ColumnType::Status),
        SORT => Some(ColumnType::Sort),
        IMG_URL => Some(ColumnType::ImgUrl),
        DESCRIPTION => Some(ColumnType::Description),
        DEV => Some(ColumnType::Dev),
        LOOKUP => Some(ColumnType::Lookup),
        FK_CONSTRAINTS => Some(ColumnType::FkConstraints),
        SPECIALIZED_FIELDS => Some(ColumnType::SpecializedFields),
        PRIVILEGED_OWNER => Some(ColumnType::PrivilegedOwner),
        MAKE_INDEX_FLAG => Some(ColumnType::MakeIndexFlag),
        MAKE_UNIQUE => Some(ColumnType::MakeUnique),
        INCREMENT_ID_FLAG => Some(ColumnType::IncrementIdFlag),
        SCRUBBER_FLAG => Some(ColumnType::ScrubberFlag),
        RULES => Some(ColumnType::Rules),
        URL => Some(ColumnType::Url),
        SUBSYSTEMS_ID => Some(ColumnType::SubsystemsId),
        ZACHMANS_ID => Some(ColumnType::ZachmansId),
        SUBSYSTEMS => Some(ColumnType::Subsystems),
        ZACHMANS => Some(ColumnType::Zachmans),
        REFERENCED => Some(ColumnType::Referenced),
        REFERENCED_TABLE => Some(ColumnType::ReferencedTable),
        REFERENCED_ID => Some(ColumnType::ReferencedId),
        TLI => Some(ColumnType::Tli),
        DOMAIN_NAME => Some(ColumnType::DomainName),
        SSL_CERT => Some(ColumnType::SslCert),
        TAGLINE => Some(ColumnType::Tagline),
        REGISTRAR => Some(ColumnType::Registrar),
        HOSTING => Some(ColumnType::Hosting),
        CRM => Some(ColumnType::Crm),
        BACKUPS => Some(ColumnType::Backups),
        LOG => Some(ColumnType::Log),
        PATH => Some(ColumnType::Path),
        PLANT_FAMILIES => Some(ColumnType::PlantFamilies),
        PLANT_LIST_NAME => Some(ColumnType::PlantListName),
        BOTANICAL_NAME => Some(ColumnType::BotanicalName),
        WEBPAGES_ID => Some(ColumnType::WebpagesId),
        MAXONOMIES_ID => Some(ColumnType::MaxonomiesId),
        WATCH => Some(ColumnType::Watch),
        TYPE => Some(ColumnType::Type),
        PLATFORM => Some(ColumnType::Platform),
        SYMBOL => Some(ColumnType::Symbol),
        _ => None,
    }
}

// todo fix the function below so that it as_ref() works
// todo ... and it prints out the details of the manifest
#[doc = "The fmt for ColumnType."]
impl std::fmt::Display for ColumnType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match *self {
            ColumnType::Num => write!(f, "num"),
            ColumnType::Id => write!(f, "id"),
            ColumnType::Name => write!(f, "name"),
            ColumnType::Status => write!(f, "status"),
            ColumnType::Sort => write!(f, "sort"),
            ColumnType::ImgUrl => write!(f, "img_url"),
            ColumnType::Description => write!(f, "description"),
            ColumnType::Dev => write!(f, "dev"),
            ColumnType::Lookup => write!(f, "lookup"),
            ColumnType::FkConstraints => write!(f, "fk_constraints"),
            ColumnType::SpecializedFields => write!(f, "specialized_fields"),
            ColumnType::PrivilegedOwner => write!(f, "privileged_owner"),
            ColumnType::MakeIndexFlag => write!(f, "make_index_flag"),
            ColumnType::MakeUnique => write!(f, "make_unique"),
            ColumnType::IncrementIdFlag => write!(f, "increment_id_flag"),
            ColumnType::ScrubberFlag => write!(f, "scrubber_flag"),
            ColumnType::Rules => write!(f, "rules"),
            ColumnType::Url => write!(f, "url"),
            ColumnType::SubsystemsId => write!(f, "subsystems_id"),
            ColumnType::ZachmansId => write!(f, "zachmans_id"),
            ColumnType::Subsystems => write!(f, "subsystems"),
            ColumnType::Zachmans => write!(f, "zachmans"),
            ColumnType::Referenced => write!(f, "referenced"),
            ColumnType::ReferencedTable => write!(f, "referenced_table"),
            ColumnType::ReferencedId => write!(f, "referenced_id"),
            ColumnType::Tli => write!(f, "tli"),
            ColumnType::DomainName => write!(f, "domain_name"),
            ColumnType::SslCert => write!(f, "ssl_cert"),
            ColumnType::Tagline => write!(f, "tagline"),
            ColumnType::Registrar => write!(f, "registrar"),
            ColumnType::Hosting => write!(f, "hosting"),
            ColumnType::Crm => write!(f, "crm"),
            ColumnType::Backups => write!(f, "backups"),
            ColumnType::Log => write!(f, "log"),
            ColumnType::Path => write!(f, "path"),
            ColumnType::PlantFamilies => write!(f, "plant_families"),
            ColumnType::PlantListName => write!(f, "plant_list_name"),
            ColumnType::BotanicalName => write!(f, "botanical_name"),
            ColumnType::WebpagesId => write!(f, "webpages_id"),
            ColumnType::MaxonomiesId => write!(f, "maxonomies_id"),
            ColumnType::Watch => write!(f, "watch"),
            ColumnType::Type => write!(f, "type"),
            ColumnType::Platform => write!(f, "platform"),
            ColumnType::Symbol => write!(f, "symbol"),
        }
    }
}

/* end */
