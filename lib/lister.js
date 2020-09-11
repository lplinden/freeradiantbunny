// ListBliss
// these are old functions from the php days
class ListBliss {
  this.list = array(); // array of instances
  list.get_list_reverse_order = function() {
    return array_reverse(this->get_list());
  }
  list.set_sort = function(var) {
    // how the list is sorted
    if (var == "alphabetical" || var == "random") {
      this->sort = var;
    } else {
      this->get_db_dash()->print_error("Error: not a valid sort method.");
    }
  }
  list.get_sort = function() {
    if (! isset(this->sort)) {
      this->sort = "alphabetical"; // default;
      if (isset(_GET['sort'])) {
        this->set_sort(_GET['sort']);
      }
    }
    return this->sort;
  }
  list.get_count = function() {
    return count(this->list);
  }
  list.empty_list = function() {
    // assumes this clobbers the previous list
    this->list = array();
  }
  list.get_first_element = function() {
    if (this->get_count() > 0) {
      list_obj = this->get_list();
      return list_obj[0];
    }
  }
  list.resort = function(given_sort_name_to_run, given_user_obj) {
    if (given_sort_name_to_run == "problemography") {
      // debug
      //print "debug list_bliss resort : " + given_sort_name_to_run + "<br />\n";
      // note: this is a formula
      // for now place the special category at the top
      // and work on everything else later
      // first, find all that match
      // the following array is webpage_obj => order_by (for sorting purpioses)
      found_mudia_patterns_array = array();
      foreach (this->get_list() as webpage) {
        // debug
        //print "debug list_bliss resort webpage : " + webpage->get_id() + "<br />\n";
        // get maxonomy of this webpage
        maxonomy_array = webpage->get_webpage_maxonomy_obj()->get_list_of_maxonomy_obj_given_webpage_id(webpage->get_id(), given_user_obj);
        foreach (maxonomy_array as maxonomy) {
          // debug
          //print "debug list_bliss resort maxonomy id : " + maxonomy->get_id() + " " + maxonomy->get_categorization() + "<br />\n";
          if (maxonomy->get_categorization() == given_sort_name_to_run) {
            array_push(found_mudia_patterns_array, webpage);
	    // store this data for the sort below
            webpage->get_webpage_maxonomy_obj()->get_maxonomy_obj()->set_order_by(maxonomy->get_order_by());
            // debug
            //print "debug list_bliss resort <strong>found</strong> webpage : " + webpage->get_id() + "<br />\n";
          }
        }
      }
      // second, sort the found ones
      //usort(found_mudia_patterns_array,'cmp_obj');
      usort(found_mudia_patterns_array, array('Webpages','cmp_obj'));
      // debug
      //print "debug list_bliss resort moving count : " + count(found_mudia_patterns_array) + "<br />\n"
      // third, move found items to the top of the list
      foreach (found_mudia_patterns_array as webpage) {
        this->move_item_to_the_top_of_the_list(webpage);
      }
    }
  }
  // method
  // todo better name perhaps remove from list
  list.remove_from_list_by_project_obj = function(given_project_obj) {
    markup = "";
    element_index = array_search(given_project_obj, this->list);
    this->unset_from_list(element_index);
    // debug
    //markup .= "debug list_bliss element_index = " + element_index + "<br />\n";
    return markup;
  }
  // method
  list.move_item_to_the_top_of_the_list = function(given_obj) {
    // debug
    //print "debug list_bliss unshift : " + given_obj->get_id() + "<br />\n";
    // note: found help on the web at the following URL
    // http://stackoverflow.com/questions/5312879/moving-array-element-to-top-in-php
    // function move_to_top(&array, key) {
    //     temp = array(key => array[key]);
    //     unset(array[key]);
    //     array = temp + array;
    // }
    // note: here is my translation
    // make a temporary array
    //temp = array(given_obj => array[given_obj]);
    temp_given_obj = given_obj;
    // remove the obj from the array
    //unset(array[given_obj]);
    element_index = array_search(given_obj, this->list);
    this->unset_from_list(element_index);
    // add the obj to the beginning of the array    
    //array = temp + array;
    array_unshift(this->list, temp_given_obj);
  }
};
