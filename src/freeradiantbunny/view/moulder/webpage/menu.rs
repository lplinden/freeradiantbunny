// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// menu - produces meny in HTML for webpage
use crate::freeradiantbunny::site_configuration::site_configuration::BASE_URL;
use crate::freeradiantbunny::site_configuration::site_configuration::BASE_DIRECTORY;

pub struct Menu {
    goto_menu: String,
}

impl Menu {
    pub fn new() -> Menu {
        let goto_menu_html = format!(
            "<ul class=\"table-menu\"><li><a href=\"{}{}/classes\">classes</a></li></ul>",
            BASE_URL,
	    BASE_DIRECTORY,
        );
        let menu = Menu {
            goto_menu: goto_menu_html,
        };
        menu
    }
    pub fn get_goto_menu(&self) -> String {
        self.goto_menu.clone()
    }
}

/*
#[doc = "get_menu()."]
pub fn get_menu (
    menuType,
    currentMenuSelections, choices, url, baseUrl = "x", paramUpkIsValid) {
    let currentMenuSelected = "";
    let choice;
    match menuType {
    MenuType::Subs => {
        currentMenuSelected = currentMenuSelections.subs;
            choice = currentMenuSelections.subs;
    },
    MenuType::View => {
            currentMenuSelected = currentMenuSelections.view;
            choice = currentMenuSelections.view;
    },
    MenyType::Sort => {
            currentMenuSelected = currentMenuSelections.sort;
            choice = currentMenuSelections.sort;
    },
    }
    // change default to actual name of the selection
    if (currentMenuSelected == "") {
    match menuType {
            MenuType::Subs =>
                choice = "plant_lists";
            MenuType::View =>
                choice = "html";
            MenuType::Sort =>
                choice = "sort";
        }
    }
    // output menu html
    let menu = "<strong>" + menuType + "</strong>:\n";
        let i;
    for (i = 0; i < choices.length; i++) {
        if (choice === choices[i]) {
            // no hyperlink
            menu += choice;
        } else {
        if (menuType == MenuType::Subs) {
        let subsUrl = baseUrl + choices[i];
        menu += "<a href=\"" + subsUrl;
        if (paramUpkIsValid) {
            menu += "?" + paramUpkIsValid;
        }
        menu += "\">" + choices[i] + "</a>";
        } else {
               let params = this.getParams(menuType, choices[i], currentMenuSelections);
                menu += "<a href=\"" + url + params + "\">" + choices[i] + "</a>";
        }
        }
        // delimeter for all but the last
        if (i < (choices.length - 1)) {
            menu += " |\n";
        } else {
            menu += "\n";
        }
    }
    menu += "<br>\n";
    return menu;
}

#[doc = "get_params."]
pub fn get_params (menuType: MenuType, theMenuItem, currentMenuSelections) {
    // only add only if param exists and is not the default
    // add parameters to url
    let params = "";
        //var paramsKeys = ["view", "sort"];
        let flagFoundView = 0;
        let flagFoundSort = 0;
        let paramView = "";
       let paramSort = "";
    //debug("menu view currentMenuSelected", currentMenuSelections['view']);
    //debug("menu sort currentMenuSelected", currentMenuSelections['sort']);
    // get view params
    let paramsView = "";
    if menuType == MenuType::View {
        //paramView += "view=" + currentMenuSelections['view'];
        flagFoundView++;
        paramView += "view=" + theMenuItem;
        if (typeof currentMenuSelections['sort'] !== "undefined") {
            if (currentMenuSelections['sort'] !== "") {
                if (currentMenuSelections['sort'] !== "undefined") {
            flagFoundSort++;
            paramSort += "sort=" + currentMenuSelections['sort'];
        } else {
            // set default sort
            flagFoundSort++;
            var default_sort = "id";
            paramSort += "sort=" + default_sort;
        }
            } else {
        // set default sort
                flagFoundSort++;
        var default_sort = "id";
                paramSort += "sort=" + default_sort;
        }
        } else {
        // set default sort
            flagFoundSort++;
        var default_sort = "id";
            paramSort += "sort=" + default_sort;
    }
    }
    if menuType == MenyType::Sort {
        //paramView += "view=" + currentMenuSelections['sort'];
        // only if defined
        if (typeof currentMenuSelections['view'] !== "undefined") {
            if (currentMenuSelections['view'] !== "") {
        if (currentMenuSelections['view'] !== "undefined") {
            flagFoundView++;
            var default_view = "html";
            paramView += "view=" + default_view;
        } else {
            flagFoundView++;
            paramView += "view=" + currentMenuSelections['view'];
        }
            } else {
        flagFoundView++;
        var default_view = "html";
                paramView += "view=" + default_view;
        }
        } else {
        // set default view
            flagFoundView++;
        var default_view = "html";
            paramView += "view=" + default_view;
    }
        flagFoundSort++;
        paramSort += "sort=" + theMenuItem;
    }
    if (flagFoundView || flagFoundSort) {
        params += "?";
    }
    if (flagFoundView) {
        params += paramView;
    }
    if (flagFoundView && flagFoundSort) {
        params += "&";
    }
    if (flagFoundSort) {
        params += paramSort;
    }
    println!("menu getParams() created params =", params);
    params;
}

        // create menu for view
        let mut current_menu_selections: HashMap<&str, &str> = HashMap::new();

// View is on hold because it is under construction
// current_menu_selections.insert("view", param_view);

current_menu_selections.insert("sort", param_sort);

// var choicesViewMenu = ["html", "json", "stream", "postgres", "meta"];

// View is on hold because it is under construction
// var choicesViewMenu = ["html", "stream"];
// default
let menu_type = "view";

// define the getMenu function that takes arguments similar to the JavaScript version
fn get_menu(menu_type: &str, current_menu_selections: &HashMap<&str, &str>, choices_subs_menu: Vec<&str>, url: &str, base_url: &str, param_upk_is_valid: &str) {
    // implement the getMenu function as required in your Rust code.
    // replace this with the actual implementation.
    // Note that Rust does not have dynamic module loading like JavaScript, so you'll need to handle getMenu appropriately.
    // Sample data for demonstration
        let class_name = "plants";
        let base_url = "https://example.com/";
        let param_upk_is_valid = "param_value";
        // sample HashMap for currentMenuSelections
        let mut current_menu_selections: HashMap<&str, &str> = HashMap::new();
    current_menu_selections.insert("subs", class_name);


    // Define the choicesSubsMenu based on the class_name
    let choices_subs_menu = match class_name {
        "plants" | "plant_lists" | "plant_list_plants" | "plant_histories" | "plant_events" | "plant_families" | "plant_categories" | "plant_attributes" | "varieties" | "seed_packets" | "lands" | "beds" | "soil_areas" => {
            vec![
                "plants", "plant_lists", "plant_list_plants", "plant_histories", "plant_events",
                "varieties", "seed_packets", "soil_areas", "beds", "lands", "plant_families",
                "plant_categories", "plant_attributes",
            ]
        }
        "domains" | "webpages" | "tenperdays" | "webpage_maxonomies" | "maxonomies" => {
            vec!["domains", "webpages", "tenperdays", "webpage_maxonomies", "maxonomies"]
        }
        "coins" | "tags" => vec!["coins", "tags"],
        "coin_prices" | "coin_indicators" | "coin_emas" | "coin_evaluations" | "coin_markets" | "coin_macds" | "coin_signals" => {
            vec![
                "coins", "coin_prices", "coin_emas", "coin_indicators", "coin_evaluations",
                "coin_macds", "coin_signals", "coin_markets",
            ]
        }
        "addresses" | "delegations" | "providers" | "delegation_provders" | "stake_providers" | "deposits" | "stakes" => {
            vec![
                "addresses", "delegations", "delegation_providers", "providers", "stakes",
                "stake_providers", "deposits",
            ]
        }
        _ => Vec::new(),
    };
    // Define the menuType based on class_name
    let mut menu_type = "";
    if choices_subs_menu.len() > 0 {
        menu_type = "subs";
        // Replace getMenu with the actual function call
        let manifest_subs_menu = get_menu(menu_type, &current_menu_selections, choices_subs_menu, url, base_url, param_upk_is_valid);
        // Do something with the returned manifest_subs_menu
    }
 */

/* end */
