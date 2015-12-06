app.controller('loginCtrl', ['$scope','$rootScope','$location','authService','$window',function($scope,$rootScope, $location,authService,$window){

  $rootScope.loading=false;
  $rootScope.username=authService.user.data;
  
  var identifiant={login:"hassine", password:"123"};
  $scope.login=function(){
        $scope.ErrorLogin=null;
        $scope.ErrorPassword=null;

         if(identifiant.login!=$scope.form.login ){
           $scope.ErrorLogin=true;
        }else{
            if(identifiant.password==$scope.form.password){
                 $window.localStorage.setItem("sessionUser",$scope.form.login);
                 authService.setLoggedIn();
                 $location.path('/');
                 $location.replace();
            }else{
                 $scope.ErrorPassword=true;
            }

        }
      
      
  }

}])
