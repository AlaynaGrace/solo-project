myApp.service('PetService', ['$http',function($http){
  var self = this;
  self.allPets = { petList: [], message: ''};

  self.getAllPets = function(){
    self.allPets.message = '';
    return $http({
      method: 'GET',
      url: '/pets'
    }).then(function success(res){
      console.log(res);
      self.allPets.petList = res.data.pets;
      console.log('in service:',self.allPets.petList);
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
        console.log(res);
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
      console.log(res);
      self.getAllPets();
    }, function failure(res){
      console.log(res);
    });
  };

}]);
