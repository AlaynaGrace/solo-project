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

}]);
