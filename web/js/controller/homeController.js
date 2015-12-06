app.controller('homeCtrl', ['$scope','$rootScope','$location','authService','$http','$q','$timeout',function($scope,$rootScope, $location,authService,$http,$q,$timeout){

  $rootScope.loading=false;
  $rootScope.username=authService.user.data;
}])
