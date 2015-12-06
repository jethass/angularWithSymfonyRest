app.factory('authService', ['$window',  function ($window) {
   
  var setLoggedIn = function(){
	 user.isAuth = checkUserIsAuth();
	 user.data = $window.localStorage.getItem('sessionUser') || null;
	 
   }
  
  var checkUserIsAuth = function(){
	 if(!$window.localStorage.getItem('sessionUser')){
		 return false;
	 }
	 
	 return true;
  }
  var user = {
	   	  isAuth: checkUserIsAuth(),
	   	  data: $window.localStorage.getItem('sessionUser') || null
   };
     
  var logout = function(){ 
	  user.isAuth = false;
	  $window.localStorage.removeItem('sessionUser');
  }
  

   return {
        user: user,
        setLoggedIn: setLoggedIn,
        logout: logout
   };



}]);
