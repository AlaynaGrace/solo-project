myApp.service('PetService', ['$http',function($http){
  var self = this;
  self.allPets = { petList: [], message: ''};

  self.getAllPets = function(){
    self.allPets.message = '';
    return $http({
      method: 'GET',
      url: '/pets'
    }).then(function success(res){
      //console.log(res);
      self.allPets.petList = res.data.pets;
      // console.log('in service:',self.allPets.petList);
      self.allPets.message = 'Pet added successfully!';
      return res.data.pets;
    }, function failure(res){
      console.log(res);
      self.allPets.message = 'Error adding pet';

    });
  };

  self.addNewPet = function(objectToSend){
      return $http({
        method: 'POST',
        url: '/pets',
        data: objectToSend
      }).then(function success(res){
        // console.log(res);
        self.getAllPets();
      }, function failure(res){
        console.log(res);
      });
  };

  self.removePet = function(id){
    return $http({
      method: 'DELETE',
      url: '/pets/' + id
    }).then(function success(res){
      // console.log(res);
      self.getAllPets();
    }, function failure(res){
      console.log(res);
    });
  };

  self.getPetCare = function(household){
    // console.log('this is at the beginning:',household);
    return $http({
      method: 'GET',
      url: '/pets'
    }).then(function success(res){
      //console.log(res.data.pets);
      var careArray = [];
      for(var i in res.data.pets){
        var pet = res.data.pets[i];
        //console.log('in for loop with this pet:',pet);
        var careObject = {care:[], name: '', info:''};
        //console.log('your household:',household, 'pet household:',pet.household);
        if(pet.household === household){
          careObject.name = pet.name;
          careObject.info = pet.care;
          if(pet.feed){
            careObject.care.push('Fed');
          }
          if(pet.water){
            careObject.care.push('Given Water');
          }
          if(pet.walk){
            careObject.care.push('Walked');
          }
          if(pet.bathe){
            careObject.care.push('Bathed');
          }
          if(pet.treats){
            careObject.care.push('Given Treat');
          }
          if(pet.litter){
            careObject.care.push('Changed Litter');
          }
          careArray.push(careObject);
        }
      }
      return careArray;

    },function failure(res){
      console.log(res);
    });
  };

  self.getIndividualPet = function(id){
    return $http({
      method: 'GET',
      url: '/pets/individual/' + id
    }).then(function success(res){
      // console.log(res);
      return res.data[0];
    }, function failure(res){
      console.log(res);
    });
  };

}]);
