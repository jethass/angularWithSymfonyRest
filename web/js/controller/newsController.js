app.controller('newsCtrl', ['$scope','$rootScope','$location','authService','$http','$q','$timeout','appSettings',function($scope,$rootScope, $location,authService,$http,$q,$timeout,appSettings){

  $rootScope.loading=true;
  $rootScope.username=authService.user.data;
  
  $scope.articles = [];
  $scope.article = {};
  
  angular.element(document).ready(function() {
        if ($scope.articles.length == 0) {
                $rootScope.loading=true;
                $scope.getArticles().then(
                        function(res) {
                            $scope.articles = res;
                            $rootScope.loading=false;
                        },
                        function() {
                            alert("Une erreur s'est produite lors de connexion au web service!")
                        }
                );
        }
   });
   
   
   $scope.getArticles = function() {
            var deferred = $q.defer();
            $http.get(appSettings.baseUrl + '/articles')
                    .success(function(res) {
                        deferred.resolve(res.data);
                    })
                    .error(function(res) {
                        deferred.reject(res);
                    });

            return deferred.promise;
   };
   
    $scope.newArticle = function() {
            $scope.message = '';
            if ($scope.article && $scope.article.id==undefined) {
                                 console.log("sauvegarde");
                                 var params = {
                                     titre: $scope.article.titre,
                                     description: $scope.article.description,
                                     image: $scope.article.image
                                 };
                                $http.post(appSettings.baseUrl + '/articles/new', params)
                                         .success(function(res) {
                                             $scope.message = res.message;
                                             $timeout(function() {
                                                 $scope.getArticles().then(
                                                         function(res) {
                                                             $scope.articles = res;
                                                         },
                                                         function() {
                                                            alert("Une erreur s'est produite lors de connexion au web service!")
                                                         }
                                                 );
                                             }, 20);
                                             $scope.article = {};
                                         })
                                         .error(function(res) {
                                             $scope.message = res.message;
                                         });
                } else if ($scope.article && $scope.article.id!=undefined) {    
                               console.log("update");
                                 var params = {
                                     id: $scope.article.id,
                                     titre: $scope.article.titre,
                                     description: $scope.article.description,
                                     image: $scope.article.image
                                 };
                                $http.put(appSettings.baseUrl + '/articles/update/'+$scope.article.id+'', params)
                                         .success(function(res) {
                                             $scope.message = res.message;
                                             $timeout(function() {
                                                 $scope.getArticles().then(
                                                         function(res) {
                                                             $scope.articles = res;
                                                         },
                                                         function() {
                                                            alert("Une erreur s'est produite lors de connexion au web service!")
                                                         }
                                                 );
                                             }, 20);
                                             $scope.article = {};
                                         })
                                         .error(function(res) {
                                             $scope.message = res.message;
                                         });
  
                } else {
                    return;
                }

    };
    
    $scope.ModifierArticle=function (id){
            $scope.editarticle = {};
            $scope.getArticles().then(
                    function(res) {
                        for (key in res) {
                            if (res[key].id == id) {
                                $scope.editarticle = res[key];
                            }
                        }
                        $timeout(function() {
                            $scope.article.id = $scope.editarticle.id;
                            $scope.article.titre = $scope.editarticle.titre;
                            $scope.article.description = $scope.editarticle.description;
                            $scope.article.image = $scope.editarticle.image;
                        }, 20);

                    },
                    function() {
                        console.log(res);
                    }
            );
           
    };
    
    $scope.deleteArticle=function (id){
            var params = {
                id: id
            };
            $scope.suppmessage = '';
            if (confirm("Êtes-vous sûr de vouloir supprimer cette article?") == true) {
                $http.delete(appSettings.baseUrl + '/articles/delete/'+id+'', params)
                        .success(function(res) {
                            $timeout(function() {
                                $scope.suppmessage = res.message;
                                $scope.getArticles().then(
                                        function(res) {
                                            $scope.articles = res;
                                        },
                                        function() {
                                           alert("Une erreur s'est produite lors de connexion au web service!")
                                        }
                                );
                            }, 20);
                        })
                        .error(function(res) {
                            $scope.suppmessage = res.message;
                        });
            } else {

            }
    };
  
}])
