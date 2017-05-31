myApp.controller('PetController', ['PetService','$http', 'TextService','UserListService','$location',function(PetService,$http, TextService, UserListService, $location){
  var vm = this;
  // vm.petList = PetService.allPets.petList;
  vm.petList = [];
  vm.message = PetService.allPets.message;
  // vm.houseHold = '';
  // vm.userList = [];

  $http.get('/pets').then(function(response) {
    console.log(response);
      if(response.data.user.username) {
          // user has a curret session on the server
          vm.userName = response.data.user.username;
          vm.phoneNumber = response.data.user.phone;
          vm.houseHold = response.data.user.household;
          vm.userList = [];
          UserListService.getUserList().then(function(data){
            console.log('this is the data from userList:',data);
            for(var i=0; i<data.length;i++){
              if(data[i].household === vm.houseHold){
                vm.userList.push(data[i]);
              }
            }

          });
          PetService.getPetCare(vm.houseHold).then(function(data){
            console.log('this is the careList:',data, 'and this is your household:', vm.houseHold);
            vm.careList = data;
          });

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

  vm.actionObject = {care: []};
  vm.addAction = function(pet, action){
    switch(action){
      case 'Fed':
        vm.actionObject.care.push(pet + ' was fed.');
        break;
      case 'Given Water':
        vm.actionObject.care.push(pet + ' was given water.');
        break;
      case 'Walked':
        vm.actionObject.care.push(pet + ' was taken on a walk.');
        break;
      case 'Bathed':
        vm.actionObject.care.push(pet + ' was given a bath.');
        break;
      case 'Given Treat':
        vm.actionObject.care.push(pet + ' was given a treat.');
        break;
      case 'Changed Litter':
        vm.actionObject.care.push(pet + ' had his/her litter changed.');
        break;
      default:
        alert('None of the cases were met');
    }
  };

  vm.sendText = function(){
    var phoneNumber = '';
    var message = {
      action: vm.actionObject,
      number: '',
      extra: vm.observations
    };

    for (var i = 0; i < vm.userList.length; i++) {
      phoneNumber = '+1' + vm.userList[i].phone;
      message.number = phoneNumber;
      TextService.sendText(message);
    }
    console.log('weird object', vm.actionObject);
    vm.actionObject = {care:[]};
    vm.observations = '';
  };

}]);
