# Solo Project

## What's left

* Add a page where an admin can assign care tasks to other people in their household
* Fix the delete favorites 
* Search for a pet
  * http://angular-ui.github.io/bootstrap/
    * typeahead
  * https://stackoverflow.com/questions/21891229/search-box-in-angular-js
* Continue styling so that it continues to look nice
* Make a real readme
* Create tests
* Actually explain what the app does in an eloquent fashion


## Assign care tasks

* Add a tasks array to the user model so that when you register, you automatically have an empty array of tasks
* Two options:
  1. Make the tasks page accessible to everyone but only have one div showing for those who are admins that lets them assign tasks to people in their household
  2. Make the entire care tasks page only visible to the admins and then show tasks that have been assigned to you on the main page
