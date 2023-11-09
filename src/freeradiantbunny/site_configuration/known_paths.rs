KNOWN_PATHS: [&str; 5] = [
    "/index.html",
    "/about.html",
    "/zachmans.html",
    "/404.html",
    "/robots.txt",
    "/_styles/_styles/max.css",
    "/_styles/appmap.css",
    "/_styles/blog.css",
    "/_styles/book.css",
    "/_styles/book_v6.css",
    "/_styles/dawpis.css",
    "/_styles/freeradiantbunny.css",
    "/_styles/green.css",
    "/_styles/linux.css",
    "/_styles/mudia.css",
    "/_styles/mudiamoon.css",
    "/_styles/ogr.css",
    "/_styles/post.css",
    "/_styles/print.css",
    "/_styles/rallytally.css",
    "/_styles/scaffold.css",
    "/_styles/stagetrader.css",
    "/about.html",
    "/appmap/blob.html",
    "/appmap/builds/index.html",
    "/appmap/devrev.html",
    "/appmap/freeradiantbunny
    "/appmap/freeradiantbunny/index.html",
    "/appmap/genmaker/index.html",
    "/appmap/index.html",
    "/appmap/indiegoal/index.html",
    "/appmap/maxonomy-rallytally/_boilerplate.html",
    "/appmap/maxonomy-rallytally/cleanup.html",
    "/appmap/maxonomy-rallytally/cleanup.pre.html",
    "/appmap/maxonomy-rallytally/cleanup.txt",
    "/appmap/maxonomy-rallytally/hypercheck.html",
    "/appmap/maxonomy-rallytally/hypercheck.pre.html",
    "/appmap/maxonomy-rallytally/hypercheck.txt",
    "/appmap/maxonomy-rallytally/index.html",
    "/appmap/maxonomy-rallytally/index_old.html",
    "/appmap/maxonomy-rallytally/linkflow.html",
    "/appmap/maxonomy-rallytally/linkflow.pre.html",
    "/appmap/maxonomy-rallytally/linkflow.txt",
    "/appmap/maxonomy-rallytally/mirrorget.html",
    "/appmap/maxonomy-rallytally/mirrorget.pre.html",
    "/appmap/maxonomy-rallytally/mirrorget.txt",
    "/appmap/maxonomy-rallytally/pageone.html",
    "/appmap/maxonomy-rallytally/pageone.txt",
    "/appmap/maxonomy-rallytally/plainlist.html",
    "/appmap/maxonomy-rallytally/plainlist.txt",
    "/appmap/maxonomy-rallytally/postput.txt",
    "/appmap/maxonomy-rallytally/qualitytop.pre.html",
    "/appmap/maxonomy-rallytally/qualitytop.txt",
    "/appmap/maxonomy-rallytally/spelldown.pre.html",
    "/appmap/maxonomy-rallytally/stylepile.html",
    "/appmap/maxonomy-rallytally/stylepile.pre.html",
    "/appmap/maxonomy-rallytally/stylepile.txt",
    "/appmap/maxonomy-rallytally/switch.html",
    "/appmap/maxonomy-rallytally/switch.pre.html",
    "/appmap/maxonomy-rallytally/switch.txt",
    "/appmap/maxonomy-rallytally/validatorgator.html",
    "/appmap/maxonomy-rallytally/validatorgator.pre.html",
    "/appmap/maxonomy-rallytally/validatorgator.txt",
    "/appmap/maxonomy-rallytally/weblintrun.pre.html",
    "/appmap/maxonomy-rallytally/weblintrun.txt",
    "/appmap/mudia-search/index.html",
    "/appmap/pumpmech/index.html",
    "/appmap/pumpmech/traderdeck.html",
    "/appmap/stagetrader/index.html",
    "/appmap/tenperdays/index.html",
    "/batch/homepage.php",
    "/batch/index_three.php",
    "/beos/index.html",
    "/book/index.html",
    "/book/publishers/index.html",
    "/dash/rallytally/ham_rallytally/validatorgator.php",
    "/dash/rallytally/inv_rallytally/autoall.php",
    "/dash/rallytally/inv_rallytally/manifestproof.php",
    "/dash/rallytally/inv_rallytally/validatorcss.php",
    "/dash/rallytally/inv_rallytally/validatorgator.php",
    "/dash/rallytally/ogr_rallytally/autoall.php",
    "/dash/rallytally/ogr_rallytally/manifestproof.php",
    "/dash/rallytally/ogr_rallytally/validatorcss.php",
    "/dash/rallytally/pft_rallytally/autoall.php",
    "/dash/rallytally/pft_rallytally/manifestproof.php",
    "/dash/rallytally/pft_rallytally/validatorgator.php",
    "/dash/rallytally/pws_rallytally/autoall.php",
    "/dash/rallytally/pws_rallytally/validatorgator.php",
    "/dash/rallytally/rad_rallytally/autoall.php",
    "/dash/tenperday/_readme.txt",
    "/e8/about.html",
    "/e8/index.html",
    "/explore/index.html",
    "/free_software/index.html",
    "/free_software/textbooks.html",
    "/gardens/grow_your_own_food.html",
    "/gardens/index.html",
    "/hammermaker/index.html",
    "/hammermaker/liberty_support_systems/index.html",
    "/hammermaker/manatee/index.html",
    "/hammermaker/problemformation/index.html",
    "/hammermaker/singerian_inquiring_systems/index.html",
    "/hammermaker/swarm/index.html",
    "/hammermaker/topadop/index.html",
    "/howto/index.html",
    "/index.august.html",
    "/index.html",
    "/index_old_school.html",
    "/inquiring_systems/index.html",
    "/known.txt",
    "/link/index.html",
    "/link/patriot.html",
    "/link/video.html",
    "/linux/how_to_dns.html",
    "/linux/index.html",
    "/linux/install.html",
    "/linux/lpi_level_i.html",
    "/linux/lpi_level_ii.html",
    "/linux/perl/index.html",
    "/meta/index.html",
    "/meta/notepads.html",
    "/mudia_server_builder.html",
    "/mudia_web_developer/databases.html",
    "/mudia_web_developer/devops.html",
    "/mudia_web_developer/feed.html",
    "/mudia_web_developer/index.html",
    "/mudia_web_developer/link/index.html",
    "/mudia_web_developer/link/index.php",
    "/mudia_web_developer/meta/_rallytally/index.html",
    "/mudia_web_developer/meta/_rallytally/validatorgator.html",
    "/mudia_web_developer/meta/_rallytally/validatorgator.pre.html",
    "/mudia_web_developer/meta/_rallytally/validatorgator.txt",
    "/mudia_web_developer/meta/index.php",
    "/mudia_web_developer/shortcuts/index.php",
    "/mudia_web_developer/web_monetization.html",
    "/mudia_web_developer/webserver_stack.html",
    "/mudwiki/mudwiki_files.txt",
    "/mudwiki/mudwiki_files_sorted.txt",
    "/orb/index.php",
    "/orb/orb-001/caqdas.html",
    "/orb/orb-001/case_study.html",
    "/orb/orb-001/contextual.html",
    "/orb/orb-001/creativity.html",
    "/orb/orb-001/data_information_knowledge.html",
    "/orb/orb-001/decision_support_system.html",
    "/orb/orb-001/design_science.html",
    "/orb/orb-001/design_theory.html",
    "/orb/orb-001/elephant_in_the_room.html",
    "/orb/orb-001/emergence.html",
    "/orb/orb-001/expertise.html",
    "/orb/orb-001/inquiring_organizations.html",
    "/orb/orb-001/inquiring_systems.html",
    "/orb/orb-001/knowledge_management_system.html",
    "/orb/orb-001/multiple_perspectives.html",
    "/orb/orb-001/natural_language_processing.html",
    "/orb/orb-001/problem_formulation.html",
    "/orb/orb-001/problem_specification.html",
    "/orb/orb-001/qualitative_data_analysis.html",
    "/orb/orb-001/simulation_modelling.html",
    "/orb/orb-001/software_evaluation.html",
    "/orb/orb-001/strategic_information_system.html",
    "/orb/orb-001/systems_approach.html",
    "/orb/orb-001/tacit_knowledge.html",
    "/orb/orb-001/text_mining.html",
    "/orb/orb-001/type_three_error.html",
    "/orb/orb-001/visualization.html",
    "/orb/orb-001/wicked_problems.html",
    "/orb/orb-001/writing_style.html",
    "/permaculture/index.html",
    "/pop_quiz/index.html",
    "/pop_quiz/pop_quiz_code/popquiz.sf.problems.xml
    "/portfolio/index.html",
    "/problemography/404.html",
    "/problemography/_images/index.html",
    "/problemography/_login.php",
    "/problemography/about.php",
    "/problemography/add.php",
    "/problemography/art/index.html",
    "/problemography/art/observations/index.html",
    "/problemography/art/processes/index.html",
    "/problemography/conveyorbelt.php",
    "/problemography/create_observation_entities.php",
    "/problemography/data.php",
    "/problemography/development.php",
    "/problemography/examine.php",
    "/problemography/file.php",
    "/problemography/index.php",
    "/problemography/index_dev.php",
    "/problemography/integration/index.html",
    "/problemography/integration/sis/index.php",
    "/problemography/integration/sis/sis_01.php",
    "/problemography/integration/sis/sis_01_analysis.php",
    "/problemography/integration/sis/sis_02.php",
    "/problemography/integration/sis/sis_02_analysis.php",
    "/problemography/integration/sis/sis_03.php",
    "/problemography/integration/sis/sis_03_analysis.php",
    "/problemography/integration/sis/sis_04.php",
    "/problemography/integration/sis/sis_04_analysis.php",
    "/problemography/integration/sis/sis_05.php",
    "/problemography/integration/sis/sis_05_analysis.php",
    "/problemography/integration/sis/sis_06.php",
    "/problemography/integration/sis/sis_06_analysis.php",
    "/problemography/integration/sis/sis_07.php",
    "/problemography/integration/sis/sis_07_analysis.php",
    "/problemography/integration/sis/sis_08.php",
    "/problemography/integration/sis/sis_08_analysis.php",
    "/problemography/integration/sis/sis_09.php",
    "/problemography/integration/sis/sis_09_analysis.php",
    "/problemography/integration/sis/sis_10.php",
    "/problemography/integration/sis/sis_10_analysis.php",
    "/problemography/integration/sis/sis_11.php",
    "/problemography/integration/sis/sis_11_analysis.php",
    "/problemography/integration/sis/sis_12.php",
    "/problemography/integration/sis/sis_12_analysis.php",
    "/problemography/integration/wp/index.php",
    "/problemography/integration/wp/wp_01.php",
    "/problemography/integration/wp/wp_01_analysis.php",
    "/problemography/integration/wp/wp_02.php",
    "/problemography/integration/wp/wp_02_analysis.php",
    "/problemography/integration/wp/wp_03.php",
    "/problemography/integration/wp/wp_03_analysis.php",
    "/problemography/integration/wp/wp_04.php",
    "/problemography/integration/wp/wp_04_analysis.php",
    "/problemography/integration/wp/wp_05.php",
    "/problemography/integration/wp/wp_05_analysis.php",
    "/problemography/integration/wp/wp_06.php",
    "/problemography/integration/wp/wp_06_analysis.php",
    "/problemography/integration/wp/wp_07.php",
    "/problemography/integration/wp/wp_07_analysis.php",
    "/problemography/integration/wp/wp_08.php",
    "/problemography/integration/wp/wp_08_analysis.php",
    "/problemography/integration/wp/wp_09.php",
    "/problemography/integration/wp/wp_09_analysis.php",
    "/problemography/integration/wp/wp_10.php",
    "/problemography/integration/wp/wp_10_analysis.php",
    "/problemography/matches.php",
    "/problemography/meta/_top.php",
    "/problemography/meta/about_conveyorbelt.php",
    "/problemography/meta/about_examine.php",
    "/problemography/meta/data_dictionary.php",
    "/problemography/meta/index.php",
    "/problemography/meta/interview_questions.php",
    "/problemography/meta/site_map.php",
    "/problemography/model.php",
    "/problemography/models/case_evidence.xsd",
    "/problemography/models/index.php",
    "/problemography/models/problemography.dtd
    "/problemography/models/target_process.dtd
    "/problemography/models/target_process.owl",
    "/problemography/models/target_process_1.owl",
    "/problemography/models/target_process_1.xmi",
    "/problemography/models/target_process_10.owl",
    "/problemography/models/target_process_10.xmi",
    "/problemography/models/target_process_11.owl",
    "/problemography/models/target_process_11.xmi",
    "/problemography/models/target_process_12.owl",
    "/problemography/models/target_process_12.xmi",
    "/problemography/models/target_process_13.owl",
    "/problemography/models/target_process_13.xmi",
    "/problemography/models/target_process_14.owl",
    "/problemography/models/target_process_14.xmi",
    "/problemography/models/target_process_15.owl",
    "/problemography/models/target_process_15.xmi",
    "/problemography/models/target_process_16.owl",
    "/problemography/models/target_process_16.xmi",
    "/problemography/models/target_process_17.owl",
    "/problemography/models/target_process_17.xmi",
    "/problemography/models/target_process_18.owl",
    "/problemography/models/target_process_18.xmi",
    "/problemography/models/target_process_19.owl",
    "/problemography/models/target_process_19.xmi",
    "/problemography/models/target_process_2.owl",
    "/problemography/models/target_process_2.xmi",
    "/problemography/models/target_process_20.owl",
    "/problemography/models/target_process_20.xmi",
    "/problemography/models/target_process_21.owl",
    "/problemography/models/target_process_21.xmi",
    "/problemography/models/target_process_22.owl",
    "/problemography/models/target_process_22.xmi",
    "/problemography/models/target_process_23.owl",
    "/problemography/models/target_process_23.xmi",
    "/problemography/models/target_process_24.owl",
    "/problemography/models/target_process_24.xmi",
    "/problemography/models/target_process_25.owl",
    "/problemography/models/target_process_25.xmi",
    "/problemography/models/target_process_26.owl",
    "/problemography/models/target_process_26.xmi",
    "/problemography/models/target_process_3.owl",
    "/problemography/models/target_process_3.xmi",
    "/problemography/models/target_process_31.owl",
    "/problemography/models/target_process_31.xmi",
    "/problemography/models/target_process_32.owl",
    "/problemography/models/target_process_32.xmi",
    "/problemography/models/target_process_33.owl",
    "/problemography/models/target_process_33.xmi",
    "/problemography/models/target_process_34.owl",
    "/problemography/models/target_process_34.xmi",
    "/problemography/models/target_process_35.owl",
    "/problemography/models/target_process_35.xmi",
    "/problemography/models/target_process_36.owl",
    "/problemography/models/target_process_36.xmi",
    "/problemography/models/target_process_37.owl",
    "/problemography/models/target_process_37.xmi",
    "/problemography/models/target_process_38.owl",
    "/problemography/models/target_process_38.xmi",
    "/problemography/models/target_process_39.owl",
    "/problemography/models/target_process_39.xmi",
    "/problemography/models/target_process_4.owl",
    "/problemography/models/target_process_4.xmi",
    "/problemography/models/target_process_40.owl",
    "/problemography/models/target_process_40.xmi",
    "/problemography/models/target_process_41.owl",
    "/problemography/models/target_process_41.xmi",
    "/problemography/models/target_process_42.owl",
    "/problemography/models/target_process_42.xmi",
    "/problemography/models/target_process_43.owl",
    "/problemography/models/target_process_43.xmi",
    "/problemography/models/target_process_44.owl",
    "/problemography/models/target_process_44.xmi",
    "/problemography/models/target_process_45.owl",
    "/problemography/models/target_process_45.xmi",
    "/problemography/models/target_process_46.owl",
    "/problemography/models/target_process_46.xmi",
    "/problemography/models/target_process_47.owl",
    "/problemography/models/target_process_47.xmi",
    "/problemography/models/target_process_48.owl",
    "/problemography/models/target_process_49.owl",
    "/problemography/models/target_process_49.xmi",
    "/problemography/models/target_process_5.owl",
    "/problemography/models/target_process_5.xmi",
    "/problemography/models/target_process_50.owl",
    "/problemography/models/target_process_50.xmi",
    "/problemography/models/target_process_51.owl",
    "/problemography/models/target_process_51.xmi",
    "/problemography/models/target_process_52.owl",
    "/problemography/models/target_process_52.xmi",
    "/problemography/models/target_process_53.owl",
    "/problemography/models/target_process_53.xmi",
    "/problemography/models/target_process_54.owl",
    "/problemography/models/target_process_54.xmi",
    "/problemography/models/target_process_6.owl",
    "/problemography/models/target_process_6.xmi",
    "/problemography/models/target_process_7.owl",
    "/problemography/models/target_process_7.xmi",
    "/problemography/models/target_process_8.owl",
    "/problemography/models/target_process_8.xmi",
    "/problemography/models/target_process_9.owl",
    "/problemography/models/target_process_9.xmi",
    "/problemography/models/target_process_meta.dtd
    "/problemography/models/target_process_meta.xsd",
    "/problemography/models/target_processes.dtd
    "/problemography/models/target_processes.xsd",
    "/problemography/presentation.php",
    "/problemography/report/_top.php",
    "/problemography/report/dawpis.php",
    "/problemography/report/graph.php",
    "/problemography/report/graph_opp_create.php",
    "/problemography/report/graph_opp_retrieve.php",
    "/problemography/report/graphs.php",
    "/problemography/report/index.php",
    "/problemography/report/interviews.php",
    "/problemography/report/jumps.php",
    "/problemography/report/medium.php",
    "/problemography/report/notes.php",
    "/problemography/report/times.php",
    "/problemography/search.php",
    "/problemography/study3.php",
    "/robots.txt",
    "/search/index.html",
    "/search/search.php",
    "/sonic/index.html",
    "/sonic/pftdetroit/index.html",
    "/superdusty/_rallytally/_rally.html",
    "/superdusty/_rallytally/_stopwords.txt",
    "/superdusty/_rallytally/fontfinder.html",
    "/superdusty/_rallytally/fontfinder.pre.html",
    "/superdusty/_rallytally/hypercheck.html",
    "/superdusty/_rallytally/mirrorget.html",
    "/superdusty/_rallytally/mirrorget.pre.html",
    "/superdusty/_rallytally/postput.pre.html",
    "/superdusty/_rallytally/qualitytop.html",
    "/superdusty/_rallytally/qualitytop.pre.html",
    "/superdusty/_rallytally/spelldown.html",
    "/superdusty/_rallytally/spelldown.pre.html",
    "/superdusty/_rallytally/stylepile.pre.html",
    "/superdusty/_rallytally/switch.txt",
    "/superdusty/_rallytally/validatorgator.html",
    "/superdusty/_rallytally/validatorgator.pre.html",
    "/superdusty/_rallytally/validatorgator.txt",
    "/superdusty/dust/index.html",
    "/superdusty/dust/overdue.html",
    "/superdusty/dust/overground.html",
    "/superdusty/dust/overunder.html",
    "/superdusty/index.html",
    "/superdusty/overdue.html",
    "/superdusty/overground.html",
    "/superdusty/overunder.html",
    "/testo/index.php",
];
