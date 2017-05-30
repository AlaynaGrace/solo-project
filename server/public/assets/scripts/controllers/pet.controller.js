myApp.controller('PetController', ['PetService','$http',function(PetService,$http){
  var vm = this;
  vm.petList = PetService.allPets.petList;
  vm.message = PetService.allPets.message;

  $http.get('/pets').then(function(response) {
    console.log(response);
      if(response.data.user.username) {
          // user has a curret session on the server
          vm.userName = response.data.user.username;
          vm.phoneNumber = response.data.user.phone;
          vm.houseHold = response.data.user.household;
          console.log('User Data: ', vm.userName);
          // console.log('phoneNumber');
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });
  vm.getAllPets = function(){
      PetService.getAllPets().then(function(data){
      vm.petList = data;
      console.log('in controller:', vm.petList);
    });
  };
  vm.getAllPets();

  vm.addNewPet = function(){
    console.log('adding a new pet!');
    var objectToSend={
      name: vm.name,
      breed: vm.breed,
      color: vm.color,
      age: vm.age,
      care: vm.care,
      owner: vm.owner,
      feed: vm.checkbox.feed,
      water: vm.checkbox.water,
      walk: vm.checkbox.walk,
      bathe: vm.checkbox.bathe,
      treats: vm.checkbox.treats,
      litter: vm.checkbox.treats
    };
    PetService.addNewPet(objectToSend).then(function(){
      vm.name = '';
      vm.breed = '';
      vm.color = '';
      vm.age = '';
      vm.care = '';
      vm.owner = '';
      vm.checkbox.feed = false;
      vm.checkbox.water = false;
      vm.checkbox.walk = false;
      vm.checkbox.bathe = false;
      vm.checkbox.treats = false;
      vm.checkbox.treats = false;
    });
  };

  vm.removePet = function(id){
    console.log('removing', id);
    PetService.removePet(id).then(function(){
      vm.getAllPets();
    });
  };

}]);
