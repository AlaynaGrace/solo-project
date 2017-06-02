//Used filestack.com for uploading images
myApp.service('UploadService',[function(){
  var self = this;

  self.client = filestack.init('AoIpqqYpPRoytNINDiC6uz');
    self.showPicker = function(){
        return self.client.pick({
        }).then(function(result) {
            console.log(JSON.stringify(result.filesUploaded[0].url));
            return result.filesUploaded[0].url;
        });
    };

}]);
