myApp.controller('EmailController', ['$http','EmailService','PetService',function($http, EmailService, PetService){
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
      var careMessage = '';
      for (var i = 0; i < data.length; i++) {
        if(data[i].household === vm.houseHold){
          careMessage += '<b>' + data[i].name + ' (' + data[i].color + ' ' + data[i].breed + '):</b> ' + data[i].care + '<br><br>';
        }
      }
      if(vm.additionalComments !== '' || vm.additionalComments !== undefined){
        careMessage += '<b>Additional Comments:</b> '+ vm.additionalComments;

      }
      EmailService.sendEmail(vm.petSitterEmail, careMessage).then(function(email){
        console.log('What happened when sending an email:', email);
        vm.petSitterEmail = '';
        vm.additionalComments = '';
      });
    });
  };

}]);
