// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// order_by - models the ORDER BY part of SQL statements

// constants
pub const ORDER_BY: &str = "ORDER BY";
pub const DESC: &str = "DESC";
use crate::freeradiantbunny::controller::characters::{COMMA, DOT, SPACE};

#[doc = "The ParamSort enum. Welcome to the show."]
pub enum ParamSort {
    Sort,
    Id,
    Name,
    Status,
    SubsystemsId,
    ZachmansId,
    Dev,
    Num,
    Random,
}

#[doc = "This public function creates the order_by string for the SQL statement."]
pub fn get(param_sort: ParamSort, table_alias: &str) -> String {
    match param_sort {
        ParamSort::Sort => format!(
            "{}{}{}{}{}{}{}{}{}{}{}{}",
            ORDER_BY,
            SPACE,
            table_alias,
            DOT,
            ParamSort::Sort,
            SPACE,
            DESC,
            COMMA,
            SPACE,
            table_alias,
            DOT,
            "name"
        ),
        ParamSort::Id => {
            format!(
                "{}{}{}{}{}",
                ORDER_BY,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Id
            )
        }
        ParamSort::Name => {
            format!(
                "{}{}{}{}{}",
                ORDER_BY,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Name
            )
        }
        ParamSort::Status => {
            format!(
                "{}{}{}{}{}{}{}{}{}{}",
                ORDER_BY,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Status,
                COMMA,
                SPACE,
                table_alias,
                DOT,
                "name"
            )
        }
        ParamSort::SubsystemsId => {
            format!(
                "{}{}{}{}{}{}{}{}{}{}",
                ORDER_BY,
                SPACE,
                table_alias,
                DOT,
                ParamSort::SubsystemsId,
                COMMA,
                SPACE,
                table_alias,
                DOT,
                "name"
            )
        }
        ParamSort::ZachmansId => {
            format!(
                "{}{}{}{}{}{}{}{}{}{}",
                ORDER_BY,
                SPACE,
                table_alias,
                DOT,
                ParamSort::ZachmansId,
                COMMA,
                SPACE,
                table_alias,
                DOT,
                "name"
            )
        }
        ParamSort::Dev => {
            // default
            // default order_by
            format!(
                "{}{}{}{}{}{}{}{}{}{}{}{}",
                ORDER_BY,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Sort,
                SPACE,
                DESC,
                COMMA,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Name
            )
        }
        ParamSort::Num => {
            // default
            // default order_by
            format!(
                "{}{}{}{}{}{}{}{}{}{}{}{}",
                ORDER_BY,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Sort,
                SPACE,
                DESC,
                COMMA,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Name
            )
        }
        ParamSort::Random => {
            // default
            // default order_by
            format!(
                "{}{}{}{}{}{}{}{}{}{}{}{}",
                ORDER_BY,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Sort,
                SPACE,
                DESC,
                COMMA,
                SPACE,
                table_alias,
                DOT,
                ParamSort::Name
            )
        }
    }
}

#[doc = "The fmt for ParamSort."]
// todo fix the function below so that it as_ref() works
// todo ... and it prints out the details of the manifest
impl std::fmt::Display for ParamSort {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "sort")
    }
}

/* end */
