myApp.service('RegisterService', ['$http', function($http){
  var self = this;

  self.getHouseholds = function(pendingHousehold){
    return $http({
      method: 'GET',
      url: '/user/list'
    }).then(function success(res){
      console.log(res.data);
      var newHousehold = true;
      for(var i in res.data){
        var user = res.data[i];
        if(user.household === pendingHousehold){
          newHousehold = false;
        }
      }
      if (newHousehold) {
        var newHouse = confirm('Are you sure you would like to create a new household?');
        if(newHouse){
          return true;
        }
        else{
          // alert('Please try again!');
          return 'try again';
        }
      }
      else{
        return false;
      }
    },function failure(res){
      console.log(res);
    });
  };

}]);
