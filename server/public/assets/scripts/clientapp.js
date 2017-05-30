var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // get rid of 1.6.4 #!
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController as lc"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController as lc"
    })
    .when('/userHome', {
      templateUrl: '/views/user.html',
      controller: "UserController as uc"
    }).when('/addPet',{
      templateUrl: '/views/addPet.html',
      controller: "PetController as pc"
    }).when('/allPets',{
      templateUrl: '/views/allPets.html',
      controller: "PetController as pc"
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);
