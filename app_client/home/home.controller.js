(function() {
  
  angular
    .module('meanApp')
    .controller('homeCtrl', [
'$scope','$http', homeCtrl]);

    function homeCtrl ($scope, $http) {
	    $scope.getCommitData = function() {
		IN.API.Profile("me").fields(
		        [ "id", "firstName", "lastName", "pictureUrl",
		                "publicProfileUrl" ]).result(function(result) {
		    //set the model
		    $scope.$apply(function() {
		        $scope.jsondata = result.values[0];
		    });
		}).error(function(err) {
		    $scope.$apply(function() {
		        $scope.error = err;
		    });
		});
	    };
    }

})();
