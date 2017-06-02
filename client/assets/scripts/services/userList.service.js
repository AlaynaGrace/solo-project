myApp.service('UserListService', ['$http', function($http){
  var self = this;

  self.getUserList = function(){
      return $http({
        method: 'GET',
        url: '/user/list'
      }).then(function success(res){
        console.log(res.data);
        return res.data;
      },function failure(res){
        console.log(res);
      });
  };

}]);
