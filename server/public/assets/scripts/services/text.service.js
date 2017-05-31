myApp.service('TextService',['$http',function($http){
  var self = this;

  self.sendText = function(objectToSend){
    $http({
      url: '/sendMessage',
      method: 'POST',
      data: objectToSend
    }).then(function success(res){
      console.log(res);
    },function fail(res){
      console.log(res);
    });
  };

  self.inviteNewUser = function(phoneNumber, household){
    return $http({
      url: '/sendMessage/invite',
      method: 'POST',
      data: {number: phoneNumber, household: household}
    }).then(function success(res){
      console.log(res);
    }, function failure(res){
      console.log(res);
    });
  };

}]);
