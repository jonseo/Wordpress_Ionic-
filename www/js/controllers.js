angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    //   //http://pentax.techvezoto.com//wp-json/wp/v2/categories/
    //  http://gondaltraders.com/wp-json/wp/v2/categories/
    
     $http.get("http://pentax.techvezoto.com//wp-json/wp/v2/categories/").success(function(data){
         
//         alert(data);
         $scope.data=data;
         
            });
    
    
    $scope.doRefresh = function(){
        
    //   //http://pentax.techvezoto.com//wp-json/wp/v2/posts/
    //  http://gondaltraders.com/wp-json/wp/v2/posts/
         
      $http.get("http://pentax.techvezoto.com//wp-json/wp/v2/posts/").success(function(posts){
                $scope.posts=posts;
          
                $scope.posts.forEach(function(element,index,array){
                    
                        element.excerpt.rendered = element.excerpt.rendered.substr(0,80);
                        element.excerpt.rendered = element.excerpt.rendered + "....Read More";
                        element.excerpt.rendered = $sce.trustAsHtml(element.excerpt.rendered);
                })
         
            $scope.$broadcast('scroll.refreshComplete');
                
         
            });
        
        
        
      
        
    }
    
    //   //http://pentax.techvezoto.com//wp-json/wp/v2/posts/
    //  http://gondaltraders.com/wp-json/wp/v2/posts/
     $http.get("http://pentax.techvezoto.com//wp-json/wp/v2/posts/").success(function(posts){
                $scope.posts=posts;
         
                $scope.posts.forEach(function(element,index,array){
                    
                        element.excerpt.rendered = element.excerpt.rendered.substr(0,100);
                        element.excerpt.rendered = element.excerpt.rendered + "....Read More";
                        element.excerpt.rendered = $sce.trustAsHtml(element.excerpt.rendered);
                })
         
                
                
            
                
            });
    
    
    
     
    
    
    $scope.canLoadMore = function(){
        
        return true;
        
    }
    
    $scope.loadMore = function(){
        //http://pentax.techvezoto.com//wp-json/wp/v2/posts/
        //http://gondaltraders.com/wp-json/wp/v2/posts/?offset=
        
        
        $http.get("http://gondaltraders.com/wp-json/wp/v2/posts/?offset=" +$scope.offset).success(function(data){
            
            var newPosts = data.data.posts;
            $scope.count_total = data.data.count_total;
            
//                $scope.posts=posts;
         
            newPosts.forEach(function(element,index,array){
                    
                        element.excerpt.rendered = element.excerpt.rendered.substr(0,100);
                        element.excerpt.rendered = element.excerpt.rendered + "....Read More";
                        element.excerpt.rendered = $sce.trustAsHtml(element.excerpt.rendered);
                })
         
                $scope.posts.push.apply($scope.posts,newPosts);
                $scope.$broadcast("scroll.infinteScrollComplete");
                $scope.offset +=10;
                
            
                
            });
    }
    
    
    
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    
    
    
})



.controller('detailCtrl',function($scope, $http,$stateParams){
      $stateParams.id;
     
     $http.get("http://pentax.techvezoto.com//wp-json/wp/v2/posts/" +$stateParams.id).success(function(post){
         
                $scope.post=post;
//         alert($stateParams.id);
          
            });
   
     
     
//     alert('detail');
 })


.controller('catPost',function($http,$scope,$stateParams){
    
    
   // http://pentax.techvezoto.com/wp-json/wp/v2/posts?categories=
    
     $http.get("http://pentax.techvezoto.com/wp-json/wp/v2/posts?categories=" + $stateParams.id).success(function(post){
         
                $scope.post=post;
//         alert($stateParams.id);
          
            });
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
