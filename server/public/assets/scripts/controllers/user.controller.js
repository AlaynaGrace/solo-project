myApp.controller('UserController', ['$http', '$location', function($http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;

  console.log('checking user');

  // Upon load, check this user's session on the server


  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };



  vm.getUsers = function(){
    $http.get('/user').then(function(response) {
        if(response.data.user.username) {
            // user has a curret session on the server
            vm.userName = response.data.user.username;
            vm.phoneNumber = response.data.user.phone;
            vm.houseHold = response.data.user.household;
            // vm.userList = response.data.userList;
            vm.userList = [];
            for(var i=0; i<response.data.userList.length;i++){
              if(response.data.userList[i].household === vm.houseHold){
                vm.userList.push(response.data.userList[i]);
              }
            }
            console.log('userList in household:',vm.userList);
        } else {
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    });
  };
  vm.getUsers();


  vm.removeUser = function(id){
    $http({
      url: '/user/' + id,
      method: 'DELETE'
    }).then(function success(res){
      console.log(res);
      vm.getUsers();
    }, function fail(res){
      console.log(res);
    });
  };
}]);
