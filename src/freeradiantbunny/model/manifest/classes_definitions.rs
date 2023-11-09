// freeradiantbunny - website for permaculture herb gardeners
// Copyright (C) 2023 Lars Paul Linden
// version 0.0.5

/// classes_definitions - these define isntances of the classes structure
// structures
use crate::freeradiantbunny::model::manifest::classes::Classes;
use crate::freeradiantbunny::model::manifest::upk_type::UpkType;
use crate::freeradiantbunny::model::manifest::screen::Screen;
// constants
use crate::freeradiantbunny::model::manifest::manifest_constants::{
    APPLICATIONS, CLASSES, DOMAINS, IMAGES, MAXONOMIES, MODULES, PLANTS, PLANT_FAMILIES,
    PLANT_LISTS, PLANT_LIST_PLANTS, STYLESHEETS, SUBSYSTEMS, WEBPAGES, WEBPAGE_MAXONOMIES,
    ZACHMANS, PERMACULTURE_TOPICS, PROJECTS, GOAL_STATEMENTS, BUSINESS_PLAN_TEXTS, PROCESSES, SCENE_ELEMENTS, COINS, COIN_PRICES
};

#[doc = "This function initializes the classes with a list of tables."]
pub fn load_screen_with_classes() -> Option<Screen> {
    // define
    let classes = Classes::new(CLASSES.to_string(),
                               vec![
                                   "id".to_string(),
                                   "name".to_string(),
                                   "description".to_string(),
                                   "img_url".to_string(),
                                   "sort".to_string(),
                                   "status".to_string(),
                                   "dev".to_string(),
                                   "lookup".to_string(),
                                   "fk_constraints".to_string(),
                                   "specialized_fields".to_string(),
                                   "privileged_owner".to_string(),
                                   "make_index_flag".to_string(),
                                   "make_unique".to_string(),
                                   "increment_id_flag".to_string(),
                                   "scrubber_flag".to_string(),
                                   "subsystems_id".to_string(),
                                   "zachmans_id".to_string(),
                               ],
                               //ARRAY_TO_STRING(array(select concat('<a href=\"../classes/zachmans/', z.id, '\" style=\"text-decoration: none;\">', z.name, '</a>') from zachmans z where a.zachmans_id = z.id), '') as zachmans
                               "select a.status, a.sort, a.id, concat('<a href=\"', a.name, '\">', a.name, '</a>') as name, ARRAY_TO_STRING(array(select concat('<a href=\"../classes/subsystems/', s.id, '\" style=\"text-decoration: none;\">', s.name, '</a>') from subsystems s where a.subsystems_id = s.id), '') as subsystems, a.dev from classes a ORDER BY a.sort DESC, a.name;".to_string(),
                               UpkType::None,
    );
    let subsystems = Classes::new(SUBSYSTEMS.to_string(),
                                  vec![
                                      "id".to_string(),
                                      "name".to_string(),
                                      "description".to_string(),
                                      "img_url".to_string(),     
                                      "sort".to_string(),
                                      "status".to_string(),
                                      "rules".to_string(),
                                  ],
                                  "SELECT a.status, a.sort, a.id, a.img_url, a.name, cast (count(c.id) as INTEGER) as referenced from subsystems a, classes c where a.id = c.subsystems_id GROUP BY a.status, a.sort, a.id, a.img_url, a.name ORDER BY a.sort DESC, a.name;".to_string(),
                                  UpkType::None,
    );
    let zachmans = Classes::new(ZACHMANS.to_string(),
                                vec![
                                    "id".to_string(),
                                    "name".to_string(),
                                    "description".to_string(),
                                    "img_url".to_string(),
                                    "sort".to_string(),
                                    "status".to_string(),
                                ],
                                "SELECT a.status, a.sort, a.id, a.img_url, a.name, a.description, cast (count(c.id) as INTEGER) as referenced from zachmans a, classes c where a.id = c.zachmans_id GROUP BY a.status, a.sort, a.id, a.img_url, a.name ORDER BY a.sort DESC, a.name;".to_string(),
                                UpkType::None
    );
    let modules = Classes::new(MODULES.to_string(),
                               vec![
                                   "id".to_string(),
                                   "name".to_string(),
                                   "description".to_string(),
                                   "img_url".to_string(),
                                   "sort".to_string(),
                                   "status".to_string(),
                                   "dev".to_string(),
                               ],
                               "SELECT a.status, a.sort, a.id, a.img_url, a.name, a.dev from modules a ORDER BY a.sort DESC, a.name;".to_string(),
                               UpkType::None
    );
    let domains = Classes::new(DOMAINS.to_string(),
                               vec![
                                   "id".to_string(),
                                   "name".to_string(),
                                   "description".to_string(),
                                   "img_url".to_string(),
                                   "sort".to_string(),
                                   "status".to_string(),
                                   "tli".to_string(),
                                   "domain_name".to_string(),
                                   "tagline".to_string(),
                                   "ssl_cert".to_string(),
                                   "registrar".to_string(),
                                   "hosting".to_string(),
                                   "crm".to_string(),
                                   "log".to_string(),
                                   "backups".to_string(),
                               ],
                               "select a.status, a.sort, a.id, a.domain_name, CAST(count(w.id) as INTEGER) as referenced from domains a, webpages w WHERE a.tli = w.domains_tli GROUP BY a.status, a.sort, a.id, a.domain_name ORDER BY a.sort DESC, a.name;".to_string(),
                               UpkType::None
    );
    let webpages = Classes::new(WEBPAGES.to_string(),
                                vec![
                                    "id".to_string(),
                                    "name".to_string(),
                                    "description".to_string(),
                                    "img_url".to_string(),
                                    "sort".to_string(),
                                    "status".to_string(),
                                    "path".to_string(),
                                ],
                                "SELECT a.status, a.sort, a.id, a.img_url, concat('<a href=\"https://', d.domain_name, a.path, '\">', a.name, '</a>') as name from webpages a, domains d where d.tli = a.domains_tli ORDER BY a.sort ASC, a.name LIMIT 50;".to_string(),
                                UpkType::None
    );
    let webpage_maxonomies = Classes::new(
        WEBPAGE_MAXONOMIES.to_string(),
        vec![
            "id".to_string(),
            "webpages_id".to_string(),
            "maxonomies_id".to_string(),
        ],
        "SELECT a.id, a.webpages_id, a.maxonomies_id from webpage_maxonomies a ORDER BY a.id;"
            .to_string(),
        UpkType::None,
    );
    let images= Classes::new(IMAGES.to_string(),
                                vec![
                                    "id".to_string(),
                                    "name".to_string(),
                                    "description".to_string(),
                                    "img_url".to_string(),
                                    "sort".to_string(),
                                    "status".to_string(),
                                    "path".to_string(),
                                ],
                             "SELECT a.status, a.sort, a.id, a.img_url, concat('<a href=\"https://', d.domain_name, a.path, '\">', a.name, '</a>') as name from images a, domains d where d.tli = a.domains_tli ORDER BY a.sort DESC, a.name LIMIT 50;".to_string(),
                             UpkType::None
    );
    let stylesheets = Classes::new(STYLESHEETS.to_string(),
                                vec![
                                    "id".to_string(),
                                    "name".to_string(),
                                    "description".to_string(),
                                    "img_url".to_string(),
                                    "sort".to_string(),
                                    "status".to_string(),
                                    "path".to_string(),
                                ],
                                   "SELECT a.status, a.sort, a.id, a.img_url, concat('<a href=\"https://', d.domain_name, a.path, '\">', a.name, '</a>') as name from stylesheets a, domains d where d.tli = a.domains_tli ORDER BY a.sort DESC, a.name;".to_string(),
                                   UpkType::None
    );
    let applications = Classes::new(APPLICATIONS.to_string(),
                                    vec![
                                        "id".to_string(),
                                        "name".to_string(),
                                        "description".to_string(),
                                        "img_url".to_string(),
                                        "sort".to_string(),
                                        "status".to_string(),
                                        "url".to_string(),
                                    ],
                                    "SELECT a.status, a.sort, a.id, a.img_url, concat('<a href=\"', a.url, '\">', a.name, '</a>') as name from applications a ORDER BY a.sort DESC, a.name;".to_string(),
                                    UpkType::None
    );
    let maxonomies = Classes::new(MAXONOMIES.to_string(),
                                  vec![
                                      "id".to_string(),
                                      "name".to_string(),
                                      "description".to_string(),
                                      "img_url".to_string(),
                                      "sort".to_string(),
                                      "status".to_string(),
                                      "url".to_string(),
                                  ],
                                  "SELECT a.status, a.sort, a.id, a.img_url, a.name, cast(count(c.id) as INTEGER) as referenced from maxonomies a LEFT JOIN webpage_maxonomies c ON a.id = c.maxonomies_id GROUP BY a.status, a.sort, a.id, a.img_url, a.name, a.url ORDER BY a.sort DESC, a.name;".to_string(),
                                  UpkType::None
    );
    let plants = Classes::new(PLANTS.to_string(),
                              vec![
                                  "id".to_string(),
                                  "name".to_string(),
                                  "description".to_string(),
                                  "img_url".to_string(),
                                  "sort".to_string(),
                                  "status".to_string(),
                                  "botanical_name".to_string(),
		                  "plant_families_id".to_string(),
                              ],
                              "SELECT a.status, a.sort, a.id, a.name, a.botanical_name, pf.name as plant_families FROM plants a, plant_families pf WHERE a.plant_families_id = pf.id ORDER BY a.sort DESC, a.name;".to_string(),
                              UpkType::None
    );
    let plant_lists = Classes::new(PLANT_LISTS.to_string(),
                                   vec![
                                       "id".to_string(),
                                       "name".to_string(),
                                       "description".to_string(),
                                       "img_url".to_string(),
                                       "sort".to_string(),
                                       "status".to_string(),
                                   ],
                                   "SELECT a.status, a.sort, a.id, a.name, cast (count(plp.id) AS INTEGER) as referenced from plant_list_plants plp, plant_lists a WHERE plp.plant_lists_id = a.id GROUP BY a.id, a.status, a.sort, a.name ORDER BY a.sort DESC, a.name;".to_string(),
                                   UpkType::None
    );
    let plant_list_plants = Classes::new(PLANT_LIST_PLANTS.to_string(),
                                         vec![
                                             "id".to_string(),
                                             "name".to_string(),
                                             "description".to_string(),
                                             "img_url".to_string(),
                                             "sort".to_string(),
                                             "status".to_string(),
                                             "plants_id".to_string(),
                                             "plant_lists_id".to_string(),
                                         ],
                                         "SELECT pl.name, p.name from plant_list_plants plp, plants p, plant_lists pl  where plp.plants_id = p.id AND plp.plant_lists_id = pl.id ORDER BY p.name;".to_string(),
                                         UpkType::None
    );
    let plant_families = Classes::new(
        PLANT_FAMILIES.to_string(),
        vec![
            "id".to_string(),
            "name".to_string(),
            "description".to_string(),
            "img_url".to_string(),
            "sort".to_string(),
            "status".to_string(),
        ],
        "SELECT a.status, a.sort, a.id, a.name, CAST(count(p.id) AS INTEGER) as referenced from plant_families a, plants p WHERE p.plant_families_id = a.id GROUP BY a.status, a.sort, a.id, a.name ORDER BY a.sort DESC, a.name;".to_string(),
        UpkType::None
    );
    let permaculture_topics = Classes::new(PERMACULTURE_TOPICS.to_string(),
                                    vec![
                                        "id".to_string(),
                                        "name".to_string(),
                                        "description".to_string(),
                                        "img_url".to_string(),
                                        "sort".to_string(),
                                        "status".to_string(),
                                    ],
                                           "SELECT a.status, a.sort, a.id, a.img_url, a.name from permaculture_topics a ORDER BY a.sort DESC, a.name;".to_string(),
                                           UpkType::None
    );
    let projects = Classes::new(PROJECTS.to_string(),
                                    vec![
                                        "id".to_string(),
                                        "name".to_string(),
                                        "description".to_string(),
                                        "img_url".to_string(),
                                        "sort".to_string(),
                                        "status".to_string(),
                                    ],
                                "SELECT a.status, a.sort, a.id, a.img_url, a.name from projects a ORDER BY a.sort DESC, a.name;".to_string(),
                                UpkType::Protected
    );
    let goal_statements = Classes::new(GOAL_STATEMENTS.to_string(),
                                    vec![
                                        "id".to_string(),
                                        "name".to_string(),
                                        "description".to_string(),
                                        "img_url".to_string(),
                                        "sort".to_string(),
                                        "status".to_string(),
                                        "project_id".to_string(),
                                    ],
                                "SELECT a.status, a.sort, a.id, a.img_url, a.name from goal_statements a ORDER BY a.sort DESC, a.name;".to_string(),
                                       UpkType::Protected
    );
    let business_plan_texts = Classes::new(BUSINESS_PLAN_TEXTS.to_string(),
                                    vec![
                                        "id".to_string(),
                                        "name".to_string(),
                                        "description".to_string(),
                                        "img_url".to_string(),
                                        "sort".to_string(),
                                        "status".to_string(),
                                        "goal_statements_id".to_string(),
                                    ],
                                "SELECT a.status, a.sort, a.id, a.img_url, a.name from business_plan_texts a ORDER BY a.sort DESC, a.name;".to_string(),
                                UpkType::Protected
    );
    let processes = Classes::new(PROCESSES.to_string(),
                                    vec![
                                        "id".to_string(),
                                        "name".to_string(),
                                        "description".to_string(),
                                        "img_url".to_string(),
                                        "sort".to_string(),
                                        "status".to_string(),
                                        "business_plan_texts_id".to_string(),
                                    ],
                                "SELECT a.status, a.sort, a.id, a.img_url, a.name from processes a ORDER BY a.sort DESC, a.name;".to_string(),
                                 UpkType::Protected
        );
        let scene_elements = Classes::new(SCENE_ELEMENTS.to_string(),
                                    vec![
                                        "id".to_string(),
                                        "name".to_string(),
                                        "description".to_string(),
                                        "img_url".to_string(),
                                        "sort".to_string(),
                                        "status".to_string(),
                                        "processes_id".to_string(),
                                    ],
                                          "SELECT a.status, a.sort, a.id, a.img_url, a.name from processes a ORDER BY a.sort DESC, a.name;".to_string(),
                                UpkType::Protected
    );
    let coins = Classes::new(COINS.to_string(),
                             vec![
                                 "id".to_string(),
                                 "name".to_string(),
                                 "description".to_string(),
                                 "img_url".to_string(),
                                 "sort".to_string(),
                                 "status".to_string(),
                                 "url".to_string(),
                                 "watch".to_string(),
                                 "type".to_string(),
                                 "platform".to_string(),
                                 "symbol".to_string(),
                             ],
                             "SELECT a.status, a.sort, a.id, a.img_url, a.symbol, concat('<a href=\"', a.url, '\">', a.name, '</a>') as name, a.watch, a.type, a.platform from coins a ORDER BY a.watch DESC, a.sort DESC, a.name LIMIT 50;".to_string(),
                             UpkType::None
    );
    let coin_prices = Classes::new(COIN_PRICES.to_string(),
                             vec![
                                 "id".to_string(),
                                 "name".to_string(),
                                 "description".to_string(),
                                 "img_url".to_string(),
                                 "sort".to_string(),
                                 "status".to_string(),
                             ],
                             "SELECT a.status, a.sort, a.id, a.img_url, a.name from coin_prices a ORDER BY a.sort DESC, a.name LIMIT 50;".to_string(),
                             UpkType::None
    );
    let screen = Screen {
        scrubbers: vec![
            Box::new(classes),
            Box::new(subsystems),
            Box::new(zachmans),
            Box::new(modules),
            Box::new(domains),
            Box::new(webpages),
            Box::new(webpage_maxonomies),
            Box::new(images),
            Box::new(stylesheets),
            Box::new(applications),
            Box::new(maxonomies),
            Box::new(plants),
            Box::new(plant_lists),
            Box::new(plant_list_plants),
            Box::new(plant_families),
            Box::new(permaculture_topics),
            Box::new(projects),
            Box::new(goal_statements),
            Box::new(business_plan_texts),
            Box::new(processes),
            Box::new(scene_elements),
            Box::new(coins),
            Box::new(coin_prices),
        ],
    };
    Some(screen)
}

/* end */
