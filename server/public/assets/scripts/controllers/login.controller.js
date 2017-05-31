myApp.controller('LoginController', ['$http', '$location', 'RegisterService', function($http, $location, RegisterService) {
  console.log('LoginController loaded');
    var vm = this;

    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      console.log('here', vm.user);
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.user.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/userHome');
          } else {
            console.log('failure: ', response);
            vm.message = "Wrong!!";
          }
        });
      }
    };

    vm.registerUser = function() {
      if(vm.user.username === '' || vm.user.password === '' || vm.user.phone === '' || vm.user.household === '') {
        vm.message = "Please fill in all of the fields!";
      } else {
        //returns true if it is a new household
        RegisterService.getHouseholds(vm.user.household).then(function(data){
          console.log('this should sometimes be undefined:', data);
          vm.newHousehold = data;
        });
        if(vm.newHousehold){
          vm.user.admin = true;
        }
        else if(vm.newHousehold === false){
          vm.user.admin = false;
        }
        console.log('newHousehold:',vm.newHousehold);
        if(vm.user.admin !== undefined){
          console.log('sending to server...', vm.user);
          $http.post('/registerUser', vm.user).then(function(response) {
            console.log('success');
            $location.path('/home');
          },
          function(response) {
            console.log('error');
            vm.message = "Please try again.";
          });
        }
      }
    };
}]);
