var myApp = angular.module('myApp', ['ngRoute','ui.bootstrap']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // get rid of 1.6.4 #!

  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController as lc"
    }).when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController as lc"
    }).when('/userHome', {
      templateUrl: '/views/user.html',
      controller: "UserController as uc"
    }).when('/addPet',{
      templateUrl: '/views/addPet.html',
      controller: "PetController as pc"
    }).when('/care',{
      templateUrl: '/views/care.html',
      controller: 'PetController as pc'
    }).when('/household',{
      templateUrl: '/views/household.html',
      controller: 'UserController as uc'
    }).when('/petFavorites',{
      templateUrl: '/views/favorites.html',
      controller: "PetController as pc"
    }).when('/individual/:id',{
      templateUrl: '/views/individual.html',
      controller: 'PetController as pc'
    })
    .otherwise('/home');

    $locationProvider.html5Mode(true);


}]);
