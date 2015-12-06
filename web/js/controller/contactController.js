app.controller('contactCtrl', ['$scope','$rootScope','$location','authService','$http','$q','$timeout',function($scope,$rootScope, $location,authService,$http,$q,$timeout){

  $rootScope.loading=false;
  $rootScope.username=authService.user.data;
  $scope.sponsor = {};
  $scope.sponsors = [];
  $scope.nbr_parrains = 0;
  
  $scope.newSponsor = function() {
          
            $scope.ErrorEmail=null;
            $scope.EmailVide=null;
            var EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            var is_mail=EMAIL_REGEXP.test($scope.sponsor.email);
          
          
            if(is_mail){$scope.ErrorEmail=false; }else{ $scope.ErrorEmail=true;}
            if($scope.sponsor.email!= undefined){$scope.EmailVide=false;}else{$scope.EmailVide=true;}

            $scope.sponsorSavedSucess = false;
            $scope.sponsorUpdatedSucess = false;
            $scope.sponsorSavedError = false;

            if ($scope.sponsor && (is_mail && $scope.sponsor.id != undefined) ) {
                    $scope.postLoding = true;
                    console.log("update");
                    var token = $window.localStorage.getItem('janrainCaptureToken');
                    var params = {
                        contact_id: $scope.sponsor.id,
                        name: $scope.sponsor.nom,
                        email: $scope.sponsor.email
                    };

                    /*
                     
                     $http.put(appSettings.baseUrl + '/sponsoring/update/' + token + '', params)
                            .success(function(res) {
                                $scope.sponsorUpdatedSucess = true;
                                $timeout(function() {
                                    $scope.getSponsors().then(
                                            function(res) {
                                                $scope.sponsors = res;
                                                $scope.nbr_parrains = $scope.sponsors.length;
                                                $scope.postLoding = false;
                                            },
                                            function(res) {
                                                console.log(res);
                                            }
                                    );
                                }, 100);
                                $scope.sponsor = {};
                            })
                            .error(function(res) {
                                $scope.sponsorSavedError = true;
                            });*/

                } else if ($scope.sponsor && (is_mail && $scope.sponsor.id == undefined) ) {
                                 $scope.postLoding = true;
                                 console.log("sauvegarde");
                                 var params = {
                                     name: $scope.sponsor.nom,
                                     email: $scope.sponsor.email
                                 };
                                 /*$http.post(appSettings.baseUrl + '/sponsoring/new', params)
                                         .success(function(res) {
                                             $scope.sponsorSavedSucess = true;
                                             $timeout(function() {
                                                 $scope.getSponsors().then(
                                                         function(res) {
                                                             $scope.sponsors = res;
                                                             $scope.nbr_parrains = $scope.sponsors.length;
                                                             $scope.postLoding = false;
                                                         },
                                                         function() {
                                                             console.log(res);
                                                         }
                                                 );
                                             }, 100);
                                             $scope.sponsor = {};
                                         })
                                         .error(function(res) {
                                             $scope.sponsorSavedError = true;
                                         });*/
  
                } else {
                    return;
                }

            

    };
    
    
    $scope.getSponsors = function() {
          /*  
          var deferred = $q.defer();

            var token = $window.localStorage.getItem('janrainCaptureToken');
            $http.get(appSettings.baseUrl + '/sponsoring/' + token + '?uuid=' + authService.user.data.uuid + '&token=' + token + '')
                    .success(function(res) {
                        deferred.resolve(res.data.contacts);
                    })
                    .error(function(res) {
                        deferred.reject(res);
                    });

            return deferred.promise;
            */
    };
    
}])
