myApp.controller('PetController', ['$uibModal', '$log','$routeParams','PetService','$http', 'TextService','UserListService','$location','$window','UploadService','FavoriteService', function($uibModal, $log, $routeParams, PetService, $http, TextService, UserListService, $location,$window,UploadService,FavoriteService){
  var vm = this;
  // vm.petList = PetService.allPets.petList;
  vm.petList = [];
  vm.message = PetService.allPets.message;
  // vm.houseHold = '';
  // vm.userList = [];

  $http.get('/pets').then(function(response) {
    // console.log(response);
      if(response.data.user.username) {
          // user has a curret session on the server
          vm.userName = response.data.user.username;
          vm.phoneNumber = response.data.user.phone;
          vm.houseHold = response.data.user.household;
          vm.userList = [];
          UserListService.getUserList().then(function(data){
            //console.log('this is the data from userList:',data);
            for(var i=0; i<data.length;i++){
              if(data[i].household === vm.houseHold){
                vm.userList.push(data[i]);
              }
            }

          });
          PetService.getPetCare(vm.houseHold).then(function(data){
            //console.log('this is the careList:',data, 'and this is your household:', vm.houseHold);
            vm.careList = data;
          });

          //console.log('User Data: ', vm.userList);
          // console.log('phoneNumber');
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
          // $window.location.href = '/home';
      }
  });
  vm.getAllPets = function(){
    //console.log('getting all pets');
      PetService.getAllPets().then(function(data){
        //console.log('pets',data);
        vm.petList = [];
        for (var i = 0; i < data.length; i++) {
          if(data[i].household === vm.houseHold){
            vm.petList.push(data[i]);
          }
        }
      //console.log('******in controller:', vm.petList);
    });
  };
  vm.getAllPets();

  vm.addNewPet = function(){
    // console.log('adding a new pet!');
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
      household: vm.houseHold,
      petimg: vm.petImgUrl,
      favorites: []
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
      vm.checkbox.litter = false;
      vm.uploadMessage = '';
    });
  };

  vm.removePet = function(){
    // console.log('removing', id);
    PetService.removePet($routeParams.id).then(function(){
      // console.log('pet has been removed');
      // vm.getAllPets();
      $location.path("/userHome");


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
    // console.log('weird object', vm.actionObject);
    vm.actionObject = {care:[]};
    vm.observations = '';
  };
  vm.uploadMessage = '';
  vm.showPicker = function(){
    UploadService.showPicker().then(function(data){
      vm.petImgUrl = data;
      vm.uploadMessage = "Picture has been uploaded!";

      // console.log('Pet img has been uploaded');
    });

  };

  vm.getFavorites = function(){
    // console.log('$$$$$ Getting Faves');
    FavoriteService.getFavorites().then(function(data){
      vm.favoritesList = data;
    });
  };

  vm.addFavorite = function(){
    vm.petIn = JSON.parse(vm.petIn);
    // console.log('petIn:',vm.petIn);

    // console.log('petIn:',vm.petIn.name);
    var newPet = vm.petIn;
    var newFaves = [vm.itemType,vm.item];
    newPet.favorites.push(newFaves);

    FavoriteService.addFavorite(newPet).then(function(){
      vm.getAllPets();
      vm.item = '';
      vm.itemType = '';
    });

  };

  vm.indivName = '';
  vm.indivBreed = '';
  vm.indivColor = '';
  vm.indivAge = '';
  vm.indivPetimg = '';
  vm.indivOwner = '';
  vm.indivCare = '';
  vm.indivFavorites = '';
  vm.indivId = $routeParams.id;

  vm.getIndividualPet = function(){
    vm.indivId = $routeParams.id;

    var pet = {};
    PetService.getAllPets().then(function(data){
      //console.log('pets',data);
      for (var i = 0; i < data.length; i++) {
        if(data[i]._id === vm.indivId){
          pet = data[i];
        }
      }
    console.log('%%%%%%%%%%%%%%%%THIS IS THE PET', pet);
    vm.indivName = pet.name;
    vm.indivBreed = pet.breed;
    vm.indivColor = pet.color;
    vm.indivAge = pet.age + ' ' + pet.agelength;
    vm.indivPetimg = pet.petimg;
    vm.indivOwner = pet.owner;
    vm.indivCare = pet.care;
    vm.indivFavorites = pet.favorites;

    console.log('This is the $routeParams.id', $routeParams.id);
  });
    // PetService.getIndividualPet($routeParams.id).then(function(data){
    //   vm.indivName = data.name;
    //   vm.indivBreed = data.breed;
    //   vm.indivColor = data.color;
    //   vm.indivAge = data.age + ' ' + data.agelength;
    //   vm.indivPetimg = data.petimg;
    //   vm.indivOwner = data.owner;
    //   vm.indivCare = data.care;
    //   vm.indivFavorites = data.favorites;
    //
    //   $location.path('/individual/' + data._id);
    // });
  };
  // vm.getIndividualPet();

  // vm.updatePetInfo = function(){
  //   PetService.updatePetInfo(petInfo).then(function(){
  //     vm.getIndividualPet();
  //   });
  // };


  vm.open = function (size, parentSelector) {
    vm.animationsEnabled = true;

    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
      console.log('this is the size and parentSelector', size, parentSelector);
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',   // HTML in the modal.html template
      controller: 'ModalInstanceController',
      controllerAs: 'mic',
      size: size,
      appendTo: parentElem,
      resolve: {
        title: function () {
          return 'Psi Modals Rule!!11!';
        }
      }
    }).result.then(function(){
      console.log('It was closed!');
    });
    console.log('modalInstance:', modalInstance);

    // log a timestamp when the modal is dismissed
    // modalInstance.result.then(function () {
    //   $log.info('Modal dismissed at: ' + new Date());
    // });
  };



}]);

myApp.controller('ModalInstanceController',['$uibModalInstance','title',function ($uibModalInstance, title) {
  var vm = this;

  vm.title = title;
  console.log('vm.title:', vm.title);

  vm.ok = function () {
    $uibModalInstance.close();
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
