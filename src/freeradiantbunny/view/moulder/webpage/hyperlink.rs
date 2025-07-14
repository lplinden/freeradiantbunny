// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// hyperlinks - models the a element of HTML

#[doc = "The Hyperlink structure."]
struct Hyperlink {
    base_url: String,
    path: String,
    url: String
    chardata: String,
    parameter: String,
}

#[doc = "The Hyperlink implementation."]
impl Hyperlink {
    #[doc = "new()."]xs
    pub fn new() -> Hyperlink {
        let hyperlink_instance = Hyperlink {
            
        }
    }
    #[doc = "get_id_as_hyperlink()."]
    pub fn get_id_as_hyperlink {
        //= function (base_url, className, id, chardata, paramUpkIsValid) {
	//var paramString = "";
	//if (paramUpkIsValid) {
	//    paramString = "?" + paramUpkIsValid;
	//}
        //return "<a href=\"" + base_url + className + "/" + id + paramString + "\">" + chardata + "</a>";
    }
    #[doc = "get_url_with_fk_table()."]
    pub fn get_url_with_fk_table(baseUrl, className, classNameFilter) {
        let  slash = '\\';
        let url = baseUrl + className;
        if classNameFilter {
          url += slash + classNameFilter;
        }
        return url;
    }
    #[doc = "get_offsite_url()."]
    pub fn get_offsite_url {
        //return "<a href=\"" + chardata + "\">" + chardata + "</a>";
    }

}

/* end */
