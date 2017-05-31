myApp.service('AdminService', ['$http', function($http){
  var self= this;

  self.changeAdminStatus = function(objectToChange, id){
    return $http({
      method: 'PUT',
      url: '/user/' + id,
      data: objectToChange
    }).then(function success(res){
      console.log(res);
    }, function failure(res){
      console.log(res);
    });
  };

}]);
