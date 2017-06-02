myApp.service('EmailService', ['$http',function($http){
  var self = this;

  self.sendEmail = function(email, message){
    var objectToSend = {
        email: email,
        careInfo: message
    };

    return $http({
      method: 'POST',
      url: '/email',
      data: objectToSend
    }).then(function success(res){
      console.log(res);
      return 'Email was sent!';
    }, function failure(res){
      console.log(res);
      return 'Error. Email not sent.';
    });
  };

}]);
