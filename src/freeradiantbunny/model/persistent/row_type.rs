// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// row_type - This enumeration connects the intentions ofd the query with templates.

#[derive(PartialEq)]
pub enum RowType {
    Many,
    One,
    Referenced,
}

// This fmt for RowType prints out the enumeration element that the instance is.
impl std::fmt::Display for RowType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match *self {
            RowType::Many => write!(f, "many"),
            RowType::One => write!(f, "one"),
            RowType::Referenced => write!(f, "referenced"),
        }
    }
}

/* end */
