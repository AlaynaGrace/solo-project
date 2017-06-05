myApp.service('FavoriteService', ['$http',function($http){
  var self = this;

  self.getFavorites = function(){
    return $http({
      method: 'GET',
      url: '/pets'
    }).then(function success(res){
      console.log('$$$$$$$$in FavoriteService getting:',res);
      return res.data.pets;
    },function failure(res){
      console.log(res);
    });
  };

  self.addFavorite = function(objectToSend){
    return $http({
      method: 'PUT',
      url: '/pets/favorites',
      data: objectToSend
    }).then(function success(res){
      console.log('$$$$$$$in FavoriteService put, back with:', res);
    }, function failure(res){
      console.log(res);
    });
  };

}]);
