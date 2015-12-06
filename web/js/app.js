var app = angular.module('App', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');

        $routeProvider
                .when('/',
                        {templateUrl: '/partials/home.html',
                            controller: 'homeCtrl',
                            requireAuth: false
                        }
                )
                .when('/login',
                        {templateUrl: '/partials/login.html',
                            controller: 'loginCtrl',
                            requireAuth: false
                        }
                )
               .when('/news',
                        {templateUrl: '/partials/news.html',
                            controller: 'newsCtrl',
                            requireAuth: true
                        }
                )
               .when('/contact',
                        {templateUrl: '/partials/contact.html',
                            controller: 'contactCtrl',
                            requireAuth: true
                        }
                )
                .otherwise({redirectTo: '/'});

    }])

// Manage Access
.run(['$rootScope', '$location','$window','$http','authService', function($rootScope, $location,$window, $http,authService){  
        
      $rootScope.$on('$routeChangeStart', function(evt, next, current){ 
	       if(($location.path() == '/') && (authService.user.isAuth)){
	    	   $location.path('/'); 
	       }else{
	           if(!authService.user.isAuth){
	               if(next.requireAuth){
	                     $location.path('/login');
	               }
	             } 
	       }
     })
     
    $rootScope.logout=function(authService) {
         $window.localStorage.removeItem('sessionUser');
         $window.location.reload();
    }
    
}]);

app.constant('appSettings', {
                            baseUrl: 'http://demoangandsymfony.dev.net/app_dev.php/api'
                           }
);


//Setting HTTP Headers
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptorService');
    }]);