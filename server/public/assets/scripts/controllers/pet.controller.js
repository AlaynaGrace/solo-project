myApp.controller('PetController', ['PetService','$http', 'TextService',function(PetService,$http, TextService){
  var vm = this;
  // vm.petList = PetService.allPets.petList;
  vm.petList = [];
  vm.message = PetService.allPets.message;
  // vm.userList = [];

  $http.get('/pets').then(function(response) {
    console.log(response);
      if(response.data.user.username) {
          // user has a curret session on the server
          vm.userName = response.data.user.username;
          vm.phoneNumber = response.data.user.phone;
          vm.houseHold = response.data.user.household;
          vm.userList = [];
          for(var i=0; i<response.data.userList.length;i++){
            if(response.data.userList[i].household === vm.houseHold){
              vm.userList.push(response.data.userList[i]);
            }
          }
          console.log('User Data: ', vm.userList);
          // console.log('phoneNumber');
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });
  vm.getAllPets = function(){
      PetService.getAllPets().then(function(data){
        console.log('pets',data);
        for (var i = 0; i < data.length; i++) {
          if(data[i].household === vm.houseHold){
            vm.petList.push(data[i]);
          }
        }
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
      agelength: vm.agelength,
      care: vm.care,
      owner: vm.owner,
      feed: vm.checkbox.feed,
      water: vm.checkbox.water,
      walk: vm.checkbox.walk,
      bathe: vm.checkbox.bathe,
      treats: vm.checkbox.treats,
      litter: vm.checkbox.treats,
      household: vm.houseHold
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
  vm.actionObject = {fed: [], watered: []};
  vm.addAction = function(pet, action){
    switch(action){
      case 'fed':
        vm.actionObject.fed.push(pet + ' was fed');
        break;
      case 'watered':
        vm.actionObject.watered.push(pet + ' was given water');
        break;
      default:
        alert('None of the cases were met');
    }
  };

  vm.sendText = function(){
    var phoneNumber = '';
    for (var i = 0; i < vm.userList.length; i++) {
      phoneNumber = '+1' + vm.userList[i].phone;
      TextService.sendText({action: vm.actionObject, number: phoneNumber});
    }
    console.log('weird object', vm.actionObject);
    vm.actionObject = {fed: [], watered:[]};
  };

  // vm.sendText = function(){
  //   vm.sendMultipleText().then(function(err){
  //     vm.actionObject = {fed:[], watered:[]};
  //     console.log('after sending text:', vm.actionObject);
  //   });
  // };

}]);
