(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication','Upload'];
  function meanData ($http, authentication, Upload) {

    var getProfile = function (routeParams) {
      return $http.get('/api/profile?sso='+routeParams.sso+'&sig='+routeParams.sig, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var updateProfile = function (profileParams) {
      return $http.post('/api/profile', profileParams, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var uploadImage = function (file) {
      file.upload = Upload.upload({
        url: 'api/upload/profilepic',
        data: {file: file},
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });

	    file.upload.then(function (response) {
	      $timeout(function () {
		//file.result = response.data;
	      });
	    }, function (response) {
	      //if (response.status > 0)
		//$scope.errorMsg = response.status + ': ' + response.data;
	    }, function (evt) {
	      // Math.min is to fix IE which reports 200% sometimes
	      //file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
    };
    return {
      getProfile : getProfile,
      updateProfile : updateProfile,
      uploadImage : uploadImage
    };
  }

})();
