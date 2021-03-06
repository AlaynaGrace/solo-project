myApp.controller('UserController', ['$http', '$location', 'TextService','UserListService','AdminService','$window',function($http, $location, TextService, UserListService, AdminService, $window) {
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
            vm.admin = response.data.user.admin;
            // vm.userList = response.data.userList;
            vm.userList = [];
            UserListService.getUserList().then(function(data){
              console.log('this is the data:',data);
              for(var i=0; i<data.length;i++){
                if(data[i].household === vm.houseHold){
                  vm.userList.push(data[i]);
                }
              }
            });
            console.log('userList in household:',vm.userList);
        } else {
            // user has no session, bounce them back to the login page
            $location.path("/home");
            // $window.location.href = '/home';
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
  vm.additionalMessage = '';

  vm.inviteNewUser = function(){
    TextService.inviteNewUser(vm.newUserNumber, vm.houseHold, vm.additionalMessage).then(function(){
      vm.newUserNumber = '';
      vm.additionalMessage = '';
    });
  };

  vm.updateAdminStatus = function(user){
    console.log('here is the user to change:',user);
    var objectToChange = {
      admin: true,
      username: user.username,
      password: user.password,
      phone: user.phone,
      household: user.household
    };

    AdminService.changeAdminStatus(objectToChange, user._id).then(function(){
      vm.getUsers();
    });

  };

}]);
