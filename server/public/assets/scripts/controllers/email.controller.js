myApp.controller('EmailController', ['EmailService','PetService',function(EmailService, PetService){
  var vm = this;

  $http.get('/pets').then(function(response) {
    console.log(response);
      if(response.data.user.username) {
          // user has a curret session on the server
          vm.userName = response.data.user.username;
          vm.phoneNumber = response.data.user.phone;
          vm.houseHold = response.data.user.household;
          // console.log('phoneNumber');
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });

  vm.sendEmail = function(){
    PetService.getAllPets().then(function(data){
      console.log('pets',data);
      for (var i = 0; i < data.length; i++) {
        if(data[i].household === vm.houseHold){
          vm.petList.push(data[i]);
        }
      }
      EmailService.sendEmail(vm.petSitterEmail).then(function(data){
        console.log('What happened when sending an email:',data);
      });
    });
  };

}]);
