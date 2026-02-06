// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.7

/// upk_type = this signifies whether or note access to a classes is protected by the upk parameter.

#[doc = "This is the UpkType enumeration that is the flag for the user pass key and is activated by the upk parameter"]
pub enum UpkType {
    Protected,
    None,
}
