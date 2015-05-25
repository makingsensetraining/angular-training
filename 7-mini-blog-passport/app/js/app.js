'use strict';

/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('myApp', [ 'ngRoute', 'ngResource', 'toaster' ])

.config(function($routeProvider, $locationProvider, $httpProvider) {
    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated          
        if (user !== '0')
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';                      
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          }, 
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      }
    });
    //================================================

    //================================================
    // Define all the routes
    //================================================
    $routeProvider       
    .when('/', {
        controller: 'myPostsCtrl',
        templateUrl: 'partials/myPosts.html',
        resolve: {
          loggedin: checkLoggedin
        }
        })
      
    .when('/login', {
        templateUrl: '/partials/login.html',
        controller: 'LoginCtrl'
        })
        
    .when('/posts', 
        {
        controller: 'myPostsCtrl',
        templateUrl: 'partials/myPosts.html',
        resolve: {
          loggedin: checkLoggedin
        }
        })
    
    .when('/addpost',
        {
        controller: 'newPostCtrl',
        templateUrl: 'partials/newPost.html',
        resolve: {
          loggedin: checkLoggedin
        }})
    
    .when('/toaster',
        {
        controller: 'toasterCtrl',
        templateUrl: 'partials/toaster.html' })
    
    .when('/posts/:postId', 
        {
        controller: 'postDetailsCtrl',
        templateUrl: 'partials/postDetails.html',
        resolve: {
          loggedin: checkLoggedin
        }
        })   
    
    .when('/edit/:postId', 
        {
        controller: 'editPostCtrl',
        templateUrl: 'partials/editPost.html',
        resolve: {
          loggedin: checkLoggedin
        }
        })    
                                    
      .otherwise({
        redirectTo: '/'
      });
    //================================================

  }) // end of config()
  .run(function($rootScope, $http, $location){
    $rootScope.message = '';
    // Logout function is available in any pages
    $rootScope.logout = function(){
      $location.url('/login');
      $rootScope.isLogged = false;
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
  });